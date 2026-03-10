"use client";
import { useEffect, useRef } from "react";

const skills = [
  { name: "Flutter / Dart", pct: 95, color: "bb" },
  { name: "GetX State Management", pct: 92, color: "bb" },
  { name: "React.js / React Vite", pct: 88, color: "bb" },
  { name: "Next.js", pct: 82, color: "bb" },
  { name: "UI/UX · Figma", pct: 85, color: "bb" },
  { name: "Node.js / Express", pct: 85, color: "bg" },
  { name: "MongoDB / PostgreSQL", pct: 80, color: "bg" },
  { name: "Docker / CI-CD", pct: 78, color: "bg" },
  { name: "WebSocket / MQTT", pct: 88, color: "bp" },
  { name: "Firebase / Redis / Kafka", pct: 75, color: "bp" },
];

const pills = [
  "Flutter", "Dart", "Firebase", "Node.js", "Express", "MongoDB", "PostgreSQL",
  "React", "Next.js", "GetX", "Bloc", "Provider", "Socket.IO", "MQTT", "Redis",
  "Docker", "CI/CD", "Git", "Figma", "UI/UX", "Responsive Design", "Rest API",
  "GraphQL", "JavaScript", "TypeScript", "Python", "SQL", "Tailwind CSS"
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            const bars = entry.target.querySelectorAll(".bar-fg[data-w]");
            bars.forEach((bar: any) => {
              setTimeout(() => {
                bar.style.width = bar.dataset.w + "%";
              }, 100);
            });
            const rules = entry.target.querySelectorAll(".rule");
            rules.forEach((rule) => {
              setTimeout(() => rule.classList.add("on"), 200);
            });
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -36px 0px" }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal, .reveal-l, .reveal-r");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="sec" id="skills" ref={sectionRef}>
      <div className="sec-inner">
        <div className="reveal">
          <span className="eyebrow">// Core Competencies</span>
          <h2 className="heading">
            Skills & <span>Technologies</span>
          </h2>
          <div className="rule" id="rule1"></div>
        </div>
        <div className="sk-grid">
          <div className="reveal-l" style={{ transitionDelay: ".1s" }}>
            <div className="sk-gl gl-b">Mobile & Frontend</div>
            {skills.slice(0, 5).map((sk) => (
              <div key={sk.name} className="sk-item">
                <div className="sk-top">
                  <span className="sk-name">{sk.name}</span>
                  <span className={`sk-pct ${sk.color === "bb" ? "pb" : sk.color === "bg" ? "pg" : "pp"}`}>
                    {sk.pct}%
                  </span>
                </div>
                <div className="bar-bg">
                  <div className={`bar-fg ${sk.color}`} data-w={sk.pct}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal-r" style={{ transitionDelay: ".2s" }}>
            <div className="sk-gl gl-g">Backend & DevOps</div>
            {skills.slice(5).map((sk) => (
              <div key={sk.name} className="sk-item">
                <div className="sk-top">
                  <span className="sk-name">{sk.name}</span>
                  <span className={`sk-pct ${sk.color === "bb" ? "pb" : sk.color === "bg" ? "pg" : "pp"}`}>
                    {sk.pct}%
                  </span>
                </div>
                <div className="bar-bg">
                  <div className={`bar-fg ${sk.color}`} data-w={sk.pct}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-section reveal" style={{ transitionDelay: ".3s" }}>
          <div className="marquee-track">
            {[...pills, ...pills].map((p, i) => (
              <span key={i} className="mpill">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
