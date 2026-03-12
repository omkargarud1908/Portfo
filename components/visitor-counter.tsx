"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"

function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart || end === 0) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, shouldStart])

  return count
}

export function VisitorCounter() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null)
  const [hasIncremented, setHasIncremented] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  // Fetch and increment visitor count using Redis
  useEffect(() => {
    const sessionKey = "portfolio_visited"
    const hasVisited = sessionStorage.getItem(sessionKey)

    if (!hasVisited && !hasIncremented) {
      // New visitor - increment count
      fetch("/api/visitor", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          setTotalVisitors(data.totalVisitors)
          sessionStorage.setItem(sessionKey, "true")
          setHasIncremented(true)
        })
        .catch(() => setTotalVisitors(1))
    } else {
      // Returning visitor - just get count
      fetch("/api/visitor")
        .then((res) => res.json())
        .then((data) => setTotalVisitors(data.totalVisitors))
        .catch(() => setTotalVisitors(1))
    }
  }, [hasIncremented])

  const animatedCount = useCountUp(totalVisitors || 0, 2500, hasAnimated && totalVisitors !== null)

  return (
    <section ref={ref} className="py-16 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Stats Card */}
          <div className="flex items-center justify-center">
            <div
              className={cn(
                "group text-center p-8 rounded-2xl bg-card border border-border",
                "hover:border-primary/30 transition-all duration-300",
                "hover:shadow-lg hover:shadow-primary/5",
                "min-w-[280px]"
              )}
            >
              <div className={cn(
                "inline-flex p-4 rounded-xl mb-4 transition-all duration-300",
                "bg-primary/10 group-hover:bg-primary/20"
              )}>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2 tabular-nums gradient-text">
                {totalVisitors === null ? (
                  <span className="inline-block w-24 h-12 bg-muted animate-pulse rounded" />
                ) : (
                  animatedCount.toLocaleString()
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Visitors
              </div>

              {/* Live Indicator */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span>Live count</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
