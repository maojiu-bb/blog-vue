import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/HomeView.vue')
  },
  {
    path: '/bloglist',
    name: 'bloglist',
    component: () => import('@/views/BlogLists/BlogListsView.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/Projects/ProjectsView.vue')
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('@/views/Center/CenterView.vue')
  },
  {
    path: '/addblog',
    name: '/addblog',
    component: () => import('@/views/AddBlog/AddBlogView.vue')
  },
  {
    path: '/addproject',
    name: '/addproject',
    component: () => import('@/views/AddProject/AddProjectView.vue')
  },
  {
    path: '/setting',
    name: '/setting',
    component: () => import('@/views/Setting/SettingView.vue')
  },
  {
    path: '/blogdetail',
    name: '/blogdetail',
    component: () => import('@/views/BlogDetail/BlogDetailView.vue')
  },
  {
    path: '/404NotFound',
    name: '404NotFound',
    component: () => import('@/views/NotFound/NotFoundView.vue')
  }
]

export default routes
