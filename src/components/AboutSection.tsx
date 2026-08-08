"use client";

import React from "react";
import { UserCheck, GraduationCap, Award, Database, Code, Cpu, ShieldCheck } from "lucide-react";

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Code,
      title: "Backend & Microservices",
      desc: "Specialized in designing RESTful APIs, Spring Boot microservices, FastAPI, and robust backend data processing workflows.",
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    },
    {
      icon: Cpu,
      title: "AI & Dual-Stage ML Pipelines",
      desc: "Engineered real-time Machine Learning prediction models (Scikit-learn, Pandas) integrated with Google Gemini API for automated insights.",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    },
    {
      icon: Database,
      title: "Database & System Design",
      desc: "Proficient in SQL Server, transaction management, real-time inventory tracking, and scalable backend architecture planning.",
      color: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    },
    {
      icon: Award,
      title: "Agile & Team Leadership",
      desc: "Experienced with Scrum ceremonies, sprint estimation, and awarded for team management contributions during enterprise engagements.",
      color: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    },
  ];

  const educationList = [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "Bengal Institute of Technology",
      period: "August 2023 – July 2026",
      score: "CGPA: 6.75",
      details: "Advanced coursework in Data Structures, Backend Systems, Machine Learning, and Software Architecture.",
      active: true,
    },
    {
      degree: "Diploma in Computer Science Engineering",
      institution: "Raghunathpur Government Polytechnic",
      period: "June 2021 – August 2023",
      score: "78.6%",
      details: "Strong foundation in Core Java, Python, Operating Systems, and Relational Databases.",
      active: false,
    },
    {
      degree: "10th Grade – WBBSE",
      institution: "Kamalpur Netaji High School",
      period: "February 2020",
      score: "65%",
      details: "Secondary education with focus on Mathematics and General Sciences.",
      active: false,
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#090d16] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXECUTIVE SUMMARY & PILLARS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight">
            ENGINEERING <span className="text-gradient-cyan">PHILOSOPHY</span> & BACKGROUND
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
            Bridging enterprise backend stability with modern AI intelligence. Computer Science graduate with hands-on experience in production REST APIs and ML workflows.
          </p>
        </div>

        {/* Narrative & Strategic Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Clean Professional Narrative Card (No photo repetition) */}
          <div className="lg:col-span-6 glass-card p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Professional Profile</span>
              <h3 className="text-2xl font-bold text-white font-mono">Gourav Kar</h3>
              <p className="text-xs font-mono text-slate-400">Computer Science Engineering Graduate • Bengal Institute of Technology</p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-light">
              I am a <strong className="text-white">Computer Science Engineering graduate</strong> with specialized experience in developing robust Java (Spring Boot) and Python backends. My core focus lies in building scalable RESTful APIs, implementing microservice architectures, and integrating machine learning predictive pipelines into real-world software applications.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Through my tenure as a <strong className="text-cyan-300">Backend Developer Intern at Acceleratron</strong>, I gained extensive experience collaborating on garment industry ERP portals, writing production API endpoints, and participating in Agile Scrum ceremonies—where I was recognized with an award for team management contributions.
            </p>

            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4 font-mono text-xs text-slate-300">
              <div>
                <span className="text-slate-500 block">Primary Focus:</span>
                <span className="font-semibold text-cyan-300">Java Spring Boot & ML</span>
              </div>
              <div>
                <span className="text-slate-500 block">Core Methodologies:</span>
                <span className="font-semibold text-emerald-300">Agile / Scrum</span>
              </div>
            </div>
          </div>

          {/* Pillars Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="glass-card p-6 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 space-y-3"
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${pillar.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-mono text-sm font-bold text-white">{pillar.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Education Timeline Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold font-mono text-white">ACADEMIC JOURNEY & QUALIFICATIONS</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationList.map((edu, idx) => (
              <div
                key={idx}
                className={`glass-card p-6 rounded-xl border transition-all duration-300 relative ${
                  edu.active
                    ? "border-cyan-500/50 bg-slate-900/80 shadow-[0_0_20px_rgba(0,242,254,0.1)]"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {edu.active && (
                  <span className="absolute top-4 right-4 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    CURRENT
                  </span>
                )}
                <div className="text-xs font-mono text-cyan-400 mb-1">{edu.period}</div>
                <h4 className="font-mono font-bold text-white text-base mb-1">{edu.degree}</h4>
                <div className="text-xs text-slate-300 font-medium mb-3">{edu.institution}</div>
                <div className="inline-block px-2.5 py-1 rounded bg-slate-800 text-emerald-400 font-mono text-xs font-bold mb-3 border border-slate-700">
                  {edu.score}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
