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
        <a href="https://github.com/maojiu-bb/blog" target="_blank">
          <img src="@/assets/imgs/github.png" alt="" />
        </a>
        <a href="https://gitee.com/maojiubb/blog" target="_blank">
          <img src="@/assets/imgs/gitee.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '@/hooks/useLogin'
import { useSwitch } from '@/hooks/useSwitch'
const { avatar, signIn } = useLogin()
useSwitch()
</script>

<style scoped lang="less">
@import '@/style/login.less';
</style>
