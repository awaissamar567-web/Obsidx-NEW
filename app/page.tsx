import { Header } from "@/components/Header";
import { ResultsGallery } from "@/components/ResultsGallery";
import { ResultsStandard } from "@/components/ResultsStandard";
import { ServiceHub } from "@/components/ServiceHub";
import { MemberDock } from "@/components/MemberDock";
import { ScrollReveal } from "@/components/Motion";
import { PartnerDashboard } from "@/components/PartnerDashboard";
import { ProcessSlides } from "@/components/ProcessSlides";
import { ProductFlow } from "@/components/ProductFlow";
import { ToolsMarquee } from "@/components/ToolsMarquee";

// TODO: replace with the real Obsidx profile URLs and inbox.
const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
] as const;
const contactEmail = "hello@obsidx.com";

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
      </section>

      <section className="trust-rail" aria-label="Products Obsidx builds">
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
      </section>

      <section className="about opportunity section-shell" id="opportunity">
        <ScrollReveal className="about-statement opportunity-heading">
          <h2>You’ve Built the Audience. Now Build the Business Behind It.</h2>
        </ScrollReveal>
        <ProductFlow />
      </section>

      <ToolsMarquee />

      <ResultsStandard />

      <section className="ox-section section-shell" id="how-it-works">
        <ScrollReveal className="ox-section-head">
          <p className="ox-eyebrow">How it works</p>
          <h2>From Audience Insight to a Business That Keeps Improving</h2>
        </ScrollReveal>
        <ProcessSlides />
      </section>

      <section className="ox-section ox-clarity section-shell" id="about">
        <ScrollReveal className="ox-clarity-copy">
          <p className="ox-eyebrow">Transparency</p>
          <h2>Clarity Creates Visible, Accountable Growth.</h2>
          <p>
            Your creator business should never depend on guesswork. You see what is being built, why it matters, how it
            performs, and what happens next.
          </p>
          <p>Every partnership runs on measurable demand, transparent performance and decisions made together.</p>
        </ScrollReveal>
        <ScrollReveal>
          <PartnerDashboard />
        </ScrollReveal>
      </section>

      <section className="ox-section ox-hub section-shell" id="what-we-do" aria-label="What we do in every partnership">
        <ServiceHub />
        <p className="ox-hub-note">Everything here is included in every partnership.</p>
      </section>

      <section className="ox-section ox-proof-section section-shell" id="results" aria-label="Partner results">
        <ScrollReveal className="ox-section-head">
          <p className="ox-eyebrow">Partner results</p>
          <h2>Numbers, Not Promises.</h2>
        </ScrollReveal>
        <ResultsGallery />
      </section>

      <section className="apply ox-apply section-shell" id="apply">
        <ScrollReveal className="apply-copy">
          <h2 className="ox-apply-title">
            You built the trust, <span className="ox-apply-accent">now build what comes next.</span>
          </h2>
          <p>Obsidx works with a limited number of established creators ready to build a serious, owned revenue stream.</p>
          <a className="button final-apply-button" href="/apply">Apply to Work With Obsidx</a>
        </ScrollReveal>
      </section>

      <footer className="site-footer">
        <div className="site-footer-columns">
          <nav aria-label="Footer navigation">
            <h2>Navigation</h2>
            <a href="#home">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#what-we-build">What We Build</a>
            <a href="#about">About</a>
            <a href="/apply">Apply Now</a>
          </nav>
          <div>
            <h2>Social</h2>
            {socialLinks.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label}</a>
            ))}
          </div>
          <div>
            <h2>Contact</h2>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
        </div>
        <p className="site-footer-wordmark" aria-hidden="true">Obsidx</p>
      </footer>
    </main>
  );
}
