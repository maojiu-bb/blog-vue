import { defineStore } from 'pinia'
import { Swiper } from '@/types/swiper'
import { getSwiper } from '@/api/requests'
import { reactive } from 'vue'

export const swiperStore = defineStore('swiper', () => {
  const swiper = reactive(new Swiper())
  const getSwiperList = async () => {
    const { data: res } = await getSwiper()
    if (res.code === 200) {
      swiper.swiper = res.data
    }
  }
  getSwiperList()

  return {
    swiper
  }
})
