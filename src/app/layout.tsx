import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Grain from "@/components/layout/Grain";
import Nav from "@/components/layout/Nav";
import SkipLink from "@/components/layout/SkipLink";

// JetBrains Mono via Google Fonts (open source)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vedant.dev"),
  title: "Vedant — AI/ML & Full-Stack Engineer",
  description:
    "I engineer systems that learn, move, and scale — from neural nets on the edge to full-stack platforms that millions can use. Based in Pune, India.",
  openGraph: {
    title: "Vedant — AI/ML & Full-Stack Engineer",
    description:
      "AI/ML Engineering · Full-Stack Development · Embedded & Robotics · Creative Development",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vedant — AI/ML & Full-Stack Engineer",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedant — AI/ML & Full-Stack Engineer",
    description:
      "AI/ML Engineering · Full-Stack Development · Embedded & Robotics · Creative Development",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={jetbrainsMono.variable}
      style={{ background: "#0e0e0e" }}
    >
      <head>
        {/* Preload self-hosted display fonts */}
        <link
          rel="preload"
          href="/fonts/PPNeueMontreal-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeneralSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        style={{
          backgroundColor: "var(--color-base)",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-body)",
          overflowX: "hidden",
        }}
      >
        <SkipLink />
        <SmoothScroll>
          <Nav />
          <main id="main-content">{children}</main>
          <Cursor />
          <Grain />
        </SmoothScroll>
      </body>
    </html>
  );
}
