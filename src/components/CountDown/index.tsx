import { useEffect, useState } from 'react'
interface IProps {
  time: number
  onEnd: () => void
}
const CountDown = (props: IProps) => {
  const { time, onEnd } = props
  const [count, setCount] = useState(time)
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          onEnd()
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [time])

  return <div className="text-gray-500">{count}</div>
}

export default CountDown
