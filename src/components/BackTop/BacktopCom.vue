<template>
  <!-- 回到顶部 -->
  <el-backtop :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        border-radius: 50%;
      "
    >
      <el-icon><ArrowUpBold /></el-icon>
    </div>
  </el-backtop>
</template>

<script setup lang="ts">
import { ArrowUpBold } from '@element-plus/icons-vue'
</script>

<style></style>
