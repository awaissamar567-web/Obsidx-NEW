import type { Metadata } from "next";
import "@fontsource/inter/400.css";
// Footer legal bar (italic). Browsers only download it where italic Inter is used.
import "@fontsource/inter/400-italic.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/lora/400-italic.css";
// 400, 400-italic and 600-italic are declared in globals.css instead: the package's .woff2 files
// for those weights are broken (they are PostScript fonts, not WOFF2), so we serve the .woff copies.
import "@fontsource/open-sauce-sans/500.css";
import "@fontsource/open-sauce-sans/500-italic.css";
import "@fontsource/open-sauce-sans/600.css";
import "@fontsource/open-sauce-sans/700.css";
import "@fontsource/open-sauce-sans/700-italic.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./redesign.css";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Obsidx | Creator businesses built with clarity",
  description:
    "Obsidx partners with established creators to build digital products and sustainable revenue streams.",
  metadataBase: new URL("https://obsidx.com"),
  icons: {
    icon: "/assets/obsidx-gold-logo.png",
  },
  openGraph: {
    title: "Your audience is ready. Build what comes next.",
    description:
      "Turn audience trust into digital products and sustainable revenue streams with Obsidx.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  );
}
