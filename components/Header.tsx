"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const previousY = useRef(0);
  const directionTravel = useRef(0);
  const reduceMotion = useReducedMotion();
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

  return (
    <motion.header
      className="site-header revised-header"
      initial={false}
      onFocusCapture={() => setHidden(false)}
      animate={{ y: hidden ? -92 : 0, opacity: hidden ? 0 : 1 }}
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
      </nav>
    </motion.header>
  );
}
