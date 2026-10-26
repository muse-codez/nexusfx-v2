"use client";

import { useState } from "react";
import HirePreviewPanel from "@/components/HirePreviewPanel";

// Preview 2 of 4 — hire header idea: an arcade start screen.
// "PRESS START" blinks slowly in Pixelify; pressing the Start
// button scrolls to the contact panel and makes it glow briefly.
// Live homepage is untouched.
const PREVIEWS = [
  { href: "/timeline-playhead", label: "Timeline playhead" },
  { href: "/press-start", label: "Press Start" },
  { href: "/target-lock", label: "Target-lock HUD" },
  { href: "/rec-timecode", label: "REC timecode" },
];

export default function PressStartPreview() {
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    document.getElementById("hire-panel")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setStarted(false), 2500);
  };

  return (
    <div className="relative min-h-screen bg-black px-4 py-8 font-sans text-white">
      <style>{`
        @keyframes preview-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .preview-blink { animation: preview-blink 1.4s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) { .preview-blink { animation: none; } }
      `}</style>
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <a href="/" className="font-mono text-xs text-white/60 hover:text-white">
          ← Home
        </a>
        <span className="font-mono text-xs text-lime-400">PREVIEW 2 / 4</span>
      </div>

      <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center text-center">
        <span aria-hidden="true" className="h-10 w-10 rounded-full bg-yellow-400 ring-4 ring-yellow-600/60" />
        <h1 className="preview-blink mt-8 font-pixelify text-6xl font-bold leading-tight text-lime-400 sm:text-8xl">
          PRESS START
        </h1>
        <p className="mt-4 font-mono text-xs text-white/50">
          Game start screen jaisa — button dabao, contact panel glow karega
        </p>
        <button
          type="button"
          onClick={start}
          className="mt-10 rounded-full bg-lime-400 px-8 py-3 text-base font-bold text-black transition duration-150 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:bg-lime-300"
        >
          ▶ Start
        </button>
      </div>

      <div
        className={`rounded-[2.5rem] transition-shadow duration-500 ${
          started ? "shadow-[0_0_60px_rgba(163,230,53,0.45)] ring-2 ring-lime-400" : ""
        }`}
      >
        <HirePreviewPanel />
      </div>

      <nav className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-4 pb-16 font-mono text-xs">
        {PREVIEWS.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className={p.href === "/press-start" ? "text-lime-400" : "text-white/50 hover:text-white"}
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
