import { Header } from "@/components/Header";
import { ResultsStandard } from "@/components/ResultsStandard";
import { HeroEntrance, ScrollReveal } from "@/components/Motion";
import { ProductFlow } from "@/components/ProductFlow";
import { ToolsMarquee } from "@/components/ToolsMarquee";

const operatingSteps = [
  {
    title: "Find the Opportunity",
    body: "Your audience, expertise, existing demand, and commercial signals reveal the strongest business opportunity.",
  },
  {
    title: "Shape the Offer",
    body: "The product, positioning, pricing, and customer journey are developed into an offer that is clear, relevant, and compelling.",
  },
  {
    title: "Build the System",
    body: "Your tools, sales process, delivery experience, and operating workflow are connected into a system built to launch and grow.",
  },
  {
    title: "Launch and Improve",
    body: "Customer behavior, revenue, retention, and feedback guide each improvement after launch.",
  },
] as const;

// TODO: replace with the real Obsidx profile URLs and inbox.
const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
] as const;
const contactEmail = "hello@obsidx.com";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero section-shell" id="home">
        <HeroEntrance className="hero-copy">
          <h1>Your Audience Is Already Paying Attention. Build Something They Can Own With You.</h1>
          <a className="button hero-button" href="/apply">Apply to Work With Obsidx</a>
        </HeroEntrance>
      </section>

      <aside className="application-cap" aria-label="Application availability">
        <span><strong>20</strong><span aria-hidden="true">/</span><strong>25</strong> Members</span>
        <a href="/apply">Apply Now</a>
      </aside>

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

      <section className="about section-shell" id="how-it-works">
        <ScrollReveal className="about-statement">
          <h2>From Audience Insight to a Business That Keeps Improving</h2>
        </ScrollReveal>

        <ScrollReveal className="operating-list process-list">
          {operatingSteps.map((step) => (
            <article key={step.title}>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </ScrollReveal>
      </section>

      <section className="about standard-section section-shell" id="about">
        <ScrollReveal className="about-statement">
          <h2>Clarity Creates Visible, Accountable Growth.</h2>
          <p>Your creator business should never depend on guesswork.</p>
          <p>You should understand what is being built, why it matters, how it performs, and what needs to happen next.</p>
          <p>Every Obsidx partnership is built around measurable demand, transparent performance, and decisions made together.</p>
        </ScrollReveal>
        <ScrollReveal><blockquote>
          “Attention is the new oil. But oil is worthless if you don't have a refinery. We build the refinery.”
        </blockquote></ScrollReveal>
      </section>

      <section className="apply section-shell" id="apply">
        <ScrollReveal className="apply-copy">
          <h2>You Built the Trust. Now Build What Comes Next.</h2>
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
