"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Palette, Waves, Sunset, TreePine, Flower2, Stars, Snowflake, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const themes = [
  { name: "system", label: "System", icon: Monitor },
  { name: "light", label: "Light", icon: Sun },
  { name: "dark", label: "Dark", icon: Moon },
  { name: "ocean", label: "Ocean", icon: Waves },
  { name: "sunset", label: "Sunset", icon: Sunset },
  { name: "forest", label: "Forest", icon: TreePine },
  { name: "rose", label: "Rose", icon: Flower2 },
  { name: "midnight", label: "Midnight", icon: Stars },
  { name: "nord", label: "Nord", icon: Snowflake },
]

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    return (scrollTop / docHeight) * 100
  }

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setProgress(scrollProgress())
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent z-[60] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
      
      {/* Glass Tab Navigation - Floating Centered */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
        <nav
          className={cn(
            "rounded-2xl transition-all duration-300",
            "bg-background/60 backdrop-blur-xl border border-white/10",
            "shadow-lg shadow-black/5",
            isScrolled && "bg-background/80"
          )}
        >
          <div className="px-4 sm:px-6">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <a 
                href="#" 
                className="text-xl font-bold shrink-0"
              >
                <span className="text-primary">{"<"}</span>
                <span className="gradient-text">OG</span>
                <span className="text-primary">{"/>"}</span>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-300",
                      activeSection === link.href.slice(1)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                    )}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-2">
                {/* Theme Selector */}
                {mounted && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg hover:bg-white/10"
                      >
                        <Palette className="h-5 w-5" />
                        <span className="sr-only">Select theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel className="text-xs text-muted-foreground">Select Theme</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {themes.map((t) => {
                        const Icon = t.icon
                        return (
                          <DropdownMenuItem
                            key={t.name}
                            onClick={() => setTheme(t.name)}
                            className={cn(
                              "flex items-center gap-2 cursor-pointer",
                              theme === t.name && "bg-primary/10 text-primary"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{t.label}</span>
                          </DropdownMenuItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden rounded-lg hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300",
              isMobileMenuOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-4">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 text-center",
                      activeSection === link.href.slice(1)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              
              {/* Mobile Theme Selector */}
              {mounted && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-muted-foreground mb-2 px-1">Theme</p>
                  <div className="grid grid-cols-3 gap-2">
                    {themes.map((t) => {
                      const Icon = t.icon
                      return (
                        <button
                          key={t.name}
                          onClick={() => setTheme(t.name)}
                          className={cn(
                            "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium rounded-xl transition-all duration-300",
                            theme === t.name
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{t.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
