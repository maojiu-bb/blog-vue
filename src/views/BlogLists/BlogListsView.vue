<template>
  <div class="blogList">
    <!-- 头部 -->
    <Navbar></Navbar>
    <!-- 列表 -->
    <div class="list">
      <el-card
        class="box-card"
        v-for="item in blogList"
        :key="item.blog_id"
        @click="goBlogDetail(item.blog_id)"
      >
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
          </div>
        </template>
        <div class="info">
          <div class="summary">
            <div class="content">
              {{ item.summary }}
            </div>
            <div class="detail">
              <span
                ><el-icon title="author"><User /></el-icon
                ><i class="item">{{ item.author }}</i></span
              >
              <span
                ><el-icon title="viewCount"><View /></el-icon
                ><i class="item">{{ item.view }}</i></span
              >
              <span
                ><el-icon title="publicDate"><Clock /></el-icon
                ><i class="item">{{ item.public_date }}</i></span
              >
              <span
                ><el-icon title="commentCount"><ChatLineRound /></el-icon
                ><i class="item">{{ item.comment_count }}</i></span
              >
              <span
                ><el-icon title="star"><Star /></el-icon
                ><i class="item">{{ item.star }}</i></span
              >
              <span v-for="(tag, index) in item.tag" :key="index">
                <el-tag effect="plain" size="small" class="tag">
                  {{ tag }}
                </el-tag>
              </span>
            </div>
          </div>
          <div class="cover">
            <img :src="item.cover" alt="" />
          </div>
        </div>
      </el-card>
    </div>
    <!-- 回到顶部 -->
    <BacktopCom></BacktopCom>
  </div>
</template>

<script setup lang="ts">
import { User, View, ChatLineRound, Star, Clock } from '@element-plus/icons-vue'
import BacktopCom from '@/components/BackTop/BacktopCom.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

import { blogStore } from '@/store/index'
import { storeToRefs } from 'pinia'

const b_store = blogStore()
const { blog } = storeToRefs(b_store)
const blogList = computed(() => {
  return blog.value.blog
})

const router = useRouter()
const goBlogDetail = (id: number) => {
  router.push(`/blogdetail?blog_id=${id}`)
}
</script>

<style scoped lang="less">
@import '@/style/bloglist.less';
</style>
