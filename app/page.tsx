"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Envelope, Instagram, Play } from "reicon-react";
import TextLoop from "@/components/TextLoop";
import TargetCursor from "@/components/TargetCursor";
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
// Subscriber counts + "who" lines read from each channel's official
// YouTube page on 2026-10-25. Counts drift as channels grow, so
// refresh them from the channel pages if they start looking stale.
const CLIENTS = [
  { name: "GamerFleet", logo: "/creators/gamerfleet.jpg", url: "https://www.youtube.com/@GamerFleet", subs: "6.05M subscribers", desc: "Indian gaming creator — Minecraft, Lilyville series" },
  { name: "I. M. Bixu", logo: "/creators/imbixu.jpg", url: "https://www.youtube.com/@imbixu", subs: "4.46M subscribers", desc: "Gaming creator — horror & gameplay, “To Make You Smile!”" },
  { name: "BeckBros", logo: "/creators/beckbros.jpg", url: "https://www.youtube.com/@beckbros", subs: "698K subscribers", desc: "IRL channel — funny videos & challenges with friends" },
  { name: "BeckBroBlox", logo: "/creators/beckbroblox.jpg", url: "https://www.youtube.com/@BeckBroBlox", subs: "158K subscribers", desc: "Roblox gameplay" },
  { name: "SarahGrace", logo: "/creators/sarahgrace.jpg", url: "https://www.youtube.com/@TheSarahGrace", subs: "3.76M subscribers", desc: "Tech, unboxing & fun — iPhone / Apple" },
  { name: "Ayush Bhandari", logo: "/creators/ayushbhandari.jpg", url: "https://www.youtube.com/@AyushBhandari", subs: "6.74M subscribers", desc: "Experience & challenge videos" },
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

export default function Home() {
  // Featured client tile: NO tile is featured at rest, so all six
  // tiles sit in exactly the same state. Hover (or keyboard focus)
  // features a tile, and leaving it clears the feature again.
  const [featuredClient, setFeaturedClient] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  // Navbar, two states like the reference screenshots:
  // - Without scroll: flat, no pill container, just brand + links
  //   on the page background, home as a blue pill, hire as a
  //   pink/maroon pill, all links always visible.
  // - After scroll: the same bar becomes a dark rounded pill
  //   container (blur + shadow + ring).
  // This replaces the earlier "hidden on hero" rule.
  // Scroll-spy: blue pill = the section actually on screen.
  // Previously home was hardcoded blue, so scrolling never
  // changed the navbar. Now the active section is recomputed
  // on every scroll: the last section whose top has passed
  // 150px from the viewport top (navbar height + margin).
  // Order matters because #videos sits inside #clients.
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
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
      <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn cursorColor="#ffffff" cursorColorOnTarget="#a3e635" />
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
      {/* Navbar, always without background: the flat version
          (no pill container, no blur, no ring, no shadow) at
          all scroll positions. The scroll pill background was
          removed at the user's request. */}
      <header className="v2-nav-drop fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4">
        <nav className="flex w-full max-w-3xl items-center justify-between bg-transparent px-2 py-1">
          <a href="#top" data-cursor-label="Top" className="cursor-target flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="NexusFX logo" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-pixelify text-xl font-bold text-lime-400">NexusFX</span>
          </a>
          <div className="flex items-center gap-1 font-pixelify text-xs uppercase sm:gap-2 sm:text-sm">
            <a
              href="#top"
              data-cursor-label="Home"
              className={`cursor-target rounded-full px-3 py-1 transition-all duration-300 ${
                active === "top"
                  ? "bg-[#3884ff] font-bold text-white shadow-[0_0_18px_rgba(56,132,255,0.6)] hover:scale-105"
                  : "text-white/80 hover:scale-105 hover:bg-white/10 hover:text-white"
              }`}
            >
              home
            </a>
            <a
              href="#clients"
              data-cursor-label="Clients"
              className={`cursor-target rounded-full px-3 py-1 transition-all duration-300 ${
                active === "clients"
                  ? "bg-[#3884ff] font-bold text-white shadow-[0_0_18px_rgba(56,132,255,0.6)] hover:scale-105"
                  : "text-white/80 hover:scale-105 hover:bg-white/10 hover:text-white"
              }`}
            >
              clients
            </a>
            <a
              href="#videos"
              data-cursor-label="Videos"
              className={`cursor-target rounded-full px-3 py-1 transition-all duration-300 ${
                active === "videos"
                  ? "bg-[#3884ff] font-bold text-white shadow-[0_0_18px_rgba(56,132,255,0.6)] hover:scale-105"
                  : "text-white/80 hover:scale-105 hover:bg-white/10 hover:text-white"
              }`}
            >
              videos
            </a>
            <a
              href="#hire"
              data-cursor-label="Hire"
              className={`cursor-target v2-shine-wrap relative overflow-hidden rounded-full px-3 py-1 font-bold text-white transition-all duration-300 hover:scale-105 ${
                active === "hire"
                  ? "bg-[#3884ff] shadow-[0_0_18px_rgba(56,132,255,0.6)]"
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
          <span className="v2-wobble relative inline-block px-2 py-4">
            <h1 className="v2-soft-blue-title font-pixelify text-[clamp(4.5rem,18vw,12.5rem)] font-extrabold leading-none tracking-tight">
              NexusFX
            </h1>
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
          <h2 className="relative text-center font-pixelify text-5xl font-bold leading-tight tracking-wide sm:text-7xl">
            <span className="v2-clay-title inline-block px-8 py-3">Creators I&apos;ve worked with</span>
          </h2>
          <div
            className="relative mx-auto mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[46%] lg:grid-cols-3"
            onMouseLeave={() => setFeaturedClient(null)}
          >
            {CLIENTS.map((client, index) => {
              const featured = featuredClient === index;
              return (
                <a
                  key={client.name}
                  href={client.url}
                  data-cursor-label={client.name}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setFeaturedClient(index)}
                  onFocus={() => setFeaturedClient(index)}
                  onBlur={() => setFeaturedClient(null)}
                  className={`cursor-target relative aspect-square overflow-hidden rounded-[2.5rem] bg-zinc-900 shadow-lg ring-1 ring-zinc-300/40 transition-shadow duration-300 ${
                    featured
                      ? "z-10 ring-2 ring-lime-400/80 shadow-[0_0_28px_rgba(163,230,53,0.35)]"
                      : ""
                  }`}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-cover" 
                  />
                  {/* Metal shine: bright top-left sweep over the tile */}
                  <span className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/40 via-white/5 to-black/25" />
                  {/* HUD target-lock: four corner brackets, only on hover */}
                  <span aria-hidden="true" className={`pointer-events-none absolute inset-2 transition-opacity duration-200 ${featured ? "opacity-100" : "opacity-0"}`}>
                    <span className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-lime-400" />
                    <span className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-lime-400" />
                    <span className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-lime-400" />
                    <span className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-lime-400" />
                  </span>
                  {/* Scanline: sweeps top to bottom once per hover entry */}
                  {featured && (
                    <span aria-hidden="true" className="v2-tile-scan pointer-events-none absolute inset-x-0 h-[2px] bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.9)]" />
                  )}
                  {/* Hover info: revealed by a left-to-right wipe, not a
                      slide/fade — name gets a short glitch flicker */}
                  <span
                    className="v2-wipe absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/95 via-black/70 to-transparent px-3 pb-3 pt-8 text-left"
                    style={{ clipPath: featured ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
                  >
                    <span className={`block text-sm font-bold text-white ${featured ? "v2-glitch" : ""}`}>{client.name}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-white/80">{client.desc}</span>
                    <span className="mt-1 block text-xs font-semibold text-lime-300">{client.subs}</span>
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
            <h2 className="mt-6 font-pixelify text-5xl font-bold leading-tight tracking-wide sm:text-7xl">
              <span className="v2-clay-title inline-block px-8 py-3">Recent edits</span>
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
                    data-cursor-label="Play"
                    className="cursor-target group absolute inset-0 h-full w-full cursor-pointer"
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
                data-cursor-label={video.creator}
                className="cursor-target mt-2 flex items-center gap-2 font-mono text-xs text-white/70 transition hover:text-white"
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

      {/* Hire — rebuilt, NOT the old card: a TextLoop wave ribbon
          (with a crossing second band + scroll boost) plus a
          pulsing availability badge, and contact as two large
          tiles instead of the old pill row. */}
      <section id="hire" className="relative z-10 pb-24">
        <div className="mx-auto max-w-5xl px-4 text-center">
          {/* Fancy extra 1: live availability badge with a pulsing dot */}
          <p className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 font-mono text-xs text-lime-300 ring-1 ring-lime-400/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            Available for new projects
          </p>
        </div>
        {/* Edge-to-edge loop: full viewport width, no container. */}
        <div className="w-full">
          <TextLoop
            text="HIRE ME"
            shape="wave"
            speed={90}
            direction="forward"
            separator="✦"
            curviness={90}
            tilt={0}
            fontSize={46}
            fontWeight={800}
            letterSpacing={2}
            uppercase
            ribbon
            ribbonColor="#a3e635"
            color="#000000"
            ribbonWidth={86}
            edgeFade={0}
            cross
            crossAngle={16}
            scrollBoost={0.6}
            pauseOnHover
            className="mt-4"
            style={{ fontFamily: "var(--font-pixelify), monospace" }}
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="mt-2 font-mono text-xs text-white/50">
            Scroll — the loop speeds up. Hover it — it eases to a stop.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-white/80">
            Got a video that needs to hit different? Send the idea, and NexusFX cuts it into something people actually finish.
          </p>
          {/* Contact, as two large tiles — not the old pill row */}
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/15">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/60">
                <Envelope size={16} weight="Filled" /> Email
              </p>
              <p className="mt-3 break-all font-pixelify text-lg text-white">nexusfx.media@gmail.com</p>
              <div className="mt-5 flex gap-2">
                <a
                  href="mailto:nexusfx.media@gmail.com"
                  data-cursor-label="Email"
                  className="cursor-target rounded-full bg-lime-400 px-5 py-2 text-sm font-bold text-black transition hover:bg-lime-300"
                >
                  Write an email
                </a>
                <button
                  type="button"
                  data-cursor-label="Copy"
                  onClick={() => {
                    navigator.clipboard?.writeText("nexusfx.media@gmail.com").catch(() => {});
                    setEmailCopied(true);
                    setTimeout(() => setEmailCopied(false), 2000);
                  }}
                  className="cursor-target rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
                >
                  {emailCopied ? "Copied!" : "Copy address"}
                </button>
              </div>
            </div>
            <a
              href="https://www.instagram.com/nexu.fx4"
              target="_blank"
              rel="noreferrer"
              data-cursor-label="Instagram"
              className="cursor-target group rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/15 transition hover:bg-white/10"
            >
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/60">
                <Instagram size={16} weight="Filled" /> Instagram
              </p>
              <p className="mt-3 font-pixelify text-lg text-white">@nexu.fx4</p>
              <p className="mt-5 flex items-center gap-1 text-sm font-semibold text-pink-400">
                Visit profile <ArrowUpRight size={16} weight="Filled" />
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Site footer */}
      <footer className="relative z-10 px-4 pb-16">
        <p className="text-center font-mono text-xs text-white/40">
          © 2026 NexusFX
        </p>
      </footer>
    </div>
  );
}
