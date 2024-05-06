import { getIronSession } from 'iron-session'
import { ISession } from '../..'
import { cookies } from 'next/headers'
import { ironOptions } from '@/config'

export async function POST() {
  cookies().delete('userId')
  cookies().delete('avatar')
  cookies().delete('nickname')
  const session: ISession = await getIronSession(cookies() as any, ironOptions)
  await session.destroy()
  return Response.json({
    code: 0,
    msg: '退出成功',
  })
}
