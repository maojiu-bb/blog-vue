<template>
  <div class="notfound">
    <el-empty description="404 Not Found">
      <el-button type="danger" @click="backLogin">Back Sign In</el-button>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { useRouters } from '@/hooks/useRouter'
const { backLogin } = useRouters()
</script>

<style></style>
