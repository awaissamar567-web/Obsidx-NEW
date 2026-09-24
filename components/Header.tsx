"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type IconProps = { className?: string };

function HomeIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 10 8-6 8 6v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>;
}

function ResultsIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19V9m7 10V5m7 14v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path d="M3 19.5h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function ProcessIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.7" /><circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="1.7" /><circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.7" /><path d="M8 6h3a3 3 0 0 1 3 3 3 3 0 0 0 3 3h2M8 18h3a3 3 0 0 0 3-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

function AboutIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" /><path d="M5.5 20c.7-4 2.8-6 6.5-6s5.8 2 6.5 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

function ApplyIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M19 5v14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>;
}

const navItems = [
  { id: "home", label: "Home", href: "/#home", icon: HomeIcon },
  { id: "how-it-works", label: "How It Works", href: "/#how-it-works", icon: ProcessIcon },
  { id: "what-we-build", label: "What We Build", href: "/#what-we-build", icon: ResultsIcon },
  { id: "about", label: "About", href: "/#about", icon: AboutIcon },
  { id: "apply", label: "Apply Now", href: "/apply", icon: ApplyIcon },
] as const;

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const previousY = useRef(0);
  const directionTravel = useRef(0);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const updateActiveSection = (currentY: number) => {
    const marker = currentY + window.innerHeight * 0.38;
    let nextSection = "home";
    for (const id of ["home", "opportunity", "what-we-build", "how-it-works", "about", "apply"]) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= marker) nextSection = id;
    }
    if (nextSection === "opportunity") nextSection = "home";
    setActiveSection((current) => current === nextSection ? current : nextSection);
  };

  useEffect(() => {
    previousY.current = window.scrollY;
    updateActiveSection(window.scrollY);
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

    updateActiveSection(currentY);
  });

  return (
    <motion.header
      className="site-header revised-header"
      initial={false}
      onFocusCapture={() => setHidden(false)}
      animate={{ y: hidden ? -92 : 0, opacity: hidden ? 0 : 1 }}
      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 42, mass: 0.82 }}
    >
      <a className="brandmark gold-header-mark" href="/" aria-label="Obsidx home">
        <Image className="gold-header-logo" src="/assets/obsidx-gold-logo.png" alt="Obsidx" width={54} height={54} priority />
      </a>

      <nav className="header-icon-nav" aria-label="Primary navigation">
        {navItems.map(({ id, label, href, icon: Icon }) => {
          const selected = activeSection === id;
          return (
            <a
              className={`${selected ? "header-icon-link is-active" : "header-icon-link"}${id === "apply" ? " header-apply-link" : ""}`}
              href={href}
              key={id}
              aria-label={label}
              aria-current={selected ? "page" : undefined}
            >
              {id === "apply" ? (
                <span>Apply Now</span>
              ) : (
                <>
                  <Icon className="header-vector" />
                  <span className="sr-only">{label}</span>
                </>
              )}
            </a>
          );
        })}
      </nav>
    </motion.header>
  );
}
