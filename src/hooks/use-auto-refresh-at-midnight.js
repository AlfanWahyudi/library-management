'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function useAutoRefreshAtMidnight() {
  const router = useRouter()

  useEffect(() => {
    const now = new Date()

    const nextMidnight = new Date()
    nextMidnight.setHours(24, 0, 0, 0)

    const timeout = nextMidnight.getTime() - now.getTime()

    const timer = setTimeout(() => {
      router.refresh()
    }, timeout)

    return () => clearTimeout(timer)

  }, [router])

  return null
}