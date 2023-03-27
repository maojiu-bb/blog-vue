import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { userStore } from './modules/userStore'
import { swiperStore } from './modules/swiperStore'
import { blogStore } from './modules/blogStore'
import { projectStore } from './modules/projectStore'

const pinia = createPinia()
pinia.use(piniaPersist)

export { userStore, swiperStore, blogStore, projectStore }
export default pinia
