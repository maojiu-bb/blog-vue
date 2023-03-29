import { computed } from 'vue'
import { blogStore } from '@/store'
import { storeToRefs } from 'pinia'

export const useBlog = () => {
  const b_store = blogStore()
  const { blog, tags, obscureBlog, sortBlog } = storeToRefs(b_store)
  const { publidBlogInfo, getObscureBlogList } = b_store
  const sortBlogList = computed(() => {
    return sortBlog.value.blog.slice(0, 8)
  })
  const blogList = computed(() => {
    return blog.value.blog
  })
  const obscureBlogList = computed(() => {
    return obscureBlog.value.blog
  })
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

  return {
    sortBlogList,
    blogList,
    blog,
    tag,
    blog_id,
    obscureBlog,
    obscureBlogList,
    publidBlogInfo,
    getObscureBlogList
  }
}
