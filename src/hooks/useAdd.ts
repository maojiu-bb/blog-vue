import { useRouter } from 'vue-router'
import { ref, reactive, computed } from 'vue'
import { IpublicBlog } from '@/types/blog'
import { Iavatar } from '@/types/user'
import { useBlog } from '@/hooks/useBlog'
import { useUser } from '@/hooks/useUser'
import { useProject } from '@/hooks/useProject'
import { Iproject } from '@/types/project'
import {
  ElMessage,
  FormInstance,
  FormRules,
  UploadProps,
  UploadUserFile
} from 'element-plus'

export const useAdd = () => {
  const router = useRouter()
  const { tag, blog_id, publidBlogInfo } = useBlog()
  const { avatar, uname, desc1, desc2, updateUserAvatar, updateUserInfo } =
    useUser()
  const { project_id, publicProjectInfo } = useProject()
  const fileList = ref<UploadUserFile[]>([])
  const ruleFormRef1 = ref<FormInstance>()
  const ruleFormRef2 = ref<FormInstance>()
  const ruleFormRef3 = ref<FormInstance>()
  const detail = ref('')
  const drawer = ref(false)
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const dialogTableVisible = ref(false)
  const formSize = ref('default')
  const ruleForm1 = reactive({
    title: '',
    summary: '',
    value: []
  })
  const ruleForm2 = reactive({
    name: '',
    address: '',
    desc: ''
  })
  const ruleForm3 = reactive({
    uname: uname.value,
    desc1: desc1.value,
    desc2: desc2.value
  })
  const rules1 = reactive<FormRules>({
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
      {
        min: 5,
        max: 100,
        message: 'Length should be 5 to 100',
        trigger: 'blur'
      }
    ],
    value: [{ required: true, message: 'Please select Tag', trigger: 'change' }]
  })
  const rules2 = reactive<FormRules>({
    name: [
      { required: true, message: 'Please input Project name', trigger: 'blur' },
      { min: 3, max: 25, message: 'Length should be 3 to 25', trigger: 'blur' }
    ],
    address: [
      {
        required: true,
        message: 'Please input Project address',
        trigger: 'blur'
      }
    ],
    desc: [
      { required: true, message: 'Please input Project info', trigger: 'blur' }
    ]
  })
  const rules3 = reactive<FormRules>({
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
  const coevr = computed(() => {
    return fileList.value[0]?.url
  })
  const showDialog = () => {
    dialogTableVisible.value = true
  }
  const addBlog = () => {
    drawer.value = true
    ruleForm1.title = ''
    ruleForm1.summary = ''
    ruleForm1.value = []
    fileList.value = []
  }
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
          author: uname.value,
          cover: coevr.value,
          detail: detail.value,
          title: ruleForm1.title,
          summary: ruleForm1.summary,
          tag: ruleForm1.value as []
        }
        publidBlogInfo(data)
          .then((res: any) => {
            drawer.value = false
            detail.value = ''
            ElMessage({
              message: 'publice success!',
              type: 'success',
              duration: 1000
            })
            setTimeout(() => {
              sessionStorage.setItem('path', '/bloglist')
              router.push('/bloglist')
            }, 1000)
          })
          .catch((err: any) => {
            ElMessage({
              message: 'public fail!',
              type: 'warning'
            })
          })
      } else {
        ElMessage({
          message: 'public fail!',
          type: 'warning'
        })
      }
    })
  }
  const submitForm3 = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        updateUserInfo(ruleForm3)
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
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        const data: Iproject = {
          project_id: project_id.value,
          project_name: ruleForm2.name,
          github_address: ruleForm2.address,
          project_info: ruleForm2.desc,
          project_cover: fileList.value.map((item) => item.url) as []
        }
        publicProjectInfo(data)
          .then((res: any) => {
            ruleForm2.name = ''
            ruleForm2.address = ''
            ruleForm2.desc = ''
            fileList.value = []
            ElMessage({
              message: 'publice project success!',
              type: 'success',
              duration: 1000
            })
            setTimeout(() => {
              sessionStorage.setItem('path', '/project')
              router.push('/project')
            }, 1000)
          })
          .catch((err: any) => {
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
  const resetForm3 = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    fileList.value = []
  }
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
  }
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }

  return {
    tag,
    detail,
    avatar,
    drawer,
    rules1,
    rules2,
    rules3,
    ruleForm1,
    ruleForm2,
    ruleForm3,
    ruleFormRef1,
    ruleFormRef2,
    ruleFormRef3,
    fileList,
    formSize,
    dialogVisible,
    dialogImageUrl,
    dialogTableVisible,
    submitForm3,
    resetForm3,
    cancel,
    confirm,
    showDialog,
    submitForm,
    resetForm,
    addBlog,
    handleRemove,
    handlePictureCardPreview,
    cancelClick,
    confirmClick
  }
}
