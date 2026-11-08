"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { seatsFilled, seatsTotal } from "@/lib/capacity";

// Resting position relative to the cursor: down and to the right, so it trails behind.
const OFFSET_X = 56;
const OFFSET_Y = 56;
// How quickly the dock eases toward its target each frame (0..1). Lower = more lag.
const FOLLOW_EASE = 0.12;
// Cursor within this distance of the pet's centre "catches" it and it stops following.
const CATCH_RADIUS = 46;
// Cursor must move this far away again before the pet starts following once more.
const RELEASE_RADIUS = 150;
const EDGE = 12;
// Pet speed (px per frame) above which it plays the walk cycle.
const WALK_SPEED = 0.9;
// Delay before the hover count ticks up from seatsFilled to seatsFilled + 1.
const TICK_DELAY_MS = 450;
// How long a section tip stays visible.
const TIP_MS = 5200;
// No mouse movement for this long and Obi dozes off.
const SLEEP_AFTER_MS = 20000;
// Space the speech bubble needs on the right before it flips to the left side.
const BUBBLE_ROOM = 300;

// Frame order in /public/pet/obi-sprite.webp (built by scripts/build-pet-sprite.js).
const FRAME = {
  idle: 0,
  blink: 1,
  talk: 2,
  point: 3,
  wave: 4,
  think: 5,
  happy: 6,
  surprised: 7,
  love: 8,
  celebrate: 9,
  curious: 10,
  sleepy: 11,
  walk: 12, // 12-15, animated in CSS
} as const;
type Pose = keyof typeof FRAME;

// What Obi says (and how it poses) when each section reaches the middle of the screen.
// Keep these in page order.
const sectionTips: { selector: string; pose: Pose; tip: string }[] = [
  { selector: "#home", pose: "wave", tip: "Hi, I'm Obi! Obsidx turns your audience into products you own." },
  { selector: "#opportunity", pose: "think", tip: "Here's how your audience becomes a real business behind you." },
  { selector: ".tools-rail", pose: "talk", tip: "These are the tools we set up and run for you." },
  { selector: "#what-we-build", pose: "happy", tip: "Courses, communities, templates, SaaS. Everything we can build together." },
  { selector: "#how-it-works", pose: "point", tip: "Four steps, from research to launch. Keep scrolling through the cards." },
  { selector: "#about", pose: "talk", tip: "You always see your numbers. No guesswork, ever." },
  { selector: ".ox-lists", pose: "curious", tip: "Who we work with, and everything we handle for you." },
  { selector: "#results", pose: "think", tip: "Partner results live here. Numbers, not promises." },
  { selector: ".ox-included", pose: "happy", tip: "All of this comes with every partnership." },
  { selector: "#apply", pose: "love", tip: `Only ${seatsFilled} of ${seatsTotal} seats are taken. Click me to apply!` },
  { selector: ".site-footer", pose: "wave", tip: "Questions? Say hello at the email down here." },
];

export function MemberDock() {
  const dockRef = useRef<HTMLAnchorElement>(null);
  const [mode, setMode] = useState<"follow" | "static">("static");
  const [hover, setHover] = useState<"surprised" | "happy" | null>(null);
  const [count, setCount] = useState(seatsFilled);
  const [tip, setTip] = useState<{ text: string; pose: Pose } | null>(null);
  const [tipVisible, setTipVisible] = useState(false);
  const [tipKey, setTipKey] = useState(0);
  const [walking, setWalking] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [blink, setBlink] = useState(false);
  const [sleepy, setSleepy] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const lastMoveRef = useRef(0);

  const expanded = hover !== null || celebrating;

  // Hover: a quick "surprised" when caught, then happy; the count ticks once (22 -> 23).
  useEffect(() => {
    if (!expanded) {
      setCount(seatsFilled);
      return;
    }
    const timer = window.setTimeout(() => setCount(Math.min(seatsFilled + 1, seatsTotal)), TICK_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [expanded]);

  useEffect(() => {
    if (hover !== "surprised") return;
    const timer = window.setTimeout(() => setHover((current) => (current ? "happy" : null)), 380);
    return () => window.clearTimeout(timer);
  }, [hover]);

  // Blink now and then.
  useEffect(() => {
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        setBlink(true);
        timer = window.setTimeout(() => {
          setBlink(false);
          schedule();
        }, 160);
      }, 3200 + Math.random() * 2600);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, []);

  // Only trail the cursor on devices with a real mouse and when motion is allowed.
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setMode(query.matches ? "follow" : "static");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Section guide: the current section is the last one whose top has passed the middle of the screen.
  useEffect(() => {
    const targets = sectionTips
      .map((entry) => ({ ...entry, el: document.querySelector(entry.selector) }))
      .filter((entry): entry is (typeof entry & { el: Element }) => entry.el !== null);
    if (targets.length === 0) return;

    let current = "";
    let hideTimer = 0;
    let queued = false;

    const check = () => {
      queued = false;
      const middle = window.innerHeight / 2;
      let match = targets[0];
      for (const entry of targets) {
        if (entry.el.getBoundingClientRect().top <= middle) match = entry;
      }
      if (match.selector === current) return;
      current = match.selector;
      setTip({ text: match.tip, pose: match.pose });
      setTipVisible(true);
      setTipKey((key) => key + 1);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setTipVisible(false), TIP_MS);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      window.setTimeout(check, 120);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(hideTimer);
    };
  }, []);

  // Doze off after a while without mouse movement (cursor-following mode only).
  useEffect(() => {
    if (mode !== "follow") return;
    lastMoveRef.current = Date.now();
    const timer = window.setInterval(() => {
      setSleepy(Date.now() - lastMoveRef.current > SLEEP_AFTER_MS);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock || mode !== "follow") return;

    const restingSpot = () => ({
      x: window.innerWidth - dock.offsetWidth - 24,
      y: window.innerHeight - dock.offsetHeight - 24,
    });

    const start = restingSpot();
    const pos = { ...start };
    const target = { ...start };
    const cursor = { x: -9999, y: -9999, inside: false };
    let caught = false;
    let flipped = false;
    let isWalking = false;
    let isLeft = false;
    let frame = 0;

    const clampToViewport = () => {
      const maxX = window.innerWidth - dock.offsetWidth - EDGE;
      const maxY = window.innerHeight - dock.offsetHeight - EDGE;
      target.x = Math.min(Math.max(target.x, EDGE), maxX);
      target.y = Math.min(Math.max(target.y, EDGE), maxY);
    };

    const tick = () => {
      const half = dock.offsetHeight / 2;
      const distance = Math.hypot(cursor.x - (pos.x + half), cursor.y - (pos.y + half));

      if (!caught && cursor.inside && distance < CATCH_RADIUS) caught = true;
      if (caught && !dock.matches(":hover") && distance > RELEASE_RADIUS) caught = false;

      if (!caught) {
        if (cursor.inside) {
          target.x = cursor.x + OFFSET_X - half;
          target.y = cursor.y + OFFSET_Y - half;
        } else {
          Object.assign(target, restingSpot());
        }
      }
      clampToViewport();

      const dx = (target.x - pos.x) * FOLLOW_EASE;
      const dy = (target.y - pos.y) * FOLLOW_EASE;
      pos.x += dx;
      pos.y += dy;
      dock.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;

      // Walk cycle while moving; face the direction of travel.
      const nowWalking = Math.hypot(dx, dy) > WALK_SPEED;
      if (nowWalking !== isWalking) {
        isWalking = nowWalking;
        setWalking(nowWalking);
      }
      if (Math.abs(dx) > 0.4) {
        const nowLeft = dx < 0;
        if (nowLeft !== isLeft) {
          isLeft = nowLeft;
          setFacingLeft(nowLeft);
        }
      }

      // Speech bubble sits to the right; flip it left when there's no room.
      const shouldFlip = pos.x > window.innerWidth - BUBBLE_ROOM;
      if (shouldFlip !== flipped) {
        flipped = shouldFlip;
        dock.classList.toggle("is-flipped", flipped);
      }

      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      cursor.inside = true;
      lastMoveRef.current = Date.now();
    };
    const onLeave = () => {
      cursor.inside = false;
      caught = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      dock.style.transform = "";
      dock.classList.remove("is-flipped");
      setWalking(false);
    };
  }, [mode]);

  // Click: a short celebration before heading to /apply (new-tab clicks behave normally).
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setCelebrating(true);
    const href = event.currentTarget.href;
    window.setTimeout(() => window.location.assign(href), 650);
  };

  const showTip = tipVisible && tip !== null && !expanded;

  let pose: Pose = "idle";
  if (celebrating) pose = "celebrate";
  else if (hover) pose = hover;
  else if (walking) pose = "walk";
  else if (showTip && tip) pose = tip.pose;
  else if (sleepy) pose = "sleepy";
  else if (blink) pose = "blink";

  return (
    <a
      ref={dockRef}
      href="/apply"
      className={`member-dock member-dock--${mode}${expanded ? " is-open" : ""}${mode === "static" ? " is-flipped" : ""}`}
      aria-label={`${seatsFilled} of ${seatsTotal} member seats filled. Apply now.`}
      onPointerEnter={() => setHover("surprised")}
      onPointerLeave={() => setHover(null)}
      onFocus={() => setHover("happy")}
      onBlur={() => setHover(null)}
      onClick={onClick}
    >
      <span
        className={`pet-sprite${pose === "walk" ? " is-walking" : ""}${facingLeft ? " is-left" : ""}`}
        style={{ "--frame": FRAME[pose] } as CSSProperties}
        aria-hidden="true"
      />
      <span className="member-dock-label" aria-hidden="true">
        <span className="member-dock-count">
          <span className="member-dock-num" key={count}>{count}</span>
          <span className="member-dock-total">/{seatsTotal}</span>
        </span>
        <span className="member-dock-word">Members</span>
      </span>
      <span className={`pet-bubble${showTip ? " is-visible" : ""}`} aria-hidden="true" key={tipKey}>
        {tip?.text}
      </span>
    </a>
  );
}
