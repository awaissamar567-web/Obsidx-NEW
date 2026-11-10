import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Page not found | Obsidx",
};

// Shown for any unknown URL (Next.js renders it inside the root layout with a 404 status).
// Same pill header as the site, then one centred line: "404 | This page could not be found."
export default function NotFound() {
  return (
    <main className="ox-404">
      <Header />
      <section className="ox-404-body" aria-labelledby="ox-404-title">
        <div className="ox-404-message">
          <h1 className="ox-404-code" id="ox-404-title">
            404
          </h1>
          <span className="ox-404-rule" aria-hidden="true" />
          <p>This page could not be found.</p>
        </div>
        <a className="ox-404-home" href="/">
          Back to home
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>
    </main>
  );
}
