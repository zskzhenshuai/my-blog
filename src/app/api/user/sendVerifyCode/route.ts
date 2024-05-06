import { format } from 'date-fns'
import md5 from 'md5'
import { encode } from 'js-base64'
import instance from '@/service/fetch'
import { getIronSession } from 'iron-session'
import { ironOptions } from '@/config'
import { ISession } from '../..'
import { cookies } from 'next/headers'

export async function POST(request: Request & ISession, response: Response) {
  const session: ISession = await getIronSession(cookies() as any, ironOptions)
  const body = await request.json()
  const { to, templateId } = body
  const accountId = '2c94811c8cd4da0a018f344a2537798f'
  const appId = '2c94811c8cd4da0a018f344a26ce7996'
  const authToken = '14d021e244794fe792d73126f181c6d6'
  const nowDate = format(new Date(), 'yyyyMMddHHmmss')
  const sigParameter = md5(`${accountId}${authToken}${nowDate}`)
  const authorization = encode(`${accountId}:${nowDate}`)
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000
  const expireMinute = '5'
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${accountId}/SMS/TemplateSMS?sig=${sigParameter}`
  session.verifyCode = verifyCode
  request.session = session
  await session.save(verifyCode)
  console.log(verifyCode)
  const res: any = await instance.post(
    url,
    {
      to,
      appId,
      templateId,
      datas: [verifyCode, expireMinute],
    },
    {
      headers: {
        Authorization: authorization,
      },
    }
  )

  if (res.statusCode === '000000') {
    return Response.json({
      code: 0,
      msg: res.statusMsg,
      data: {},
    })
  } else {
    return Response.json({
      code: res.statusCode,
      msg: res.statusMsg || '未知错误',
    })
  }
}
