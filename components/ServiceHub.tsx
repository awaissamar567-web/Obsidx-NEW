"use client";

import { useInView } from "framer-motion";
import { useRef, useState, type CSSProperties } from "react";

// Hub-and-spoke map of everything included in a partnership.
// Geometry lives in one 1200 x 600 coordinate space shared by the SVG lines and the HTML labels,
// so labels stay pinned to their line ends at any width. Below 860px it becomes a stacked list.
const W = 1200;
const H = 600;
const HUB = { x: 600, y: 300, w: 240, h: 120 }; // the "What we do" rectangle
const ROWS = [60, 180, 300, 420, 540];
const LEFT_X = 250; // right edge of the left squares, where their lines start
const RIGHT_X = 950; // left edge of the right squares

const leftItems = ["Audience research", "Offer & pricing", "Product build", "Sales pages", "Checkout & payments"];
const rightItems = [
  "Launch operations",
  "Email & community",
  "Performance reporting",
  "Monthly strategy reviews",
  "1:1 partner calls",
];

// S-curve from a square to the hub's side edge; the ends fan in so lines spread along that edge.
function spoke(startX: number, y: number, side: -1 | 1) {
  const endY = HUB.y + (y - HUB.y) * 0.2;
  const endX = HUB.x + side * (HUB.w / 2);
  const half = (endX - startX) / 2;
  return `M ${startX} ${y} C ${startX + half} ${y}, ${endX - half} ${endY}, ${endX} ${endY}`;
}

const spokes = [
  ...leftItems.map((label, i) => ({ label, side: "left" as const, y: ROWS[i], d: spoke(LEFT_X, ROWS[i], -1) })),
  ...rightItems.map((label, i) => ({ label, side: "right" as const, y: ROWS[i], d: spoke(RIGHT_X, ROWS[i], 1) })),
];

const pct = (value: number, total: number) => `${((value / total) * 100).toFixed(3)}%`;

export function ServiceHub() {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "0px 0px -20% 0px" });
  const [hot, setHot] = useState<number | null>(null);

  return (
    <div ref={stageRef} className={`ox-hub-stage${inView ? " is-in" : ""}`}>
      <svg className="ox-hub-lines" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        {spokes.map((item, i) => (
          <path
            key={item.label}
            d={item.d}
            pathLength={1}
            className={hot === i ? "is-hot" : undefined}
            style={{ "--i": i } as CSSProperties}
          />
        ))}
        {/* Pulses travel outward: each path is drawn square -> hub, so keyPoints 1 -> 0 runs it hub -> square.
            They fade in as they leave the hub and out as they reach the square. fill-opacity starts at 0 so a
            pulse stays invisible until its first run begins. */}
        {spokes.map((item, i) => {
          const begin = `${(i * 0.37).toFixed(2)}s`;
          return (
            <circle key={`pulse-${item.label}`} className="ox-hub-pulse" r={3} fillOpacity={0}>
              <animateMotion
                dur="3.4s"
                begin={begin}
                repeatCount="indefinite"
                path={item.d}
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
              />
              <animate
                attributeName="fill-opacity"
                values="0;1;1;0"
                keyTimes="0;0.14;0.86;1"
                dur="3.4s"
                begin={begin}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </svg>

      <h2 className="ox-hub-core" style={{ left: "50%", top: pct(HUB.y, H), width: pct(HUB.w, W) }}>
        What we do
      </h2>

      {(["left", "right"] as const).map((side) => (
        <ul key={side} className={`ox-hub-list ox-hub-list--${side}`}>
          {spokes.map((item, i) =>
            item.side === side ? (
              <li
                key={item.label}
                className={hot === i ? "is-hot" : undefined}
                style={{ left: pct(side === "left" ? LEFT_X : RIGHT_X, W), top: pct(item.y, H), "--i": i } as CSSProperties}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
              >
                {item.label}
              </li>
            ) : null,
          )}
        </ul>
      ))}
    </div>
  );
}
