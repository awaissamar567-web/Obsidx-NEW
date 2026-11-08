"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

// Partner result screenshots (1620 x 2880, lossless WebP in /public/results).
// Sources live in "New Assets icons/Results"; keep the alt text in sync if a screenshot changes.
const results = [
  {
    src: "/results/result-1.webp",
    alt: "Chat with a fitness creator: $3K in sales in 3 hours with 15 new clients, plus a net revenue chart showing $5,075 for Aug 26 to Sep 25.",
  },
  {
    src: "/results/result-2.webp",
    alt: "Creator check-in showing $8,105 net revenue for the month. Caption: $1,500 to $8,000 in 30 days, same creator and audience, only the system changed.",
  },
  {
    src: "/results/result-3.webp",
    alt: "Creator review: revenue was capped at $2,000 from brand deals, then averaged $8,000 a month within 3 months. Charts show $8,220 MRR, up 284%, and $15,980 lifetime value.",
  },
  {
    src: "/results/result-4.webp",
    alt: "Creator message saying their DMs are flooded with coaching requests, next to a long list of new coaching inquiries.",
  },
  {
    src: "/results/result-5.webp",
    alt: "Client feedback on their new coaching website, calling it very professional, with the three program pricing cards that were built for them.",
  },
] as const;

const W = 1620;
const H = 2880;

export function ResultsGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const lenis = useLenis();

  // Freeze the page behind the lightbox while it is open.
  useEffect(() => {
    if (open === null) return;
    lenis?.stop();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
      lenis?.start();
    };
  }, [open, lenis]);

  const show = (index: number) => {
    setOpen(index);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  };

  const step = (direction: -1 | 1) => {
    setOpen((current) => (current === null ? current : (current + direction + results.length) % results.length));
  };

  // Clicks on the dark backdrop (the dialog itself, not its contents) close it.
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  };

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  return (
    <div className="ox-proof">
      <ul className="ox-proof-grid">
        {results.map((result, index) => (
          <li key={result.src}>
            <button
              type="button"
              className="ox-proof-card"
              onClick={() => show(index)}
              aria-label={`Open partner result ${index + 1} of ${results.length} full size`}
            >
              <Image
                src={result.src}
                alt={result.alt}
                width={W}
                height={H}
                sizes="(max-width: 760px) 46vw, 260px"
              />
              <span className="ox-proof-zoom" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="ox-proof-note">
        All testimonials on this page are from real clients of Obsidx. Your results may vary based on factors like your
        Content, Followers, Engagement rate, Efforts, Market Conditions, and implementation of strategies. We do not
        claim that these results are achievable by everyone.
      </p>

      <dialog
        ref={dialogRef}
        className="ox-proof-dialog"
        aria-label="Partner result, full size"
        onClose={() => setOpen(null)}
        onClick={onDialogClick}
        onKeyDown={onDialogKeyDown}
        data-lenis-prevent
      >
        {open !== null && (
          <>
            <Image
              key={results[open].src}
              className="ox-proof-full"
              src={results[open].src}
              alt={results[open].alt}
              width={W}
              height={H}
              sizes="(max-width: 760px) 92vw, 52vh"
            />
            <button type="button" className="ox-proof-close" onClick={() => dialogRef.current?.close()} aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <button type="button" className="ox-proof-step ox-proof-step--prev" onClick={() => step(-1)} aria-label="Previous result">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className="ox-proof-step ox-proof-step--next" onClick={() => step(1)} aria-label="Next result">
              <span aria-hidden="true">→</span>
            </button>
            <p className="ox-proof-count" aria-live="polite">
              {open + 1} / {results.length}
            </p>
          </>
        )}
      </dialog>
    </div>
  );
}
