"use client";

import { useEffect, useState } from "react";
import HirePreviewPanel from "@/components/HirePreviewPanel";

// Preview 1 of 4 — hire header idea: a video-edit timeline.
// A white playhead moves across a clip track as you scroll down
// the page, so reaching the contact panel feels like playing
// through a timeline. Clips are colour blocks only — no project
// names, no real footage. Live homepage is untouched.
const PREVIEWS = [
  { href: "/timeline-playhead", label: "Timeline playhead" },
  { href: "/press-start", label: "Press Start" },
  { href: "/target-lock", label: "Target-lock HUD" },
  { href: "/rec-timecode", label: "REC timecode" },
];

export default function TimelinePlayheadPreview() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black px-4 py-8 font-sans text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <a href="/" className="font-mono text-xs text-white/60 hover:text-white">
          ← Home
        </a>
        <span className="font-mono text-xs text-lime-400">PREVIEW 1 / 4</span>
      </div>

      <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center text-center">
        <h1 className="font-pixelify text-6xl font-bold leading-tight text-white sm:text-8xl">
          HIRE <span className="text-lime-400">ME</span>
        </h1>
        <p className="mt-4 font-mono text-xs text-white/50">
          Scroll karo — playhead timeline pe aage badhega
        </p>

        <div className="mt-10 w-full">
          <div className="flex justify-between font-mono text-[10px] text-white/40">
            <span>00:00</span>
            <span>00:05</span>
            <span>00:10</span>
            <span>00:15</span>
            <span>00:20</span>
          </div>
          <div className="relative mt-2">
            <div className="flex h-16 gap-1 overflow-hidden rounded-xl bg-zinc-900 p-1 ring-1 ring-white/10">
              <span className="h-full rounded-lg bg-lime-400/70" style={{ flexBasis: "22%" }} />
              <span className="h-full rounded-lg bg-zinc-700" style={{ flexBasis: "18%" }} />
              <span className="h-full rounded-lg bg-[#f7078e]/70" style={{ flexBasis: "30%" }} />
              <span className="h-full rounded-lg bg-lime-300/50" style={{ flexBasis: "20%" }} />
              <span className="h-full rounded-lg bg-zinc-800" style={{ flexBasis: "10%" }} />
            </div>
            <span
              aria-hidden="true"
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
              style={{ left: `${progress}%` }}
            >
              <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
            </span>
          </div>
          <p className="mt-4 font-mono text-xs text-white/50">
            PLAYHEAD {progress.toFixed(0)}%
          </p>
        </div>
      </div>

      <HirePreviewPanel />

      <nav className="mx-auto mt-16 flex max-w-5xl flex-wrap justify-center gap-4 pb-16 font-mono text-xs">
        {PREVIEWS.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className={p.href === "/timeline-playhead" ? "text-lime-400" : "text-white/50 hover:text-white"}
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
