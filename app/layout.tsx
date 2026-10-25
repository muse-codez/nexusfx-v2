import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts supplied by the user (in app/fonts/, loaded locally):
// - Minecraft.ttf: the actual Minecraft-style pixel font, for labels.
// - BALLOON_DREAMS.otf: balloon-style font, for the name and titles.
// - Fungky_Brow_DEMO.otf: bubbly balloon-style demo font, used only
//   for short uppercase section titles — the demo has only 56 glyphs,
//   so it is not used for long or mixed-case text.
//
// Variable names are intentionally different from the Tailwind theme
// tokens in globals.css (e.g. --font-balloon-dreams vs --font-balloon).
// Using the same name made the CSS circular and the fonts never
// applied — that was the bug that left the site on Geist.
const minecraftFont = localFont({
  src: "./fonts/Minecraft.ttf",
  variable: "--font-minecraft-font",
  weight: "400",
});

const balloonFont = localFont({
  src: "./fonts/BALLOON_DREAMS.otf",
  variable: "--font-balloon-dreams",
  weight: "400",
});

const fungkyFont = localFont({
  src: "./fonts/Fungky_Brow_DEMO.otf",
  variable: "--font-fungky-brow",
  weight: "400",
});

export const metadata: Metadata = {
  title: "NexusFX | Video Editor",
  description: "NexusFX — video editor for YouTubers and gaming creators.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${minecraftFont.variable} ${balloonFont.variable} ${fungkyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
