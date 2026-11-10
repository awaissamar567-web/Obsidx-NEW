"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";

// Phone menu (hidden on desktop, see redesign.css): only the key sections, then the Apply button.
const menuSections = [
  { id: "what-we-build", label: "What We Build" },
  { id: "how-it-works", label: "How It Works" },
  { id: "what-we-do", label: "What We Do" },
  { id: "results", label: "Results" },
] as const;

// The menu section the reader is in: the last one whose top has passed a third of the screen.
function currentSection() {
  let current: string | null = null;
  for (const { id } of menuSections) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight / 3) current = id;
  }
  return current;
}

// Where a section's top edge lands when the menu scrolls to it: just enough room for the fixed
// header to clear the heading (sections carry their own top padding).
const MENU_SCROLL_GAP = 56;

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const previousY = useRef(0);
  const directionTravel = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const { scrollY } = useScroll();

  useEffect(() => {
    previousY.current = window.scrollY;
  }, []);

  useMotionValueEvent(scrollY, "change", (currentY) => {
    const delta = currentY - previousY.current;
    previousY.current = currentY;

    // Accumulate small deltas from smooth scrolling instead of requiring a fast frame.
    if (Math.sign(delta) !== Math.sign(directionTravel.current)) directionTravel.current = 0;
    directionTravel.current += delta;
    if (currentY < 72) {
      setHidden(false);
      directionTravel.current = 0;
    } else if (Math.abs(directionTravel.current) >= 12) {
      setHidden(directionTravel.current > 0);
      directionTravel.current = 0;
    }
  });

  // Close the menu on Escape (focus back on the button) or a tap outside the header.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  // Menu link: close the menu, then glide to the section (Lenis when it runs, native otherwise).
  // On other pages (/privacy, /terms, 404) the section isn't here, so the link opens /#section.
  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) {
      setMenuOpen(false);
      return;
    }
    event.preventDefault();
    // Lenis also handles hash-link clicks on window; stop it so this scroll is the only one.
    event.stopPropagation();
    setMenuOpen(false);
    history.replaceState(null, "", `/#${id}`);
    // A pixel target, so the sections' scroll-margin and the page's scroll-padding (made for
    // desktop anchor jumps) don't push the section further down.
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - MENU_SCROLL_GAP);
    if (lenis) {
      lenis.scrollTo(top, { duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  const showHeader = !hidden || menuOpen;

  return (
    <motion.header
      ref={headerRef}
      className={`site-header revised-header${menuOpen ? " is-menu-open" : ""}`}
      initial={false}
      onFocusCapture={() => setHidden(false)}
      animate={{ y: showHeader ? 0 : -92, opacity: showHeader ? 1 : 0 }}
      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 42, mass: 0.82 }}
    >
      <a className="brandmark gold-header-mark" href="/" aria-label="Obsidx home">
        <Image className="gold-header-logo" src="/assets/obsidx-gold-logo.png" alt="" width={54} height={54} priority />
        <span className="header-wordmark">Obsidx</span>
      </a>

      <nav className="header-icon-nav" aria-label="Primary navigation">
        <a className="header-icon-link header-apply-link" href="/apply">
          <span>Apply Now</span>
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="header-menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            if (!menuOpen) setCurrent(currentSection());
            setMenuOpen((open) => !open);
          }}
        >
          <span className="header-menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Page sections"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul>
              {menuSections.map((section, i) => (
                <motion.li
                  key={section.id}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.04 + i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`/#${section.id}`}
                    className={current === section.id ? "is-current" : undefined}
                    aria-current={current === section.id ? "location" : undefined}
                    onClick={(event) => goTo(event, section.id)}
                  >
                    {section.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a className="button mobile-menu-apply" href="/apply">Apply to Work With Obsidx</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
