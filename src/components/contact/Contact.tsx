"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion, useInView } from "motion/react";
import SectionLabel from "@/components/ui/SectionLabel";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: FormState = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const leftRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" });

  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm(INITIAL);
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(3rem, 6vw, 5rem)",
          alignItems: "start",
        }}
      >
        {/* Left */}
        <motion.div
          ref={leftRef}
          initial={{ y: 30, opacity: 0 }}
          animate={leftInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <SectionLabel number="06" label="Contact" />
          <h2
            id="contact-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "var(--black)",
              marginBottom: "2rem",
              textWrap: "balance",
            }}
          >
            Got a project in mind?
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}
            aria-label="Contact information"
          >
            <div className="contact-info__item">
              <span>shazadarshadcbs@gmail.com</span>
            </div>
            <div className="contact-info__item">
              <span>+94 77 651 2486</span>
            </div>
            <div className="contact-info__item">
              <span>Colombo, Sri Lanka</span>
            </div>
            <div className="contact-info__item">
              <span>Open to remote worldwide</span>
            </div>
          </div>

          <div className="contact-availability" role="status" aria-label="Currently available for work">
            <span className="contact-availability__dot" aria-hidden="true" />
            Available for work
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--gray-500)",
              letterSpacing: "0.08em",
              marginTop: "1rem",
              lineHeight: 1.8,
            }}
          >
            Email reply within 24h · Phone 9AM–6PM GMT+5:30
          </p>
        </motion.div>

        {/* Right — form */}
        <motion.div
          ref={formRef}
          initial={{ y: 30, opacity: 0 }}
          animate={formInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
        >
          <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label htmlFor="contact-name" className="contact-label">Name</label>
                <input
                  id="contact-name" name="name" type="text"
                  className="contact-input" placeholder="Your name"
                  value={form.name} onChange={handleChange} required autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="contact-label">Email</label>
                <input
                  id="contact-email" name="email" type="email"
                  className="contact-input" placeholder="your@email.com"
                  value={form.email} onChange={handleChange} required autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="contact-label">Subject</label>
                <input
                  id="contact-subject" name="subject" type="text"
                  className="contact-input" placeholder="What's this about?"
                  value={form.subject} onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="contact-label">Message</label>
                <textarea
                  id="contact-message" name="message"
                  className="contact-input contact-textarea"
                  placeholder="Tell me about your project..."
                  value={form.message} onChange={handleChange} required rows={5}
                />
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={status === "sending"}
                aria-busy={status === "sending"}
              >
                <span className="contact-submit__text">
                  {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                    ? "Message sent ✓"
                    : "Send Message →"}
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
