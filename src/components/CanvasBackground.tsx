"use client";
import { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let w = (cvs.width = window.innerWidth);
    let h = (cvs.height = window.innerHeight);
    const pts: any[] = [];
    const count = w < 768 ? 16 : 38;

    class Pt {
      x: number;
      y: number;
      vx: number;
      vy: number;
      sz: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.sz = Math.random() * 1.5 + 0.5;
      }
      upd() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      drw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.25)";
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) pts.push(new Pt());

    function anim() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        p.upd();
        p.drw();
      });
      pts.forEach((p1, i) => {
        for (let j = i + 1; j < count; j++) {
          const p2 = pts[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.12 * (1 - dist / 140)})`;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(anim);
    }
    anim();

    const handleResize = () => {
      w = cvs.width = window.innerWidth;
      h = cvs.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} id="pcvs"></canvas>;
}
