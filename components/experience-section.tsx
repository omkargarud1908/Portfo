"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Briefcase, Calendar, MapPin, ChevronRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    title: "Intern (Power Platform)",
    company: "Revvity",
    location: "Mumbai, India",
    period: "Jan 2026 - Present",
    type: "current",
    responsibilities: [
      "Designed role-based access logic and personalized user views using Power Apps",
      "Automated approval workflows, notifications and task assignments using Power Automate",
      "Integrated SharePoint lists with Power Apps to manage enterprise data efficiently",
    ],
    technologies: ["Power Apps", "Power Automate", "SharePoint", "Microsoft 365"],
  },
  {
    title: "Software Engineer Intern",
    company: "Softtrine Solutions Pvt. Ltd.",
    location: "Pune, India",
    period: "Sep 2025 - Dec 2025",
    type: "completed",
    responsibilities: [
      "Collaborated with backend team to enhance product features and improve scalability",
      "Optimized MySQL queries and database schema using Prisma ORM improving performance by 25%",
      "Implemented automated email workflows reducing manual work by 40%",
      "Integrated chatbot APIs to automate customer interactions",
    ],
    technologies: ["MySQL", "Prisma ORM", "Node.js", "API Integration"],
  },
]

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="experience" ref={ref} className="py-20 lg:py-32 relative bg-secondary/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={cn(
            "transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-medium mb-2 text-sm tracking-wider uppercase flex items-center justify-center gap-2">
              <Zap className="h-4 w-4" />
              Professional Journey
              <Zap className="h-4 w-4" />
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div 
              className={cn(
                "absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5",
                "bg-gradient-to-b from-primary via-primary/50 to-border",
                "transition-all duration-1000",
                isInView ? "scale-y-100" : "scale-y-0"
              )} 
              style={{ transformOrigin: "top" }}
            />

            {experiences.map((item, index) => (
              <div
                key={item.title + item.company}
                className={cn(
                  "relative pl-20 md:pl-0 mb-16 last:mb-0",
                  "transition-all duration-700",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%] md:ml-auto"
                )}
                style={{ transitionDelay: `${index * 300 + 300}ms` }}
              >
                {/* Timeline Dot with Pulse Animation */}
                <div
                  className={cn(
                    "absolute left-4 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center",
                    "transition-all duration-500 z-10",
                    item.type === "current"
                      ? "bg-primary shadow-lg shadow-primary/40"
                      : "bg-card border-2 border-primary"
                  )}
                  style={{ transitionDelay: `${index * 300 + 400}ms` }}
                >
                  {item.type === "current" && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                  )}
                  <Briefcase className={cn(
                    "h-5 w-5 relative z-10",
                    item.type === "current" ? "text-primary-foreground" : "text-primary"
                  )} />
                </div>

                {/* Content Card */}
                <div
                  className={cn(
                    "group p-8 rounded-2xl bg-card border border-border",
                    "hover:border-primary/40 transition-all duration-500",
                    "hover:shadow-2xl hover:shadow-primary/10",
                    "hover:-translate-y-1",
                    index % 2 === 0 ? "md:mr-16" : "md:ml-16"
                  )}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="relative">
                    {/* Current Badge */}
                    {item.type === "current" && (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        Currently Working
                      </span>
                    )}

                    <h3 className="text-2xl font-bold mb-2 text-left group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-primary font-semibold text-lg mb-3 text-left">{item.company}</p>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4 text-primary" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full">
                        <MapPin className="h-4 w-4 text-primary" />
                        {item.location}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-6 text-left">
                      {item.responsibilities.map((resp, i) => (
                        <li 
                          key={i} 
                          className={cn(
                            "flex items-start gap-3 text-sm text-muted-foreground",
                            "transition-all duration-300",
                            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                          )}
                          style={{ transitionDelay: `${index * 300 + 500 + i * 100}ms` }}
                        >
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, i) => (
                        <span
                          key={tech}
                          className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-lg",
                            "bg-primary/10 text-primary border border-primary/20",
                            "hover:bg-primary/20 transition-colors duration-300",
                            "transition-all duration-300",
                            isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
                          )}
                          style={{ transitionDelay: `${index * 300 + 700 + i * 50}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
