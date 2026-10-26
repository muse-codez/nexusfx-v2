"use client";

import { useEffect, useRef, useState } from "react";
import HirePreviewPanel from "@/components/HirePreviewPanel";

// Preview 4 of 4 — hire header idea: a recording indicator.
// A blinking REC dot and a timecode (HH:MM:SS:FF at 25fps) start
// running when the header scrolls into view and pause when it
// leaves, like a camera recording. Subtle, editor-specific.
// Live homepage is untouched.
const PREVIEWS = [
  { href: "/timeline-playhead", label: "Timeline playhead" },
  { href: "/press-start", label: "Press Start" },
  { href: "/target-lock", label: "Target-lock HUD" },
  { href: "/rec-timecode", label: "REC timecode" },
];

function formatTimecode(totalFrames: number) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const ff = totalFrames % 25;
  const ss = Math.floor(totalFrames / 25) % 60;
  const mm = Math.floor(totalFrames / 1500) % 60;
  const hh = Math.floor(totalFrames / 90000);
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

export default function RecTimecodePreview() {
  const [frames, setFrames] = useState(0);
  const [recording, setRecording] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRecording(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => setFrames((f) => f + 1), 40);
    return () => clearInterval(timer);
  }, [recording]);

  return (
    <div className="relative min-h-screen bg-black px-4 py-8 font-sans text-white">
      <style>{`
        @keyframes preview-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .preview-blink { animation: preview-blink 1.1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) { .preview-blink { animation: none; } }
      `}</style>
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <a href="/" className="font-mono text-xs text-white/60 hover:text-white">
          ← Home
        </a>
        <span className="font-mono text-xs text-lime-400">PREVIEW 4 / 4</span>
      </div>

      <div className="mx-auto flex min-h-[50vh] max-w-5xl items-center justify-center">
        <p className="font-mono text-xs text-white/50">↓ Scroll karo — recording shuru hogi</p>
      </div>

      <div ref={headerRef} className="mx-auto max-w-5xl py-16 text-center">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-white/40">CAM 01</span>
          <span className="flex items-center gap-2 font-mono text-xs text-red-400">
            <span className={`h-2.5 w-2.5 rounded-full bg-red-500 ${recording ? "preview-blink" : "opacity-40"}`} />
            REC
            <span className="text-white">{formatTimecode(frames)}</span>
          </span>
        </div>
        <h1 className="mt-10 font-pixelify text-6xl font-bold leading-tight text-white sm:text-8xl">
          HIRE <span className="text-lime-400">ME</span>
        </h1>
        <p className="mt-4 font-mono text-xs text-white/50">
          {recording ? "Recording…" : "Section dikhte hi timecode chalega"}
        </p>
      </div>

      <HirePreviewPanel />

      <nav className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-4 pb-16 font-mono text-xs">
        {PREVIEWS.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className={p.href === "/rec-timecode" ? "text-lime-400" : "text-white/50 hover:text-white"}
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
