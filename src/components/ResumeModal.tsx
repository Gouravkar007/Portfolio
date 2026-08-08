"use client";

import React from "react";
import { X, Download, FileText, ExternalLink, ShieldCheck } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-white text-base">Gourav_Kar_Resume.pdf</h3>
              <span className="text-[11px] font-mono text-slate-400">Verified Resume Document • Java & ML Developer</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Gourav_Kar_Resume.pdf"
              download="Gourav_Kar_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,242,254,0.3)]"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Canvas */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden">
          <iframe
            src="/Gourav_Kar_Resume.pdf#toolbar=1"
            className="w-full h-full border-none"
            title="Gourav Kar Resume PDF"
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-900/90 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Document Ready for Recruiter Review</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
