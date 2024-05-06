'use client'
import { useState, ChangeEvent } from 'react'
import CountDown from '../CountDown'
import { useToast } from '@/components/ui/use-toast'
import request from '@/service/fetch'
import { useStore } from '@/store'

interface IProps {
  isShow: boolean
  onClose: () => void
}
const Login = (props: IProps) => {
  const { toast } = useToast()
  const store = useStore()
  const { isShow, onClose } = props
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  })
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false)

  function handleClose() {
    onClose()
  }
  async function handleGetVerifyCode() {
    if (!form.phone) {
      return toast({
        description: '请输入手机号',
      })
    }

    const res: any = await request.post('/api/user/sendVerifyCode', {
      to: form.phone,
      templateId: 1,
    })
    if (res.code !== 0) {
      return toast({
        description: res.msg || '请输入手机号',
      })
    }

    setIsShowVerifyCode(true)
  }
  async function handleLogin() {
    if (!form.phone || !form.verify)
      return toast({
        description: '请输入信息',
      })
    const res: any = await request.post('/api/user/login', {
      ...form,
      identity_type: 'phone',
    })
    if (res.code !== 0) {
      toast({
        description: res.msg || '',
      })
    } else {
      store.user.setUserInfo(res?.data)
      console.log(store)
      toast({
        description: res.msg || '成功',
      })
      onClose()
    }
  }
  function handleOAuthGithub() {}
  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }
  function handleCountDownEnd() {
    setIsShowVerifyCode(false)
  }

  return (
    isShow && (
      <div className="fixed z-50 w-[100vw] h-[100vh] top-0 left-0 right-0 bottom-0 bg-black-alpha-30">
        <div className="w-[320px] h-[320px] bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-5 rounded">
          <div className="text-xl font-semibold flex items-center justify-between mb-3">
            <div className="">手机号登录</div>
            <div
              onClick={handleClose}
              className="text-[#888] cursor-pointer float-right"
            >
              X
            </div>
          </div>
          <input
            name="phone"
            type="text"
            value={form.phone}
            placeholder="请输入手机"
            className="w-[100%] h-10 mb-2 rounded border border-solid border-gray-200 p-3 outline-none"
            onChange={handleFormChange}
          />
          <div className="relative cursor-pointer">
            <input
              name="verify"
              type="text"
              value={form.verify}
              placeholder="请输入验证码"
              className="w-[100%] h-10 mb-2 rounded border border-solid border-gray-200 p-3 outline-none"
              onChange={handleFormChange}
            />
            <span
              className="text-[#1e80ff] absolute right-3 top-3 text-sm"
              onClick={handleGetVerifyCode}
            >
              {isShowVerifyCode ? (
                <CountDown time={10} onEnd={handleCountDownEnd} />
              ) : (
                '获取验证码'
              )}
            </span>
          </div>
          <div
            onClick={handleLogin}
            className="h-[40px] leading-10 rounded-md mt-4 bg-[#1e80ff] text-white text-center cursor-pointer"
          >
            登录
          </div>
          <div
            className="mt-4 text-sm cursor-pointer text-[#1e80ff] "
            onClick={handleOAuthGithub}
          >
            使用github登录
          </div>
          <div className="mt-3 text-[#333] text-sm">
            注册登录即表示同意
            <a
              className="text-[#1e80ff]"
              href="https://www.baidu.com"
              target="_blank"
            >
              隐私政策
            </a>
          </div>
        </div>
      </div>
    )
  )
}

export default Login
