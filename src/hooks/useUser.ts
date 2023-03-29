import { userStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useUser = () => {
  const u_store = userStore()
  const { userInfo } = storeToRefs(u_store)
  const { updateUserAvatar, updateUserInfo } = u_store
  const avatar = computed(() => {
    return userInfo.value.userInfo[0]?.avatar
  })
  const uname = computed(() => {
    return userInfo.value.userInfo[0]?.uname
  })
  const desc1 = computed(() => {
    return userInfo.value.userInfo[0]?.desc1
  })
  const desc2 = computed(() => {
    return userInfo.value.userInfo[0]?.desc2
  })
  const user = computed(() => {
    return userInfo.value.userInfo[0]
  })

  return {
    avatar,
    uname,
    desc1,
    desc2,
    user,
    updateUserAvatar,
    updateUserInfo
  }
}
