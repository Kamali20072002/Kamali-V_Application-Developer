"use client";
import { useEffect, useState } from "react";
import CanvasBackground from "./CanvasBackground";
import FloatingElements from "./FloatingElements";

export default function Hero() {
  const [counts, setCounts] = useState({ c1: 0, c2: 0, c3: 0 });

  useEffect(() => {
    // Force scroll to top on load
    window.scrollTo(0, 0);

    // Reveal animations
    const elements = ["hbadge", "hname", "hrole", "hdesc", "hstats", "hcta", "heroImg"];
    elements.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.classList.add("in"), 1200 + i * 150);
      }
    });

    // Stats counter
    const targets = { c1: 6, c2: 12000, c3: 14 };
    const dur = 2200;
    const start = performance.now();

    const update = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounts({
        c1: Math.floor(ease * targets.c1),
        c2: Math.floor(ease * targets.c2),
        c3: Math.floor(ease * targets.c3),
      });
      if (p < 1) requestAnimationFrame(update);
    };
    setTimeout(() => requestAnimationFrame(update), 1800);
  }, []);

  return (
    <section className="hero" id="hero">
      <CanvasBackground />
      <FloatingElements />
      <div className="hero-glow">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>
      <div className="hero-grid"></div>

      <div className="hero-text">
        <div className="hero-badge" id="hbadge">
          Available for opportunities
        </div>
        <div className="hero-name" id="hname">
          <div className="hero-name-inner">
            <span className="name-first">Kamali</span>
            <span className="name-last">V.</span>
          </div>
        </div>
        <p className="hero-role" id="hrole">
          Flutter Dev · <em>Full-Stack</em> Engineer
        </p>
        <p className="hero-desc" id="hdesc">
          2 years shipping cross-platform mobile apps & scalable backends — from
          Figma mockups to Google Play, pixel-perfect and production-grade.
        </p>
        <div className="hero-stats" id="hstats">
          <div className="stat">
            <span className="stat-n">{counts.c1}+</span>
            <span className="stat-l">Live Apps</span>
          </div>
          <div className="stat">
            <span className="stat-n">
              {counts.c2 >= 1000 ? (counts.c2 / 1000).toFixed(1) + "k" : counts.c2}+
            </span>
            <span className="stat-l">Active Users</span>
          </div>
          <div className="stat">
            <span className="stat-n">{counts.c3}+</span>
            <span className="stat-l">Products</span>
          </div>
          <div className="stat">
            <span className="stat-n">2yr</span>
            <span className="stat-l">Experience</span>
          </div>
        </div>
        <div className="hero-cta" id="hcta">
          <a href="#experience" className="btn btn-p">
            View My Work
          </a>
          <a href="#contact" className="btn btn-o">
            Hire Me
          </a>
        </div>
      </div>

      <div className="hero-img-wrap">
        <div className="img-glow"></div>
        {/* Placeholder image as none was provided */}
        <img
          className="hero-img"
          id="heroImg"
          src="/images/heroimage.png"
          alt="Kamali V"
        />
      </div>

      <div className="scroll-hint">
        <div className="sh-line"></div>
        <div className="sh-dot"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
