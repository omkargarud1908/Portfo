"use client"

import { Navigation } from "@/components/navigation"
import { ThreeBackground } from "@/components/three-background"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { EducationSection } from "@/components/education-section"
import { ExperienceSection } from "@/components/experience-section"
import { AchievementsSection } from "@/components/achievements-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { VisitorCounter } from "@/components/visitor-counter"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* 3D Animated Background */}
      <ThreeBackground />
      
      {/* Navigation - Glass Tab Style */}
      <Navigation />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ExperienceSection />
        <AchievementsSection />
        <CertificationsSection />
        <ContactSection />
        <VisitorCounter />
        <Footer />
      </div>
    </main>
  )
}
