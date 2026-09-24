"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { ResponsiveCopy } from "@/components/ResponsiveCopy";

type ResultCard = {
  type: string;
  title: string;
  body: string;
  visual: ReactNode;
  shape: "square" | "wide" | "tall";
};

const spring = { stiffness: 190, damping: 22, mass: 0.7 };

function OfferFitVisual() {
  const aligned = [
    [22, 20], [50, 20], [78, 20],
    [22, 44], [50, 44], [78, 44],
    [22, 68], [50, 68], [78, 68],
  ];
  const scattered = [
    [8, 9], [63, 4], [93, 24],
    [11, 58], [55, 37], [91, 62],
    [29, 84], [69, 78], [41, 62],
  ];

  return (
    <svg viewBox="0 0 100 88" aria-hidden="true" className="h-full w-full">
      <path d="M12 76V12h76" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
      {aligned.map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={index === 4 ? 4.3 : 3.1}
          fill={index === 4 ? "#FFD58E" : "#FCBA4B"}
          opacity={index === 4 ? 1 : 0.62}
        >
          <animate attributeName="cx" values={`${scattered[index][0]};${cx};${cx};${scattered[index][0]}`} keyTimes="0;0.3;0.68;1" dur="5.8s" begin={`${index * 0.06}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values={`${scattered[index][1]};${cy};${cy};${scattered[index][1]}`} keyTimes="0;0.3;0.68;1" dur="5.8s" begin={`${index * 0.06}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values={`0.22;${index === 4 ? 1 : 0.62};${index === 4 ? 1 : 0.62};0.22`} keyTimes="0;0.3;0.68;1" dur="5.8s" begin={`${index * 0.06}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <rect
        x="42"
        y="36"
        width="16"
        height="16"
        rx="4"
        fill="none"
        stroke="#FFD58E"
      >
        <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.3;0.68;1" dur="5.8s" begin="0.65s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

function ConversionVisual() {
  return (
    <svg viewBox="0 0 112 88" aria-hidden="true" className="h-full w-full overflow-visible">
      <path d="M8 22H38C48 22 48 44 58 44H74C84 44 84 66 104 66" fill="none" stroke="rgba(255,255,255,.2)" strokeDasharray="3 5" strokeLinecap="round" />
      <circle cx="59" cy="44" r="7" fill="none" stroke="rgba(252,186,75,.3)" />
      <circle
        r="3.8"
        fill="#FFD58E"
      >
        <animate attributeName="cx" values="8;38;58;74;104;8" keyTimes="0;0.25;0.42;0.6;0.84;1" dur="3.4s" repeatCount="indefinite" />
        <animate attributeName="cy" values="22;22;44;44;66;22" keyTimes="0;0.25;0.42;0.6;0.84;1" dur="3.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0.35;1;0" keyTimes="0;0.25;0.42;0.6;0.84;1" dur="3.4s" repeatCount="indefinite" />
      </circle>
      <circle
        cx="59"
        cy="44"
        r="3"
        fill="#FCBA4B"
      >
        <animate attributeName="r" values="3;8;3" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function RevenueVisual() {
  return (
    <svg viewBox="0 0 112 88" aria-hidden="true" className="h-full w-full overflow-visible">
      {[18, 42, 66].map((y) => <line key={y} x1="8" y1={y} x2="104" y2={y} stroke="rgba(255,255,255,.08)" />)}
      <path
        d="M8 68C23 66 28 56 40 57C53 58 57 43 70 45C84 48 90 25 104 17"
        fill="none"
        stroke="#FFD58E"
        strokeWidth="2.3"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
      >
        <animate attributeName="stroke-dashoffset" values="1;0;0;1" keyTimes="0;0.34;0.72;1" dur="4.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.25;1;1;0.25" keyTimes="0;0.34;0.72;1" dur="4.8s" repeatCount="indefinite" />
      </path>
      <circle cx="104" cy="17" r="4.2" fill="#FCBA4B">
        <animate attributeName="r" values="0.2;4.2;4.2;0.2" keyTimes="0;0.34;0.72;1" dur="4.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function RetentionVisual() {
  return (
    <svg viewBox="0 0 112 88" aria-hidden="true" className="h-full w-full overflow-visible">
      <path d="M9 72H104M12 76V12" fill="none" stroke="rgba(255,255,255,.12)" />
      <path
        d="M12 68C38 68 58 64 72 53C86 42 96 28 104 12"
        fill="none"
        stroke="#FCBA4B"
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
      >
        <animate attributeName="stroke-dashoffset" values="1;0;0;1" keyTimes="0;0.36;0.74;1" dur="5.4s" repeatCount="indefinite" />
      </path>
      <path d="M94 13h10v10" fill="none" stroke="#FFD58E" strokeWidth="1.8">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.36;0.74;1" dur="5.4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function ProofVisual() {
  return (
    <svg viewBox="0 0 100 88" aria-hidden="true" className="h-full w-full overflow-visible">
      <circle
        cx="50"
        cy="44"
        r="28"
        fill="rgba(252,186,75,.06)"
        stroke="#FCBA4B"
        strokeWidth="1.7"
        pathLength="1"
        strokeDasharray="1"
      >
        <animate attributeName="stroke-dashoffset" values="1;0;0;1" keyTimes="0;0.3;0.7;1" dur="4.6s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="rotate" values="-24 50 44;0 50 44;0 50 44;-24 50 44" keyTimes="0;0.3;0.7;1" dur="4.6s" repeatCount="indefinite" />
      </circle>
      <path
        d="m35 44 10 10 21-23"
        fill="none"
        stroke="#FFD58E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
      >
        <animate attributeName="stroke-dashoffset" values="1;0;0;1" keyTimes="0;0.3;0.72;1" dur="4.6s" begin="0.35s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

const cards: ResultCard[] = [
  { type: "Owned offer", title: "Digital Products", body: "Turn your knowledge, process, or expertise into a valuable product your audience can buy and use.", visual: <OfferFitVisual />, shape: "square" },
  { type: "Learning", title: "Courses and Live Classes", body: "Package your expertise into a structured learning experience that helps your audience achieve a clear outcome.", visual: <ConversionVisual />, shape: "square" },
  { type: "Recurring value", title: "Memberships and Paid Communities", body: "Create a valuable recurring experience that gives your most engaged followers a reason to join and stay.", visual: <RetentionVisual />, shape: "tall" },
  { type: "Software", title: "SaaS Products", body: "Turn a repeated audience problem into a useful software product with recurring revenue potential.", visual: <RevenueVisual />, shape: "wide" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const mobileBodies = [
  "Turn your knowledge into a product your audience can use.",
  "Package your expertise into a clear learning experience.",
  "Give your most engaged followers a reason to join and stay.",
  "Turn a repeated audience problem into useful software.",
];

const cardVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] as const } },
};

function InteractiveCard({ card, index }: { card: ResultCard; index: number }) {
  const reduceMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, spring);
  const rotateY = useSpring(rotateYValue, spring);

  return (
    <motion.article
      variants={cardVariants}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const pointerX = (event.clientX - rect.left) / rect.width;
        const pointerY = (event.clientY - rect.top) / rect.height;
        rotateYValue.set((pointerX - 0.5) * 6);
        rotateXValue.set(-(pointerY - 0.5) * 6);
      }}
      onPointerLeave={() => {
        rotateXValue.set(0);
        rotateYValue.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={`result-card result-card--${card.shape} group relative min-h-[300px] overflow-hidden rounded-2xl border border-[#FCBA4B]/35 bg-[radial-gradient(circle_at_85%_12%,rgba(252,186,75,0.18),transparent_36%),rgba(24,21,15,0.82)] p-6 shadow-[0_18px_65px_rgba(252,186,75,0.10),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-500 hover:border-[#FCBA4B]/55 hover:shadow-[0_22px_70px_rgba(252,186,75,0.14),inset_0_1px_0_rgba(255,255,255,0.10)] sm:p-7`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),transparent_38%)] opacity-70" />
      <div className="result-card-inner relative flex h-full min-h-[250px] flex-col" style={{ transform: "translateZ(18px)" }}>
        <div className="result-card-top flex items-start justify-between gap-4">
          <div>
            <span className="result-card-index font-['Cormorant_Garamond'] text-sm italic text-[#FCBA4B]/75">0{index + 1}</span>
            <p className="result-card-type mt-8 font-['Open_Sauce_Sans'] text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#FFD58E]">{card.type}</p>
          </div>
          <div className="result-card-visual h-[88px] w-[112px] shrink-0 opacity-85 transition-opacity duration-300 group-hover:opacity-100">{card.visual}</div>
        </div>
        <div className="result-card-copy mt-auto max-w-[22rem] pt-7">
          <h3 className="result-card-title font-['Open_Sauce_Sans'] text-[1.45rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[1.6rem]">{card.title}</h3>
          <p className="result-card-body mt-3 text-[0.86rem] leading-relaxed text-[#AAA6A0]"><ResponsiveCopy full={card.body} short={mobileBodies[index]} /></p>
        </div>
      </div>
    </motion.article>
  );
}

export function ResultsStandard() {
  return (
    <section className="results section-shell relative overflow-hidden" id="what-we-build">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 90% 8%, rgba(252,186,75,.13), transparent 22rem), radial-gradient(circle at 8% 88%, rgba(252,186,75,.08), transparent 24rem), linear-gradient(rgba(252,186,75,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(252,186,75,.035) 1px, transparent 1px)", backgroundSize: "auto, auto, 72px 72px, 72px 72px", maskImage: "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)" }} />

      <div className="section-intro relative">
        <h2>Top Performing Revenue Models</h2>
        <p><ResponsiveCopy full="Products and systems shaped around what your audience already values and needs." short="Built around what your audience values." /></p>
      </div>

      <motion.div
        variants={containerVariants}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="results-card-grid relative grid gap-4"
      >
        {cards.map((card, index) => <InteractiveCard card={card} index={index} key={card.title} />)}
      </motion.div>

    </section>
  );
}
