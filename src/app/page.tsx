"use client";

import BreathingText from "@/components/ui/BreathingText";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-sans">
      <div className="flex flex-col items-start gap-4 w-full max-w-2xl">
        <h1 className="text-8xl sm:text-9xl font-semibold tracking-tighter leading-none select-none">
          Ryan Jun
        </h1>
        <div className="flex flex-col sm:flex-row items-baseline gap-4 w-full justify-between border-t border-border pt-4">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            <BreathingText label="Design Engineer" fromOpacity={0.6} toOpacity={1} duration={4} />
          </h2>
          <span className="text-sm font-mono text-muted-foreground">
            2026
          </span>
        </div>

        <div className="mt-12 text-sm max-w-md text-muted-foreground font-mono">
          <p>
            Building high-performance interfaces and design systems.
            Focusing on the intersection of craft and code.
          </p>
        </div>
      </div>
    </main>
  );
}
