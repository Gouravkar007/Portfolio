"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Download, Menu, X, Code2, Briefcase, User, Wrench, Mail, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", icon: User },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: Code2 },
    { name: "Skills", href: "#skills", icon: Wrench },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090e]/90 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-white tracking-wider text-base">
                GOURAV<span className="text-cyan-400">KAR</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
                ACTIVE
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono block tracking-tight">
              JAVA & ML BACKEND ARCHITECT
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400/70" />
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] group hover:scale-[1.02]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AI TWIN CHAT</span>
            </button>
          )}

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.15)] group hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            <span>RESUME (PDF)</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d16]/95 border-b border-slate-800 backdrop-blur-xl px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 transition-all"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {link.name}
                </a>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-slate-800 space-y-2">
            {onOpenChat && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-sm font-mono font-semibold"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                CHAT WITH AI DIGITAL TWIN
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-sm font-mono font-semibold"
            >
              <Download className="w-4 h-4" />
              VIEW & DOWNLOAD RESUME PDF
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
