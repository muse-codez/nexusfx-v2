"use client";

import { useState } from "react";
import FaultyTerminal from "@/components/FaultyTerminal";

// NEW Preview 1 of 4 — Aurora hire card (complete section).
// A large card with a slowly rotating conic-gradient border
// (lime → pink → violet), floating lime/pink glow orbs, a
// gradient title, and the contact actions inside the card —
// not a header gimmick above a separate panel. Live homepage
// is untouched.
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

export default function HireAuroraPreview() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative min-h-screen bg-black font-sans text-white">
      <style>{`
        @keyframes preview-spin-slow { to { transform: rotate(360deg); } }
        .preview-spin-slow { animation: preview-spin-slow 8s linear infinite; }
        @keyframes preview-float { from { transform: translateY(-16px); } to { transform: translateY(16px); } }
        .preview-float { animation: preview-float 6s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) { .preview-spin-slow, .preview-float { animation: none; } }
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
          <span className="font-mono text-xs text-lime-400">NEW PREVIEW 1 / 4</span>
        </div>

        <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center py-12">
          <div className="group relative w-full max-w-4xl overflow-hidden rounded-[2.5rem]">
            <span aria-hidden="true" className="preview-spin-slow absolute inset-[-60%] bg-[conic-gradient(from_0deg,#a3e635,#f7078e,#8b5cf6,#a3e635)]" />
            <div className="relative m-[2px] overflow-hidden rounded-[calc(2.5rem-2px)] bg-zinc-950 px-6 py-12 text-center sm:px-12 sm:py-16">
              <span aria-hidden="true" className="preview-float pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-lime-400/20 blur-3xl" />
              <span aria-hidden="true" className="preview-float pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-[#f7078e]/20 blur-3xl" style={{ animationDelay: "-3s" }} />
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/10 blur-md transition-transform duration-1000 motion-reduce:transition-none group-hover:translate-x-[400%]" />
              <p className="relative font-mono text-xs tracking-widest text-white/50">NEXUSFX — VIDEO EDITOR</p>
              <h1 className="relative mt-4 bg-gradient-to-r from-lime-300 via-white to-[#f7078e] bg-clip-text font-pixelify text-6xl font-bold leading-tight text-transparent sm:text-8xl">
                HIRE ME
              </h1>
              <p className="relative mt-6 break-all font-mono text-sm text-white/70 sm:text-base">
                nexusfx.media@gmail.com
              </p>
              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:nexusfx.media@gmail.com"
                  className="rounded-full bg-lime-400 px-7 py-3 text-base font-bold text-black shadow-[0_0_30px_rgba(163,230,53,0.45)] transition duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 hover:bg-lime-300"
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
                  className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 hover:bg-white/20"
                >
                  {copied ? "Copied!" : "Copy address"}
                </button>
                <a
                  href="https://www.instagram.com/nexu.fx4"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#f7078e] px-7 py-3 text-base font-bold text-white shadow-[0_0_30px_rgba(247,7,142,0.45)] transition duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 hover:bg-pink-600"
                >
                  Instagram @nexu.fx4
                </a>
              </div>
            </div>
          </div>
        </div>

        <nav className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 pb-8 font-mono text-xs">
          {PREVIEWS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className={p.href === "/hire-aurora" ? "text-lime-400" : "text-white/50 hover:text-white"}
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
