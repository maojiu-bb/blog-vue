<template>
  <div class="blogdetail">
    <GoBackCom title="Blog Detail"></GoBackCom>
    <el-card shadow="always" class="card">
      <template #header>
        <div class="card-header">
          <span class="title">{{ blogInfo?.title }}</span>
          <div class="info">
            <span>author: {{ blogInfo?.author }}</span>
            <span>date: {{ blogInfo?.public_date }}</span>
            <span>view: {{ blogInfo?.view }}</span>
            <span>
              <el-icon class="star" ref="star" @click="changeStar"
                ><Star /></el-icon
              >{{ blogInfo?.star }}</span
            >
          </div>
        </div>
      </template>
      <div class="cover">
        <img :src="blogInfo?.cover" alt="" />
      </div>
      <div>
        <v-md-editor
          :model-value="blogInfo?.detail"
          mode="preview"
        ></v-md-editor>
      </div>
      <el-tag class="tag" v-for="(tag, index) in blogInfo?.tag" :key="index">
        {{ tag }}
      </el-tag>
      <div class="comments">
        <h4>comments</h4>
        <ul>
          <li v-for="item in blogInfo?.comments"></li>
        </ul>
      </div>
    </el-card>
    <!-- backtop -->
    <BacktopCom></BacktopCom>
  </div>
</template>

<script setup lang="ts">
import { Star } from '@element-plus/icons-vue'
import BacktopCom from '@/components/BackTop/BacktopCom.vue'
import GoBackCom from '@/components/GoBack/GoBackCom.vue'
import { useBlogDetail } from '@/hooks/useBlogDetail'
const { blogInfo, changeStar } = useBlogDetail()
</script>

<style scoped lang="less">
@import '@/style/blogdetail.less';
</style>
