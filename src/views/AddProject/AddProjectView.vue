<template>
  <div class="addProject">
    <el-page-header @back="goBack" :icon="ArrowLeft" class="header">
      <template #content>
        <span class="text-large font-600 mr-3">Add a Project</span>
      </template>
    </el-page-header>
    <el-card class="card">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size:string="formSize"
        status-icon
      >
        <el-form-item label="ProjectName" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="GithubAddress " prop="address">
          <el-input v-model="ruleForm.address" />
        </el-form-item>
        <el-form-item label="ProjectInfo" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="Choose cover">
          <el-upload
            v-model:file-list="fileList"
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Create
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft, Plus } from '@element-plus/icons-vue'
import { reactive, ref, computed } from 'vue'
import { projectStore } from '@/store'
import { storeToRefs } from 'pinia'
import { Iproject } from '@/types/project'
import {
  ElMessage,
  FormInstance,
  FormRules,
  UploadProps,
  UploadUserFile
} from 'element-plus'

const router = useRouter()
const goBack = () => {
  router.back()
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  address: '',
  desc: ''
})

const fileList = ref<UploadUserFile[]>([])

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Project name', trigger: 'blur' },
    { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'blur' }
  ],
  address: [
    { required: true, message: 'Please input Project address', trigger: 'blur' }
  ],
  desc: [
    { required: true, message: 'Please input Project info', trigger: 'blur' }
  ]
})

const p_store = projectStore()
const { project } = storeToRefs(p_store)
const { publicProjectInfo } = p_store
const project_id = computed(() => {
  let id = project.value.project.map((item) => item.project_id)
  let max_id = id[0]
  for (let i = 0; i < id.length; i++) {
    if (id[i] > max_id) {
      max_id = id[i]
    }
  }
  return (max_id += 1)
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data: Iproject = {
        project_id: project_id.value,
        project_name: ruleForm.name,
        github_address: ruleForm.address,
        project_info: ruleForm.desc,
        project_cover: fileList.value.map((item) => item.url) as []
      }
      publicProjectInfo(data)
        .then((res) => {
          ruleForm.name = ''
          ruleForm.address = ''
          ruleForm.desc = ''
          fileList.value = []
          ElMessage({
            message: 'publice project success!',
            type: 'success',
            duration: 1000
          })
          setTimeout(() => {
            router.push('/project')
          }, 1000)
        })
        .catch((err) => {
          ElMessage({
            message: 'publice project fail!',
            type: 'warning'
          })
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  fileList.value = []
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<style scoped lang="less">
.addProject {
  padding: 20px;
  .card {
    margin: 50px auto 0;
    width: 1200px;
  }
}
</style>
