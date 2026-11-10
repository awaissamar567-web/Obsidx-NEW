"use client";

import { useEffect, useRef } from "react";

// Base radius at a 380px-wide box; scaled to the real box width.
const rings = [
  { key: "book", src: "/products/book.webp", r: 50 },
  { key: "play", src: "/products/play.webp", r: 46 },
  { key: "folder", src: "/products/folder.webp", r: 42 },
  { key: "notebook", src: "/products/notebook.webp", r: 42 },
  { key: "puzzle", src: "/products/puzzle.webp", r: 38 },
] as const;

type Body = {
  x: number; y: number; vx: number; vy: number;
  r: number; base: number;
  entered: boolean;
  dragging: boolean;
};

// Low gravity plus a terminal speed gives a slow, floaty drop.
const GRAVITY = 700;
const MAX_FALL = 420;
const WALL_BOUNCE = 0.3;
const RING_BOUNCE = 0.2;
const STEP = 1 / 120;

export function ProductRings() {
  const boxRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = box.clientWidth;
    let H = box.clientHeight;
    // --ring-scale (CSS, default 1) shrinks the rings where the card is shorter, e.g. on phones.
    const ringScale = () => parseFloat(getComputedStyle(box).getPropertyValue("--ring-scale")) || 1;
    const scaleFor = (w: number) => Math.min(1.15, Math.max(0.7, w / 380)) * ringScale();

    const bodies: Body[] = rings.map((ring, i) => {
      const r = ring.r;
      const s = scaleFor(W);
      return {
        x: W * (0.18 + 0.16 * i) + (i % 2 ? 8 : -8),
        y: -r * s - 40 - i * 150, // staggered drop from above the box
        vx: (i % 2 ? -1 : 1) * 30,
        vy: 0,
        r: r * s,
        base: r,
        entered: false,
        dragging: false,
      };
    });

    const render = () => {
      bodies.forEach((b, i) => {
        const el = ringRefs.current[i];
        if (!el) return;
        el.style.width = el.style.height = `${b.r * 2}px`;
        el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
      });
    };

    const step = (dt: number) => {
      for (const b of bodies) {
        if (b.dragging) continue;
        b.vy = Math.min(MAX_FALL, b.vy + GRAVITY * dt);
        b.vx *= 0.998;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }

      for (let pass = 0; pass < 4; pass++) {
        // Ring-to-ring collisions; a dragged ring acts as immovable and shoves the others.
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i], c = bodies[j];
            const dx = c.x - a.x, dy = c.y - a.y;
            const min = a.r + c.r;
            const d2 = dx * dx + dy * dy;
            if (d2 >= min * min) continue;
            const d = Math.sqrt(d2) || 0.001;
            const nx = dx / d, ny = dy / d;
            const wa = a.dragging ? 0 : 1 / (a.r * a.r);
            const wc = c.dragging ? 0 : 1 / (c.r * c.r);
            const w = wa + wc;
            if (!w) continue;
            const overlap = min - d;
            a.x -= nx * overlap * (wa / w); a.y -= ny * overlap * (wa / w);
            c.x += nx * overlap * (wc / w); c.y += ny * overlap * (wc / w);
            const rel = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
            if (rel < 0) {
              const imp = (-(1 + RING_BOUNCE) * rel) / w;
              a.vx -= imp * wa * nx; a.vy -= imp * wa * ny;
              c.vx += imp * wc * nx; c.vy += imp * wc * ny;
            }
          }
        }

        // Box walls. The top only counts once a ring has fallen into view.
        for (const b of bodies) {
          if (b.y - b.r >= 0) b.entered = true;
          if (b.x < b.r) { b.x = b.r; if (b.vx < 0) b.vx = -b.vx * WALL_BOUNCE; }
          if (b.x > W - b.r) { b.x = W - b.r; if (b.vx > 0) b.vx = -b.vx * WALL_BOUNCE; }
          if (b.entered && b.y < b.r) { b.y = b.r; if (b.vy < 0) b.vy = -b.vy * WALL_BOUNCE; }
          if (b.y > H - b.r) {
            b.y = H - b.r;
            if (b.vy > 0) b.vy = Math.abs(b.vy) < 40 ? 0 : -b.vy * WALL_BOUNCE;
            b.vx *= 0.92; // floor friction so rings come to rest
          }
          // Kill the slow creep of resting rings.
          if (b.y >= H - b.r - 1 && Math.abs(b.vx) < 12) b.vx = 0;
        }
      }
      for (const b of bodies) {
        if (!b.dragging && Math.abs(b.vx) < 4 && Math.abs(b.vy) < 4) { b.vx *= 0.5; b.vy *= 0.5; }
      }
    };

    // Reduced motion: settle instantly, no falling animation.
    if (reduceMotion) {
      for (let i = 0; i < 900; i++) step(STEP);
      render();
    } else {
      render();
    }

    let running = false;
    let raf = 0;
    let last = 0;
    let acc = 0;
    const loop = (t: number) => {
      if (!running) return;
      acc += Math.min(0.05, (t - (last || t)) / 1000);
      last = t;
      while (acc >= STEP) { step(STEP); acc -= STEP; }
      render();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true; last = 0; acc = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start(); else stop();
    }, { threshold: 0.35 });
    io.observe(box);

    const ro = new ResizeObserver(() => {
      W = box.clientWidth; H = box.clientHeight;
      const s = scaleFor(W);
      for (const b of bodies) b.r = b.base * s;
      render();
    });
    ro.observe(box);

    // Dragging with pointer events (mouse, pen and touch).
    const cleanups = ringRefs.current.map((el, i) => {
      if (!el) return () => {};
      const b = bodies[i];
      let offX = 0, offY = 0, lastX = 0, lastY = 0, lastT = 0;

      const point = (e: PointerEvent) => {
        const rect = box.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };
      const down = (e: PointerEvent) => {
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        const p = point(e);
        offX = b.x - p.x; offY = b.y - p.y;
        lastX = b.x; lastY = b.y; lastT = performance.now();
        b.dragging = true; b.entered = true; b.vx = b.vy = 0;
        el.classList.add("is-dragging");
        start();
      };
      const move = (e: PointerEvent) => {
        if (!b.dragging) return;
        const p = point(e);
        b.x = Math.min(W - b.r, Math.max(b.r, p.x + offX));
        b.y = Math.min(H - b.r, Math.max(b.r, p.y + offY));
        const now = performance.now();
        const dt = Math.max(1, now - lastT) / 1000;
        // Smoothed velocity so a release throws the ring.
        b.vx = b.vx * 0.5 + ((b.x - lastX) / dt) * 0.5;
        b.vy = b.vy * 0.5 + ((b.y - lastY) / dt) * 0.5;
        lastX = b.x; lastY = b.y; lastT = now;
      };
      const up = (e: PointerEvent) => {
        if (!b.dragging) return;
        b.dragging = false;
        if (performance.now() - lastT > 80) { b.vx = 0; b.vy = 0; }
        const cap = 2600;
        b.vx = Math.max(-cap, Math.min(cap, b.vx));
        b.vy = Math.max(-cap, Math.min(cap, b.vy));
        el.classList.remove("is-dragging");
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      };

      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      return () => {
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
      };
    });

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={boxRef} className="product-rings" aria-hidden="true" data-lenis-prevent>
      {rings.map((ring, i) => (
        <div
          key={ring.key}
          className="product-ring"
          ref={(el) => { ringRefs.current[i] = el; }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ring.src} alt="" draggable={false} />
        </div>
      ))}
    </div>
  );
}
