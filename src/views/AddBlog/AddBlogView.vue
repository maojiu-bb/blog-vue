<template>
  <div class="addBlog">
    <GoBackCom title="Add a Blog">
      <template #button>
        <el-button type="primary" class="button" :icon="Edit" @click="addBlog"
          >Add Blog</el-button
        >
      </template>
    </GoBackCom>
    <el-drawer v-model="drawer" direction="rtl">
      <template #header>
        <h4>finish follow options</h4>
      </template>
      <template #default>
        <el-form
          ref="ruleFormRef1"
          label-position="top"
          label-width="100px"
          :model="ruleForm1"
          style="max-width: 460px"
          :rules="rules1"
        >
          <el-form-item label="Title" prop="title">
            <el-input v-model="ruleForm1.title" />
          </el-form-item>
          <el-form-item label="Tag" prop="value">
            <el-select
              v-model="ruleForm1.value"
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
            <el-input type="textarea" v-model="ruleForm1.summary" />
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
          <el-button @click="cancelClick(ruleFormRef1)">cancel</el-button>
          <el-button type="primary" @click="confirmClick(ruleFormRef1)"
            >confirm</el-button
          >
        </div>
      </template>
    </el-drawer>
    <v-md-editor v-model="detail" height="85vh" class="markdown"></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { Edit, Plus } from '@element-plus/icons-vue'
import GoBackCom from '@/components/GoBack/GoBackCom.vue'
import { useAdd } from '@/hooks/useAdd'
const {
  ruleForm1,
  rules1,
  drawer,
  tag,
  detail,
  dialogVisible,
  dialogImageUrl,
  fileList,
  addBlog,
  handleRemove,
  handlePictureCardPreview,
  cancelClick,
  confirmClick,
  ruleFormRef1
} = useAdd()
</script>

<style scoped lang="less">
@import '@/style/addblog.less';
</style>
