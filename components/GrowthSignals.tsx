"use client";

import { useEffect, useRef, useState } from "react";

// Approved figures supplied by the site owner; the extra lines restate the same results.
const messages = [
  { text: "My ROI increased by 25%. 📈", position: "upper-right" },
  { text: "My MRR went from $2,000 to $15,000. 💵", position: "lower-left" },
  { text: "25% more return on investment. 📈", position: "right-center" },
  { text: "$13,000 more in monthly recurring revenue. 💸", position: "lower-right" },
  { text: "7.5× monthly recurring revenue. 🚀", position: "left-center" },
] as const;

export function GrowthSignals() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!visible || !pageVisible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % messages.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [visible, pageVisible]);

  return (
    <div className={`growth-signal growth-signal--${messages[active].position}`} aria-live="off" ref={root}>
      <p className="growth-signal-message" key={active}>{messages[active].text}</p>
    </div>
  );
}
