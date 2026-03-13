"use client";

import { useStudioStore } from "@/lib/store";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";

/**
 * GlobalNav — 1-1 Jonite.com Recreation
 * 
 * Specs:
 * - Logo left (JONITE)
 * - Horizontal links right (PRODUCTS, SPECS, etc.)
 * - Font: Grotesk / Inter
 * - Pure architectural simplicity
 */

const NAV_LINKS = [
  { label: "PRODUCTS", href: "#" },
  { label: "SPECS", href: "#" },
  { label: "CASE STUDIES", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "CONTACT", href: "#" },
];

export default function GlobalNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoaded = useStudioStore((s) => s.isLoaded);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: "2rem var(--page-px)",
          opacity: isLoaded ? 1 : 0,
          backgroundColor: "transparent",
        }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-1 group">
          <span
            className="font-bold tracking-[0.1em]"
            style={{ 
              fontSize: "1.5rem", 
              color: "#1a1a1a",
              fontFamily: "var(--font-satoshi), sans-serif" 
            }}
          >
            H JONITE
          </span>
        </a>

        {/* Desktop Links (Jonite Style) */}
        <div className="hidden lg:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-medium hover:opacity-50 transition-opacity flex items-center gap-1"
              style={{ 
                fontSize: "11px", 
                letterSpacing: "0.1em",
                color: "#1a1a1a"
              }}
            >
              {link.label}
              {(link.label === "PRODUCTS" || link.label === "ABOUT") && (
                <span className="text-[14px]">↘</span>
              )}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden flex flex-col gap-1.5 items-end justify-center w-8 h-8 focus:outline-none"
        >
          <div className="w-full h-[1px] bg-black" />
          <div className="w-2/3 h-[1px] bg-black" />
        </button>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
