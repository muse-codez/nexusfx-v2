"use client";

import { useEffect, useState } from "react";

// Intro loader for v2: a black screen with the NexusFX logo doing
// a flip + zoom-in (rotateY 0 -> 360deg, scale 0.3 -> 1.15 over
// 1.6s: flip finishes by 60%, then zoom goes to 2x and holds.
// The loader then fades out over 0.5s and unmounts,
// revealing the real website, which was already rendered
// underneath it. Reduced-motion users skip it entirely.
export default function IntroLoader() {
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const fadeTimer = window.setTimeout(() => setFading(true), 1900);
    const doneTimer = window.setTimeout(() => setDone(true), 2400);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ perspective: "1000px" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" className="v2-intro-flip-zoom h-32 w-32 object-contain sm:h-44 sm:w-44" />
    </div>
  );
}
