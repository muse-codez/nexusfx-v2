"use client";

import { useState } from "react";
import { ArrowUpRight, Envelope, Instagram, Play } from "reicon-react";

// NexusFX v2 — original homepage, inspired in general structure only by
// notenemyok.com (pill nav, full-height hero, clients panel, video grid,
// closing hire panel, and the card ideas: square client tiles with a
// featured tile + name pill, landscape video cards with a bottom-right
// play button). No text, images, videos, or code copied from that site;
// all copy below is written for NexusFX, and the animation / hover
// code here is original.
//
// PLACEHOLDER content for now, as asked ("random info"): the creator
// names and video titles are fictional placeholders, NOT real NexusFX
// clients or videos. Replace them with real ones before publishing.
const CLIENTS = [
  { name: "PixelPlay", initial: "P", gradient: "from-fuchsia-500 to-purple-600" },
  { name: "GameVault", initial: "G", gradient: "from-sky-500 to-blue-600" },
  { name: "LootLab", initial: "L", gradient: "from-amber-400 to-orange-500" },
  { name: "NoScope", initial: "N", gradient: "from-emerald-400 to-teal-600" },
  { name: "Respawn", initial: "R", gradient: "from-rose-500 to-red-600" },
  { name: "ClutchCast", initial: "C", gradient: "from-violet-500 to-indigo-600" },
] as const;

const VIDEOS = [
  { title: "The Heist That Broke the Lobby", creator: "PixelPlay", gradient: "from-purple-600 via-fuchsia-500 to-pink-500" },
  { title: "100 Days in a Pixel World", creator: "GameVault", gradient: "from-sky-600 via-cyan-500 to-teal-400" },
  { title: "Every Loot Drop, Ranked", creator: "LootLab", gradient: "from-amber-500 via-orange-500 to-rose-500" },
  { title: "The Shot Nobody Believed", creator: "NoScope", gradient: "from-emerald-500 via-teal-500 to-cyan-500" },
  { title: "Back From Zero Health", creator: "Respawn", gradient: "from-rose-600 via-red-500 to-orange-400" },
  { title: "The Comeback in Round 12", creator: "ClutchCast", gradient: "from-violet-600 via-indigo-500 to-sky-500" },
] as const;

export default function Home() {
  // Featured client tile: first tile at rest, transfers to the tile
  // under the cursor on hover, and returns when the cursor leaves.
  const [featuredClient, setFeaturedClient] = useState(0);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] font-sans text-white"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Fixed pill nav */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-2xl items-center justify-between rounded-full border border-white/10 bg-black/70 px-5 py-3 backdrop-blur">
          <a href="#top" className="font-baloo text-xl font-extrabold tracking-tight">
            NexusFX
          </a>
          <div className="flex items-center gap-1 font-mono text-xs sm:gap-2 sm:text-sm">
            <a href="#top" className="rounded-full px-3 py-1 text-white/70 transition hover:bg-white/10 hover:text-white">
              home
            </a>
            <a href="#clients" className="rounded-full px-3 py-1 text-white/70 transition hover:bg-white/10 hover:text-white">
              clients
            </a>
            <a href="#videos" className="rounded-full px-3 py-1 text-white/70 transition hover:bg-white/10 hover:text-white">
              videos
            </a>
            <a
              href="#hire"
              className="rounded-full bg-lime-400 px-3 py-1 font-semibold text-black transition hover:bg-pink-500 hover:text-white hover:shadow-[0_0_24px_rgba(236,72,153,0.7)]"
            >
              hire me
            </a>
          </div>
        </nav>
      </header>

      {/* Hero — full viewport, centred */}
      <section
        id="top"
        className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        <div className="v2-fade-up relative -rotate-2 border-2 border-lime-400/60 px-6 py-8 sm:px-10">
          <span className="absolute -left-2 -top-2 h-4 w-4 bg-lime-400" />
          <span className="absolute -right-2 -top-2 h-4 w-4 bg-lime-400" />
          <span className="absolute -bottom-2 -left-2 h-4 w-4 bg-lime-400" />
          <span className="absolute -bottom-2 -right-2 h-4 w-4 bg-lime-400" />
          <h1 className="v2-gradient-text bg-gradient-to-r from-lime-300 via-pink-400 to-lime-300 bg-clip-text font-baloo text-6xl font-extrabold leading-none tracking-tight text-transparent sm:text-8xl">
            NexusFX
          </h1>
          <p className="mt-6 font-pixel text-sm leading-relaxed text-lime-300 sm:text-base">
            edits that hold attention
          </p>
        </div>
        <p className="v2-fade-up mt-8 max-w-md text-base text-white/70" style={{ animationDelay: "0.15s" }}>
          Video editor for YouTubers and gaming creators. Hooks that land,
          pacing that keeps people watching to the end.
        </p>
        <a
          href="#videos"
          className="v2-fade-up v2-glow-pulse mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-lime-300"
          style={{ animationDelay: "0.3s" }}
        >
          Watch the work <ArrowUpRight size={18} weight="Filled" />
        </a>
        <p className="v2-bounce-soft absolute bottom-6 font-mono text-xs text-white/50">
          scroll ↓
        </p>
      </section>

      {/* Clients — contained dark panel, square edge-to-edge tiles */}
      <section id="clients" className="px-4 pb-24">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-zinc-900 p-8 sm:p-12">
          <h2 className="text-center font-pixel text-lg leading-relaxed tracking-tight sm:text-xl">
            Creators I&apos;ve worked with
          </h2>
          <div
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3"
            onMouseLeave={() => setFeaturedClient(0)}
          >
            {CLIENTS.map((client, index) => {
              const featured = featuredClient === index;
              return (
                <div
                  key={client.name}
                  onMouseEnter={() => setFeaturedClient(index)}
                  className={`relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${client.gradient} shadow-lg transition-all duration-300 ${
                    featured
                      ? "z-10 scale-110 ring-2 ring-white/80 shadow-2xl"
                      : "scale-100"
                  }`}
                >
                  <span className="flex h-full w-full items-center justify-center text-4xl font-black">
                    {client.initial}
                  </span>
                  {/* Name pill: only on the featured tile, bottom centre */}
                  <span
                    className={`absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 font-mono text-xs text-white transition-opacity duration-300 ${
                      featured ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {client.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured videos — landscape edge-to-edge cards, no caption below */}
      <section id="videos" className="mx-auto max-w-3xl px-4 pb-24">
        <div className="text-center">
          <span className="rounded-full border border-white/15 px-4 py-1 font-mono text-xs text-white/70">
            featured work
          </span>
          <h2 className="mt-6 font-pixel text-lg leading-relaxed tracking-tight sm:text-xl">
            Recent edits
          </h2>
        </div>
        <div className="group/grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video) => (
            <article
              key={video.title}
              className="group transition duration-300 group-hover/grid:opacity-40 hover:opacity-100"
            >
              <div
                className={`relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br ${video.gradient} shadow-lg transition duration-300 group-hover:scale-[1.03] group-hover:brightness-110 group-hover:shadow-2xl`}
              >
                {/* Title appears only on hover, bottom-left inside the card */}
                <span className="absolute bottom-3 left-3 max-w-[70%] rounded-full bg-black/70 px-3 py-1 text-left font-mono text-[11px] leading-snug text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {video.title}
                </span>
                <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white ring-1 ring-white/60 transition duration-300 hover:scale-110 hover:bg-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] hover:ring-pink-400">
                  <Play size={20} weight="Filled" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Hire — closing panel */}
      <section id="hire" className="px-4 pb-16">
        <div className="v2-float mx-auto max-w-3xl rounded-[2rem] bg-zinc-200 p-3 sm:p-4">
          <div className="rounded-[1.5rem] bg-lime-400 px-8 py-12 text-center text-black sm:py-16">
            <h2 className="font-serif text-4xl font-bold leading-tight sm:text-6xl">
              Let&apos;s build your
              <br />
              next video.
            </h2>
            <a
              href="mailto:nexusfx.media@gmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-pink-500 hover:shadow-[0_0_24px_rgba(236,72,153,0.7)]"
            >
              Hire me <ArrowUpRight size={18} weight="Filled" />
            </a>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 px-4 py-5 text-black sm:flex-row">
            <a
              href="mailto:nexusfx.media@gmail.com"
              className="flex items-center gap-2 rounded-full px-3 py-1 font-mono text-sm transition hover:-translate-y-0.5 hover:text-blue-700 hover:shadow-md"
            >
              <Envelope size={18} weight="Filled" /> nexusfx.media@gmail.com
            </a>
            <a
              href="https://www.instagram.com/nexu.fx4"
              className="flex items-center gap-2 rounded-full px-3 py-1 font-mono text-sm transition hover:-translate-y-0.5 hover:text-blue-700 hover:shadow-md"
            >
              <Instagram size={18} weight="Filled" /> @nexu.fx4
            </a>
          </div>
        </div>
        <p className="mt-8 text-center font-mono text-xs text-white/40">
          © 2026 NexusFX
        </p>
      </section>
    </div>
  );
}
