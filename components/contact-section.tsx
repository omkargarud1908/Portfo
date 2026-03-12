"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Mail, MapPin, Send, Github, Linkedin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "omkargarud8833@gmail.com",
    href: "mailto:omkargarud8833@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mumbai, India",
    href: null,
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/omkargarud1908",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/omkargarud1908/",
  },
]

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-32 relative bg-secondary/30">
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
              Get in touch
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Contact <span className="gradient-text">Me</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out.
              I'm always open to discussing new opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div
              className={cn(
                "transition-all duration-700 delay-200",
                isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}
            >
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Send className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="bg-background"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        required
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message..."
                        rows={5}
                        required
                        className="bg-background resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div
              className={cn(
                "transition-all duration-700 delay-300",
                isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              )}
            >
              <div className="space-y-6">
                {/* Contact Details */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                {/*<div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-bold mb-6">Connect with Me</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "p-4 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground",
                          "transition-all duration-300 hover:scale-110"
                        )}
                      >
                        <social.icon className="h-6 w-6" />
                        <span className="sr-only">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
                */}

                {/* Quick Message */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                  <p className="text-lg font-medium mb-2">Let's build something great together!</p>
                  <p className="text-muted-foreground text-sm">
                    I'm currently open to new opportunities and collaborations. Whether you have a project idea, a potential partnership, or just want to connect, feel free to reach out. I’m always excited to work on innovative projects, learn new technologies, and contribute to meaningful solutions. If you’re looking for someone who is passionate about development, problem-solving, and continuous learning, I’d love to hear from you. Let’s connect and create something impactful together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
