"use client"

import { useRef, useState, useEffect } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 80 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Java", level: 90 },
      { name: "Python", level: 85 },
      { name: "PHP", level: 80 },
      { name: "Node.js", level: 75 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Neon", level: 70 },
    ],
  },
  {
    title: "Power Platform & Tools",
    skills: [
      { name: "Power Apps", level: 85 },
      { name: "Power Automate", level: 85 },
      { name: "SharePoint", level: 80 },
      { name: "Git/GitHub", level: 90 },
    ],
  },
]

const techIcons = [
  { name: "Java", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" },
  { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
  { name: "PHP", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" },
  { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
  { name: "React", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
  { name: "MySQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" },
  { name: "PostgreSQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" },
  { name: "Git", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
  { name: "HTML5", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
  { name: "SharePoint", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "AWS", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
]

function ProgressBar({ level, isInView, delay }: { level: number; isInView: boolean; delay: number }) {
  return (
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
        style={{
          width: isInView ? `${level}%` : "0%",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

function RotatingSkillsOrbit({ isInView }: { isInView: boolean }) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.5)
    }, 30)
    return () => clearInterval(interval)
  }, [isInView])

  const radius = 140
  const iconCount = techIcons.length

  return (
    <div className="relative w-[320px] h-[320px] mx-auto mb-16">
      {/* Center Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-lg z-10">
        <span className="text-2xl font-bold gradient-text">OG</span>
      </div>

      {/* Orbit Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-border/50" />

      {/* Rotating Icons */}
      {techIcons.map((tech, index) => {
        const angle = (index / iconCount) * 360 + rotation
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius

        return (
          <div
            key={tech.name}
            className={cn(
              "absolute w-12 h-12 rounded-xl bg-card border border-border",
              "flex items-center justify-center shadow-md transition-all duration-300",
              "hover:scale-125 hover:border-primary hover:z-20 cursor-pointer group"
            )}
            style={{
              left: `calc(50% + ${x}px - 24px)`,
              top: `calc(50% + ${y}px - 24px)`,
            }}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-7 h-7"
              crossOrigin="anonymous"
            />
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
              {tech.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="skills" ref={ref} className="py-20 lg:py-32 relative bg-secondary/30">
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
              What I work with
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Rotating Skills Orbit */}
          <RotatingSkillsOrbit isInView={isInView} />

          {/* Skill Categories Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className={cn(
                  "p-6 rounded-2xl bg-card border border-border",
                  "hover:border-primary/30 transition-all duration-300",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${categoryIndex * 150 + 300}ms` }}
              >
                <h3 className="text-xl font-bold mb-6 gradient-text">{category.title}</h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <ProgressBar
                        level={skill.level}
                        isInView={isInView}
                        delay={categoryIndex * 150 + skillIndex * 100 + 500}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
