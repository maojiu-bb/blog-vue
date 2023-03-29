import { defineStore } from 'pinia'
import { Blog, IpublicBlog, Itag, Tstar, Tview } from '@/types/blog'
import {
  getBlog,
  getSortBlog,
  getBlogDetail,
  publicBlog,
  getTags,
  getObscureBlogs,
  updateView,
  updateStar
} from '@/api/requests'
import { reactive, ref } from 'vue'

export const blogStore = defineStore('blog', () => {
  const sortBlog = reactive(new Blog())
  const getSortBlogList = async () => {
    const { data: res } = await getSortBlog()
    if (res.code === 200) {
      sortBlog.blog = res.data
    }
  }
  getSortBlogList()

  const blog = reactive(new Blog())
  const getBlogList = async () => {
    const { data: res } = await getBlog()
    if (res.code === 200) {
      blog.blog = res.data
    }
  }
  getBlogList()

  const blogDetail = reactive(new Blog())
  const getBlogInfo = async (blog_id: number) => {
    const { data: res } = await getBlogDetail(blog_id)
    if (res.code === 200) {
      blogDetail.blog = res.data
    }
  }

  const publidBlogInfo = async (data: IpublicBlog) => {
    const { data: res } = await publicBlog(data)
    if (res.code === 200) {
      getBlogList()
    }
  }

  let tags = ref<Itag>()
  const getTagList = async () => {
    const { data: res } = await getTags()
    if (res.code === 200) {
      tags.value = res.data
    }
  }
  getTagList()

  const obscureBlog = reactive(new Blog())
  const getObscureBlogList = async (keyword: string) => {
    const { data: res } = await getObscureBlogs(keyword)
    if (res.code === 200) {
      obscureBlog.blog = res.data
    }
  }

  const updateViewCount = async (data: Tview) => {
    const { data: res } = await updateView(data)
    if (res.code === 200) {
      getBlogList()
      getSortBlogList()
    }
  }

  const updateStarCount = async (data: Tstar) => {
    const { data: res } = await updateStar(data)
    if (res.code === 200) {
      getBlogList()
      getSortBlogList()
    }
  }

  return {
    sortBlog,
    blog,
    blogDetail,
    tags,
    obscureBlog,
    getBlogInfo,
    publidBlogInfo,
    getObscureBlogList,
    updateViewCount,
    updateStarCount
  }
})
