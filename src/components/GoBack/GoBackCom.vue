<template>
  <div class="goback">
    <el-page-header @back="goBack" :icon="ArrowLeft" class="header">
      <template #content>
        <span class="text-large font-600 mr-3">{{ props.title }}</span>
      </template>
      <slot name="button"></slot>
    </el-page-header>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouters } from '@/hooks/useRouter'
const { goBack } = useRouters()
const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  }
})
</script>

<style scoped lang="less">
.goback {
  color: var(--textColor);
  .header {
    span {
      color: var(--textColor);
    }
  }
}
</style>
