"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, Sparkles, MapPin, ExternalLink, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSent(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        setErrorMsg(data.error || "Failed to transmit message. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("Failed to connect to the server. Please check your network connection.");
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-cyber-grid bg-[#07090e] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight flex items-center gap-3 justify-center">
            <Mail className="w-8 h-8 text-cyan-400 shrink-0" />
            <span>PROFESSIONAL IDENTITY & <span className="text-gradient-cyan">SOCIAL HUB</span></span>
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
            All professional channels, repositories, social links, and direct contacts consolidated into one executive area.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Executive Social & Identity Hub */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-6">
              
              {/* Header Info */}
              <div className="pb-6 border-b border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>OPEN FOR ENGINEERING ROLES</span>
                </div>
                <h3 className="font-mono font-bold text-white text-2xl">Gourav Kar</h3>
                <p className="text-xs font-mono text-cyan-400">Java & ML Backend Specialist</p>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>West Bengal, India</span>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* LinkedIn Card */}
                <a
                  href="https://linkedin.com/in/gouravkar"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-white block text-sm group-hover:text-purple-300 transition-colors">LinkedIn Network</span>
                      <span className="text-[11px] text-slate-400">linkedin.com/in/gouravkar</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </a>

                {/* GitHub Card */}
                <a
                  href="https://github.com/GouravKar"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-white block text-sm group-hover:text-cyan-300 transition-colors">GitHub Repositories</span>
                      <span className="text-[11px] text-slate-400">github.com/GouravKar</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                {/* Email Direct */}
                <a
                  href="mailto:gouravkar0072@gmail.com"
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-white block text-sm group-hover:text-emerald-300 transition-colors">Direct Email</span>
                      <span className="text-[11px] text-slate-400">gouravkar0072@gmail.com</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>

                {/* Phone Channel */}
                <a
                  href="tel:+918016105008"
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/60 transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-white block text-sm group-hover:text-amber-300 transition-colors">Phone / Mobile</span>
                      <span className="text-[11px] text-slate-400">+91-8016105008</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </a>

              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 glass-card p-8 rounded-2xl border border-slate-800 relative">
            <h3 className="text-xl font-bold font-mono text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Transmit Direct Inquiry
            </h3>

            {isSent ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-3 font-mono animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
                <p className="text-xs text-slate-300">Thank you for reaching out. I will respond to your query shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1.5 font-semibold">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1.5 font-semibold">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@enterprise.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1.5 font-semibold">SUBJECT / REASON</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Java Backend Engineer Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1.5 font-semibold">MESSAGE *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message details..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono animate-in fade-in duration-300">
                    <p className="font-bold">Transmission Failed</p>
                    <p className="text-[11px] mt-1">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-sm hover:bg-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
