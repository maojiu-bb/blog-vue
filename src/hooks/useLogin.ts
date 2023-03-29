import { useRouter } from 'vue-router'
import { userStore } from '@/store/modules/userStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useLogin = () => {
  const store = userStore()
  const router = useRouter()

  const { userInfo } = storeToRefs(store)

  const avatar = computed(() => {
    return userInfo.value.userInfo[0]?.avatar
  })

  const signIn = () => {
    router.push('/home')
    sessionStorage.setItem('path', '/home')
    // 模拟一个token
    localStorage.setItem('token', 'Bearer serfgsehhjkdwahdkbdkadjwadhiufenfbk')
  }

  return {
    avatar,
    signIn
  }
}
