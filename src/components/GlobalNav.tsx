"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import LiveClock from "@/components/ui/LiveClock";
import MobileMenu from "@/components/MobileMenu";

/* ─────────────────────────────────────────────
   GlobalNav — sticky mono bar
   Hidden during hero, slides in after 80vh scroll.
   Desktop: name · section links · clock
   Mobile:  name · hamburger → MobileMenu
   ───────────────────────────────────────────── */

interface NavLink {
  label: string;
  target: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Projects", target: "[data-section='work']" },
  { label: "Exploration", target: "[data-section='exploration']" },
  { label: "Contact", target: "[data-section='contact']" },
];

export default function GlobalNav() {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  /* ── Visibility: show after scrolling past ~80% of the viewport ── */
  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setVisible(lenis.scroll > threshold);
    };

    lenis.on("scroll", handleScroll);
    // Run once on mount in case page is already scrolled (e.g. browser restore)
    handleScroll();

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  /* ── Scroll-to helper ── */
  const scrollTo = useCallback(
    (target: string) => {
      const el = document.querySelector(target) as HTMLElement | null;
      if (el && lenis) {
        lenis.scrollTo(el, { offset: -50, duration: 1.5 });
      }
    },
    [lenis]
  );

  const scrollToTop = useCallback(() => {
    lenis?.scrollTo(0, { duration: 1.5 });
  }, [lenis]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (mobileMenuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [mobileMenuOpen, lenis]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            key="global-nav"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 right-0 z-50"
            style={{
              height: 40,
              backgroundColor: "rgba(0,0,0,0.9)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div
              className="flex items-center justify-between h-full"
              style={{ padding: "0 var(--page-px)" }}
            >
              {/* ── Logo / Scroll-to-top ── */}
              <button
                onClick={scrollToTop}
                className="font-mono uppercase tracking-[0.15em] transition-colors duration-300"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text)")
                }
              >
                HKJ Studio
              </button>

              {/* ── Desktop center links ── */}
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.target)}
                    className="font-mono uppercase tracking-[0.15em] transition-colors duration-300"
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
                    {link.label}
                  </button>
                ))}
              </div>

              {/* ── Desktop clock ── */}
              <span
                className="hidden md:inline font-mono uppercase tracking-[0.08em]"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-dim)",
                }}
              >
                <LiveClock showTimezone />
              </span>

              {/* ── Mobile hamburger ── */}
              <button
                className="flex md:hidden flex-col items-center justify-center"
                style={{ gap: 4, width: 24, height: 24 }}
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
              >
                <div
                  className="transition-colors duration-200"
                  style={{
                    width: 16,
                    height: 1,
                    backgroundColor: "var(--color-text)",
                  }}
                />
                <div
                  className="transition-colors duration-200"
                  style={{
                    width: 16,
                    height: 1,
                    backgroundColor: "var(--color-text)",
                  }}
                />
                <div
                  className="transition-colors duration-200"
                  style={{
                    width: 16,
                    height: 1,
                    backgroundColor: "var(--color-text)",
                  }}
                />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu Overlay ── */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
