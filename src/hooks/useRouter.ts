import { useRouter } from 'vue-router'
import { ref } from 'vue'

export const useRouters = () => {
  const router = useRouter()
  const goBlogDetail = (id: number) => {
    router.push(`/blogdetail?blog_id=${id}`)
  }
  const goCenter = () => {
    router.push('/center')
    sessionStorage.setItem('path', '/center')
  }
  const href = ref('')
  const goGitHub = (address: string) => {
    href.value = address
  }
  const addBlog = () => {
    router.push('/addblog')
  }
  const addProject = () => {
    router.push('/addproject')
  }
  const settingInfo = () => {
    router.push('/setting')
  }
  const backLogin = () => {
    router.replace('/login')
  }
  const goBack = () => {
    router.back()
  }

  return {
    href,
    goBlogDetail,
    goCenter,
    goGitHub,
    addBlog,
    addProject,
    settingInfo,
    backLogin,
    goBack
  }
}
