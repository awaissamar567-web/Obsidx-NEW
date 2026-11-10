"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ResponsiveCopy } from "@/components/ResponsiveCopy";
import { ProductRings } from "@/components/ProductRings";

type RevenueCard = {
  title: string;
  body: string;
  short: string;
  visual: ReactNode;
  // Full-card layer, used by the draggable product rings.
  overlay?: ReactNode;
};

const gold = "#FCBA4B";
const goldLight = "#FFD58E";

function CoursesVisual() {
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="revenue-course-play" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFE7AE" />
          <stop offset="1" stopColor="#D98A16" />
        </radialGradient>
      </defs>
      <rect x="34" y="18" width="172" height="112" rx="14" fill="#1c1810" stroke="rgba(252,186,75,.3)" />
      <rect x="48" y="30" width="44" height="16" rx="8" fill="rgba(252,186,75,.12)" stroke="rgba(252,186,75,.4)" />
      <circle cx="58" cy="38" r="3" fill={gold}>
        <animate attributeName="opacity" values="1;0.25;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <text x="65" y="41.5" fill={goldLight} fontSize="9" fontWeight="700" letterSpacing="1">LIVE</text>
      <circle cx="120" cy="72" r="24" fill="url(#revenue-course-play)">
        <animate attributeName="r" values="24;26;24" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="72" r="24" fill="none" stroke={gold}>
        <animate attributeName="r" values="24;38" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <path d="M113 61L132 72L113 83Z" fill="#1a1206" />
      <rect x="50" y="112" width="140" height="4" rx="2" fill="rgba(255,255,255,.1)" />
      <rect x="50" y="112" width="96" height="4" rx="2" fill={gold}>
        <animate attributeName="width" values="0;96;96" keyTimes="0;0.6;1" dur="4s" repeatCount="indefinite" />
      </rect>
      <path d="M78 156H162" stroke="rgba(252,186,75,.3)" strokeWidth="2" strokeDasharray="4 5" />
      {[78, 120].map((x) => (
        <g key={x}>
          <circle cx={x} cy="156" r="12" fill={gold} />
          <path d={`M${x - 5} 156l3.5 3.5 6.5-7`} fill="none" stroke="#1a1206" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      <circle cx="162" cy="156" r="12" fill="#1c1810" stroke={gold} strokeWidth="1.5" />
      <circle cx="162" cy="156" r="3.5" fill={goldLight}>
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function SaasVisual() {
  const bars = [
    { x: 92, h: 22 },
    { x: 112, h: 34 },
    { x: 132, h: 30 },
    { x: 152, h: 48 },
    { x: 172, h: 62 },
  ];
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" className="h-full w-full overflow-visible">
      <rect x="30" y="16" width="180" height="134" rx="14" fill="#1c1810" stroke="rgba(252,186,75,.3)" />
      <path d="M30 40H210" stroke="rgba(252,186,75,.18)" />
      {[46, 58, 70].map((x) => <circle key={x} cx={x} cy="28" r="3.5" fill="rgba(255,213,142,.45)" />)}
      {[58, 72, 86, 100].map((y) => <rect key={y} x="44" y={y} width="28" height="5" rx="2.5" fill="rgba(255,255,255,.1)" />)}
      <rect x="44" y="58" width="28" height="5" rx="2.5" fill="rgba(252,186,75,.55)" />
      {bars.map((bar, index) => (
        <rect key={bar.x} x={bar.x} y={136 - bar.h} width="12" height={bar.h} rx="3" fill={index === bars.length - 1 ? gold : "rgba(252,186,75,.35)"}>
          <animate attributeName="height" values={`0;${bar.h};${bar.h};0`} keyTimes="0;0.3;0.85;1" dur="5s" begin={`${index * 0.12}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`136;${136 - bar.h};${136 - bar.h};136`} keyTimes="0;0.3;0.85;1" dur="5s" begin={`${index * 0.12}s`} repeatCount="indefinite" />
        </rect>
      ))}
      <path d="M98 108L118 96L138 100L158 82L178 64" fill="none" stroke={goldLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1">
        <animate attributeName="stroke-dashoffset" values="1;0;0;1" keyTimes="0;0.35;0.85;1" dur="5s" repeatCount="indefinite" />
      </path>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 196 148;360 196 148" dur="9s" repeatCount="indefinite" />
        <circle cx="196" cy="148" r="20" fill={gold} />
        <path d="M186 146a10 10 0 0 1 17-6M206 150a10 10 0 0 1-17 6" fill="none" stroke="#1a1206" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M203 134v6h-6M189 162v-6h6" fill="none" stroke="#1a1206" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

const cards: RevenueCard[] = [
  {
    title: "Digital Products",
    body: "Turn your knowledge, process, or expertise into a valuable product your audience can buy and use.",
    short: "Turn your knowledge into a product your audience can use.",
    visual: null,
    overlay: <ProductRings />,
  },
  {
    title: "Courses and Live Classes",
    body: "Package your expertise into a structured learning experience that helps your audience achieve a clear outcome.",
    short: "Package your expertise into a clear learning experience.",
    visual: <CoursesVisual />,
  },
  {
    title: "SaaS Products",
    body: "Turn a repeated audience problem into a useful software product with recurring revenue potential.",
    short: "Turn a repeated audience problem into useful software.",
    visual: <SaasVisual />,
  },
];

export function ResultsStandard() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="results section-shell relative overflow-hidden" id="what-we-build">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 90% 8%, rgba(252,186,75,.13), transparent 22rem), radial-gradient(circle at 8% 88%, rgba(252,186,75,.08), transparent 24rem), linear-gradient(rgba(252,186,75,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(252,186,75,.035) 1px, transparent 1px)", backgroundSize: "auto, auto, 72px 72px, 72px 72px", maskImage: "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)" }} />

      <div className="section-intro relative">
        <h2>Top Performing Revenue Models</h2>
        <p><ResponsiveCopy full="Products and systems shaped around what your audience already values and needs." short="Built around what your audience values." /></p>
      </div>

      <div
        className="revenue-grid relative mt-10 grid gap-4 md:grid-cols-3"
      >
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.54, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
            className="revenue-card relative flex min-h-[460px] flex-col overflow-hidden rounded-[22px] border border-[#FCBA4B]/25 bg-[radial-gradient(circle_at_50%_100%,rgba(252,186,75,0.12),transparent_60%),rgba(24,21,15,0.82)] p-7 shadow-[0_18px_65px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-[border-color,box-shadow] duration-200 hover:border-[#FCBA4B]/50 hover:shadow-[0_22px_70px_rgba(252,186,75,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <h3 className="font-['Open_Sauce_Sans'] text-[1.55rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white">{card.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#AAA6A0]"><ResponsiveCopy full={card.body} short={card.short} /></p>
            <div className="revenue-visual mt-auto h-[210px] pt-6">{card.visual}</div>
            {card.overlay}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
