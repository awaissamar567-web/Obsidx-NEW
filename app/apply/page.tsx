import type { Metadata } from "next";
import { ApplicationForm } from "@/components/ApplicationForm";
import { BrandLogo } from "@/components/BrandLogo";
import { HeroEntrance } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Apply | Obsidx",
  description: "Apply to build a clearer, stronger creator revenue system with Obsidx.",
};

export default function ApplyPage() {
  return (
    <main className="apply-page">
      <header className="apply-header">
        <a className="brandmark" href="/" aria-label="Obsidx home"><BrandLogo priority /></a>
        <a className="apply-exit" href="/">Back to site</a>
      </header>

      <section className="application-shell">
        <HeroEntrance className="application-context">
          <h1>Let&apos;s see if there&apos;s a fit.</h1>
          <p>Seven focused questions. One clear step at a time.</p>
        </HeroEntrance>
        <ApplicationForm />
      </section>
    </main>
  );
}
