<template>
  <div class="center">
    <!-- 头部 -->
    <Navbar></Navbar>

    <div class="center-info">
      <!-- 左侧功能框 -->
      <el-affix :offset="150">
        <el-card shadow="always" class="card-func">
          <div class="avatar">
            <img :src="user?.avatar" alt="" />
          </div>
          <div class="uname">{{ user?.uname }}</div>
          <div class="info">
            <p>{{ user?.desc1 }}</p>
            <p>{{ user?.desc2 }}</p>
          </div>
          <div class="functions">
            <el-button
              type="primary"
              :icon="Plus"
              class="button"
              @click="addBlog"
              >Add a Blog</el-button
            >
            <el-button
              type="default"
              :icon="Plus"
              class="button"
              @click="addProject"
              >Add a Project</el-button
            >
            <el-button
              type="default"
              :icon="Tools"
              class="button"
              @click="settingInfo"
              >Setting Info</el-button
            >
          </div>
        </el-card>
      </el-affix>
      <el-card shadow="always" class="card-info">
        <div class="charts">
          <ViewChart></ViewChart>
        </div>
        <div class="charts">
          <CommentCharts></CommentCharts>
        </div>
        <div class="charts">
          <StarCharts></StarCharts>
        </div>
      </el-card>
    </div>
    <!-- 回到顶部 -->
    <BacktopCom></BacktopCom>
  </div>
</template>

<script setup lang="ts">
import { Plus, Tools } from '@element-plus/icons-vue'
import BacktopCom from '@/components/BackTop/BacktopCom.vue'
import ViewChart from '@/components/Charts/ViewCharts.vue'
import CommentCharts from '@/components/Charts/CommentCharts.vue'
import StarCharts from '@/components/Charts/StarCharts.vue'
import { useUser } from '@/hooks/useUser'
import { useRouters } from '@/hooks/useRouter'
const { user } = useUser()
const { addBlog, addProject, settingInfo } = useRouters()
</script>

<style scoped lang="less">
@import '@/style/center.less';
</style>
