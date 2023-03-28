<template>
  <div class="home">
    <!-- 头部 -->
    <Navbar></Navbar>
    <div class="mainPanel">
      <!-- 轮播图 -->
      <el-card shadow="always" class="card-carousel">
        <el-carousel
          :interval="3000"
          type="card"
          height="300px"
          class="carousel"
        >
          <el-carousel-item
            class="carousel-item"
            v-for="item in swiperList"
            :key="item.s_id"
          >
            <img :src="item.s_url" alt="" />
          </el-carousel-item>
        </el-carousel>
      </el-card>
      <!-- 卡片展示区域 -->
      <div class="title">Recommend</div>
      <div class="bodyPanel">
        <div class="left">
          <el-card
            shadow="always"
            class="card"
            v-for="item in sortBlogList"
            :key="item.blog_id"
            @click="goBlogDetail(item.blog_id)"
          >
            <div class="info">
              <div class="title">{{ item.title }}</div>
              <div class="summary">
                {{ item.summary }}
              </div>
              <div class="detail">
                <span
                  ><el-icon title="author"><User /></el-icon
                  ><i class="item"> {{ item.author }}</i></span
                >
                <span
                  ><el-icon title="viewCount"><View /></el-icon
                  ><i class="item"> {{ item.view }}</i></span
                >
                <span
                  ><el-icon title="publicDate"><Clock /></el-icon
                  ><i class="item"> {{ item.public_date }}</i></span
                >
                <span
                  ><el-icon title="commentCount"><ChatLineRound /></el-icon
                  ><i class="item"> {{ item.comment_count }}</i></span
                >
                <span
                  ><el-icon title="star"><Star /></el-icon
                  ><i class="item"> {{ item.star }}</i></span
                >
                <span v-for="(tag, index) in item.tag" :key="index">
                  <el-tag effect="plain" size="small">{{ tag }}</el-tag>
                </span>
              </div>
            </div>
            <div class="cover">
              <img :src="item.cover" alt="" />
            </div>
          </el-card>
        </div>
        <!-- 右侧信息展示 -->
        <div class="right">
          <el-affix :offset="150">
            <el-card shadow="always" class="card" @click="goCenter">
              <div class="avatar">
                <img :src="avatar" alt="" />
              </div>
              <div class="info">
                <span>{{ uname }}</span>
                <p>{{ desc1 }}</p>
                <p>{{ desc2 }}</p>
              </div>
            </el-card>
          </el-affix>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <BacktopCom></BacktopCom>
  </div>
</template>

<script setup lang="ts">
import { User, View, ChatLineRound, Star, Clock } from '@element-plus/icons-vue'
import BacktopCom from '@/components/BackTop/BacktopCom.vue'
import { useSwiper } from '@/hooks/useSwiper'
import { useBlog } from '@/hooks/useBlog'
import { useUser } from '@/hooks/useUser'
import { useRouters } from '@/hooks/useRouter'
const { swiperList } = useSwiper()
const { sortBlogList } = useBlog()
const { avatar, uname, desc1, desc2 } = useUser()
const { goBlogDetail, goCenter } = useRouters()
</script>

<style scoped lang="less">
@import '@/style/home.less';
</style>
