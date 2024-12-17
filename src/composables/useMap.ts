import AMapLoader from '@amap/amap-jsapi-loader'

// const aMapKey = Symbol('aMapKey')

const AMap = shallowRef<Window['AMap'] | null>(null)
const map = shallowRef<AMap.Map | null>(null)

// const pluginsList = [
//   'AMap.PolyEditor',
//   'AMap.CustomLayer',
//   'AMap.ControlBar',
//   'AMap.Heatmap',
//   'Map3D',
//   'AMap.GLCustomLayer',
//   'AMap.Buildings',
//   'AMap.Size',
//   'AMap.LngLat',
//   'AMap.3DTilesLayer',
//   'AMap.PolyEditor',
//   'AMap.PolylineEditor',
//   'AMap.Driving',
// ] as const
type Plugin = 'AMap.PolyEditor'
  | 'AMap.CustomLayer'
  | 'AMap.ControlBar'
  | 'AMap.Heatmap'
  | 'Map3D'
  | 'AMap.GLCustomLayer'
  | 'AMap.Buildings'
  | 'AMap.Size'
  | 'AMap.LngLat'
  | 'AMap.3DTilesLayer'
  | 'AMap.PolyEditor'
  | 'AMap.PolylineEditor'
  | 'AMap.Driving'
type Plugins = Plugin[]

// type MapContext = ShallowRef<AMap.Map>

interface MapOptions extends AMap.MapOptions {
  plugins?: Plugins
  onInit?: (map: AMap.Map) => unknown
}

async function initMapLoader() {
  try {
    if (!AMap.value) {
      AMap.value = await AMapLoader.load({
        key: import.meta.env.VITE_GAODE_MAP_KEY, // 申请好的 Web 端开发者 Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
        // Loca: { // 是否加载 Loca， 缺省不加载
        //   version: '2.0.0', // Loca 版本，缺省 1.3.2
        // },
      })
    }
  }
  catch (error) {
    console.error(error)
  }
}

export async function initMap(mapContainer: Ref<HTMLDivElement | null>, opt?: MapOptions) {
  onBeforeUnmount(() => {
    map.value = null
  })

  await initMapLoader()

  if (mapContainer.value) {
    map.value = new AMap.value!.Map(mapContainer.value, opt)
  }
  else {
    throw new Error('mapContainer is required')
  }
}

export function useMap() {
  return map
}
