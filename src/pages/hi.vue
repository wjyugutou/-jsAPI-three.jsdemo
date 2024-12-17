<script lang='ts' setup>
import { createFetch } from '@vueuse/core'
import axios from 'axios'

// const { data } = await useFetch('/api/auth/login', {
//   method: 'POST',
//   body: JSON.stringify({
//     username: 'hjadmin',
//     password: 'admin123',
//   }),
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
// console.log(data)

const fetch = createFetch({
  baseUrl: '/api',
  options: {
    beforeFetch(ctx) {
      console.log(ctx)
      ctx.options.body = JSON.stringify(ctx.options.body)
      return ctx
    },
    afterFetch(ctx) {
      console.log(ctx)
      return ctx
    },
  },
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 跨域请求时需要携带cookie
  },

})

async function login() {
  const { data } = await fetch('/auth/login', {
    method: 'POST',
    body: {
      username: 'hjadmin',
      password: 'admin123',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log(data)
}
</script>

<template>
  <button class="btn bg-green-500" @click="login">
    hi.vue
  </button>
  <RouterView />
</template>
