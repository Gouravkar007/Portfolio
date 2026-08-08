import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gourav Kar | Java Backend & Machine Learning Engineer",
  description:
    "Enterprise Meets Edgy Portfolio of Gourav Kar — Java Backend Developer, Spring Boot Microservices Architect, and Machine Learning Specialist.",
  keywords: [
    "Gourav Kar",
    "Java Developer",
    "Spring Boot",
    "Machine Learning",
    "FastAPI",
    "Scikit-learn",
    "Backend Engineer",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#07090e] text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
