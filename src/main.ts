import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

window._AMapSecurityConfig = {
  securityJsCode: import.meta.env.VITE_GAODE_MAP_SECRET,
}
