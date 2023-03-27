<template>
  <div class="notfound">
    <el-empty description="404 Not Found">
      <el-button type="danger" @click="backLogin">Back Login</el-button>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const backLogin = () => {
  router.replace('/login')
}
</script>

<style></style>
