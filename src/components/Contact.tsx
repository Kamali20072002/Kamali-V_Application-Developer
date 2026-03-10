"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusClass, setStatusClass] = useState("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      from_name: formData.get("name") as string,
      from_email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      to_email: "kamalivs20.dev@gmail.com"
    };

    setIsSending(true);
    setStatusMsg("");

    try {
      // These will be read from your .env.local file
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS keys are missing. Please check your .env.local file.");
      }

      await emailjs.send(serviceId, templateId, data, publicKey);

      setIsSending(false);
      setIsSent(true);
      setStatusMsg("Message sent successfully to kamalivs20.dev@gmail.com ✓");
      setStatusClass("ok");
      form.reset();

      setTimeout(() => {
        setIsSent(false);
        setStatusMsg("");
      }, 5000);
    } catch (err: any) {
      console.error("Contact Form Error:", err);
      
      const errorMessage = err?.text || err?.message || "Failed to send message.";
      setStatusMsg(`Error: ${errorMessage}. Falling back to mail app...`);
      setStatusClass("err");

      // Fallback to mailto so the message isn't lost
      setTimeout(() => {
        const mailtoLink = `mailto:kamalivs20.dev@gmail.com?subject=${encodeURIComponent(
          "[Portfolio] " + data.subject
        )}&body=${encodeURIComponent(
          "Name: " + data.from_name + "\nEmail: " + data.from_email + "\n\n" + data.message
        )}`;
        window.location.href = mailtoLink;
        setIsSending(false);
      }, 2000);
    }
  };

  return (
    <section className="sec" id="contact" ref={sectionRef}>
      <div className="sec-inner">
        <div className="reveal">
          <span className="eyebrow">// Collaboration</span>
          <h2 className="heading">
            Get In <span>Touch</span>
          </h2>
          <div className="rule" id="rule4"></div>
        </div>
        <div className="contact-grid">
          <div className="reveal-l" style={{ transitionDelay: ".1s" }}>
            <h3 className="c-hl">
              Let's build something <strong>extraordinary</strong>.
            </h3>
            <p className="c-sub">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>
            <div className="c-items">
              <a href="mailto:kamalivs20.dev@gmail.com" className="c-item">
                <div className="c-ico">✉</div>
                <div>
                  <div className="c-type">Email</div>
                  <div className="c-val">kamalivs20.dev@gmail.com</div>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/kamaliv"
                target="_blank"
                rel="noreferrer"
                className="c-item"
              >
                <div className="c-ico">in</div>
                <div>
                  <div className="c-type">LinkedIn</div>
                  <div className="c-val">linkedin.com/in/kamaliv</div>
                </div>
              </a>
              <a
                href="https://github.com/kamalivs20"
                target="_blank"
                rel="noreferrer"
                className="c-item"
              >
                <div className="c-ico">⌨</div>
                <div>
                  <div className="c-type">GitHub</div>
                  <div className="c-val">github.com/kamalivs20</div>
                </div>
              </a>
            </div>
          </div>
          <div className="reveal-r" style={{ transitionDelay: ".2s" }}>
            <form className="c-form" id="contactForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message..."
                required
              ></textarea>
              <button
                type="submit"
                className={`btn-send ${isSending ? "sending" : ""} ${isSent ? "sent" : ""}`}
                id="sendBtn"
                disabled={isSending}
              >
                {isSending ? "Sending..." : isSent ? "✓ Message Sent!" : "Send Message →"}
              </button>
              <div className={`send-status ${statusClass}`} id="sendStatus">
                {statusMsg}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
