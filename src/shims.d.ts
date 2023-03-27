declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module '@kangc/v-md-editor'
declare module 'prismjs'
declare module 'marked'
declare module '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
declare module '@kangc/v-md-editor/lib/theme/prism'

export interface PersistStrategy {
  key?: string
  storage?: Storage
  paths?: string[]
}
export interface PersistOptions {
  enabled: true
  strategies?: PersistStrategy[]
}
declare type Store = PiniaPluginContext['store']
declare module 'pinia' {
  interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions
  }
}
