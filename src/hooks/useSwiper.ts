import { swiperStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export const useSwiper = () => {
  const s_store = swiperStore()
  const { swiper } = storeToRefs(s_store)
  const swiperList = computed(() => {
    return swiper.value.swiper
  })

  return {
    swiperList
  }
}
