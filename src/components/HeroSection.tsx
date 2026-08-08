"use client";

import React, { useState } from "react";
import { ArrowRight, Download, Cpu, Server, Sparkles, Terminal as TerminalIcon, User, CheckCircle2 } from "lucide-react";
import { TerminalWidget } from "./TerminalWidget";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<"portrait" | "terminal">("portrait");

  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-[#07090e] bg-cyber-grid">
      {/* Subtle Ambient Radial Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] ambient-glow-1 pointer-events-none rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] ambient-glow-2 pointer-events-none rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: World-Class Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold tracking-wide uppercase">Java Backend & ML Engineer</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Available for Opportunities</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Gourav Kar
              </h1>
              <p className="text-xl sm:text-2xl font-light text-slate-300 leading-relaxed">
                Building high-performance <span className="text-cyan-400 font-normal">Spring Boot microservices</span>, robust REST APIs, and <span className="text-emerald-400 font-normal">dual-stage ML risk pipelines</span>.
              </p>
            </div>

            {/* Brief Value Points */}
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl font-light">
              Computer Science Engineer with production backend experience at Acceleratron. Specialized in Java, Python, Scikit-learn, SQL Server, and cloud deployment on Render.
            </p>

            {/* Key Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-slate-300">
              {["Java 17", "Spring Boot", "Python", "FastAPI", "Scikit-Learn", "SQL Server", "Docker", "REST APIs"].map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons & Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-sm hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(0,242,254,0.25)] hover:scale-[1.02]"
              >
                <span>VIEW FEATURED WORK</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 hover:border-cyan-400 hover:text-cyan-300 font-mono text-sm transition-all duration-300 shadow-lg"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>RESUME PDF</span>
              </button>

              <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
                <a
                  href="https://github.com/GouravKar"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/gouravkar"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Global Executive Showcase Switcher */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs">
              <button
                onClick={() => setActiveTab("portrait")}
                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === "portrait"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>EXECUTIVE PORTRAIT</span>
              </button>

              <button
                onClick={() => setActiveTab("terminal")}
                className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  activeTab === "terminal"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>CLI TERMINAL</span>
              </button>
            </div>

            {/* Main Showcase Box */}
            {activeTab === "portrait" ? (
              <div className="relative group max-w-sm mx-auto lg:max-w-none">
                {/* Backlight Ambient Glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-purple-600 opacity-30 blur-xl group-hover:opacity-60 transition duration-500"></div>

                <div className="relative glass-card rounded-2xl border border-slate-800/90 overflow-hidden shadow-2xl p-3 bg-slate-950">
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#07090e]">
                    <img
                      src="/profile.png"
                      alt="Gourav Kar - Global Software Engineer"
                      className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Overlay Identity Banner */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-transparent p-6 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          GOURAV KAR
                        </span>
                      </div>
                      <p className="text-xs font-mono text-cyan-300">
                        Java Backend & ML Developer
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        Acceleratron Backend Intern • BIT CSE '26
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <TerminalWidget />
              </div>
            )}

            {/* Quick Metrics Bar underneath */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="glass-card p-3 rounded-xl border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-500 block uppercase">Experience</span>
                <span className="text-sm font-bold text-white">Acceleratron Intern</span>
              </div>
              <div className="glass-card p-3 rounded-xl border border-slate-800/80 text-center">
                <span className="text-[10px] text-slate-500 block uppercase">Dual ML Architecture</span>
                <span className="text-sm font-bold text-emerald-400">Deployed on Render</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
