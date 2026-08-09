"use client";

import React, { useState } from "react";
import { Code2, ExternalLink, Sparkles, Filter, ChevronRight, Layers, Cpu, Server, Shield } from "lucide-react";
import { ProjectModal, ProjectData } from "./ProjectModal";
import { GithubIcon } from "./SocialIcons";

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      id: "maternal-ml",
      title: "AI-Based Maternal Health & Preeclampsia Risk System",
      category: "Machine Learning & AI",
      period: "2026",
      role: "Full-Stack ML & Cloud Architect",
      stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit", "Plotly", "Google Gemini API", "Render"],
      description:
        "Full-stack machine learning application featuring a dual-stage risk prediction pipeline. Assesses general maternal health risk and escalates high-risk cases to a dedicated preeclampsia risk classifier.",
      highlights: [
        "Built dual-stage ML pipeline: General maternal health risk evaluation -> Specialized preeclampsia classifier.",
        "Integrated Google Gemini API to power an automated AI health guidance assistant.",
        "Developed interactive Streamlit dashboard with Plotly charts for clinical trends and metric visualizations.",
        "Implemented automated PDF report generation and deployed full application on Render cloud.",
      ],
      githubUrl: "https://github.com/Gouravkar007/AI-Based-Maternal-Health-Preeclampsia-Risk-Prediction-System",
      liveUrl: "https://maternal-health-preeclampsia-system.onrender.com/",
      demoType: "ml-sim",
    },
    {
      id: "garment-erp",
      title: "Garment Industry ERP Portal",
      category: "Backend & ERP",
      period: "June 2025 – August 2025",
      role: "Backend Developer",
      stack: ["Java", "Spring Boot", "SQL Server", "RESTful APIs", "Swagger"],
      description:
        "Comprehensive ERP system tailored for garment manufacturing enabling real-time stock management, order tracking, and client-stakeholder authorization.",
      highlights: [
        "Designed and implemented RESTful microservices for inventory, sales transactions, and reporting.",
        "Implemented real-time stock tracking and transaction logging using SQL Server.",
        "Designed role-based access control (RBAC) ensuring seamless experience for both clients and internal staff.",
      ],
      githubUrl: "https://github.com/Gouravkar007/ERP-PORTAL",
      demoType: "erp-sim",
    },
    {
      id: "a2z-fastfood",
      title: "A2Z Fast Food — Terminal Food Ordering System",
      category: "Backend & ERP",
      period: "May 2025 – June 2025",
      role: "Backend Developer",
      stack: ["Python", "FastAPI", "Pydantic", "SQL Server", "REST APIs"],
      description:
        "Terminal-based food ordering platform with automated menu management, order fulfillment workflows, and billing analytics.",
      highlights: [
        "Developed high-throughput REST APIs using FastAPI and Pydantic validation.",
        "Integrated SQL Server for structured transactional management and order analytics.",
        "Created daily sales reporting and top-ordered item analytics pipeline.",
      ],
      githubUrl: "https://github.com/Gouravkar007/A2Z-FASTFOOD",
      demoType: "api-sim",
    },
    {
      id: "login-alert",
      title: "Login Alert — Windows Security Notification Script",
      category: "Security & Tools",
      period: "September 2025 – November 2025",
      role: "Scripting & Security Developer",
      stack: ["Python", "Gmail SMTP", "Windows OS Scripting", "Security Auditing"],
      description:
        "Automated background security tool capturing Windows login/unlock events and transmitting real-time email notifications.",
      highlights: [
        "Intercepts Windows OS auth and unlock events in real-time.",
        "Transmits instant alert emails with device timestamp, user context, and IP details via Gmail SMTP.",
        "Maintains encrypted local logging for auditing and personal device monitoring.",
      ],
      githubUrl: "https://github.com/Gouravkar007/Login-Alert",
    },
    {
      id: "youtube-auto-pause",
      title: "YouTube Auto-Pause Edge & Chrome Extension",
      category: "Security & Tools",
      period: "2025",
      role: "Extension Developer",
      stack: ["JavaScript", "Chrome Extension API", "Manifest V3", "Browser Event Listeners"],
      description:
        "Lightweight browser extension that automatically pauses YouTube playback when switching tabs and resumes when returning.",
      highlights: [
        "Monitors active browser tab state changes using Manifest V3.",
        "Automatically pauses and resumes YouTube videos seamlessly.",
        "Improves user focus and conserves bandwidth.",
      ],
      githubUrl: "https://github.com/Gouravkar007/youtube-auto-pause-extension",
    },
    {
      id: "handwritten-digit",
      title: "Handwritten Digit Recognition System",
      category: "Machine Learning & AI",
      period: "2025",
      role: "ML Engineer",
      stack: ["Python", "TensorFlow", "Keras", "MNIST", "OpenCV"],
      description:
        "Neural network model trained on the MNIST dataset capable of predicting handwritten digits (0–9) with high precision.",
      highlights: [
        "Built convolutional neural network using TensorFlow & Keras.",
        "Preprocessed grayscale images using OpenCV filtering.",
        "Achieved high accuracy on test digits.",
      ],
      githubUrl: "https://github.com/Gouravkar007/Handwritten-Digit-Prediction",
    },
  ];

  const categories = ["All", "Machine Learning & AI", "Backend & ERP", "Security & Tools"];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative bg-[#090d16] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight flex items-center gap-3 justify-center">
            <Code2 className="w-8 h-8 text-purple-400 shrink-0" />
            <span>FEATURED <span className="text-gradient-purple">PROJECTS</span> & ARCHITECTURE</span>
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
            Production backends, AI-powered health assessment systems, enterprise ERP portals, and security automation tools.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-purple-500 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl border border-slate-800/90 p-7 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-slate-900 text-purple-400 border border-purple-500/30">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{project.period}</span>
                </div>

                <h3 className="text-xl font-bold font-mono text-white group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold group/btn"
                >
                  <span>VIEW DETAILS & DEMO</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-3 text-slate-400">
                  <a
                    href={project.githubUrl || "https://github.com/Gouravkar007"}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                    title="Source Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-400 transition-colors"
                      title="Live Deployment"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Window */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
