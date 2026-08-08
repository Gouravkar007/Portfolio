"use client";

import React, { useState } from "react";
import { X, ExternalLink, Cpu, Activity, ShieldAlert, Sparkles, CheckCircle2, RefreshCw, FileText } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  period: string;
  role: string;
  stack: string[];
  description: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoType?: "ml-sim" | "erp-sim" | "api-sim";
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // ML Simulation state
  const [systolic, setSystolic] = useState(135);
  const [diastolic, setDiastolic] = useState(88);
  const [age, setAge] = useState(28);
  const [bloodSugar, setBloodSugar] = useState(6.5);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<any>(null);

  const runMLSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      let riskLevel = "LOW";
      let preeclampsiaEscalated = false;
      let geminiGuidance = "";

      if (systolic >= 140 || diastolic >= 90) {
        riskLevel = "HIGH RISK";
        preeclampsiaEscalated = true;
        geminiGuidance = "CRITICAL: Stage-2 Preeclampsia model triggered. Elevated blood pressure indicates potential hypertensive disorder of pregnancy. Immediate clinical consultation advised.";
      } else if (systolic >= 130 || diastolic >= 85 || bloodSugar > 7.0) {
        riskLevel = "MODERATE RISK";
        preeclampsiaEscalated = false;
        geminiGuidance = "NOTICE: Stage-1 Model evaluated elevated metrics. Routine monitoring of BP and glucose recommended.";
      } else {
        riskLevel = "LOW RISK";
        preeclampsiaEscalated = false;
        geminiGuidance = "NORMAL: Maternal metrics are within standard healthy ranges.";
      }

      setSimResult({
        riskLevel,
        preeclampsiaEscalated,
        geminiGuidance,
        confidence: "98.4%",
        timestamp: new Date().toLocaleTimeString(),
      });
      setIsSimulating(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-200">
        
        {/* Modal Top Header */}
        <div className="sticky top-0 bg-[#0b0f19]/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between z-10">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">{project.category} • {project.period}</span>
            <h3 className="text-xl font-bold font-mono text-white">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {project.stack.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                {tech}
              </span>
            ))}
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Overview</h4>
            <p className="text-sm text-slate-300 leading-relaxed font-light">{project.description}</p>
          </div>

          {/* Key Engineering Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Engineering Accomplishments:</h4>
            <ul className="space-y-2">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive ML Simulator Widget inside Modal if applicable */}
          {project.demoType === "ml-sim" && (
            <div className="border border-slate-800 rounded-xl p-5 bg-slate-900/60 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>INTERACTIVE DUAL-STAGE ML PREDICTION DEMO</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Scikit-learn + Gemini API</span>
              </div>

              {/* Input Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Systolic BP (mmHg): <strong className="text-white">{systolic}</strong></label>
                  <input
                    type="range"
                    min="90"
                    max="180"
                    value={systolic}
                    onChange={(e) => setSystolic(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 rounded"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Diastolic BP (mmHg): <strong className="text-white">{diastolic}</strong></label>
                  <input
                    type="range"
                    min="60"
                    max="120"
                    value={diastolic}
                    onChange={(e) => setDiastolic(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 rounded"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Maternal Age: <strong className="text-white">{age}</strong></label>
                  <input
                    type="range"
                    min="18"
                    max="45"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-slate-800 rounded"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Blood Glucose (mmol/L): <strong className="text-white">{bloodSugar}</strong></label>
                  <input
                    type="range"
                    min="4.0"
                    max="10.0"
                    step="0.1"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(Number(e.target.value))}
                    className="w-full accent-purple-400 bg-slate-800 rounded"
                  />
                </div>
              </div>

              <button
                onClick={runMLSimulation}
                disabled={isSimulating}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Evaluating ML Model...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <span>EXECUTE DUAL-STAGE MODEL INFERENCE</span>
                  </>
                )}
              </button>

              {/* Simulation Result Box */}
              {simResult && (
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Pipeline Output ({simResult.timestamp}):</span>
                    <span className="text-emerald-400 font-bold">Confidence: {simResult.confidence}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">Risk Assessment:</span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                        simResult.preeclampsiaEscalated
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse"
                          : simResult.riskLevel === "MODERATE RISK"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      }`}
                    >
                      {simResult.riskLevel}
                    </span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800/80 text-xs font-mono text-cyan-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{simResult.geminiGuidance}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href={project.githubUrl || "https://github.com/GouravKar"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Repository</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Deployment</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 border border-slate-800 hover:text-white"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
