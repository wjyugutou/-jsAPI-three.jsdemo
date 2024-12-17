/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
  readonly VITE_BASE_URL: string
  readonly VITE_GAODE_MAP_KEY: string
  readonly VITE_GAODE_MAP_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
