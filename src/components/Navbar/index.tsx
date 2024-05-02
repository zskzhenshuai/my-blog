'use client'
import { navs } from './config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useState } from 'react'
import Login from '../Login'

export default function Navbar() {
  const pathname = usePathname()
  const [isShow, setIsShow] = useState(false)

  function handleLogin() {
    setIsShow(true)
  }
  function handleClose() {
    setIsShow(false)
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
      <section className="ml-36">
        <Button variant="outline" className="mr-4">
          写文章
        </Button>
        <Button onClick={handleLogin}>登录</Button>
      </section>
      <Login isShow={isShow} onClose={handleClose} />
    </div>
  )
}
