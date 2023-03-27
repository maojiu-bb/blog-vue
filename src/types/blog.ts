export interface Iblog {
  blog_id: number
  author: string
  public_date: string
  view: number
  comment_count: number
  star: number
  tag: []
  title: string
  summary: string
  comments: []
  cover: string
  detail: string
}

export interface IpublicBlog {
  blog_id: number
  author: string
  tag: []
  title: string
  summary: string
  cover: string | undefined
  detail: string
}

export type Itag = []

export class Blog {
  blog: Iblog[] = []
}
