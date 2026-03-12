"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Role-Based Super Admin Panel",
    description:
      "A comprehensive admin panel with JWT authentication, role-based access control, user & role management, audit logs, and analytics dashboard. Includes Postman collection for API testing.",
    image: "/projects/super-admin.jpg",
    technologies: ["Node.js", "Prisma ORM", "Neon Postgres", "React", "JWT"],
    githubUrl: "https://github.com/omkargarud1908/SuperAdmin",
    liveUrl: "https://super-admin-ssgt.vercel.app/",
    featured: true,
  },
  {
    title: "MetroRail Management System",
    description:
      "A complete metro rail management system featuring ticket booking, metro card management, lost & found module, station maps, complaints system, and timetable management.",
    image: "/projects/metro-rail.jpg",
    technologies: ["JSP", "MySQL", "JavaScript", "CSS"],
    githubUrl: "https://github.com/omkargarud1908/MetroIndicator",
    liveUrl: null,
    featured: true,
  },
  {
    title: "Smart Parking System",
    description:
      "An automated parking management system with slot booking, virtual cards, transaction logs, and separate admin/user modules for efficient parking space management.",
    image: "/projects/smart-parking.jpg",
    technologies: ["PHP", "MySQL", "HTML", "CSS"],
    githubUrl: "https://github.com/omkargarud1908/Smart-Parking-System",
    liveUrl: null,
    featured: true,
  },
]

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0]
  index: number
  isInView: boolean
}) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-card border border-border overflow-hidden",
        "hover:border-primary/50 transition-all duration-500",
        "hover:shadow-xl hover:shadow-primary/5",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 150 + 200}ms` }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold gradient-text">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/90 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-background text-foreground hover:scale-110 transition-transform"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">View on GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-background text-foreground hover:scale-110 transition-transform"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="sr-only">View Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <Button variant="outline" size="sm" className="gap-2 flex-1" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button size="sm" className="gap-2 flex-1" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-primary" />
    </div>
  )
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="projects" ref={ref} className="py-20 lg:py-32 relative">
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
              My work
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of the projects I've built. Each project represents a unique
              challenge and showcases different aspects of my technical skills.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* View More Button */}
          <div
            className={cn(
              "text-center mt-12 transition-all duration-700 delay-500",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a
                href="https://github.com/omkargarud1908"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                View More on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
