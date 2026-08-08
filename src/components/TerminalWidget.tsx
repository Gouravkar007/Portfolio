"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Play, RefreshCw, CheckCircle2, CornerDownLeft, Sparkles, AlertCircle } from "lucide-react";

export const TerminalWidget: React.FC = () => {
  const [inputCommand, setInputCommand] = useState("");
  const [logs, setLogs] = useState<Array<{ type: "cmd" | "out" | "err" | "success"; text: string }>>([
    { type: "out", text: "// INITIALIZING GOURAV_KAR ARCHITECTURE ENVIRONMENT..." },
    { type: "out", text: "✓ Connected to Spring Boot 3.x REST Gateway [Port 8080]" },
    { type: "out", text: "✓ Dual-Stage Scikit-Learn & Gemini ML Pipeline initialized." },
    { type: "success", text: 'Type "help" or click presets below to execute commands.' },
  ]);

  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs = [...logs, { type: "cmd" as const, text: `> ${cmdStr}` }];

    switch (trimmed) {
      case "help":
        newLogs.push(
          { type: "out", text: "AVAILABLE COMMANDS:" },
          { type: "out", text: "  status        - Check backend & ML service status" },
          { type: "out", text: "  skills        - List technical skills & frameworks" },
          { type: "out", text: "  experience    - Display Acceleratron internship summary" },
          { type: "out", text: "  projects      - Overview of dual-stage ML & ERP projects" },
          { type: "out", text: "  run-pipeline  - Simulate Dual-Stage ML Risk Evaluation" },
          { type: "out", text: "  clear         - Clear terminal screen" }
        );
        break;

      case "status":
        newLogs.push(
          { type: "out", text: "[SYSTEM METRICS]" },
          { type: "out", text: "• Status: ONLINE (Production Ready)" },
          { type: "out", text: "• Role: Java Backend & ML Developer" },
          { type: "out", text: "• Core Stack: Java, Spring Boot, Python, Scikit-learn, SQL Server" },
          { type: "out", text: "• Cloud Infrastructure: Render, GitHub Pages, Docker" },
          { type: "success", text: "• API Gateway: 99.9% Uptime | RESTful Architecture Certified" }
        );
        break;

      case "skills":
        newLogs.push(
          { type: "out", text: "[TECHNICAL SKILL TREE]" },
          { type: "out", text: "• Languages: Java, Python" },
          { type: "out", text: "• Backend: Spring Boot, FastAPI, Pydantic, Microservices, REST APIs" },
          { type: "out", text: "• AI & ML: Scikit-learn, Pandas, NumPy, TensorFlow, Gemini API" },
          { type: "out", text: "• Database & DevOps: SQL Server, Docker, Git, Jira, Agile/Scrum" }
        );
        break;

      case "experience":
        newLogs.push(
          { type: "out", text: "[WORK EXPERIENCE]" },
          { type: "out", text: "• Role: Backend Developer Intern @ Acceleratron (Feb 2024 - June 2026)" },
          { type: "out", text: "• Key Focus: Spring Boot REST APIs, Garment Industry ERP system" },
          { type: "success", text: "• Award: Received Team Management Recognition Award" }
        );
        break;

      case "projects":
        newLogs.push(
          { type: "out", text: "[FEATURED PROJECTS]" },
          { type: "out", text: "1. AI Maternal Health & Preeclampsia Risk Prediction System (Python/ML/Render)" },
          { type: "out", text: "2. Garment Industry ERP Portal (Spring Boot/SQL Server)" },
          { type: "out", text: "3. A2Z Fast Food Terminal Ordering App (FastAPI/Python)" },
          { type: "out", text: "4. Login Alert Windows Security Script (Python/SMTP)" }
        );
        break;

      case "run-pipeline":
        newLogs.push(
          { type: "out", text: "⚡ EXECUTING DUAL-STAGE ML PREDICTION PIPELINE..." },
          { type: "out", text: "[Stage 1] Loading maternal clinical metrics into Scikit-learn preprocessor..." },
          { type: "out", text: "[Stage 1] Primary Risk Model: General Maternal Health Score = ELEVATED" },
          { type: "out", text: "[Stage 2] Escalating to Specialized Preeclampsia Risk Classifier..." },
          { type: "out", text: "[Stage 2] Gemini API Assistant synthesizing automated medical summary..." },
          { type: "success", text: "✓ Risk Report & Automated PDF payload generated successfully." }
        );
        break;

      case "clear":
        setLogs([]);
        setInputCommand("");
        return;

      default:
        newLogs.push({
          type: "err",
          text: `Command not recognized: "${cmdStr}". Type "help" for available commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputCommand("");
  };

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-[#0b0f19]/90 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-xs text-slate-300 transition-all duration-300 hover:border-cyan-500/40">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] text-slate-400 font-semibold tracking-wide">
            GouravKar_Shell ~ bash (v3.2)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            SPRING_BOOT_ACTIVE
          </span>
          <button
            onClick={() => handleCommand("clear")}
            className="text-slate-400 hover:text-white transition-colors"
            title="Clear Console"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Command Buttons */}
      <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/60 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-slate-500 font-semibold">PRESETS:</span>
        {[
          { label: "status", cmd: "status" },
          { label: "skills", cmd: "skills" },
          { label: "run-pipeline", cmd: "run-pipeline" },
          { label: "projects", cmd: "projects" },
        ].map((item) => (
          <button
            key={item.cmd}
            onClick={() => handleCommand(item.cmd)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all flex items-center gap-1"
          >
            <Play className="w-2.5 h-2.5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Terminal Output Stream */}
      <div
        ref={logContainerRef}
        className="p-4 h-64 overflow-y-auto space-y-1.5 font-mono text-[12px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-800"
      >
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-2">
            {log.type === "cmd" && <span className="text-cyan-400 font-bold">{log.text}</span>}
            {log.type === "out" && <span className="text-slate-300">{log.text}</span>}
            {log.type === "err" && <span className="text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{log.text}</span>}
            {log.type === "success" && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {log.text}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Input Prompt */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputCommand);
        }}
        className="flex items-center px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 gap-2"
      >
        <span className="text-emerald-400 font-bold font-mono text-sm">$</span>
        <input
          type="text"
          value={inputCommand}
          onChange={(e) => setInputCommand(e.target.value)}
          placeholder='Type a command (e.g. "help", "status", "run-pipeline")'
          className="w-full bg-transparent text-cyan-200 placeholder-slate-600 focus:outline-none font-mono text-xs"
        />
        <button
          type="submit"
          className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
