"use client";

import { createElement, useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";

// Scroll-triggered entrances, shared by the whole homepage.
//
// Each effect is a starting pose that eases into the element's normal state. The poses use the
// individual `translate` / `scale` CSS properties, which stack on top of any `transform` the
// element already has (centring, hover lifts), and run through the Web Animations API with
// `fill: "backwards"` so nothing is left behind once they finish.
export type RevealEffect = "up" | "scale" | "rise" | "left" | "right";

const FROM: Record<RevealEffect, Keyframe> = {
  up: { opacity: 0, translate: "0 24px" },
  scale: { opacity: 0, scale: "0.92" },
  rise: { opacity: 0, translate: "0 64px", scale: "0.97" },
  left: { opacity: 0, translate: "-70px 0" },
  right: { opacity: 0, translate: "70px 0" },
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

type RevealTag = "div" | "section" | "ul" | "span" | "figure";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  effect?: RevealEffect;
  /** Animate each direct child in turn, this many ms apart, instead of the element as a whole. */
  stagger?: number;
  /** Extra wait before the first animation starts, in ms. */
  delay?: number;
  duration?: number;
  children?: ReactNode;
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Reveal({ as = "div", effect = "up", stagger, delay = 0, duration = 900, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // Rendered on the server too, so content starts hidden with no flash before hydration.
  const hiddenAttr = stagger === undefined ? "data-reveal" : "data-reveal-stagger";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      el.removeAttribute(hiddenAttr);
      return;
    }

    const play = () => {
      const targets = stagger === undefined ? [el] : (Array.from(el.children) as HTMLElement[]);
      // Unhide first, then start the animations in the same frame; `backwards` fill holds the
      // starting pose through each delay, so nothing flashes.
      el.removeAttribute(hiddenAttr);
      targets.forEach((target, index) => {
        target.animate([{ ...FROM[effect], offset: 0 }], {
          duration,
          delay: delay + index * (stagger ?? 0),
          easing: EASE,
          fill: "backwards",
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        play();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, effect, hiddenAttr, stagger]);

  return createElement(as, { ...rest, ref, [hiddenAttr]: "" }, children);
}

// Counts a number up from zero the first time it scrolls into view.
// The final value is rendered on the server and kept for screen readers.
type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

const format = (value: number, decimals: number) =>
  value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export function CountUp({ value, decimals = 0, prefix = "", suffix = "", duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${prefix}${format(value, decimals)}${suffix}`;
  const [shown, setShown] = useState(final);

  // Swap to zero before the first paint so the number never flashes at its final value.
  useLayoutEffect(() => {
    if (!prefersReducedMotion()) setShown(`${prefix}${format(0, decimals)}${suffix}`);
  }, [decimals, prefix, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setShown(`${prefix}${format(value * eased, decimals)}${suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [decimals, duration, prefix, suffix, value]);

  return (
    <>
      <span ref={ref} aria-hidden="true">{shown}</span>
      <span className="sr-only">{final}</span>
    </>
  );
}
