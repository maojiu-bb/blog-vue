export interface Iuser {
  uid: number
  uname: string
  avatar: string
  desc1: string
  desc2: string
}

export interface Iavatar {
  avatar: string
}

export interface Iuserinfo {
  uname: string
  desc1: string
  desc2: string
}

export class User {
  userInfo: Iuser[] = []
}
