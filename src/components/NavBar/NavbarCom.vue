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
        />
        <el-menu-item index="/home" @click="savepath('/home')"
          >Home</el-menu-item
        >
        <el-menu-item index="/bloglist" @click="savepath('/bloglist')"
          >BlogLists</el-menu-item
        >
        <el-menu-item index="/project" @click="savepath('/project')"
          >Projects</el-menu-item
        >
        <el-menu-item index="/center" @click="savepath('/center')"
          >Center</el-menu-item
        >
        <el-switch
          v-model="value"
          class="mt-2 switch"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          active-color="#292e36"
        />
        <div class="imgs">
          <a href="">
            <img src="@/assets/imgs/github.png" alt="" title="github" />
          </a>
          <a href="">
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
import { ref, reactive, watch, computed } from 'vue'
import { Search, Sunny, Moon } from '@element-plus/icons-vue'
import { blogStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { Blog } from '@/types/blog'
import router from '@/router'

const b_store = blogStore()
const { obscureBlog } = storeToRefs(b_store)
const { getObscureBlogList } = b_store
let blogs = reactive(new Blog())
const changeSearch = () => {
  watch(
    () => form.name,
    (newVal, oldVal) => {
      getObscureBlogList(newVal)
        .then((res) => {
          const blogList = computed(() => {
            return obscureBlog.value.blog
          })
          blogs.blog = blogList.value
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
const goBlogDetail = (blog_id: number) => {
  router.push(`/blogdetail?blog_id=${blog_id}`)
}

const value = ref(false)
let activeIndex = ref(sessionStorage.getItem('path') || '/home')
const savepath = (path: string) => {
  sessionStorage.setItem('path', `${path}`)
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
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.navbar {
  .dialog {
    ul {
      li {
        display: block;
        margin: 10px auto 0;
        width: 600px;
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
        background-color: #eee;
        border-radius: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;

        &:hover {
          background-color: #b0dff2;
        }
      }
    }
  }
  .flex-grow {
    flex-grow: 1;
  }
  .input {
    width: 200px;
    height: 40px;
    margin: 9px 20px;
  }
  .logo {
    margin-left: 150px;
    img {
      width: 40px;
    }
    .title {
      margin-left: 10px;
      font-weight: 700;
      font-size: 16px;
    }
  }
  .el-menu-demo {
    padding-right: 100px;
  }
  .switch {
    margin-left: 25px;
    margin-top: 10px;
  }
  .imgs {
    display: flex;
    margin: 12px 20px;
    margin-right: 80px;
    img {
      width: 25px;
      height: 25px;
      margin: 0 10px;
    }
  }
}
</style>
