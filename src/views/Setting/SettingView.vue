<template>
  <div class="setting">
    <el-page-header @back="goBack" :icon="ArrowLeft" class="header">
      <template #content>
        <span class="text-large font-600 mr-3">Setting Info</span>
      </template>
    </el-page-header>
    <el-card shadow="always" class="card">
      <!-- 设置头像 -->
      <div class="avatar">
        <img :src="user?.avatar" alt="" />
        <el-button type="primary" class="button" @click="showDialog"
          >Change Avatar</el-button
        >
        <el-dialog
          v-model="dialogTableVisible"
          title="Change Avatar"
          width="400px"
        >
          <el-upload
            v-model:file-list="fileList"
            :auto-upload="false"
            action="#"
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
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancel">Cancel</el-button>
              <el-button type="primary" @click="confirm"> Confirm </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="info">
        <el-form
          ref="ruleFormRef"
          label-position="top"
          label-width="100px"
          :model="ruleForm"
          style="max-width: 460px"
          :rules="rules"
        >
          <el-form-item label="Name" prop="uname">
            <el-input v-model="ruleForm.uname" />
          </el-form-item>
          <el-form-item label="Desc1" prop="desc1">
            <el-input v-model="ruleForm.desc1"></el-input>
          </el-form-item>
          <el-form-item label="Desc2" prop="desc2">
            <el-input v-model="ruleForm.desc2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Change
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft, Plus } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import { userStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import type {
  UploadProps,
  UploadUserFile,
  FormInstance,
  FormRules
} from 'element-plus'
import { Iavatar } from '@/types/user'

const u_store = userStore()
const { userInfo } = storeToRefs(u_store)
const { updateUserAvatar, updateUserInfo } = u_store
const user = computed(() => {
  return userInfo.value.userInfo[0]
})

const dialogTableVisible = ref(false)
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const ruleForm = reactive({
  uname: user.value?.uname,
  desc1: user.value?.desc1,
  desc2: user.value?.desc2
})
const fileList = ref<UploadUserFile[]>([])
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  uname: [
    { required: true, message: 'Please input Name', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
  ],
  desc1: [
    { required: true, message: 'Please input Description ', trigger: 'blur' }
  ],
  desc2: [
    { required: true, message: 'Please input Description ', trigger: 'blur' }
  ]
})

const cancel = () => {
  dialogVisible.value = false
  dialogTableVisible.value = false
  fileList.value = []
}
const confirm = () => {
  dialogVisible.value = false
  const url = fileList.value[0]?.url
  const data: Iavatar = {
    avatar: url!
  }
  updateUserAvatar(data)
    .then((res) => {
      dialogTableVisible.value = false
      fileList.value = []
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const showDialog = () => {
  dialogTableVisible.value = true
}
/* const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
} */

const router = useRouter()
const goBack = () => {
  router.back()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateUserInfo(ruleForm)
        .then((res) => {
          ElMessage({
            message: 'Change info success!',
            type: 'success'
          })
        })
        .catch((err) => {
          ElMessage({
            message: 'Change info fail!',
            type: 'warning'
          })
        })
    } else {
      ElMessage({
        message: 'Change info fail!',
        type: 'warning'
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="less">
@import '@/style/setting.less';
</style>
