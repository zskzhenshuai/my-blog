import { cookies } from 'next/headers'

interface ICookieInfo {
  userId: string
  nickname: string
  avatar: string
}

export const setCookies = ({ userId, nickname, avatar }: ICookieInfo) => {
  cookies().set('userId', userId)
  cookies().set('nickname', nickname)
  cookies().set('avatar', avatar)
}
