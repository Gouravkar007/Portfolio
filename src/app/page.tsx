"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CareerJourney } from "@/components/CareerJourney";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ResumeModal } from "@/components/ResumeModal";
import { DigitalTwinChat } from "@/components/DigitalTwinChat";

export default function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen relative bg-[#07090e] text-slate-100 overflow-x-hidden">
      {/* Global Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeModalOpen(true)}
        // onOpenChat={() => setIsChatOpen(true)} // Temporarily hidden for live deployment
      />

      {/* Hero Section */}
      <HeroSection onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* About Me Section */}
      <AboutSection />

      {/* Career Journey & Experience */}
      <CareerJourney />

      {/* Projects Showcase */}
      <ProjectsSection />

      {/* Technical Skills Matrix */}
      <SkillsSection />

      {/* Certifications & Credentials */}
      <CertificationsSection />

      {/* Contact & Inquiry */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* PDF Resume Drawer Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* AI Digital Twin Chat Widget */}
      <DigitalTwinChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </main>
  );
}
