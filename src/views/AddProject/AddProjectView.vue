<template>
  <div class="addProject">
    <GoBackCom title="Add a Project"></GoBackCom>
    <el-card class="card">
      <el-form
        ref="ruleFormRef2"
        :model="ruleForm2"
        :rules="rules2"
        label-width="120px"
        class="demo-ruleForm"
        :size:string="formSize"
        status-icon
      >
        <el-form-item label="ProjectName" prop="name">
          <el-input v-model="ruleForm2.name" />
        </el-form-item>
        <el-form-item label="GithubAddress " prop="address">
          <el-input v-model="ruleForm2.address" />
        </el-form-item>
        <el-form-item label="ProjectInfo" prop="desc">
          <el-input v-model="ruleForm2.desc" type="textarea" />
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
          <el-button type="primary" @click="submitForm(ruleFormRef2)">
            Create
          </el-button>
          <el-button @click="resetForm(ruleFormRef2)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import GoBackCom from '@/components/GoBack/GoBackCom.vue'
import { useAdd } from '@/hooks/useAdd'
const {
  ruleForm2,
  rules2,
  formSize,
  fileList,
  handlePictureCardPreview,
  handleRemove,
  dialogVisible,
  dialogImageUrl,
  submitForm,
  ruleFormRef2,
  resetForm
} = useAdd()
</script>

<style scoped lang="less">
@import '@/style/addproject.less';
</style>
