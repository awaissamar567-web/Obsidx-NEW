import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { legalUpdated } from "@/lib/site";

// Shared layout for /privacy and /terms: one reading column with a serif title and numbered
// sections (styles under "Legal pages" in redesign.css).
export type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalPage({ title, intro, sections }: { title: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <main className="legal-page">
      <Header />
      <article className="legal">
        <header className="legal-head">
          <p className="ox-eyebrow">Legal</p>
          <h1>{title}</h1>
          <p className="legal-updated">
            Last updated <time dateTime={legalUpdated.iso}>{legalUpdated.label}</time>
          </p>
        </header>
        <div className="legal-intro">{intro}</div>
        {sections.map((section, i) => (
          <section className="legal-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}>
              <span className="legal-num">{i + 1}.</span> {section.title}
            </h2>
            {section.body}
          </section>
        ))}
      </article>
      <SiteFooter />
    </main>
  );
}
