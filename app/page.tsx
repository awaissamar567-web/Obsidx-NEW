import { Header } from "@/components/Header";
import { ResultsGallery } from "@/components/ResultsGallery";
import { ResultsStandard } from "@/components/ResultsStandard";
import { ServiceHub } from "@/components/ServiceHub";
import { MemberDock } from "@/components/MemberDock";
import { PartnerDashboard } from "@/components/PartnerDashboard";
import { ProcessSlides } from "@/components/ProcessSlides";
import { ProductFlow } from "@/components/ProductFlow";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolsMarquee } from "@/components/ToolsMarquee";

export default function Home() {
  return (
    <main className="ox-page">
      <Header />
      <MemberDock />

      <section className="ox-hero" id="home">
        <h1 className="ox-hero-title">
          <span className="ox-line ox-line--1">Your audience</span>{" "}
          <span className="ox-line ox-line--2">is paying</span>{" "}
          <span className="ox-line ox-line--3">attention.</span>
        </h1>
        {/* Phones only: the desktop hero stays headline-only. */}
        <a className="button ox-hero-cta" href="/apply">Apply to Work With Obsidx</a>
      </section>

      {/* Follows the hero headline in: rises in just after the three headline lines. */}
      <Reveal as="section" className="trust-rail" aria-label="Products Obsidx builds" delay={420}>
        <div className="trust-marquee" tabIndex={0} aria-label="Products Obsidx builds. Hover or focus to pause the moving message.">
          <div className="trust-track">
            {[0, 1].map((copy) => (
              <div className="trust-message" aria-hidden={copy === 1} key={copy}>
                <strong>Built for creators ready to turn attention into something they own.</strong>
                <span>Digital Products</span>
                <span>Courses</span>
                <span>Templates</span>
                <span>SaaS</span>
                <span>Paid Communities</span>
                <span>Subscriptions</span>
                <span>Memberships</span>
                <span>Live Classes</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="about opportunity section-shell" id="opportunity">
        <Reveal className="about-statement opportunity-heading">
          <h2>You’ve Built the Audience. Now Build the Business Behind It.</h2>
        </Reveal>
        <Reveal effect="rise" duration={1100}>
          <ProductFlow />
        </Reveal>
      </section>

      <ToolsMarquee />

      <ResultsStandard />

      <section className="ox-section section-shell" id="how-it-works">
        <Reveal className="ox-section-head" stagger={90}>
          <p className="ox-eyebrow">How it works</p>
          <h2>From Audience Insight to a Business That Keeps Improving</h2>
        </Reveal>
        <ProcessSlides />
      </section>

      <section className="ox-section ox-clarity section-shell" id="about">
        {/* Copy slides in from the left line by line while the dashboard comes in from the right. */}
        <Reveal className="ox-clarity-copy" effect="left" stagger={90}>
          <p className="ox-eyebrow">Transparency</p>
          <h2>Clarity Creates Visible, Accountable Growth.</h2>
          <p>
            Your creator business should never depend on guesswork. You see what is being built, why it matters, how it
            performs, and what happens next.
          </p>
          <p>Every partnership runs on measurable demand, transparent performance and decisions made together.</p>
        </Reveal>
        <Reveal effect="right" duration={1100} delay={120}>
          <PartnerDashboard />
        </Reveal>
      </section>

      <section className="ox-section ox-hub section-shell" id="what-we-do" aria-label="What we do in every partnership">
        <Reveal effect="scale" duration={1000}>
          <ServiceHub />
        </Reveal>
        <p className="ox-hub-note">Everything here is included in every partnership.</p>
      </section>

      <section className="ox-section ox-proof-section section-shell" id="results" aria-label="Partner results">
        <Reveal className="ox-section-head" stagger={90}>
          <p className="ox-eyebrow">Partner results</p>
          <h2>Numbers, Not Promises.</h2>
        </Reveal>
        <ResultsGallery />
      </section>

      <section className="apply ox-apply section-shell" id="apply">
        <Reveal className="apply-copy" stagger={110}>
          <h2 className="ox-apply-title">
            You built the trust, <span className="ox-apply-accent">now build what comes next.</span>
          </h2>
          <p>Obsidx works with a limited number of established creators ready to build a serious, owned revenue stream.</p>
          <a className="button final-apply-button" href="/apply">Apply to Work With Obsidx</a>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
