/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  microApp: any
  __MICRO_APP_NAME__: string
  __MICRO_APP_ENVIRONMENT__: string
  __MICRO_APP_BASE_ROUTE__: string
}