"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = ["hero", "skills", "experience", "packages", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={`nav ${isVisible ? "visible" : ""}`} id="nav">
      <Link href="#hero" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/logo/kamali_v_favicon.png" alt="Logo" style={{ height: '32px', width: 'auto' }} />
        <span>KV.DEV</span>
      </Link>
      <ul className="nav-links">
        <li>
          <Link href="#hero" className={activeSection === "hero" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href="#skills"
            className={activeSection === "skills" ? "active" : ""}
          >
            Skills
          </Link>
        </li>
        <li>
          <Link
            href="#experience"
            className={activeSection === "experience" ? "active" : ""}
          >
            Experience
          </Link>
        </li>
        <li>
          <Link
            href="#packages"
            className={activeSection === "packages" ? "active" : ""}
          >
            Packages
          </Link>
        </li>
        <li>
          <Link
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
          >
            Contact
          </Link>
        </li>
        <li>
          <a
            href="/pdf/Kamali_V_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
