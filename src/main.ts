import { createApp } from 'vue'
import App from './App.vue'
import '@/theme/theme.css'
// 导入路由模块
import router from './router'
// 导入全局组件
import NavbarComVue from './components/NavBar/NavbarCom.vue'
import pinia from './store'
import 'element-plus/theme-chalk/el-message.css'
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'
VMdEditor.use(vuepressTheme, {
  Prism
})

createApp(App)
  .use(router)
  .use(pinia)
  .use(VMdEditor)
  .component('Navbar', NavbarComVue)
  .mount('#app')
