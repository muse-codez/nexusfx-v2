"use client";

import { useState } from "react";
import { ArrowUpRight, Envelope, Instagram } from "reicon-react";
import FaultyTerminal from "@/components/FaultyTerminal";

// NEW Preview 4 of 4 — 3D tilt hire card (complete section).
// The whole hire card tilts slowly toward the mouse (max ~12°)
// with a soft glare that follows the cursor, so the card feels
// physical instead of flat. Inside: the live-style Email and
// Instagram tiles with their lime/pink hover fills. Touch
// devices simply see the card flat. Live homepage untouched.
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

export default function HireTiltPreview() {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 12, ry: px * 12, gx: (px + 0.5) * 100, gy: (py + 0.5) * 100, on: true });
  };

  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  return (
    <div className="relative min-h-screen bg-black font-sans text-white">
      <style>{`
        @keyframes preview-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .preview-fade-up { animation: preview-fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) { .preview-fade-up { animation: none; } }
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
          <span className="font-mono text-xs text-lime-400">NEW PREVIEW 4 / 4</span>
        </div>

        <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center py-12" style={{ perspective: "1200px" }}>
          <div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="preview-fade-up relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-6 shadow-2xl ring-1 ring-zinc-400/30 sm:p-10"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: tilt.on ? 1 : 0,
                background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.16), transparent 60%)`,
              }}
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <div className="relative text-center">
              <p className="font-mono text-xs tracking-widest text-white/50">NEXUSFX — VIDEO EDITOR</p>
              <h1 className="mt-3 font-pixelify text-5xl font-bold leading-tight text-white sm:text-7xl">
                HIRE <span className="text-lime-400">ME</span>
              </h1>
              <p className="mt-3 font-mono text-xs text-white/50">Card pe mouse ghumao — wo tumhari taraf tilt hoga</p>
            </div>
            <div className="relative mt-8 grid gap-6 text-left sm:grid-cols-5">
              <div className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 p-8 shadow-xl ring-1 ring-zinc-700 transition-shadow duration-500 motion-reduce:transition-none hover:shadow-[0_0_40px_rgba(163,230,53,0.35)] hover:ring-lime-400/60 sm:col-span-3">
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-lime-300 via-lime-400 to-lime-500 opacity-0 transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-100" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-md transition-transform duration-700 motion-reduce:transition-none group-hover:translate-x-[400%]" />
                <p className="relative z-10 flex items-center gap-2 font-mono text-xs text-white/60 transition-colors duration-500 motion-reduce:transition-none group-hover:text-black/60">
                  <Envelope size={16} weight="Filled" /> Email
                </p>
                <p className="relative z-10 mt-3 break-all font-pixelify text-xl text-white transition-colors duration-500 motion-reduce:transition-none group-hover:text-black">
                  nexusfx.media@gmail.com
                </p>
                <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                  <a
                    href="mailto:nexusfx.media@gmail.com"
                    className="rounded-full bg-lime-400 px-6 py-3 text-base font-bold text-black transition duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 group-hover:bg-black group-hover:text-lime-400"
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
                    className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 group-hover:bg-black/10 group-hover:text-black group-hover:ring-black/20"
                  >
                    {copied ? "Copied!" : "Copy address"}
                  </button>
                </div>
              </div>
              <a
                href="https://www.instagram.com/nexu.fx4"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 p-8 shadow-xl ring-1 ring-zinc-700 transition-shadow duration-500 motion-reduce:transition-none hover:shadow-[0_0_40px_rgba(247,7,142,0.35)] hover:ring-pink-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 sm:col-span-2"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-pink-400 via-[#f7078e] to-pink-600 opacity-0 transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-100" />
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-md transition-transform duration-700 motion-reduce:transition-none group-hover:translate-x-[400%]" />
                <p className="relative z-10 flex items-center gap-2 font-mono text-xs text-white/60 transition-colors duration-500 motion-reduce:transition-none group-hover:text-black/60">
                  <Instagram size={16} weight="Filled" /> Instagram
                </p>
                <p className="relative z-10 mt-3 font-pixelify text-xl text-white transition-colors duration-500 motion-reduce:transition-none group-hover:text-black">
                  @nexu.fx4
                </p>
                <span className="relative z-10 mt-6 inline-flex items-center gap-1 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-pink-400 ring-1 ring-white/20 transition duration-150 group-hover:bg-black/10 group-hover:text-black group-hover:ring-black/20">
                  Visit profile
                  <span className="inline-block transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight size={16} weight="Filled" />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <nav className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 pb-8 font-mono text-xs">
          {PREVIEWS.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className={p.href === "/hire-tilt" ? "text-lime-400" : "text-white/50 hover:text-white"}
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
