"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import NothingEqLoader from "@/components/ui/NothingEqLoader";
import LiveClock from "@/components/ui/LiveClock";
import { useAudioStore } from "@/lib/audioStore";

const SOCIALS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function ContactSection() {
  const { isPlaying } = useAudioStore();
  const [copied, setCopied] = useState(false);
  const email = "hello@hkjstudio.com";

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [email]);

  return (
    <section
      data-section="contact"
      className="relative"
      style={{
        padding: "6rem var(--page-px) 0",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {/* Section header */}
      <div
        className="flex items-center justify-between mb-16"
        style={{
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "0.75rem",
        }}
      >
        <span className="label">Contact</span>
        {/* Removed 'Transmission' decor */}
      </div>

      {/* CTA area */}
      <div className="max-w-5xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-sans mb-10"
            style={{
              fontSize: "var(--text-lg)",
              color: "var(--color-text)",
            }}
          >
            Let&apos;s make something together.
          </p>

          {/* Email CTA — dominant */}
          <button
            onClick={copyEmail}
            className="group font-mono uppercase tracking-[0.05em] transition-colors duration-300 block"
            style={{
              fontSize: "var(--text-3xl)",
              color: copied ? "var(--color-accent)" : "var(--color-text)",
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            {copied ? "Copied" : email}
          </button>

          <p
            className="mt-3 transition-opacity duration-300 micro"
            style={{
              opacity: copied ? 0 : 1,
            }}
          >
            Click to copy
          </p>
        </motion.div>
      </div>

      {/* Footer bar */}
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "1rem 0",
        }}
      >
        {/* Social links */}
        <div className="flex gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="font-mono uppercase tracking-[0.1em] transition-colors duration-300"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-dim)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-dim)")
              }
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Clock + Copyright + EQ */}
        <div className="flex items-center gap-6">
          <LiveClock
            showTimezone
            className="font-mono"
          />
          <span
            className="font-mono"
            style={{
              color: "var(--color-text-ghost)",
              fontSize: "var(--text-xs)",
            }}
          >
            &copy; {new Date().getFullYear()} HKJ Studio
          </span>
          <div style={{ opacity: isPlaying ? 1 : 0, transition: "opacity 0.2s" }}>
            <NothingEqLoader bars={3} segmentsPerBar={3} size={3} gap={2} intervalMs={200} />
          </div>
        </div>
      </div>
      {/* Extra padding buffer for the fixed AudioTransport bar */}
      <div className="h-[40px]" />
    </section>
  );
}
