"use client";
import { useEffect, useRef } from "react";

const packages = [
  {
    type: "Flutter Plugin",
    typeClass: "type-plugin",
    name: "Notix Pro",
    desc: "Premium Flutter notification kit with dark mode, 5 animation styles, bottom sheets, toasts, banners, and dialogs.",
    tags: ["Flutter", "UI/UX", "Animations", "Notix Pro"],
    image: "/images/notix-pro/images/notix_pro_cover.png",
    video: "/images/notix-pro/videos/video6156617138124628228.mp4",
    links: [
      { text: "View Pub.dev", url: "https://pub.dev/packages/notix_pro", class: "pkg-btn-pub" },
      { text: "Documentation", url: "https://pub.dev/documentation/notix_pro/latest/", class: "pkg-btn-gh" },
    ],
  },
  {
    type: "Flutter Template",
    typeClass: "type-template",
    name: "NightBite — Flutter Food Delivery UI Kit",
    desc: "Production-grade Flutter food delivery UI kit with a dark premium aesthetic, featuring OpenStreetMap & OSRM real-road routing.",
    tags: ["Flutter", "GetX", "OSM Map", "OSRM Routing", "UI Kit"],
    image: "/images/restaurant/thumbnail/Restaurant_Thumbnail.png",
    links: [
      { text: "Buy on Gumroad", url: "https://kamaliv.gumroad.com/l/vgqses", class: "pkg-btn-pub" },
      { text: "Source on GitHub", url: "https://github.com/Kamali20072002/Restaurant", class: "pkg-btn-gh" },
    ],
  },
];

export default function Packages() {
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
    <section className="sec" id="packages" ref={sectionRef}>
      <div className="sec-inner">
        <div className="reveal">
          <span className="eyebrow">// Open Source & Tools</span>
          <h2 className="heading">
            Packages & <span>Templates</span>
          </h2>
          <div className="rule" id="rule3"></div>
        </div>
        <div className="pkg-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {packages.map((pkg, idx) => (
            <div key={idx} className="pkg-card reveal" style={{ 
              transitionDelay: `${idx * 0.1}s`, 
              display: 'flex', 
              flexDirection: 'row', 
              gap: '24px',
              padding: '20px',
              alignItems: 'center',
              flexWrap: 'wrap' // Stack on mobile
            }}>
              {/* Box 1: Video/Media */}
              <div className="pkg-media" style={{ 
                flex: '0 0 320px', // Fixed width for video box
                maxWidth: '100%',
                borderRadius: '8px', 
                overflow: 'hidden', 
                border: '1px solid var(--border)',
                aspectRatio: '16/9',
                background: '#000'
              }}>
                {pkg.video ? (
                  <video 
                    src={pkg.video} 
                    poster={pkg.image}
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                )}
              </div>

              {/* Box 2: Content */}
              <div className="pkg-content" style={{ flex: '1', minWidth: '280px' }}>
                <span className={`pkg-type ${pkg.typeClass}`} style={{ marginBottom: '8px' }}>{pkg.type}</span>
                <h3 className="pkg-name" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{pkg.name}</h3>
                <p className="pkg-desc" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>{pkg.desc}</p>
                <div className="pkg-tags" style={{ marginBottom: '16px' }}>
                  {pkg.tags.map((tag, i) => (
                    <span key={i} className="pkg-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pkg-links">
                  {pkg.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`pkg-btn ${link.class}`}
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pkg-note reveal">
          <p>
            I actively contribute to the <strong>Flutter ecosystem</strong> and
            maintain high-quality UI kits like <strong>Notix Pro</strong> and <strong>NightBite</strong> to help developers build better apps.
          </p>
        </div>
      </div>
    </section>
  );
}
