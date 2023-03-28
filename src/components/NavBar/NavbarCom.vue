<template>
  <div class="navbar">
    <el-affix :offset="0">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="true"
        router
        @select="handleSelect"
      >
        <el-menu-item index="/login" class="logo" @click="savepath('/login')">
          <img src="@/assets/blogger.svg" alt="" />
          <span class="title">MaojiuBlog</span>
        </el-menu-item>
        <div class="flex-grow" />
        <el-input
          placeholder="Search"
          class="input"
          :suffix-icon="Search"
          @click="search"
          style="--el-input-bg-color: var(--bgCardColor)"
        />
        <el-menu-item index="/home" @click="savepath('/home')" class="menu-item"
          >Home</el-menu-item
        >
        <el-menu-item
          index="/bloglist"
          @click="savepath('/bloglist')"
          class="menu-item"
          >BlogLists</el-menu-item
        >
        <el-menu-item
          index="/project"
          @click="savepath('/project')"
          class="menu-item"
          >Projects</el-menu-item
        >
        <el-menu-item
          index="/center"
          @click="savepath('/center')"
          class="menu-item"
          >Center</el-menu-item
        >
        <el-switch
          v-model="value"
          class="mt-2 switch"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          active-color="#292e36"
          @change="changeSwitch"
          style="--el-switch-border-color: var(--borderCardColor)"
        />
        <div class="imgs">
          <a href="https://github.com/maojiu-bb/blog" target="_blank">
            <img src="@/assets/imgs/github.png" alt="" title="github" />
          </a>
          <a href="https://gitee.com/maojiubb/blog" target="_blank">
            <img src="@/assets/imgs/gitee.png" alt="" title="gitee" />
          </a>
        </div>
      </el-menu>
    </el-affix>
    <el-dialog v-model="dialogFormVisible" class="dialog" center>
      <el-form :model="form">
        <el-form-item label="Search " :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            :suffix-icon="Search"
            @change="changeSearch"
          />
        </el-form-item>
      </el-form>
      <ul>
        <li
          v-for="item in blogs.blog"
          :key="item.blog_id"
          @click="goBlogDetail(item.blog_id)"
        >
          {{ item.summary }}
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Search, Sunny, Moon } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { Blog } from '@/types/blog'
import { useRouters } from '@/hooks/useRouter'
import { useBlog } from '@/hooks/useBlog'
import { useSwitch } from '@/hooks/useSwitch'
const { goBlogDetail } = useRouters()
const { obscureBlogList, getObscureBlogList } = useBlog()
const { value, changeSwitch } = useSwitch()

let blogs = reactive(new Blog())
const changeSearch = () => {
  watch(
    () => form.name,
    (newVal, oldVal) => {
      getObscureBlogList(newVal)
        .then((res) => {
          blogs.blog = obscureBlogList.value
        })
        .catch((err) => {
          ElMessage({
            message: 'fail',
            type: 'warning'
          })
        })
    },
    {
      immediate: true
    }
  )
}

let activeIndex = ref(sessionStorage.getItem('path') || '/home')
const savepath = (path: string) => {
  sessionStorage.setItem('path', `${path}`)
  if (path === '/login') {
    localStorage.removeItem('token')
  }
}
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex.value = key
}

let dialogFormVisible = ref(false)
const formLabelWidth = '220px'
const form = reactive({
  name: ''
})
const search = () => {
  dialogFormVisible.value = true
  form.name = ''
}
</script>

<style scoped lang="less">
@import '@/style/navbar.less';
</style>
