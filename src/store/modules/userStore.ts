import { defineStore } from 'pinia'
import { getUserInfo, updateAvatar, updateInfo } from '@/api/requests'
import { reactive } from 'vue'
import { User, Iavatar, Iuserinfo } from '@/types/user'

export const userStore = defineStore('user', () => {
  let userInfo = reactive(new User())
  const getUser = async () => {
    const { data: res } = await getUserInfo()
    if (res.code === 200) {
      userInfo.userInfo = res.data
    }
  }
  getUser()

  const updateUserAvatar = async (data: Iavatar) => {
    const { data: res } = await updateAvatar(data)
    if (res.code === 200) {
      getUser()
    }
  }

  const updateUserInfo = async (data: Iuserinfo) => {
    const { data: res } = await updateInfo(data)
    if (res.code === 200) {
      getUser()
    }
  }

  return {
    userInfo,
    updateUserAvatar,
    updateUserInfo
  }
})
