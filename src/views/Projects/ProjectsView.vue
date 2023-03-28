<template>
  <!-- 头部 -->
  <Navbar></Navbar>
  <div class="project">
    <el-card
      class="project-item"
      v-for="item in project.project"
      :key="item.project_id"
    >
      <template #header>
        <div class="card-header">
          <span>{{ item.project_name }}</span>
          <a :href="href" target="_blank">
            <el-button
              class="button"
              size="small"
              text
              @click="goGitHub(item.github_address)"
              >See in GitHub</el-button
            >
          </a>
        </div>
      </template>
      <div class="detail">
        <div class="imgs">
          <img
            :src="cover"
            alt=""
            v-for="(cover, index) in item.project_cover"
            :key="index"
          />
        </div>
        <div class="info">
          {{ item.project_info }}
        </div>
      </div>
    </el-card>
    <!-- 回到顶部 -->
    <BacktopCom></BacktopCom>
  </div>
</template>

<script setup lang="ts">
import BacktopCom from '@/components/BackTop/BacktopCom.vue'
import { useProject } from '@/hooks/useProject'
import { useRouters } from '@/hooks/useRouter'
const { project } = useProject()
const { href, goGitHub } = useRouters()
</script>

<style scoped lang="less">
@import '@/style/project.less';
</style>
