<script setup lang="ts">
import { TilesRenderer } from '3d-tiles-renderer'
import Tileset from '@/assets/tiles/small-town/tileset.json?url'
import * as THREE from 'three'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const mapRef = useTemplateRef('mapRef')

const center: [number, number] = [113.536206, 22.799285]

function initMapAfter() {
  const map = useMap()

  // 监听地图缩放和点击，用于开发调试
  map.value!.on('zoomend', () => {
    console.log(map.value!.getZoom())
  })
  map.value!.on('click', (e) => {
    const target = e.target as AMap.Map
    const { lng, lat } = e.lnglat
    console.log([lng, lat], target.getPitch())
  })
}

// 初始化3d模型图层
function init3dLayer() {
  const map = useMap()
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let scene: THREE.Scene
  // @ts-expect-error customCoords 在 AMap 中不存在
  const customCoords = map.value!.customCoords

  const layer = new window.AMap.GLCustomLayer({
    zIndex: 120,
    opacity: 1,
    visible: true,
    zooms: [4, 22],
    init: (gl) => {
      console.log(gl.getParameter(gl.VERSION))
      initThree(gl)
      customCoords.setCenter(center)
    },
    render: () => {
      updateCamera()
      onRender()
    },
  })
  const _tilesRendererArr: TilesRenderer[] = []

  animate()

  function initThree(gl: WebGLRenderingContext) {
    const clientWidth = map.value!.getContainer().clientWidth
    const clientHeight = map.value!.getContainer().clientHeight
    camera = new THREE.PerspectiveCamera(60, clientWidth / clientHeight, 100, 1 << 30)

    const option = {
      alpha: true,
      antialias: false,
      precision: 'highp',
      context: gl,
    }

    renderer = new THREE.WebGLRenderer(option)
    // 必须设置为false才能实现多个render的叠加
    renderer.autoClear = false
    renderer.setClearAlpha(0)
    renderer.setSize(clientWidth, clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    scene = new THREE.Scene()

    // 添加环境光
    const aLight = new THREE.AmbientLight(0xFFFFFF, 3.0)
    scene.add(aLight)

    loadTiles()
  }

  function loadTiles() {
    // b3dm文件加载器
    const dracoLoader = new DRACOLoader()
    // draco_decoder.js相关文件可以在这里获取 node_modules\three\examples\jsm\libs\draco\gltf
    dracoLoader.setDecoderPath('/draco/gltf/')

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    const tilesRenderer = new TilesRenderer(Tileset)
    tilesRenderer.manager.addHandler(/\.gltf$/, gltfLoader)

    tilesRenderer.setCamera(camera)
    tilesRenderer.setResolutionFromRenderer(camera, renderer)
    scene.add(tilesRenderer.group)
    _tilesRendererArr.push(tilesRenderer)
  }

  function updateCamera() {
    if (!renderer) {
      return
    }
    // 保证投影正常显示
    renderer.resetState()

    customCoords.setCenter(center)

    const { near, far, fov, up, lookAt, position } = customCoords.getCameraParams()

    camera.near = near // 近平面
    camera.far = far // 远平面
    camera.fov = fov // 视野范围
    // @ts-expect-error position 在 AMap 中不存在
    camera.position.set(...position)
    // @ts-expect-error up 在 AMap 中不存在
    camera.up.set(...up)
    // @ts-expect-error lookAt 在 AMap 中不存在
    camera.lookAt(...lookAt)

    // 更新相机坐标系
    camera.updateProjectionMatrix()

    renderer.render(scene, camera)

    // 这里必须执行！重新设置 three 的 gl 上下文状态
    renderer.resetState()
  }

  function animate() {
    requestAnimationFrame(animate)

    if (!renderer) {
      return
    }

    for (const tilesRenderer of _tilesRendererArr) {
      tilesRenderer.update()
    }
    // @ts-expect-error render 方法在 AMap 中不存在
    map.value!.render()
  }

  function onRender() {
  }

  map.value?.add(layer)
}

// 初始化楼层图层
function initFloorLayer() {
  const map = useMap()
}

async function main() {
  await initMap(mapRef, {
    plugins: ['AMap.GLCustomLayer'],
    center,
    viewMode: '3D',
    showBuildingBlock: true,
    zoom: 15.5,
    pitch: 0,
    rotation: 4.9,
    mapStyle: 'amap://styles/light',
    skyColor: '#c8edff',
    // showLabel: false,
  })

  initMapAfter()
  init3dLayer()
  initFloorLayer()
}

onMounted(() => {
  main()
})
</script>

<template>
  <div class="h-100vh w-100vw">
    <div ref="mapRef" class="h-full w-full" />
  </div>
</template>
