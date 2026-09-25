"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useMemo, useState } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const options = useMemo(() => ({
    autoRaf: true,
    // Gentle desktop interpolation; touch remains native for direct, platform-consistent control.
    lerp: 0.12,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    syncTouch: false,
    allowNestedScroll: true,
    anchors: { offset: -88, lerp: 0, duration: 0.55, easing: (time: number) => 1 - Math.pow(1 - time, 4) },
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
