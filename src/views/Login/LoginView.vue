<template>
  <div class="login">
    <div class="box">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="avatar" alt="" />
      </div>
      <!-- 文字 -->
      <div class="content">Now Sign In To See My Blog !</div>
      <!-- 按钮 -->
      <div class="button">
        <button @click="signIn">Sign In</button>
      </div>
      <!-- 链接 -->
      <div class="link">
        <a href="">
          <img src="@/assets/imgs/github.png" alt="" />
        </a>
        <a href="">
          <img src="@/assets/imgs/gitee.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { userStore } from '@/store/modules/userStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const store = userStore()
const router = useRouter()

const { userInfo } = storeToRefs(store)

const avatar = computed(() => {
  return userInfo.value.userInfo[0]?.avatar
})

const signIn = () => {
  router.push('/home')
  sessionStorage.setItem('path', '/home')
}
</script>

<style scoped lang="less">
@import '@/style/login.less';
</style>
