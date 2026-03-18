"use client";
import { useEffect, useRef, useState } from "react";

const experience = [
  {
    id: "p1",
    company: "Outdid Unified",
    period: "Jan 2024 – Present",
    role: "Application Developer",
    location: "Outdid Unified Pvt. Ltd. · Bangalore, KA",
    projects: [
      {
        name: "🔋 Ion Hive — EV Charging App",
        badge: "Flutter",
        badgeClass: "b-fl",
        points: [
          "3 full version migrations; cut release cycle 40% via multi-flavor CI builds",
          "Real-time charger status via WebSocket & MQTT — 10,000 active users, sub-second latency",
          "Google Maps SDK across 500+ stations; Razorpay wallet & per-session payments",
          "End-to-end Play Store & App Store releases for 3 isolated client environments",
        ],
        url: "https://play.google.com/store/apps/details?id=com.outdidev.ev_app",
      },
      {
        name: "⚡ Sparkminda — White-Label EV Platform",
        badge: "Flutter",
        badgeClass: "b-fl",
        points: [
          "White-label fork of Ion Hive with custom branding — 2-week turnaround",
          "Real-time web dashboard monitoring 200 EV chargers & fleet vehicles",
        ],
      },
      {
        name: "🗺️ Vehicle Tracking System",
        badge: "Flutter",
        badgeClass: "b-fl",
        points: [
          "Socket.IO real-time GPS for 50 concurrent vehicles with geofence alerts",
          "Route history, push notifications — 30% faster incident response time",
        ],
      },
      {
        name: "📊 Battery Health Monitoring Dashboard",
        badge: "Next.js",
        badgeClass: "b-nx",
        points: [
          "WebSocket live telemetry for 8 EV battery parameters; 60% less manual inspection",
        ],
      },
      {
        name: "📦 Inventory Management System (Next.js & Socket.IO)",
        badge: "Next.js",
        badgeClass: "b-nx",
        points: [
          "Built a Next.js inventory management platform with role-based access control across 3 roles — Admin, StockManager, and Employee — each with tailored dashboards and permissions.",
          "Integrated a real-time in-app chat system using Socket.IO, enabling instant communication between roles for streamlined inventory coordination.",
        ],
      },
      {
        name: "🛒 Semicon Space — B2B E-Commerce",
        badge: "Node.js",
        badgeClass: "b-no",
        points: [
          "Microservices for 1,000 SKUs; 35% throughput boost; Docker deploy: 2 hr → 15 min",
        ],
      },
      {
        name: "🖥️ Admin Portals & Internal Tools",
        badge: "React",
        badgeClass: "b-re",
        points: [
          "15 Figma screens → pixel-perfect dashboards for 3 client orgs; 45% faster page loads",
          "Diwali Fund Collection module handling 200,000+ ₹ in contributions",
        ],
      },
    ],
  },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(experience[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            const rule = entry.target.querySelector(".rule");
            if (rule) setTimeout(() => rule.classList.add("on"), 200);
          }
        });
      },
      { threshold: 0.08 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal, .reveal-l, .reveal-r");
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="sec" id="experience" ref={sectionRef}>
      <div className="sec-inner">
        <div className="reveal">
          <span className="eyebrow">{"// Work History"}</span>
          <h2 className="heading">
            Professional <span>Experience</span>
          </h2>
          <div className="rule" id="rule2"></div>
        </div>
        <div className="exp-wrap reveal">
          <div className="exp-tabs">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className={`exp-tab ${activeTab === exp.id ? "active" : ""}`}
                onClick={() => setActiveTab(exp.id)}
              >
                <div className="et-co">{exp.company}</div>
                <div className="et-period">{exp.period}</div>
              </div>
            ))}
          </div>
          <div className="exp-body">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className={`exp-panel ${activeTab === exp.id ? "active" : ""}`}
                id={exp.id}
              >
                <div className="ep-role">{exp.role}</div>
                <div className="ep-co">{exp.location}</div>
                {exp.projects.map((proj, idx) => (
                  <div key={idx} className="proj">
                    <div className="proj-hd">
                      <span className="proj-nm">{proj.name}</span>
                      <span className={`badge ${proj.badgeClass}`}>
                        {proj.badge}
                      </span>
                    </div>
                    <ul className="proj-ul">
                      {proj.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="proj-url"
                      >
                        ↗ Play Store
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
