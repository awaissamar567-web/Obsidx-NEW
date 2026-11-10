import { contactEmail, socialLinks } from "@/lib/site";

// Links use "/#section" so they also work from /privacy and /terms; on the homepage Lenis
// turns them into a smooth scroll.

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

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-columns">
        <nav aria-label="Footer navigation">
          <h2>Navigation</h2>
          <a href="/#home">Home</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#what-we-build">What We Build</a>
          {/* The Transparency section is hidden on phones, so its link is too. */}
          <a className="footer-link-about" href="/#about">About</a>
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
      <div className="site-footer-legal">
        <p>© {new Date().getFullYear()} Obsidx. All rights reserved.</p>
        <nav aria-label="Legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Conditions</a>
        </nav>
      </div>
      <p className="site-footer-wordmark" aria-hidden="true">Obsidx</p>
    </footer>
  );
}
