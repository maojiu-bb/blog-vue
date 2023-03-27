<template>
  <div class="addBlog">
    <el-page-header @back="goBack" :icon="ArrowLeft" class="header">
      <template #content>
        <span class="text-large font-600 mr-3">Add a Blog</span>
      </template>
      <el-button type="primary" class="button" :icon="Edit" @click="addBlog"
        >Add Blog</el-button
      >
    </el-page-header>
    <el-drawer v-model="drawer" direction="rtl">
      <template #header>
        <h4>finish follow options</h4>
      </template>
      <template #default>
        <el-form
          ref="ruleFormRef"
          label-position="top"
          label-width="100px"
          :model="ruleForm"
          style="max-width: 460px"
          :rules="rules"
        >
          <el-form-item label="Title" prop="title">
            <el-input v-model="ruleForm.title" />
          </el-form-item>
          <el-form-item label="Tag" prop="value">
            <el-select
              v-model="ruleForm.value"
              class="m-2"
              multiple
              :multiple-limit="2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in tag"
                :key="item.tag_id"
                :label="item.tag"
                :value="item.tag"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Summary" prop="summary">
            <el-input type="textarea" v-model="ruleForm.summary" />
          </el-form-item>
          <el-form-item label="Cover">
            <el-upload
              v-model:file-list="fileList"
              action="#"
              :auto-upload="false"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :limit="1"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick(ruleFormRef)">cancel</el-button>
          <el-button type="primary" @click="confirmClick(ruleFormRef)"
            >confirm</el-button
          >
        </div>
      </template>
    </el-drawer>
    <v-md-editor v-model="detail" height="85vh" class="markdown"></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft, Edit, Plus } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import {
  ElMessage,
  FormInstance,
  FormRules,
  UploadProps,
  UploadUserFile
} from 'element-plus'
import { blogStore, userStore } from '@/store'
import { storeToRefs } from 'pinia'
import { IpublicBlog } from '@/types/blog'

const fileList = ref<UploadUserFile[]>([])
const ruleFormRef = ref<FormInstance>()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const ruleForm = reactive({
  title: '',
  summary: '',
  value: []
})
const rules = reactive<FormRules>({
  title: [
    { required: true, message: 'Please input Blog Title', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
  ],
  summary: [
    {
      required: true,
      message: 'Please input Summary ',
      trigger: 'blur'
    },
    { min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' }
  ],
  value: [{ required: true, message: 'Please select Tag', trigger: 'change' }]
})
const drawer = ref(false)

const router = useRouter()
const goBack = () => {
  router.back()
}

const addBlog = () => {
  drawer.value = true
  ruleForm.title = ''
  ruleForm.summary = ''
  ruleForm.value = []
  fileList.value = []
}

/* const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
} */

const b_store = blogStore()
const u_store = userStore()
const { userInfo } = storeToRefs(u_store)
const { blog, tags } = storeToRefs(b_store)
const { publidBlogInfo } = b_store

const tag: any = computed(() => {
  return tags.value
})

const blog_id = computed(() => {
  const id = blog.value.blog.map((item) => item.blog_id)
  let max = id[0]
  for (let i = 0; i < id.length; i++) {
    if (id[i] > max) {
      max = id[i]
    }
  }
  return max + 1
})
const author = computed(() => {
  return userInfo.value.userInfo[0]?.uname
})
const detail = ref('')
const coevr = computed(() => {
  return fileList.value[0]?.url
})

const cancelClick = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  drawer.value = false
}
const confirmClick = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data: IpublicBlog = {
        blog_id: blog_id.value,
        author: author.value,
        cover: coevr.value,
        detail: detail.value,
        title: ruleForm.title,
        summary: ruleForm.summary,
        tag: ruleForm.value as []
      }
      publidBlogInfo(data)
        .then((res) => {
          drawer.value = false
          detail.value = ''
          ElMessage({
            message: '发布成功！',
            type: 'success',
            duration: 1000
          })
          setTimeout(() => {
            sessionStorage.setItem('path', '/bloglist')
            router.push('/bloglist')
          }, 1000)
        })
        .catch((err) => {
          ElMessage({
            message: '发布失败！',
            type: 'warning'
          })
        })
    } else {
      ElMessage({
        message: '发布失败！',
        type: 'warning'
      })
    }
  })
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<style scoped lang="less">
.addBlog {
  padding: 20px;
  .header {
    padding-bottom: 20px;
    .button {
      position: absolute;
      right: 60px;
      top: 15px;
    }
  }
}
</style>
