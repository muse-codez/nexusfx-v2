"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Envelope, Instagram, Play } from "reicon-react";
import DotField from "@/components/DotField";
import IntroLoader from "@/components/IntroLoader";

// NexusFX v2 — original homepage, inspired in general structure only by
// notenemyok.com (pill nav, full-height hero, clients panel, video grid,
// closing hire panel, and the card ideas: square client tiles with a
// featured tile + name pill, landscape video cards with a bottom-right
// play button). No text, images, videos, or code copied from that site;
// all copy below is written for NexusFX, and the animation / hover
// code here is original.
//
// Creators are now real (from v1, see CLIENTS). Video titles below
// are still fictional placeholders, NOT real NexusFX videos.
// Replace them with real ones before publishing.
// Real NexusFX creators, copied from v1 (components/about.tsx):
// logos are the channels' official YouTube avatars, copied from
// v1 public/creators/ into v2 public/creators/. No longer fictional.
const CLIENTS = [
  { name: "GamerFleet", logo: "/creators/gamerfleet.jpg", url: "https://www.youtube.com/@GamerFleet" },
  { name: "I. M. Bixu", logo: "/creators/imbixu.jpg", url: "https://www.youtube.com/@imbixu" },
  { name: "BeckBros", logo: "/creators/beckbros.jpg", url: "https://www.youtube.com/@beckbros" },
  { name: "BeckBroBlox", logo: "/creators/beckbroblox.jpg", url: "https://www.youtube.com/@BeckBroBlox" },
  { name: "SarahGrace", logo: "/creators/sarahgrace.jpg", url: "https://www.youtube.com/@TheSarahGrace" },
  { name: "Ayush Bhandari", logo: "/creators/ayushbhandari.jpg", url: "https://www.youtube.com/@AyushBhandari" },
] as const;

// Showcase videos copied from v1 (components/showcase.tsx):
// placeholder picks for now, one per creator, verified in v1 via
// YouTube oEmbed. Replace these IDs later with real portfolio pieces.
const VIDEOS = [
  { id: "voAnIhI5PF8", title: "I MET THE PRIME MINISTER OF INDIA", creator: "GamerFleet", creatorUrl: "https://www.youtube.com/@GamerFleet", creatorLogo: "/creators/gamerfleet.jpg" },
  { id: "H5fyiYtyLjw", title: "Finding EVERY ANOMALY in SCHOOL!", creator: "I. M. Bixu", creatorUrl: "https://www.youtube.com/@imbixu", creatorLogo: "/creators/imbixu.jpg" },
  { id: "zbM-A_VKd58", title: "BeckBro's Cereal Tier List", creator: "BeckBros", creatorUrl: "https://www.youtube.com/@beckbros", creatorLogo: "/creators/beckbros.jpg" },
  { id: "2JHbnL5rj6c", title: "BeckBros Play Heave Ho 2", creator: "BeckBroBlox", creatorUrl: "https://www.youtube.com/@BeckBroBlox", creatorLogo: "/creators/beckbroblox.jpg" },
  { id: "Jaj75z2hGwo", title: "I 3D Printed a FOLDABLE iPhone...", creator: "SarahGrace", creatorUrl: "https://www.youtube.com/@TheSarahGrace", creatorLogo: "/creators/sarahgrace.jpg" },
  { id: "HsMemCsMGyc", title: "I Tried Every Celebrity Experience!", creator: "Ayush Bhandari", creatorUrl: "https://www.youtube.com/@AyushBhandari", creatorLogo: "/creators/ayushbhandari.jpg" },
] as const;

const HIRE_SPARKLES = [
  { dx: -140, dy: -110, size: 12, color: "#000000", round: false },
  { dx: -90, dy: -150, size: 8, color: "#f7078e", round: true },
  { dx: 0, dy: -170, size: 14, color: "#ffffff", round: false },
  { dx: 90, dy: -150, size: 8, color: "#000000", round: true },
  { dx: 140, dy: -110, size: 12, color: "#a855f7", round: false },
  { dx: 170, dy: -40, size: 10, color: "#f7078e", round: false },
  { dx: 170, dy: 40, size: 8, color: "#ffffff", round: true },
  { dx: 140, dy: 110, size: 12, color: "#000000", round: false },
  { dx: 90, dy: 150, size: 8, color: "#a855f7", round: true },
  { dx: 0, dy: 170, size: 14, color: "#f7078e", round: false },
  { dx: -90, dy: 150, size: 8, color: "#ffffff", round: true },
  { dx: -140, dy: 110, size: 12, color: "#a855f7", round: false },
  { dx: -170, dy: 40, size: 10, color: "#000000", round: true },
  { dx: -170, dy: -40, size: 8, color: "#f7078e", round: false },
] as const;

export default function Home() {
  // Featured client tile: first tile at rest, transfers to the tile
  // under the cursor on hover, and returns when the cursor leaves.
  const [featuredClient, setFeaturedClient] = useState(0);
  // Hire click burst: increments on every Hire me click, used as
  // the burst key so the animation replays each time.
  const [hireBurst, setHireBurst] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Navbar, two states like the reference screenshots:
  // - Without scroll: flat, no pill container, just brand + links
  //   on the page background, home as a blue pill, hire as a
  //   pink/maroon pill, all links always visible.
  // - After scroll: the same bar becomes a dark rounded pill
  //   container (blur + shadow + ring).
  // This replaces the earlier "hidden on hero" rule.
  const [scrolled, setScrolled] = useState(false);
  // Scroll-spy: blue pill = the section actually on screen.
  // Previously home was hardcoded blue, so scrolling never
  // changed the navbar. Now the active section is recomputed
  // on every scroll: the last section whose top has passed
  // 150px from the viewport top (navbar height + margin).
  // Order matters because #videos sits inside #clients.
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      let current = "top";
      for (const id of ["top", "clients", "videos", "hire"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-black font-sans text-white">
      {/* Intro loader: black screen, flipping zoom-in logo, then
          fades away to reveal this page rendered underneath. */}
      <IntroLoader />
      {/* Main background: React Bits DotField, fixed behind all
          content. Interactive (cursor lens + glow) via window
          pointer events, so it works even though content sits
          above it. Props are the usage example as given. */}
      <div aria-hidden="true" className="fixed inset-0 z-0">
        <DotField
          gradientFrom="#5227FF"
          gradientTo="#FF9FFC"
          dotRadius={1.5}
          dotSpacing={14}
          cursorRadius={240}
          bulgeStrength={0.6}
          glowRadius={160}
        />
      </div>
      {/* Navbar width: old centred pill was max-w-2xl, which was
          good; this is slightly longer at max-w-3xl, same width in
          both states so it does not jump when scrolling. */}
      <header
        className={`fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ease-out ${
          scrolled ? "top-4 px-4" : "top-0 px-4 py-4"
        }`}
      >
        <nav
          className={`flex w-full max-w-3xl items-center justify-between transition-all duration-500 ${
            scrolled
              ? "rounded-full bg-black/80 px-5 py-3 shadow-xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-xl"
              : "bg-transparent px-2 py-1"
          }`}
        >
          <a href="#top" className="font-pixelify text-xl font-extrabold tracking-tight">
            NexusFX
          </a>
          <div className="flex items-center gap-1 font-mono text-xs sm:gap-2 sm:text-sm">
            <a
              href="#top"
              className={`rounded px-3 py-1 transition ${
                active === "top"
                  ? "bg-[#3884ff] font-semibold text-white hover:bg-[#4a90ff]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              home
            </a>
            <a
              href="#clients"
              className={`rounded px-3 py-1 transition ${
                active === "clients"
                  ? "bg-[#3884ff] font-semibold text-white hover:bg-[#4a90ff]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              clients
            </a>
            <a
              href="#videos"
              className={`rounded px-3 py-1 transition ${
                active === "videos"
                  ? "bg-[#3884ff] font-semibold text-white hover:bg-[#4a90ff]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              videos
            </a>
            <a
              href="#hire"
              className={`v2-shine-wrap relative overflow-hidden rounded px-3 py-1 font-semibold text-white transition ${
                active === "hire"
                  ? "bg-[#3884ff] hover:bg-[#4a90ff]"
                  : "bg-[#5b1a3a] ring-1 ring-pink-500/60 hover:bg-pink-600"
              }`}
            >
              hire <span aria-hidden="true" className="v2-shine-beam" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero — full viewport, centred */}
      <section
        id="top"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        {/* TEMPORARY placeholder only, REMOVE BEFORE PUBLISHING:
            this video is notenemyok.com's asset, not NexusFX's.
            It is hotlinked (not copied into the repo) for preview
            only, as the user asked, and must be replaced with
            NexusFX's own hero video before any publish. */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-100"
          src="https://www.notenemyok.com/VIDS/background%20video.mp4"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-black/20" />
        <div className="group v2-fade-up relative z-10 -rotate-2 border-2 border-lime-400/60 px-6 py-8 sm:px-10">
          <span className="absolute -left-2 -top-2 h-4 w-4 bg-lime-400" />
          <span className="absolute -right-2 -top-2 h-4 w-4 bg-lime-400" />
          <span className="absolute -bottom-2 -left-2 h-4 w-4 bg-lime-400" />
          <span className="absolute -bottom-2 -right-2 h-4 w-4 bg-lime-400" />
          <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 bg-lime-400" />
          <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 bg-lime-400" />
          <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 bg-lime-400" />
          <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 bg-lime-400" />
          <span className="absolute -bottom-5 right-4 rounded-full bg-lime-400 px-3 py-1 font-mono text-[10px] font-bold text-black">
            NEXUSFX
          </span>
          <span className="v2-wobble relative inline-block overflow-hidden">
            <h1 className="v2-write v2-gradient-text bg-gradient-to-r from-lime-300 via-pink-400 to-lime-300 bg-clip-text font-pixelify text-[clamp(4.5rem,18vw,12.5rem)] font-extrabold leading-none tracking-tight text-transparent">
              NexusFX
            </h1>
            <span aria-hidden="true" className="v2-shine-beam" />
          </span>
          <p className="mt-6 font-minecraft text-sm leading-relaxed text-lime-300 sm:text-base">
            edits that hold attention
          </p>
        </div>
        <p className="v2-bounce-soft absolute bottom-6 rounded-full bg-white/10 px-4 py-1 font-mono text-xs text-white/70 backdrop-blur">
          scroll ↓
        </p>
      </section>

      {/* Clients — contained dark panel, square edge-to-edge tiles */}
      <section id="clients" className="relative z-10 w-full px-2 pb-24 sm:px-4">
        <div className="relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-8 shadow-2xl ring-1 ring-zinc-400/30 sm:p-12">
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <span aria-hidden="true" className="absolute left-4 top-3 text-sm text-white/30">✦</span>
          <span aria-hidden="true" className="absolute right-4 top-3 text-sm text-white/30">✦</span>
          <span aria-hidden="true" className="absolute bottom-3 left-4 text-sm text-white/30">✦</span>
          <span aria-hidden="true" className="absolute bottom-3 right-4 text-sm text-white/30">✦</span>
          <h2 className="relative text-center font-pixelify text-2xl leading-relaxed tracking-wide sm:text-3xl">
            Creators I&apos;ve worked with
          </h2>
          <div
            className="relative mx-auto mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[46%] lg:grid-cols-3"
            onMouseLeave={() => setFeaturedClient(0)}
          >
            {CLIENTS.map((client, index) => {
              const featured = featuredClient === index;
              return (
                <a
                  key={client.name}
                  href={client.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setFeaturedClient(index)}
                  className={`relative aspect-square overflow-hidden rounded-[2.5rem] bg-zinc-900 shadow-lg ring-1 ring-zinc-300/40 transition-all duration-300 ${
                    featured
                      ? "z-10 scale-110 ring-2 ring-white/80 shadow-2xl"
                      : "scale-100"
                  }`}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-cover"
                  />
                  {/* Metal shine: bright top-left sweep over the tile */}
                  <span className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/40 via-white/5 to-black/25" />
                  {/* Name pill: only on the featured tile, bottom centre */}
                  <span
                    className={`absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 font-mono text-xs text-white transition-opacity duration-300 ${
                      featured ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {client.name}
                  </span>
                </a>
              );
            })}
          </div>
          {/* Recent edits — v1 showcase, inside the same metal card,
              which now expands to the end of the showcase. */}
          <div id="videos" className="relative mt-16 scroll-mt-24 text-center">
            <span className="rounded-full border border-white/15 px-4 py-1 font-mono text-xs text-white/70">
              featured work
            </span>
            <h2 className="mt-6 font-pixelify text-2xl leading-relaxed tracking-wide sm:text-3xl">
              Recent edits
            </h2>
          </div>
        <div className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video) => (
            <article key={video.id}>
              <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-black shadow-lg ring-1 ring-zinc-300/40">
                {playingId === video.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingId(video.id)}
                    aria-label={`Play ${video.title}`}
                    className="group absolute inset-0 h-full w-full cursor-pointer"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white ring-1 ring-white/60 transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.18] group-hover:bg-[#f7078e] group-hover:shadow-[0_0_20px_rgba(247,7,142,0.85)]">
                        <Play size={24} weight="Filled" />
                      </span>
                    </span>
                  </button>
                )}
              </div>
              <h3 className="mt-3 text-left font-mono text-sm font-medium leading-snug text-white">
                {video.title}
              </h3>
              <a
                href={video.creatorUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center gap-2 font-mono text-xs text-white/70 transition hover:text-white"
              >
                <img src={video.creatorLogo} alt={video.creator} className="h-5 w-5 rounded-full object-cover" />
                {video.creator}
              </a>
            </article>
          ))}
        </div>
          <div className="relative mt-10 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] text-white/50">
            <span>CLIENTS · 06</span>
            <span>+</span>
            <span>NEXUSFX · 2026</span>
          </div>
        </div>
      </section>

      {/* Hire — closing panel */}
      <section id="hire" className="relative z-10 px-4 pb-16">
        <div className="v2-float mx-auto max-w-3xl rounded-[2.5rem] bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500 p-3 shadow-xl ring-1 ring-white/60 sm:p-4">
          <div className="flex items-center justify-between px-4 py-3 font-mono text-xs text-black/70">
            <span className="font-bold text-black">NexusFX — Video Editor</span>
            <a
              href="https://www.instagram.com/nexu.fx4"
              className="rounded-full bg-white px-4 py-1 font-semibold text-black/60 transition hover:text-blue-700"
            >
              @nexu.fx4
            </a>
          </div>
          <div className="relative rounded-[1.5rem] bg-lime-400 px-8 py-12 text-center text-black sm:py-16">
            <div className="relative inline-block border-2 border-black/25 px-6 py-4">
              <span className="absolute -left-2 -top-2 h-3 w-3 bg-black" />
              <span className="absolute -right-2 -top-2 h-3 w-3 bg-black" />
              <span className="absolute -bottom-2 -left-2 h-3 w-3 bg-black" />
              <span className="absolute -bottom-2 -right-2 h-3 w-3 bg-black" />
              <h2 className="font-pixelify text-4xl font-bold leading-tight sm:text-6xl">
                Let&apos;s build your
                <br />
                next video.
              </h2>
            </div>
            <a
              href="mailto:nexusfx.media@gmail.com"
              onClick={() => setHireBurst((b) => b + 1)}
              className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-pink-500 hover:shadow-[0_0_24px_rgba(236,72,153,0.7)]"
            >
              Hire me <ArrowUpRight size={18} weight="Filled" />
            </a>
            {hireBurst > 0 ? (
              <div key={hireBurst} aria-hidden="true" className="v2-hire-burst pointer-events-none absolute inset-0 z-20">
                <div className="v2-hire-glow absolute inset-0 rounded-[1.5rem] ring-4 ring-[#f7078e]" />
                {HIRE_SPARKLES.map((s, i) => (
                  <span
                    key={i}
                    className="v2-spark-burst absolute"
                    style={
                      {
                        left: "50%",
                        top: "72%",
                        width: s.size,
                        height: s.size,
                        backgroundColor: s.color,
                        borderRadius: s.round ? "50%" : 2,
                        animationDelay: `${i * 0.02}s`,
                        "--dx": `${s.dx}px`,
                        "--dy": `${s.dy}px`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            ) : null}
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
