"use client"

import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/omkargarud1908" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/omkargarud1908/" },
  { icon: Mail, label: "Email", href: "mailto:omkargarud8833@gmail.com" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-card border-t border-border">
      {/* Back to Top Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className={cn(
          "absolute -top-5 left-1/2 -translate-x-1/2 rounded-full",
          "hover:bg-primary hover:text-primary-foreground hover:border-primary",
          "shadow-lg transition-all duration-300"
        )}
      >
        <ArrowUp className="h-4 w-4" />
        <span className="sr-only">Back to top</span>
      </Button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stacked Layout - One above another */}
        <div className="flex flex-col items-center gap-8">
          {/* Brand */}
          <div className="text-center">
            <a href="#" className="text-3xl font-bold gradient-text">
              OG
            </a>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground",
                    "transition-all duration-300 hover:scale-110"
                  )}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md border-t border-border" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by Omkar Garud
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
