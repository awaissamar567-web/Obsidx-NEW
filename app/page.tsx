import { BrandLogo } from "@/components/BrandLogo";
import { Header } from "@/components/Header";
import { ResultsStandard } from "@/components/ResultsStandard";
import { GrowthSignals } from "@/components/GrowthSignals";

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

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <h1>Your Audience Is Already Paying Attention. Build Something They Can Own With You.</h1>
          <p className="hero-subhead">
            Obsidx partners with established creators to turn audience trust into digital products and sustainable revenue streams.
          </p>
          <p className="hero-trust-line">Estd. 2022 <span aria-hidden="true">|</span> 7 figures generated</p>
          <a className="button hero-button" href="/apply">Apply to Work With Obsidx</a>
        </div>
        <GrowthSignals />
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
        <div className="about-statement">
          <h2>You’ve Built the Audience. Now Build the Business Behind It.</h2>
          <p>Your audience already knows your voice, values your perspective, and trusts your recommendations.</p>
          <p>Obsidx identifies what your audience genuinely wants, shapes it into the right offer, and builds the systems needed to sell and deliver it consistently.</p>
        </div>

        <div className="operator-model">
          <div className="operator-stage">
            <span className="stage-label">You bring</span>
            <strong>Your audience.<br />Your expertise.<br />Your brand.</strong>
          </div>
          <div className="operator-line" aria-hidden="true"><span /></div>
          <div className="operator-stage operator-backstage">
            <span className="stage-label">Obsidx brings</span>
            <strong>Strategy.<br />Systems.<br />Execution.</strong>
          </div>
        </div>
      </section>

      <ResultsStandard />

      <section className="about section-shell" id="how-it-works">
        <div className="about-statement">
          <h2>From Audience Insight to a Business That Keeps Improving</h2>
        </div>

        <div className="operating-list process-list">
          {operatingSteps.map((step) => (
            <article key={step.title}>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about standard-section section-shell" id="about">
        <div className="about-statement">
          <h2>Clarity Creates Visible, Accountable Growth.</h2>
          <p>Your creator business should never depend on guesswork.</p>
          <p>You should understand what is being built, why it matters, how it performs, and what needs to happen next.</p>
          <p>Every Obsidx partnership is built around measurable demand, transparent performance, and decisions made together.</p>
        </div>
        <blockquote>
          “The strongest creator businesses are built on clear decisions, shared accountability, and systems that keep improving.”
        </blockquote>
      </section>

      <section className="apply section-shell" id="apply">
        <div className="apply-copy">
          <h2>You Built the Trust. Now Build What Comes Next.</h2>
          <p>Obsidx works with a limited number of established creators ready to build a serious, owned revenue stream.</p>
          <a className="button final-apply-button" href="/apply">Apply to Work With Obsidx</a>
        </div>
      </section>

      <footer className="footer">
        <a className="brandmark footer-brandmark" href="#home" aria-label="Obsidx home">
          <BrandLogo />
          <span className="footer-wordmark">Obsidx</span>
        </a>
        <p>Creator businesses built with clarity.</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#what-we-build">What We Build</a>
          <a href="#about">About</a>
          <a href="/apply">Apply Now</a>
        </div>
        <small>© 2026 Obsidx</small>
      </footer>
    </main>
  );
}
