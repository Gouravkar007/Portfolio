"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RefreshCw,
  Bot,
  User,
  Cpu,
  ChevronDown,
  CornerDownLeft,
  AlertCircle,
  Search,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface DigitalTwinChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
}

export const DigitalTwinChat: React.FC<DigitalTwinChatProps> = ({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isChatOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const toggleChat = () => {
    if (externalOnClose && externalIsOpen) {
      externalOnClose();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<string>("openrouter/free");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "👋 Hello! I am **Gourav Kar's Digital Twin**, an AI model trained on Gourav's experience, Spring Boot backend expertise, machine learning projects, and qualifications.\n\nAsk me anything about Gourav's work at Acceleratron, dual-stage ML risk models, technical stack, or availability!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      modelUsed: "openrouter/free",
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What are your core Spring Boot & Java skills?",
    "Tell me about your internship at Acceleratron.",
    "Explain your AI Maternal Risk prediction project.",
    "How can I contact or hire you?",
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setLoading(true);
    setError(null);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to fetch response from OpenRouter API.");
      }

      if (data.modelUsed) {
        setActiveModel(data.modelUsed);
      }

      const botMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: data.modelUsed || activeModel,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Digital Twin Chat Error:", err);
      setError(err.message || "Failed to reach Digital Twin server.");
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `⚠️ **Connection issue**: ${
          err.message || "Unable to retrieve reply."
        }\n\nPlease check your OPENROUTER_API_KEY or network connection and try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Conversation cleared! I'm ready to answer any questions about Gourav's backend microservices, ML models, or background.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        modelUsed: activeModel,
      },
    ]);
    setError(null);
  };

  return (
    <>
      {/* Glassmorphism Dark Backdrop Overlay with Smooth Blur */}
      {isChatOpen && (
        <div
          onClick={toggleChat}
          className="fixed inset-0 z-40 bg-[#07090e]/70 backdrop-blur-md transition-all animate-in fade-in duration-300 cursor-pointer"
        />
      )}

      {/* Floating Glassmorphism Chat Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh] z-50 rounded-2xl border border-slate-800 bg-[#090d16]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 font-mono text-xs">
          
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Dedicated Futuristic AI Bot Avatar Icon */}
              <div className="relative w-10 h-10 rounded-xl border border-cyan-500/40 bg-slate-950 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.2)] shrink-0">
                <Bot className="w-6 h-6 text-cyan-300 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono font-bold text-white text-sm">Gourav Kar</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    DIGITAL TWIN
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Online | AI Twin</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Clear Conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleChat}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close Window"
              >
                <X className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Messages Stream Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800"
          >
            {messages.map((msg) => {
              const isUser = msg.role === "user";

              // Parse Related Searches if present in assistant response
              let mainContent = msg.content;
              let relatedSearches: string[] = [];

              if (!isUser) {
                const match = msg.content.match(/\[RELATED_SEARCHES:\s*([\s\S]*?)\]/);
                if (match) {
                  try {
                    const rawJson = `[${match[1]}]`;
                    relatedSearches = JSON.parse(rawJson);
                  } catch {
                    const matches = match[1].match(/"([^"]+)"/g);
                    if (matches) {
                      relatedSearches = matches.map((s) => s.replace(/"/g, ""));
                    }
                  }
                  mainContent = msg.content.replace(/\[RELATED_SEARCHES:\s*[\s\S]*?\]/, "").trim();
                }
              }

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${
                      isUser
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                        : "bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 text-cyan-300 border-cyan-500/40 shadow-sm"
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>

                  <div
                    className={`max-w-[85%] p-4 rounded-2xl space-y-2 leading-relaxed font-sans text-xs ${
                      isUser
                        ? "bg-cyan-500/15 border border-cyan-500/30 text-white rounded-tr-none"
                        : "bg-slate-900/95 border border-slate-800/90 text-slate-200 rounded-tl-none shadow-xl"
                    }`}
                  >
                    {/* Google AI Overview Badge for Assistant Messages */}
                    {!isUser && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 mb-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span className="font-semibold uppercase tracking-wider">AI SEARCH OVERVIEW</span>
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">{mainContent}</div>

                    {/* Google Style "People Also Ask..." Interactive Search Chips */}
                    {!isUser && relatedSearches.length > 0 && (
                      <div className="pt-3 border-t border-slate-800/80 space-y-2 mt-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 font-semibold">
                          <Search className="w-3 h-3 text-cyan-400" />
                          <span>People also ask:</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {relatedSearches.map((query, qIdx) => (
                            <button
                              key={qIdx}
                              onClick={() => handleSendMessage(query)}
                              className="text-left px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-cyan-300 hover:border-cyan-500/50 hover:text-white transition-all text-[11px] font-mono flex items-center justify-between group"
                            >
                              <span>{query}</span>
                              <CornerDownLeft className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/40 text-[9px] font-mono text-slate-500">
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg border border-slate-700 bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-900/90 border border-slate-800 text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                  <span className="text-[10px] text-slate-400 ml-1 font-mono">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Chips */}
          {messages.length <= 3 && (
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40">
              <span className="text-[10px] text-slate-500 font-mono block mb-1.5">
                SUGGESTED QUESTIONS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-all text-[10px] text-left truncate max-w-full"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about Gourav's experience, stack, or projects..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-sans"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
