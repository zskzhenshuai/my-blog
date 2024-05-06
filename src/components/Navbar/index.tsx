'use client'
import { navs } from './config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { observer } from 'mobx-react-lite'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useState } from 'react'
import Login from '../Login'
import { useStore } from '@/store'
import { User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import request from '@/service/fetch'

function Navbar() {
  const store = useStore()
  const { userId, avatar } = store.user.userInfo
  const pathname = usePathname()
  const [isShow, setIsShow] = useState(false)

  function handleLogin() {
    setIsShow(true)
  }
  function handleClose() {
    setIsShow(false)
  }

  async function handleLogout() {
    const res = await request.post('/api/user/logout')
  }

  return (
    <div className="h-[60px] border-b bg-white border-gray-50 flex items-center justify-center">
      <section className="text-3xl font-semibold mr-[60px]">BLOG</section>
      <section>
        {navs?.map((item) => (
          <Link
            key={item.label}
            href={item.value}
            className={cn(
              'text-lg px-9',
              pathname === item.value ? 'text-blue-500' : ''
            )}
          >
            {item.label}
          </Link>
        ))}
      </section>
      <section className="ml-36 flex items-center">
        <Button variant="outline" className="mr-4">
          写文章
        </Button>
        {userId ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <User className="w-6 h-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>写文章</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={handleLogin}>登录</Button>
        )}
      </section>
      <Login isShow={isShow} onClose={handleClose} />
    </div>
  )
}

export default observer(Navbar)
