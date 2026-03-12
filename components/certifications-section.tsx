"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Award, ExternalLink, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const certifications = [
  {
    title: "Complete Machine Learning & Data Science Bootcamp",
    organization: "Udemy",
    year: "2024",
    credentialUrl: "https://www.udemy.com/certificate/UC-cbc5cf97-91e8-4eb0-8019-fd0f24ed7583/",
    icon: "udemy",
  },
  {
    title: "Programming in Java",
    organization: "NPTEL",
    year: "2023",
    credentialUrl: "https://drive.google.com/file/d/1FwXFlLhA70mo2_APVQoo0wvXCbvL-Ufc/view?usp=sharing",
    icon: "nptel",
  },
  {
    title: "AWS Academy Machine Learning Foundations",
    organization: "Amazon Web Services",
    year: "2024",
    credentialUrl: "https://www.credly.com/badges/a90b7236-7c50-4214-9506-24b8189197b5/linked_in_profile",
    icon: "aws",
  },
  {
    title: "UpGrad Job Readiness Test",
    organization: "UpGrad",
    year: "2024",
    credentialUrl: null,
    icon: "upgrad",
  },
]

export function CertificationsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="certifications" ref={ref} className="py-20 lg:py-32 relative">
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
              Credentials
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gradient-text">Certifications</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className={cn(
                  "group p-6 rounded-2xl bg-card border border-border",
                  "hover:border-primary/30 transition-all duration-500",
                  "hover:shadow-xl hover:shadow-primary/5",
                  "hover:-translate-y-1",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold mb-1 text-balance group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {cert.organization} &middot; {cert.year}
                    </p>
                    {cert.credentialUrl && (
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-primary"
                        asChild
                      >
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          View Credential
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
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
