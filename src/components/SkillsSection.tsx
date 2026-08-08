"use client";

import React, { useState } from "react";
import { Wrench, Code, Cpu, Database, Cloud, Terminal, CheckCircle2, Search } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const skillGroups = [
    {
      category: "Backend & Microservices",
      icon: Code,
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      skills: [
        { name: "Java 17", level: "Expert", desc: "Core Java, OOP, Collections, Concurrency" },
        { name: "Spring Boot", level: "Advanced", desc: "Spring MVC, Spring Data, Security, Microservices" },
        { name: "FastAPI", level: "Advanced", desc: "Asynchronous RESTful APIs in Python" },
        { name: "REST APIs & Swagger", level: "Expert", desc: "OpenAPI Specs, Endpoint Design, JSON Schemas" },
        { name: "Pydantic & Microservices", level: "Advanced", desc: "Data Validation & Modular Architecture" },
      ],
    },
    {
      category: "Machine Learning & AI",
      icon: Cpu,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      skills: [
        { name: "Scikit-Learn", level: "Advanced", desc: "Classification, Regression, Pipelines, Tuning" },
        { name: "Pandas & NumPy", level: "Expert", desc: "Data Preprocessing, Manipulation, Feature Engineering" },
        { name: "TensorFlow & Keras", level: "Intermediate", desc: "Neural Networks & Deep Learning Models" },
        { name: "Google Gemini API", level: "Advanced", desc: "AI Assistant Integration & Automated Summary Generation" },
        { name: "Streamlit & Plotly", level: "Advanced", desc: "Interactive ML Dashboards & Charting" },
      ],
    },
    {
      category: "Databases, Cloud & DevOps",
      icon: Database,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      skills: [
        { name: "SQL Server", level: "Advanced", desc: "Relational Queries, Schema Design, Stored Procedures" },
        { name: "Render & GitHub Pages", level: "Advanced", desc: "Cloud Deployment & Production Hosting" },
        { name: "Docker", level: "Intermediate", desc: "Containerization & Multi-stage Builds" },
        { name: "Git, GitHub & SourceTree", level: "Expert", desc: "Version Control, Branching Strategy, PR Reviews" },
        { name: "Jira & Confluence", level: "Advanced", desc: "Agile Task Management & Documentation" },
      ],
    },
    {
      category: "Methodologies & Automation",
      icon: Terminal,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      skills: [
        { name: "Agile & Scrum", level: "Expert", desc: "Sprint Ceremonies, Planning, Story Point Estimation" },
        { name: "System Design", level: "Advanced", desc: "Scalable Architecture Planning & Module Separation" },
        { name: "Gmail SMTP Automation", level: "Advanced", desc: "Automated Email Notification Pipelines" },
        { name: "Windows OS Scripting", level: "Advanced", desc: "System Event Monitoring & Scripted Workflows" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative bg-cyber-grid bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            SKILLS MATRIX & <span className="text-gradient-cyan">ENGINEERING TOOLKIT</span>
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
            Categorized technical capabilities spanning Java Spring Boot backend engineering, machine learning pipelines, and cloud DevOps.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills (e.g., 'Spring Boot', 'Scikit-learn', 'Docker')..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-500/50 shadow-inner"
          />
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, gIdx) => {
            const Icon = group.icon;
            const filteredSkills = group.skills.filter(
              (s) =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.desc.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredSkills.length === 0 && searchTerm) return null;

            return (
              <div
                key={gIdx}
                className="glass-card rounded-2xl border border-slate-800 p-6 space-y-6 hover:border-cyan-500/30 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${group.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-white text-base">{group.category}</h3>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {filteredSkills.length} Verified Competencies
                    </span>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {filteredSkills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          {skill.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 pl-5 leading-relaxed">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
