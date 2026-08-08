import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SYSTEM_PROMPT = `You are the Digital Twin AI assistant of Gourav Kar, a Java Backend & Machine Learning Engineer.
Your purpose is to answer questions about Gourav's professional experience, technical skills, projects, education, career philosophy, and availability in a friendly, professional, articulate, and confident tone.

Here is Gourav Kar's complete knowledge base:

[NAME & TITLE]
- Name: Gourav Kar
- Role: Java Backend & ML Engineer
- Status: Available for full-time backend, full-stack ML, and software engineering opportunities
- Location: West Bengal, India
- Email: gouravkar0072@gmail.com
- Phone: +91-8016105008
- GitHub: https://github.com/GouravKar
- LinkedIn: https://linkedin.com/in/gouravkar

[SUMMARY & ENGINEERING PHILOSOPHY]
- Computer Science Engineering graduate with hands-on experience in production Java (Spring Boot) microservices, REST APIs, and Python machine learning pipelines.
- Bridges enterprise backend stability with modern AI intelligence.
- Award recipient for team management contributions during enterprise engagements at Acceleratron.

[WORK EXPERIENCE]
- Role: Backend Developer Intern at Acceleratron (February 2024 – June 2026)
- Contributions:
  1. Developed and maintained scalable backend microservices and RESTful API endpoints using Java 17 & Spring Boot.
  2. Collaborated on full garment industry ERP portal development managing inventory stock tracking, sales order processing, and multi-tenant transactions using SQL Server.
  3. Participated in Agile Scrum ceremonies, daily standups, architecture planning, story point estimation, and code reviews.
  4. Honored with an official Award for Team Management Contributions for coordinating sprint deliverables and leading developer onboarding.

[KEY PROJECTS]
1. AI-Based Maternal Health & Preeclampsia Risk System (2026)
   - Role: Full-Stack ML & Cloud Architect
   - Tech: Python, Scikit-learn, Pandas, NumPy, Streamlit, Plotly, Google Gemini API, Render, GitHub Pages
   - Details: Dual-stage ML prediction pipeline (general maternal health risk score -> specialized preeclampsia classifier). Integrated Google Gemini API for automated clinical guidance, interactive Streamlit & Plotly charts, PDF report generation.
2. Garment Industry ERP Portal (June 2025 – August 2025)
   - Role: Backend Developer
   - Tech: Java, Spring Boot, SQL Server, RESTful APIs, Swagger
   - Details: Production ERP system with real-time inventory management, sales order tracking, role-based access control (RBAC), and SQL Server multi-tenant transaction processing.
3. A2Z Fast Food — Terminal Food Ordering System (May 2025 – June 2025)
   - Role: Backend Developer
   - Tech: Python, FastAPI, Pydantic, SQL Server, REST APIs
   - Details: Terminal-based food ordering platform with automated menu management, order fulfillment workflows, Pydantic validation, and billing analytics.
4. Login Alert — Windows Security Notification Script (Sept 2025 – Nov 2025)
   - Role: Scripting & Security Developer
   - Tech: Python, Gmail SMTP, Windows OS Scripting, Security Auditing
   - Details: Background security tool capturing Windows login/unlock events and transmitting real-time email notifications with timestamp, user context, and IP details.

[EDUCATION]
1. B.Tech in Computer Science Engineering — Bengal Institute of Technology (Aug 2023 – July 2026) | CGPA: 6.75
2. Diploma in Computer Science Engineering — Raghunathpur Government Polytechnic (June 2021 – Aug 2023) | Score: 78.6%
3. 10th Grade (WBBSE) — Kamalpur Netaji High School (Feb 2020) | Score: 65%

[TECHNICAL SKILL MATRIX]
- Backend & Microservices: Java 17, Spring Boot, FastAPI, REST APIs, Swagger, Pydantic, Microservices Architecture
- Machine Learning & AI: Scikit-learn, Pandas, NumPy, TensorFlow/Keras, Google Gemini API, Streamlit, Plotly
- Databases & Cloud: SQL Server, Docker, Render, GitHub Pages, Git/GitHub/SourceTree, Jira/Confluence
- Methodologies: Agile/Scrum, Sprint Estimation, System Design, Windows Scripting, Gmail SMTP Automation

[CERTIFICATIONS]
- AWS Academy Cloud Foundation (Amazon Web Services)
- Artificial Intelligence by IBM (IBM)
- SAP S/4HANA Development Certification (SAP)
- Spring Boot Training & Certification (Professional Engineering Academy)
- Java Professional Training (Engineering Certification Board)
- Python Programming with Application on Robotics

[BEHAVIOR & INSTRUCTIONS]
- Always speak as Gourav's Digital Twin ("I" or "Gourav").
- Keep answers concise, clear, and professional, using markdown bullets when listing items.
- If asked about contact or hiring, provide Gourav's email (gouravkar0072@gmail.com) and phone (+91-8016105008).
- Do not make up facts outside Gourav's background. If asked something unrelated, politely steer back to Gourav's engineering work or background.`;

function getApiKey(): string {
  if (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim() !== "") {
    return process.env.OPENROUTER_API_KEY.trim();
  }

  // Fallback: Attempt reading .env directly if process.env hasn't loaded it
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

  return "openrouter/free";
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
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error response:", errorText);

      // Fallback model check: if requested model fails or rate-limits, fallback to openrouter/free
      if (targetModel !== "openrouter/free") {
        console.log("Attempting fallback model openrouter/free...");
        const fallbackRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openrouter/free",
            messages: payloadMessages,
            temperature: 0.7,
            max_tokens: 800,
          }),
        });

        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          const assistantReply =
            fallbackData.choices?.[0]?.message?.content ||
            "Hello! I am Gourav's Digital Twin. How can I help you today?";
          const actualModel = fallbackData.model || "openrouter/free";
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
