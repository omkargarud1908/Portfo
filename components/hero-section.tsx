"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const roles = [
  "Backend Developer",
  "Full Stack Developer", 
  "Problem Solver",
  "MCA Student",
  "Tech Enthusiast",
]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <div className="relative">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 animate-pulse-glow">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-6xl md:text-8xl font-bold gradient-text">OG</span>
              </div>
            </div>
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left flex-1">
            <p className="text-primary font-medium mb-2 text-sm tracking-wider uppercase">
              Welcome to my portfolio
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              Hi, I'm{" "}
              <span className="gradient-text">Omkar Garud</span>
            </h1>

            <div className="h-12 md:h-14 flex items-center justify-center lg:justify-start mb-6">
              <span className="text-xl md:text-2xl lg:text-3xl text-muted-foreground">
                {displayText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </div>

            <p className="text-muted-foreground text-lg max-w-2xl mb-8 leading-relaxed">
              MCA student with a strong foundation in{" "}
              <span className="text-foreground font-medium">Java, Python, PHP, MySQL, MERN</span>{" "}
              and Web Development. Skilled in building real-world projects and actively exploring the latest technologies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                className="gap-2 glow-hover transition-all duration-300"
                asChild
              >
                <a href="#projects">
                  View Projects
                  <ChevronDown className="h-4 w-4" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                asChild
              >
                <a href="#resume">
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg"
                className="gap-2"
                asChild
              >
                <a href="#contact">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/omkargarud1908"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground",
                  "transition-all duration-300 hover:scale-110"
                )}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/omkargarud1908/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground",
                  "transition-all duration-300 hover:scale-110"
                )}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              
              <a
                href="mailto:omkargarud8833@gmail.com"
                className={cn(
                  "p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground",
                  "transition-all duration-300 hover:scale-110"
                )}
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </div>
    </section>
  )
}
