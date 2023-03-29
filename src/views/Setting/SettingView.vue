<template>
  <div class="setting">
    <GoBackCom title="Setting Info"></GoBackCom>
    <el-card shadow="always" class="card">
      <!-- 设置头像 -->
      <div class="avatar">
        <img :src="avatar" alt="" />
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
          ref="ruleFormRef3"
          label-position="top"
          label-width="100px"
          :model="ruleForm3"
          style="max-width: 460px"
          :rules="rules3"
        >
          <el-form-item label="Name" prop="uname">
            <el-input v-model="ruleForm3.uname" />
          </el-form-item>
          <el-form-item label="Desc1" prop="desc1">
            <el-input v-model="ruleForm3.desc1"></el-input>
          </el-form-item>
          <el-form-item label="Desc2" prop="desc2">
            <el-input v-model="ruleForm3.desc2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm3(ruleFormRef3)">
              Change
            </el-button>
            <el-button @click="resetForm3(ruleFormRef3)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import GoBackCom from '@/components/GoBack/GoBackCom.vue'
import { Plus } from '@element-plus/icons-vue'
import { useAdd } from '@/hooks/useAdd'
const {
  avatar,
  showDialog,
  dialogTableVisible,
  fileList,
  handlePictureCardPreview,
  handleRemove,
  dialogImageUrl,
  dialogVisible,
  cancel,
  confirm,
  ruleForm3,
  ruleFormRef3,
  rules3,
  submitForm3,
  resetForm3
} = useAdd()
</script>

<style scoped lang="less">
@import '@/style/setting.less';
</style>
