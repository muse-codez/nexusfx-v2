import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Pixelify Sans from Google Fonts — pixel style, but far more
// readable than a blocky pixel font, so it works for the name and
// titles, not just tiny labels.
const pixelify = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

// Minecraft.ttf supplied by the user, loaded locally, for small
// pixel labels only. Balloon / bubble fonts (BALLOON DREAMS,
// Fungky Brow) were removed at the user's request.
const minecraftFont = localFont({
  src: "./fonts/Minecraft.ttf",
  variable: "--font-minecraft-font",
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
      className={`${pixelify.variable} ${minecraftFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
