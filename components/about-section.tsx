"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { GraduationCap, MapPin, Calendar, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Years Learning", value: "4+", icon: Calendar },
  { label: "Projects Completed", value: "10+", icon: Code2 },
  { label: "Technologies", value: "15+", icon: Code2 },
  { label: "SGPA (MCA)", value: "9.75", icon: GraduationCap },
]

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.2 })

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 lg:py-32 relative"
    >
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
              Get to know me
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image/Visual */}
            <div
              className={cn(
                "relative transition-all duration-700 delay-200",
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl" />
                <div className="absolute inset-4 glass rounded-xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary-foreground">OG</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Omkar Garud</h3>
                    <p className="text-muted-foreground flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Mumbai, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div
              className={cn(
                "transition-all duration-700 delay-300",
                isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              )}
            >
              <h3 className="text-2xl font-bold mb-4">
                Aspiring Backend Developer & MCA Student
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm currently pursuing my <span className="text-foreground font-medium">Master of Computer Applications (MCA)</span> at 
                  VESIT, Mumbai University with an impressive SGPA of 9.75. My journey in tech started with a 
                  BCA from Abasaheb Garware College, Pune, where I graduated with a CGPA of 8.81.
                </p>
                
                <p>
                  I'm passionate about building <span className="text-foreground font-medium">clean, efficient code</span> and 
                  creating real-world solutions. My expertise spans across multiple technologies including 
                  Java, Python, PHP, JSP, MySQL, PostgreSQL, and the MERN stack.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or diving deep into system design concepts.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300",
                      "hover:scale-105 cursor-default",
                      "border border-border hover:border-primary/50"
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
