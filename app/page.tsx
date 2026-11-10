import { Header } from "@/components/Header";
import { ResultsGallery } from "@/components/ResultsGallery";
import { ResultsStandard } from "@/components/ResultsStandard";
import { ServiceHub } from "@/components/ServiceHub";
import { MemberDock } from "@/components/MemberDock";
import { PartnerDashboard } from "@/components/PartnerDashboard";
import { ProcessSlides } from "@/components/ProcessSlides";
import { ProductFlow } from "@/components/ProductFlow";
import { Reveal } from "@/components/Reveal";
import { ToolsMarquee } from "@/components/ToolsMarquee";

// TODO: replace with the real Obsidx profile URLs and inbox.
const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
] as const;
const contactEmail = "hello@obsidx.com";

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["label"] }) {
  const common = { className: "site-footer-social-icon", viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;
  if (name === "Instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h3.96V21H3V9.75Zm6.45 0h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V21h-3.96v-5.03c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21H9.45V9.75Z" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="currentColor">
      <path d="M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.37l7.18-8.2L2 3h6.34l4.37 5.78L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
    </svg>
  );
}

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

      <footer className="site-footer">
        <div className="site-footer-columns">
          <nav aria-label="Footer navigation">
            <h2>Navigation</h2>
            <a href="#home">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#what-we-build">What We Build</a>
            {/* The Transparency section is hidden on phones, so its link is too. */}
            <a className="footer-link-about" href="#about">About</a>
            <a href="/apply">Apply Now</a>
          </nav>
          <div>
            <h2>Social</h2>
            {/* Desktop shows the names; phones show the icons (styles in redesign.css). */}
            <div className="site-footer-social">
              {socialLinks.map((link) => (
                <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} key={link.label}>
                  <SocialIcon name={link.label} />
                  <span className="site-footer-social-label">{link.label}</span>
                </a>
              ))}
            </div>
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
