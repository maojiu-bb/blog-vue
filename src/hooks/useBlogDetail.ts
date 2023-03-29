import { useRoute } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import { useBlog } from '@/hooks/useBlog'

export const useBlogDetail = () => {
  const route = useRoute()
  const { blog_id } = route.query
  const id = Number(blog_id)
  const { getBlogInfo, blogInfo, updateViewCount, updateStarCount } = useBlog()

  const newView = computed(() => {
    return blogInfo.value.view + 1
  })

  const addStar = computed(() => {
    return blogInfo.value.star + 1
  })
  const reduceStar = computed(() => {
    return blogInfo.value.star - 1
  })

  const getBlogDetail = () => {
    getBlogInfo(id)
      .then((res) => {
        updateViewCount({ blog_id: id, newView: newView.value })
        return Promise.resolve('ok')
      })
      .catch((err) => {
        return Promise.reject(new Error('fail'))
      })
  }

  onMounted(() => {
    getBlogDetail()
  })

  let flag = ref(false)
  const changeStar = () => {
    if (flag.value === false) {
      updateStarCount({ blog_id: id, newStar: addStar.value })
        .then((res) => {
          getBlogDetail()
          flag.value = true
          return Promise.resolve('ok')
        })
        .catch((err) => {
          return Promise.reject(new Error('fail'))
        })
    } else {
      updateStarCount({ blog_id: id, newStar: reduceStar.value })
        .then((res) => {
          getBlogDetail()
          flag.value = false
          return Promise.resolve('ok')
        })
        .catch((err) => {
          return Promise.reject(new Error('fial'))
        })
    }
  }

  return {
    blogInfo,
    changeStar
  }
}
