<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <template v-if="route.path !== '/map'">
    <main class="p-(x-4 y-10) text-(center) font-sans">
      <Suspense>
        <template #fallback>
          <div class="h-screen flex items-center justify-center">
            <div class="text-2xl font-bold">
              Loading...
            </div>
          </div>
        </template>
        <router-view />
      </Suspense>
      <Footer />
    </main>
  </template>
  <template v-else>
    <Suspense>
      <template #fallback>
        <div class="h-screen flex items-center justify-center">
          <div class="text-2xl font-bold">
            Loading...
          </div>
        </div>
      </template>
      <router-view />
    </Suspense>
  </template>
</template>
