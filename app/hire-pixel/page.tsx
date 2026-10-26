"use client";

import { useState } from "react";
import FaultyTerminal from "@/components/FaultyTerminal";

// NEW Preview 2 of 4 — Pixel build hire card (complete section).
// "HIRE ME" builds itself letter by letter as pixel blocks
// dropping in with a slow ease, a loading bar fills, then the
// contact buttons fade up. Buttons and card use cut pixel
// corners instead of rounded corners. Live homepage untouched.
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

const LETTERS: { ch: string; color: string }[] = [
  { ch: "H", color: "text-lime-400" },
  { ch: "I", color: "text-lime-400" },
  { ch: "R", color: "text-lime-400" },
  { ch: "E", color: "text-lime-400" },
  { ch: " ", color: "" },
  { ch: "M", color: "text-[#f7078e]" },
  { ch: "E", color: "text-[#f7078e]" },
];

export default function HirePixelPreview() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative min-h-screen bg-black font-sans text-white">
      <style>{`
        .pixel-corners { clip-path: polygon(0 10px, 10px 10px, 10px 0, calc(100% - 10px) 0, calc(100% - 10px) 10px, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 10px calc(100% - 10px), 0 calc(100% - 10px)); }
        @keyframes preview-pixel-drop { from { transform: translateY(-48px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .preview-pixel-drop { animation: preview-pixel-drop 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes preview-load { from { width: 0%; } to { width: 100%; } }
        .preview-load { animation: preview-load 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.9s both; }
        @keyframes preview-fade-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .preview-fade-up { animation: preview-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.1s both; }
        @media (prefers-reduced-motion: reduce) { .preview-pixel-drop, .preview-load, .preview-fade-up { animation: none; } }
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
          <span className="font-mono text-xs text-lime-400">NEW PREVIEW 2 / 4</span>
        </div>

        <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center py-12">
          <div className="pixel-corners relative w-full max-w-4xl bg-zinc-950/95 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <p className="relative font-mono text-xs tracking-widest text-white/50">NEXUSFX — VIDEO EDITOR</p>
            <h1 className="relative mt-6 flex flex-wrap items-end justify-center gap-1 sm:gap-2" aria-label="HIRE ME">
              {LETTERS.map((l, i) =>
                l.ch === " " ? (
                  <span key={i} className="w-3 sm:w-5" />
                ) : (
                  <span
                    key={i}
                    className={`preview-pixel-drop inline-flex h-16 w-12 items-center justify-center bg-zinc-900 font-pixelify text-4xl font-bold ring-1 ring-white/15 sm:h-20 sm:w-16 sm:text-5xl ${l.color}`}
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    {l.ch}
                  </span>
                )
              )}
            </h1>
            <div className="relative mx-auto mt-8 h-3 w-full max-w-md bg-zinc-800">
              <div className="preview-load h-full bg-lime-400" />
            </div>
            <p className="preview-fade-up relative mt-6 break-all font-mono text-sm text-white/70 sm:text-base">
              nexusfx.media@gmail.com
            </p>
            <div className="preview-fade-up relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:nexusfx.media@gmail.com"
                className="pixel-corners bg-lime-400 px-7 py-3 text-base font-bold text-black transition duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 hover:bg-lime-300"
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
                className="pixel-corners bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 hover:bg-white/20"
              >
                {copied ? "Copied!" : "Copy address"}
              </button>
              <a
                href="https://www.instagram.com/nexu.fx4"
                target="_blank"
                rel="noreferrer"
                className="pixel-corners bg-[#f7078e] px-7 py-3 text-base font-bold text-white transition duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 hover:bg-pink-600"
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
              className={p.href === "/hire-pixel" ? "text-lime-400" : "text-white/50 hover:text-white"}
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
