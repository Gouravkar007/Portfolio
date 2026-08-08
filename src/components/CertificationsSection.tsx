"use client";

import React from "react";
import { Award, ShieldCheck, CheckCircle, ExternalLink, Sparkles } from "lucide-react";

export const CertificationsSection: React.FC = () => {
  const certifications = [
    {
      title: "AWS Academy Cloud Foundation",
      issuer: "Amazon Web Services (AWS)",
      category: "Cloud & Infrastructure",
      badgeColor: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      desc: "Cloud architecture, EC2, S3, VPC security, IAM roles, and cloud computing fundamentals.",
    },
    {
      title: "Artificial Intelligence by IBM",
      issuer: "IBM",
      category: "AI & Data Science",
      badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
      desc: "Machine Learning models, natural language processing foundations, and AI ethics.",
    },
    {
      title: "SAP S/4HANA Development Certification",
      issuer: "SAP",
      category: "Enterprise Systems",
      badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      desc: "Enterprise resource planning architecture, ABAP/HANA data modeling, and business workflows.",
    },
    {
      title: "Spring Boot Training & Certification",
      issuer: "Professional Engineering Academy",
      category: "Backend Frameworks",
      badgeColor: "border-purple-500/40 text-purple-400 bg-purple-500/10",
      desc: "Production microservices, REST API design, Spring Security, and relational database ORM.",
    },
    {
      title: "Java Professional Training",
      issuer: "Engineering Certification Board",
      category: "Core Languages",
      badgeColor: "border-rose-500/40 text-rose-400 bg-rose-500/10",
      desc: "Advanced OOP concepts, multithreading, collections framework, and JVM optimizations.",
    },
    {
      title: "Python Programming with Application on Robotics",
      issuer: "Technical Training Institute",
      category: "Python & Automation",
      badgeColor: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10",
      desc: "Python scripting, hardware interfacing, sensor control loops, and algorithm design.",
    },
  ];

  return (
    <section className="py-24 relative bg-[#090d16] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>CREDENTIALS & SPECIALIZATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            CERTIFICATIONS & <span className="text-gradient-emerald">TRAINING</span>
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
            Verified industry certifications and specialized technical training accreditations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded border ${cert.badgeColor}`}>
                    {cert.category}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>

                <h3 className="font-mono font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                  {cert.title}
                </h3>

                <div className="text-xs font-mono text-slate-400 font-medium">Issued by {cert.issuer}</div>

                <p className="text-xs text-slate-400 leading-relaxed font-light">{cert.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-3 h-3" /> VERIFIED
                </span>
                <span className="text-slate-600">Gourav Kar</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
