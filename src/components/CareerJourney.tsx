"use client";

import React, { useState } from "react";
import { Briefcase, Trophy, CheckCircle, Calendar, Layers, ShieldCheck, ArrowUpRight } from "lucide-react";

export const CareerJourney: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const careerItems = [
    {
      role: "Backend Developer Intern",
      company: "Acceleratron",
      location: "India",
      period: "February 2024 – June 2026",
      award: "Awarded Team Management Recognition",
      description: "Hands-on internship focused on enterprise backend system design, Spring Boot microservices, and garment industry ERP portal engineering.",
      bulletPoints: [
        "Developed and maintained scalable backend microservices and RESTful API endpoints using Java 17 & Spring Boot.",
        "Collaborated on full garment industry ERP portal development managing complex inventory stock tracking, sales order processing, and multi-tenant transactions.",
        "Participated actively in Agile sprints, daily Scrum standups, architecture planning, story point estimation, and code reviews.",
        "Honored with an official Award for Team Management Contributions for coordinating sprint deliverables and leading developer onboarding.",
      ],
      techUsed: ["Java", "Spring Boot", "REST APIs", "SQL Server", "Jira", "Agile/Scrum", "Git"],
    },
  ];

  return (
    <section id="experience" className="py-24 relative bg-cyber-grid bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>ENTERPRISE EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            CAREER <span className="text-gradient-emerald">JOURNEY</span> & IMPACT
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
            Real-world backend engineering experience in fast-paced Agile environments delivering production-grade microservices.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          {careerItems.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-slate-800 p-8 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden group shadow-2xl"
            >
              {/* Top Banner Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{item.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-mono text-white group-hover:text-emerald-300 transition-colors">
                    {item.role}
                  </h3>
                  <div className="text-base text-cyan-300 font-mono font-medium">@ {item.company}</div>
                </div>

                {/* Award Badge */}
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold self-start md:self-auto">
                  <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>{item.award}</span>
                </div>
              </div>

              {/* Main Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                {item.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Key Contributions & Deliverables:</h4>
                <ul className="space-y-2.5">
                  {item.bulletPoints.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">TECH STACK:</span>
                {item.techUsed.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
