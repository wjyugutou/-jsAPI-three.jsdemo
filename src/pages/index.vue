<script setup lang="ts">
const name = ref('')

const router = useRouter()

const title = import.meta.env.VITE_APP_TITLE

function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

function goMap() {
  router.push('/map')
}
</script>

<template>
  <div>
    <div class="i-carbon-campsite inline-block text-4xl" />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        {{ title }}
      </a>
    </p>
    <p>
      <em class="text-sm op75">Opinionated Vite Starter Template</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      class="w-250px border border-(dark:gray-700 gray-200 rounded) bg-transparent p-(x-4 y-2) text-center outline-(none)"
      @keydown.enter="go"
    >

    <div>
      <button
        class="btn m-3 cursor-pointer text-sm"
        :class="{ 'cursor-not-allowed': !name }"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>

    <div>
      <button
        class="btn m-3 cursor-pointer text-sm"
        @click="goMap"
      >
        Go Map
      </button>
    </div>
  </div>
</template>
