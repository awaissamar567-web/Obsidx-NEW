"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useMemo, useState } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const options = useMemo(() => ({
    autoRaf: true,
    // Consulting.com-style response: decisive travel with a short, eased settle.
    lerp: 0.2,
    smoothWheel: true,
    wheelMultiplier: 1.5,
    syncTouch: true,
    touchMultiplier: 1,
    syncTouchLerp: 0.055,
    touchInertiaExponent: 1.35,
    allowNestedScroll: true,
    anchors: { offset: -88 },
  }), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reducedMotion) return children;

  return (
    <ReactLenis
      root
      options={options}
    >
      {children}
    </ReactLenis>
  );
}
