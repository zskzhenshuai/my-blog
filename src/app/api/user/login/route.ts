import { db } from '@/db/db'
import { getIronSession } from 'iron-session'
import { ISession } from '../..'
import { cookies } from 'next/headers'
import { ironOptions } from '@/config'
import { setCookies } from '@/utils'

export async function POST(request: Request, response: Response) {
  const body = await request.json()
  const { phone, verify, identity_type } = body

  const session: ISession = await getIronSession(cookies() as any, ironOptions)

  if (session.verifyCode?.toString() === verify?.toString()) {
    const userAuth = await db.user_auths.findFirst({
      where: {
        identity_type: identity_type,
      },
      include: {
        user: true,
      },
    })

    if (userAuth) {
      const { id, nickname, avatar } = userAuth?.user
      session.userId = id
      session.nickname = nickname
      session.avatar = avatar
      await session.save()
      setCookies({ nickname, avatar: avatar as string, userId: id.toString() })
    } else {
      const user = await db.user.create({
        data: {
          nickname: `用户${Math.floor(Math.random() * 10000)}`,
          avatar: '/next.svg',
          job: 'fe',
          introduce: 'todo',
        },
      })

      await db.user_auths.create({
        data: {
          identifier: phone,
          identity_type: identity_type,
          credential: session.verifyCode.toString(),
          user_id: user.id,
        },
      })
      const { id, nickname, avatar } = user
      session.userId = id
      session.nickname = nickname
      session.avatar = avatar
      await session.save()
      setCookies({ nickname, avatar: avatar as string, userId: id.toString() })
    }

    return Response.json({
      code: 0,
      msg: '登录成功',
      data: {
        userId: session.userId,
        nickname: session.nickname,
        avatar: session.avatar,
      },
    })
  } else {
    return Response.json({
      code: -1,
      msg: '验证码错误',
    })
  }
}
