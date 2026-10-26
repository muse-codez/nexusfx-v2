"use client";

import { useEffect, useRef, useState } from "react";
import HirePreviewPanel from "@/components/HirePreviewPanel";

// Preview 3 of 4 — hire header idea: a target-lock HUD.
// Corner brackets and a slow rotating ring sit around "HIRE ME";
// when the header scrolls into view, the brackets lock on in
// lime and a LOCKED tag appears. Same HUD language as the
// creators tiles, but as a large hire header.
// Live homepage is untouched.
const PREVIEWS = [
  { href: "/timeline-playhead", label: "Timeline playhead" },
  { href: "/press-start", label: "Press Start" },
  { href: "/target-lock", label: "Target-lock HUD" },
  { href: "/rec-timecode", label: "REC timecode" },
];

export default function TargetLockPreview() {
  const [locked, setLocked] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setLocked(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bracket = "absolute h-10 w-10 transition-colors duration-500";
  const bracketColor = locked ? "border-lime-400" : "border-white/30";

  return (
    <div className="relative min-h-screen bg-black px-4 py-8 font-sans text-white">
      <style>{`
        @keyframes preview-spin { to { transform: rotate(360deg); } }
        .preview-spin { animation: preview-spin 14s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .preview-spin { animation: none; } }
      `}</style>
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <a href="/" className="font-mono text-xs text-white/60 hover:text-white">
          ← Home
        </a>
        <span className="font-mono text-xs text-lime-400">PREVIEW 3 / 4</span>
      </div>

      <div className="mx-auto flex min-h-[50vh] max-w-5xl items-center justify-center">
        <p className="font-mono text-xs text-white/50">↓ Scroll karo — target lock hoga</p>
      </div>

      <div ref={headerRef} className="mx-auto flex max-w-5xl flex-col items-center justify-center py-16 text-center">
        <div className="relative px-14 py-12">
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[120%] -translate-x-1/2 bg-white/10" />
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-px -translate-x-1/2 -translate-y-1/2 bg-white/10" />
          <span aria-hidden="true" className="preview-spin pointer-events-none absolute -inset-6 rounded-full border border-dashed border-white/20" />
          <span aria-hidden="true" className={`${bracket} left-0 top-0 border-l-2 border-t-2 ${bracketColor}`} />
          <span aria-hidden="true" className={`${bracket} right-0 top-0 border-r-2 border-t-2 ${bracketColor}`} />
          <span aria-hidden="true" className={`${bracket} bottom-0 left-0 border-b-2 border-l-2 ${bracketColor}`} />
          <span aria-hidden="true" className={`${bracket} bottom-0 right-0 border-b-2 border-r-2 ${bracketColor}`} />
          <h1 className="relative font-pixelify text-6xl font-bold leading-tight text-white sm:text-8xl">
            HIRE <span className="text-lime-400">ME</span>
          </h1>
        </div>
        <p className={`mt-6 flex items-center gap-2 font-mono text-xs transition-colors duration-500 ${locked ? "text-lime-400" : "text-white/50"}`}>
          <span className={`h-2 w-2 rounded-full ${locked ? "bg-lime-400" : "bg-white/40"}`} />
          {locked ? "LOCKED" : "SCANNING…"}
        </p>
      </div>

      <HirePreviewPanel />

      <nav className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-4 pb-16 font-mono text-xs">
        {PREVIEWS.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className={p.href === "/target-lock" ? "text-lime-400" : "text-white/50 hover:text-white"}
          >
            {p.label}
          </a>
        ))}
      </nav>
      <p className="pb-8 text-center font-mono text-[11px] text-white/30">
        Preview only — live hire section abhi TextLoop ribbon wala hi hai.
      </p>
    </div>
  );
}
