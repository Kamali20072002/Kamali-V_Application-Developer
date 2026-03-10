"use client";
import { useEffect, useRef } from "react";

const ICONS = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://www.svgrepo.com/show/443310/rocket.svg",
];

export default function FloatingElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let w = (cvs.width = window.innerWidth);
    let h = (cvs.height = window.innerHeight);
    const elements: any[] = [];
    const count = w < 768 ? 12 : 35; // Increased count for desktop, reduced for mobile

    const loadedImages: HTMLImageElement[] = [];
    let imagesProcessed = 0;

    ICONS.forEach((src) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      const handleLoad = () => {
        imagesProcessed++;
        loadedImages.push(img);
        if (imagesProcessed === ICONS.length && elements.length === 0) {
          init();
        }
      };
      img.onload = handleLoad;
      img.onerror = () => {
        imagesProcessed++;
        if (imagesProcessed === ICONS.length && elements.length === 0) {
          init();
        }
      };
    });

    class FloatingItem {
      x: number;
      y: number;
      vx: number;
      vy: number;
      sz: number;
      img: HTMLImageElement;
      opacity: number;
      rot: number;
      rotV: number;
      blur: number;

      constructor(img: HTMLImageElement) {
        this.img = img;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Directional flow (drifting upwards and slightly sideways)
        this.vx = (Math.random() - 0.2) * 0.8; 
        this.vy = -(Math.random() * 0.5 + 0.2);
        this.sz = Math.random() * 40 + 30; // Increased size
        this.opacity = Math.random() * 0.25 + 0.15; // Increased opacity
        this.rot = Math.random() * Math.PI * 2;
        this.rotV = (Math.random() - 0.5) * 0.01;
        this.blur = Math.random() * 2;
      }

      upd() {
        this.x += this.vx;
        this.y += this.vy;
        this.rot += this.rotV;

        if (this.x < -100) this.x = w + 100;
        if (this.x > w + 100) this.x = -100;
        if (this.y < -100) this.y = h + 100;
        if (this.y > h + 100) this.y = -100;
      }

      drw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        
        // Add a subtle glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(0, 212, 255, 0.3)";
        
        ctx.drawImage(this.img, -this.sz / 2, -this.sz / 2, this.sz, this.sz);
        ctx.restore();
      }
    }

    function init() {
      if (loadedImages.length === 0) return;
      for (let i = 0; i < count; i++) {
        const img = loadedImages[Math.floor(Math.random() * loadedImages.length)];
        elements.push(new FloatingItem(img));
      }
      anim();
    }

    function anim() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      elements.forEach((el) => {
        el.upd();
        el.drw();
      });
      requestAnimationFrame(anim);
    }

    const handleResize = () => {
      w = cvs.width = window.innerWidth;
      h = cvs.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "screen",
      }}
    />
  );
}
