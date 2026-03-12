"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Trophy, Medal, Star, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const achievements = [
  {
    title: "VERSION25 - National Level Competition",
    organization: "NIT Trichy",
    description: "Finalist and Runner-up representing VESIT at the prestigious national level technical competition",
    icon: Trophy,
    highlight: "Runner-up",
    type: "competition",
  },
  {
    title: "Prakalp Winner",
    organization: "VESIT",
    description: "Awarded for outstanding project performance in MCA Batch 2024-2026",
    icon: Medal,
    highlight: "Winner",
    type: "award",
  },
]

export function AchievementsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="achievements" ref={ref} className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-2 text-sm tracking-wider uppercase">
              Recognition
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gradient-text">Achievements</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-card border border-border",
                  "hover:border-primary/50 transition-all duration-500",
                  "hover:shadow-2xl hover:shadow-primary/10",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 200 + 200}ms` }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Floating Sparkles */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-50">
                  <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                </div>

                <div className="relative p-8">
                  {/* Icon & Highlight */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                      "p-4 rounded-2xl transition-all duration-300",
                      "bg-gradient-to-br from-primary/20 to-primary/5",
                      "group-hover:from-primary/30 group-hover:to-primary/10"
                    )}>
                      <achievement.icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-sm font-bold",
                      "bg-gradient-to-r from-primary to-accent text-primary-foreground",
                      "shadow-lg shadow-primary/20"
                    )}>
                      {achievement.highlight}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-primary/80 font-medium mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    {achievement.organization}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
