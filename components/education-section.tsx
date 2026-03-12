"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { GraduationCap, Calendar, Award, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "VESIT, Mumbai University",
    period: "2024 - 2026",
    location: "Mumbai, India",
    grade: { type: "SGPA", value: "9.75" },
    highlights: [
      "Focusing on advanced software development and system design",
      "Backend technologies and cloud computing",
      "Currently pursuing with excellent academic standing",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Abasaheb Garware College, Pune",
    period: "2021 - 2024",
    location: "Pune, India",
    grade: { type: "CGPA", value: "8.81" },
    highlights: [
      "Strong foundation in programming and algorithms",
      "Database management and web development",
      "Completed with distinction",
    ],
  },
]

export function EducationSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="education" ref={ref} className="py-20 lg:py-32 relative">
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
              Academic Background
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gradient-text">Education</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Education Cards */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={edu.degree}
                className={cn(
                  "group relative p-8 rounded-2xl bg-card border border-border",
                  "hover:border-primary/50 transition-all duration-500",
                  "hover:shadow-xl hover:shadow-primary/5",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 200 + 200}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Header */}
                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {edu.degree}
                      </h3>
                      <p className="text-muted-foreground font-medium">{edu.institution}</p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Award className="h-4 w-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  {/* Grade Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">
                      {edu.grade.type}: <span className="text-primary">{edu.grade.value}</span>
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
