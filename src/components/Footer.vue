<script setup lang="ts">
const toggleDarkFn = toggleDark
</script>

<template>
  <nav class="mt-6 inline-flex gap-2 text-xl">
    <button class="icon-btn" @click="() => toggleDarkFn()">
      <div class="dark:i-carbon-moon i-carbon-sun" />
    </button>

    <a
      class="icon-btn i-carbon-logo-github"
      rel="noreferrer"
      href="https://github.com/antfu/vitesse-lite"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
