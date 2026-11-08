import { Header } from "@/components/Header";
import { ResultsStandard } from "@/components/ResultsStandard";
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

// TODO: confirm the creator categories Obsidx wants to target.
const whoWeHelp = [
  "Educators & Experts",
  "Coaches & Consultants",
  "Fitness & Wellness",
  "Finance & Business",
  "Creative & Design",
  "Tech & Productivity",
] as const;

const whatWeHandle = [
  "Audience Research",
  "Offer & Pricing",
  "Product Build",
  "Sales & Funnels",
  "Launch Operations",
  "Growth & Retention",
] as const;

// TODO: replace with real, approved partner results. Metrics stay as "—" until confirmed.
const partnerResults = [
  { partner: "Partner case study 01", niche: "Education creator · Cohort course", metrics: ["Launch revenue", "Students", "Completion"] },
  { partner: "Partner case study 02", niche: "Fitness creator · Paid community", metrics: ["Members", "Monthly revenue", "Retention"] },
  { partner: "Partner case study 03", niche: "Business creator · Template library", metrics: ["Units sold", "Conversion", "Repeat buyers"] },
] as const;

const included = [
  "100% owned by you",
  "Audience research",
  "Offer & pricing",
  "Product build",
  "Sales pages",
  "Checkout & payments",
  "Launch operations",
  "Email & community",
  "Performance reporting",
  "Monthly strategy reviews",
  "1:1 partner",
] as const;

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

      <section className="ox-section ox-lists section-shell" aria-label="Who we help and what we handle">
        <ScrollReveal className="ox-list-col">
          <h2 className="ox-list-title">Who we help</h2>
          <ol className="ox-list">
            {whoWeHelp.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </ScrollReveal>
        <ScrollReveal className="ox-list-col">
          <h2 className="ox-list-title">What we handle</h2>
          <ol className="ox-list">
            {whatWeHandle.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </section>

      <section className="ox-section section-shell" id="results" aria-label="Partner results">
        <ScrollReveal className="ox-section-head">
          <p className="ox-eyebrow">Partner results</p>
          <h2>Numbers, Not Promises.</h2>
        </ScrollReveal>
        <ul className="ox-results">
          {partnerResults.map((result) => (
            <li key={result.partner}>
              <div className="ox-result-name">
                <strong>{result.partner}</strong>
                <span>{result.niche}</span>
              </div>
              <dl className="ox-result-metrics">
                {result.metrics.map((metric) => (
                  <div key={metric}>
                    <dt>{metric}</dt>
                    <dd>—</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section className="ox-section ox-included section-shell" aria-label="Included in every partnership">
        <ScrollReveal>
          <p className="ox-eyebrow">Included in every partnership</p>
          <ul className="ox-tags">
            {included.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      <section className="apply ox-apply section-shell" id="apply">
        <ScrollReveal className="apply-copy">
          <h2 className="ox-apply-title">
            <span className="ox-line ox-line--1">You built</span>{" "}
            <span className="ox-line ox-line--2">the trust.</span>{" "}
            <em className="ox-line ox-line--3">Now build what comes next.</em>
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
