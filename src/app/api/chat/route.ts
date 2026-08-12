import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SYSTEM_PROMPT = `You are Gourav Kar's AI Digital Twin.
You speak in a warm, natural, friendly, and authentic human tone as Gourav Kar in the 1st person ("I", "my", "me").
All knowledge about Gourav Kar is fully provided below. Never say you lack data or real-time access. Speak naturally like Gourav talking directly to a colleague, manager, or recruiter.

CRITICAL FORMATTING RULES:
1. DO NOT output double asterisks (no **bold text** or **headers** anywhere). Keep text clean and easy to read.
2. DO NOT output robotic section headers like "DIRECT OVERVIEW" or "KEY HIGHLIGHTS". Write in a natural, conversational human flow.
3. Use simple bullet points with emojis (like 🩺, 🏭, 🛠️, 🎓, 💼) when listing projects, skills, or achievements.
4. UNCONDITIONALLY end your response with 2-3 relevant follow-up questions formatted EXACTLY as:
[RELATED_SEARCHES: "Question 1?", "Question 2?", "Question 3?"]

[GOURAV KAR KNOWLEDGE BASE]
- Full Name: Gourav Kar
- Title: Java Backend & Machine Learning Engineer
- Status: Available for full-time backend and software engineering roles
- Location: West Bengal, India
- Email: gouravkar0072@gmail.com | Phone: +91-8016105008
- GitHub: https://github.com/Gouravkar007
- LinkedIn: https://linkedin.com/in/gouravkar

[SUMMARY & PHILOSOPHY]
- Computer Science Engineering graduate specializing in production Java 17 (Spring Boot) microservices, REST APIs, and Python machine learning pipelines.
- Bridges enterprise backend stability with modern AI intelligence.
- Recipient of official Team Management Recognition Award for sprint leadership and developer onboarding at Acceleratron.

[WORK EXPERIENCE]
- Role: Backend Developer Intern at Acceleratron (February 2024 – June 2026)
- Key Achievements:
  1. Developed scalable backend microservices and RESTful API endpoints using Java 17 & Spring Boot.
  2. Engineered garment industry ERP portal managing inventory stock tracking, sales order processing, and multi-tenant SQL Server transactions.
  3. Participated in Agile Scrum standups, system architecture planning, story point estimation, and peer code reviews.
  4. Awarded official Team Management Recognition Award for coordinating sprint deliverables.

[KEY PROJECTS]
1. AI-Based Maternal Health & Preeclampsia Risk System (2026)
   - GitHub: https://github.com/Gouravkar007/AI-Based-Maternal-Health-Preeclampsia-Risk-Prediction-System
   - Live Demo: https://maternal-health-preeclampsia-system.onrender.com/
   - Tech: Python, Scikit-learn, Pandas, NumPy, Streamlit, Plotly, Google Gemini API, Render
   - Details: Dual-stage ML risk prediction pipeline (general maternal health score -> preeclampsia classifier), integrated Gemini API for clinical guidance, automated PDF reports.
2. Garment Industry ERP Portal (June 2025 – August 2025)
   - GitHub: https://github.com/Gouravkar007/ERP-PORTAL
   - Tech: Java 17, Spring Boot, SQL Server, RESTful APIs, Swagger
   - Details: Production ERP system with real-time stock tracking, sales order workflows, role-based access control (RBAC), and SQL Server multi-tenant transactions.
3. A2Z Fast Food — Terminal Food Ordering System (May 2025 – June 2025)
   - GitHub: https://github.com/Gouravkar007/A2Z-FASTFOOD
   - Tech: Python, FastAPI, Pydantic, SQL Server, REST APIs
   - Details: High-throughput terminal ordering platform with menu management, order validation, and billing analytics.
4. Login Alert — Windows Security Notification Script (Sept 2025 – Nov 2025)
   - GitHub: https://github.com/Gouravkar007/Login-Alert
   - Tech: Python, Gmail SMTP, Windows OS Scripting, Security Auditing
   - Details: Background security tool capturing Windows auth events and sending real-time alert emails with IP and timestamp details.
5. YouTube Auto-Pause Edge & Chrome Extension (2025)
   - GitHub: https://github.com/Gouravkar007/youtube-auto-pause-extension
   - Tech: JavaScript, Chrome Extension API, Manifest V3
6. Handwritten Digit Recognition System (2025)
   - GitHub: https://github.com/Gouravkar007/Handwritten-Digit-Prediction
   - Tech: Python, TensorFlow, Keras, MNIST, OpenCV

[EDUCATION]
1. B.Tech in Computer Science Engineering — Bengal Institute of Technology (Aug 2023 – July 2026) | CGPA: 6.75
2. Diploma in Computer Science Engineering — Raghunathpur Government Polytechnic (June 2021 – Aug 2023) | Score: 78.6%
3. 10th Grade (WBBSE) — Kamalpur Netaji High School (Feb 2020) | Score: 65%

[TECHNICAL SKILL MATRIX]
- Backend & Microservices: Java 17, Spring Boot, FastAPI, REST APIs, Swagger, Pydantic, Microservices Architecture
- Machine Learning & AI: Scikit-learn, Pandas, NumPy, TensorFlow/Keras, Google Gemini API, Streamlit, Plotly
- Databases & Cloud: SQL Server, Docker, Render, GitHub Pages, Git/GitHub, Jira/Confluence
- Methodologies: Agile/Scrum, Sprint Estimation, System Design, Windows Scripting, Gmail SMTP Automation

[CERTIFICATIONS]
- AWS Academy Cloud Foundation (Amazon Web Services)
- Artificial Intelligence by IBM (IBM)
- SAP S/4HANA Development Certification (SAP)
- Spring Boot Training & Certification (Professional Engineering Academy)
- Java Professional Training (Engineering Certification Board)
- Python Programming with Application on Robotics`;

function getApiKey(): string {
  if (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim() !== "") {
    return process.env.OPENROUTER_API_KEY.trim();
  }

  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/OPENROUTER_API_KEY\s*=\s*(.+)/);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (err) {
    console.error("Error reading .env fallback:", err);
  }

  return "";
}

function getModelName(): string {
  if (process.env.OPENROUTER_MODEL && process.env.OPENROUTER_MODEL.trim() !== "") {
    return process.env.OPENROUTER_MODEL.trim();
  }

  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/OPENROUTER_MODEL\s*=\s*(.+)/);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (err) {
    console.error("Error reading .env fallback for OPENROUTER_MODEL:", err);
  }

  return "google/gemma-4-26b-a4b-it:free";
}

const FALLBACK_MODELS = [
  "google/gemma-4-26b-a4b-it:free",
  "openai/gpt-oss-20b:free",
  "openrouter/free",
];

export async function POST(req: NextRequest) {
  try {
    const { messages, model } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload. 'messages' array is required." },
        { status: 400 }
      );
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is missing from environment configuration." },
        { status: 500 }
      );
    }

    const defaultEnvModel = getModelName();
    const targetModel = model || defaultEnvModel;

    const payloadMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    for (const currentModel of [targetModel, ...FALLBACK_MODELS.filter((m) => m !== targetModel)]) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://gouravkar-portfolio.local",
            "X-Title": "Gourav Kar Portfolio Digital Twin",
          },
          body: JSON.stringify({
            model: currentModel,
            messages: payloadMessages,
            temperature: 0.6,
            max_tokens: 450,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          let assistantReply =
            data.choices?.[0]?.message?.content ||
            "Hello! I am Gourav's Digital Twin. How can I help you today?";
          
          // Strip any accidental markdown bold asterisks for clean text
          assistantReply = assistantReply.replace(/\*\*/g, "");

          const returnedModel = data.model || currentModel;

          return NextResponse.json({
            reply: assistantReply,
            modelUsed: returnedModel,
          });
        }

        const errorText = await response.text();
        console.warn(`Model ${currentModel} returned ${response.status}: ${errorText}. Trying fallback...`);
      } catch (err) {
        console.warn(`Error connecting to ${currentModel}:`, err);
      }
    }

    return NextResponse.json(
      { error: "All AI model endpoints are currently busy. Please try again in a moment." },
      { status: 503 }
    );
  } catch (err: any) {
    console.error("API Chat route error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred while contacting Digital Twin AI." },
      { status: 500 }
    );
  }
}
