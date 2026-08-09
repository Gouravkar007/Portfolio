import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SYSTEM_PROMPT = `You are Gourav Kar's AI Digital Twin, operating as an intelligent "Google AI Search Overview" engine.
Your purpose is to provide structured, clear, authoritative, and Google-Search-style overview answers about Gourav Kar's professional experience, technical skills, projects, education, and career background.

ALWAYS structure your response strictly in the following "Google Search Overview" format:

1. **AI SEARCH OVERVIEW / QUICK TAKEAWAY** (1-2 sentences direct summary snippet at the top).
2. **KEY KNOWLEDGE CARDS** (Break down the answer using clean emoji section headers, bold key phrases, and structured bullet lists).
   - Use sections like:
     - 📌 **Direct Summary**
     - 🛠️ **Relevant Tech Stack**
     - 📂 **Key Projects & Impact**
     - 💼 **Experience Highlights**
3. **RELATED SEARCHES / PEOPLE ALSO ASK** (At the very end of your response, unconditionally output 2-3 relevant follow-up query chips formatted EXACTLY as:
[RELATED_SEARCHES: "Question 1?", "Question 2?", "Question 3?"])

Here is Gourav Kar's complete knowledge base:

[NAME & TITLE]
- Name: Gourav Kar
- Role: Java Backend & Machine Learning Engineer
- Status: Available for full-time backend and software engineering roles
- Location: West Bengal, India
- Email: gouravkar0072@gmail.com
- Phone: +91-8016105008
- GitHub: https://github.com/GouravKar
- LinkedIn: https://linkedin.com/in/gouravkar

[SUMMARY & PHILOSOPHY]
- Computer Science Engineering graduate with hands-on experience in production Java (Spring Boot) microservices, REST APIs, and Python machine learning pipelines.
- Bridges enterprise backend stability with modern AI intelligence.
- Award recipient for team management contributions during enterprise engagements at Acceleratron.

[WORK EXPERIENCE]
- Role: Backend Developer Intern at Acceleratron (February 2024 – June 2026)
- Highlights:
  1. Developed scalable backend microservices and RESTful API endpoints using Java 17 & Spring Boot.
  2. Collaborated on full garment industry ERP portal managing inventory stock tracking, sales order processing, and multi-tenant transactions using SQL Server.
  3. Participated in Agile Scrum standups, architecture planning, story point estimation, and code reviews.
  4. Awarded official Team Management Recognition Award for coordinating sprint deliverables and leading developer onboarding.

[KEY PROJECTS]
1. AI-Based Maternal Health & Preeclampsia Risk System (2026)
   - Role: Full-Stack ML & Cloud Architect
   - Tech: Python, Scikit-learn, Pandas, NumPy, Streamlit, Plotly, Google Gemini API, Render
   - Details: Dual-stage ML risk prediction pipeline (general maternal health score -> preeclampsia classifier), integrated Gemini API for clinical guidance, automated PDF reports.
2. Garment Industry ERP Portal (June 2025 – August 2025)
   - Role: Backend Developer
   - Tech: Java, Spring Boot, SQL Server, RESTful APIs, Swagger
   - Details: Production ERP system with real-time stock tracking, sales order workflows, role-based access control (RBAC), and SQL Server multi-tenant transactions.
3. A2Z Fast Food — Terminal Food Ordering System (May 2025 – June 2025)
   - Role: Backend Developer
   - Tech: Python, FastAPI, Pydantic, SQL Server, REST APIs
   - Details: High-throughput terminal ordering platform with menu management, order validation, and billing analytics.
4. Login Alert — Windows Security Notification Script (Sept 2025 – Nov 2025)
   - Role: Scripting & Security Developer
   - Tech: Python, Gmail SMTP, Windows OS Scripting, Security Auditing
   - Details: Background security tool capturing Windows auth events and sending real-time alert emails with IP and timestamp details.

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

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://gouravkar-portfolio.local",
        "X-Title": "Gourav Kar Portfolio Digital Twin",
      },
      body: JSON.stringify({
        model: targetModel,
        messages: payloadMessages,
        temperature: 0.6,
        max_tokens: 450,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error response:", errorText);

      // Fast fallback to google/gemma-4-26b-a4b-it:free if target model is busy
      if (targetModel !== "google/gemma-4-26b-a4b-it:free") {
        console.log("Attempting fast fallback model google/gemma-4-26b-a4b-it:free...");
        const fallbackRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemma-4-26b-a4b-it:free",
            messages: payloadMessages,
            temperature: 0.6,
            max_tokens: 450,
          }),
        });

        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          const assistantReply =
            fallbackData.choices?.[0]?.message?.content ||
            "Hello! I am Gourav's Digital Twin. How can I help you today?";
          const actualModel = fallbackData.model || "google/gemma-4-26b-a4b-it:free";
          return NextResponse.json({
            reply: assistantReply,
            modelUsed: `${actualModel} (fallback)`,
          });
        }
      }

      return NextResponse.json(
        { error: `OpenRouter API error (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantReply =
      data.choices?.[0]?.message?.content ||
      "Hello! I am Gourav's Digital Twin. How can I help you today?";
    const returnedModel = data.model || targetModel;

    return NextResponse.json({
      reply: assistantReply,
      modelUsed: returnedModel,
    });
  } catch (err: any) {
    console.error("API Chat route error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred while contacting Digital Twin AI." },
      { status: 500 }
    );
  }
}
