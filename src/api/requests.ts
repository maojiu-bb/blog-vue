import request from '.'
import { Iavatar, Iuserinfo } from '@/types/user'
import { IpublicBlog, Tstar, Tview } from '@/types/blog'
import { Iproject } from '@/types/project'

// 获取用户信息
export const getUserInfo = () =>
  request({
    url: '/user',
    method: 'GET'
  })
// 获取轮播图
export const getSwiper = () =>
  request({
    url: '/swiper',
    method: 'GET'
  })
// 获取排序blog
export const getSortBlog = () =>
  request({
    url: '/blogsSort',
    method: 'GET'
  })
// 获取blog列表
export const getBlog = () =>
  request({
    url: '/blogs',
    method: 'GET'
  })
// 获取blog详情
export const getBlogDetail = (blog_id: number) =>
  request({
    url: `/blogDetail?blog_id=${blog_id}`,
    method: 'GET'
  })
// 更换用户头像
export const updateAvatar = (params: Iavatar) =>
  request({
    url: '/updateAvatar',
    method: 'POST',
    data: params
  })
// 更换用户信息
export const updateInfo = (params: Iuserinfo) =>
  request({
    url: '/updateUserInfo',
    method: 'POST',
    data: params
  })
// 发布blog
export const publicBlog = (params: IpublicBlog) =>
  request({
    url: '/publicBlog',
    method: 'POST',
    data: params
  })
// 获取tag列表
export const getTags = () =>
  request({
    url: '/tags',
    method: 'GET'
  })
// 获取模糊列表
export const getObscureBlogs = (keyword: string) =>
  request({
    url: `/blogsObscure?keyword=${keyword}`,
    method: 'GET'
  })
// 发布项目
export const publicProject = (params: Iproject) =>
  request({
    url: '/publicProject',
    method: 'POST',
    data: params
  })
// 获取项目
export const getProject = () =>
  request({
    url: '/projects',
    method: 'GET'
  })
// 更新view
export const updateView = (params: Tview) =>
  request({
    url: '/updateView',
    method: 'POST',
    data: params
  })
// 更新star
export const updateStar = (params: Tstar) =>
  request({
    url: '/updateStar',
    method: 'POST',
    data: params
  })
