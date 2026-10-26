"use client";

import { useState } from "react";
import { ArrowUpRight, Envelope, Instagram } from "reicon-react";

// Shared contact panel for the four hire-design preview pages only.
// It mirrors the live hire panel (framed matte-metal panel, Email
// primary / Instagram secondary, lime + pink hovers) so each preview
// is judged with the same contact area below its unique header.
// It is NOT used by the live homepage — app/page.tsx is untouched.
export default function HirePreviewPanel() {
  const [copied, setCopied] = useState(false);

  return (
    <div
      id="hire-panel"
      className="relative mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-6 shadow-2xl ring-1 ring-zinc-400/30 sm:p-8"
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      <div className="relative grid gap-6 text-left sm:grid-cols-5">
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
  );
}
