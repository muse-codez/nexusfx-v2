"use client";

import { useState } from "react";
import FaultyTerminal from "@/components/FaultyTerminal";

// NEW Preview 3 of 4 — Neon sign hire card (complete section).
// "HIRE ME" as a glowing neon sign with a slow, subtle flicker
// (mostly on, brief dips — not a strobe), a glowing neon tube
// underline, and neon-outlined contact buttons inside the same
// dark panel. Live homepage is untouched.
const PREVIEWS = [
  { href: "/hire-aurora", label: "Aurora" },
  { href: "/hire-pixel", label: "Pixel build" },
  { href: "/hire-neon", label: "Neon sign" },
  { href: "/hire-tilt", label: "3D tilt" },
];

const TERMINAL_PROPS = {
  tint: "#A7EF9E",
  glyphs: "blocks" as const,
  scale: 1.5,
  digitSize: 1.2,
  timeScale: 0.5,
  brightness: 0.75,
  glow: 0.5,
  persistence: 0.5,
  mouseStrength: 0.5,
  mouseGlow: 0.6,
  curvature: 0.1,
  vignette: 0.25,
  clickEffect: "glitch" as const,
};

export default function HireNeonPreview() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative min-h-screen bg-black font-sans text-white">
      <style>{`
        @keyframes preview-neon-flicker { 0%, 100% { opacity: 1; } 3% { opacity: 0.55; } 4% { opacity: 1; } 42% { opacity: 1; } 43% { opacity: 0.7; } 44% { opacity: 1; } 78% { opacity: 1; } 79% { opacity: 0.85; } 80% { opacity: 1; } }
        .preview-neon { color: #ffffff; text-shadow: 0 0 6px #a3e635, 0 0 18px #a3e635, 0 0 42px #65a30d, 0 0 80px rgba(163,230,53,0.55); animation: preview-neon-flicker 5s linear infinite; }
        .preview-neon-tube { background: #a3e635; box-shadow: 0 0 12px #a3e635, 0 0 32px rgba(163,230,53,0.7); animation: preview-neon-flicker 5s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .preview-neon, .preview-neon-tube { animation: none; } }
      `}</style>
      <div aria-hidden="true" className="fixed inset-0 z-0">
        <FaultyTerminal {...TERMINAL_PROPS} />
      </div>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] bg-black/40" />

      <div className="relative z-10 px-4 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a href="/" className="font-mono text-xs text-white/60 hover:text-white">
            ← Home
          </a>
          <span className="font-mono text-xs text-lime-400">NEW PREVIEW 3 / 4</span>
        </div>

        <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center py-12">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-zinc-950/95 px-6 py-12 text-center ring-1 ring-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] sm:px-12 sm:py-16">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
            <p className="relative font-mono text-xs tracking-widest text-white/50">NEXUSFX — VIDEO EDITOR</p>
            <h1 className="preview-neon relative mt-6 font-pixelify text-6xl font-bold leading-tight sm:text-8xl">
              HIRE ME
            </h1>
            <div aria-hidden="true" className="preview-neon-tube relative mx-auto mt-6 h-[3px] w-48 rounded-full" />
            <p className="relative mt-8 break-all font-mono text-sm text-white/70 sm:text-base">
              nexusfx.media@gmail.com
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:nexusfx.media@gmail.com"
                className="rounded-full border border-lime-400/70 px-7 py-3 text-base font-bold text-lime-300 shadow-[0_0_18px_rgba(163,230,53,0.35)] transition duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 hover:bg-lime-400 hover:text-black hover:shadow-[0_0_32px_rgba(163,230,53,0.6)]"
              >
                Write an email
              </a>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText("nexusfx.media@gmail.com").catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 hover:bg-white/10"
              >
                {copied ? "Copied!" : "Copy address"}
              </button>
              <a
                href="https://www.instagram.com/nexu.fx4"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#f7078e]/70 px-7 py-3 text-base font-bold text-pink-300 shadow-[0_0_18px_rgba(247,7,142,0.35)] transition duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 hover:bg-[#f7078e] hover:text-white hover:shadow-[0_0_32px_rgba(247,7,142,0.6)]"
              >
                Instagram @nexu.fx4
              </a>
            </div>
          </div>
        </div>

        <nav className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 pb-8 font-mono text-xs">
          {PREVIEWS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className={p.href === "/hire-neon" ? "text-lime-400" : "text-white/50 hover:text-white"}
            >
              {p.label}
            </a>
          ))}
        </nav>
        <p className="pb-8 text-center font-mono text-[11px] text-white/30">
          Preview only — live hire section abhi TextLoop ribbon wala hi hai.
        </p>
      </div>
    </div>
  );
}
