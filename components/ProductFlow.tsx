"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type Node = { label: string; icon: string; x: number; y: number };
type Layout = {
  name: "wide" | "tall";
  width: number;
  height: number;
  doc: { x: number; y: number; width: number };
  title: { x: number; y: number };
  inputs: Node[];
  outputs: Node[];
  // Every path starts at its tile and ends just under the product's edge, so the sparks converge on the product.
  inputPaths: string[];
  outputPaths: string[];
};

const layouts: Layout[] = [
  {
    name: "wide",
    width: 2000,
    height: 1143,
    doc: { x: 1018, y: 564, width: 298 },
    title: { x: 1000, y: 796 },
    inputs: [
      { label: "Audience", icon: "/flow/audience.webp", x: 196, y: 253 },
      { label: "Expertise", icon: "/flow/expertise.webp", x: 196, y: 574 },
      { label: "Authority", icon: "/flow/authority.webp", x: 196, y: 895 },
    ],
    outputs: [
      { label: "Strategy", icon: "/flow/strategy.webp", x: 1804, y: 253 },
      { label: "System", icon: "/flow/system.webp", x: 1804, y: 574 },
      { label: "Launch", icon: "/flow/launch.webp", x: 1804, y: 895 },
    ],
    inputPaths: [
      "M276 275 C 520 450, 700 565, 870 575",
      "M276 575 C 500 584, 700 580, 870 576",
      "M276 893 C 520 745, 700 590, 870 578",
    ],
    outputPaths: [
      "M1724 253 C 1489 441, 1314 564, 1150 575",
      "M1724 574 C 1508 583, 1314 579, 1150 576",
      "M1724 895 C 1489 746, 1314 590, 1150 578",
    ],
  },
  {
    name: "tall",
    width: 1000,
    height: 1500,
    doc: { x: 500, y: 690, width: 320 },
    title: { x: 500, y: 940 },
    inputs: [
      { label: "Audience", icon: "/flow/audience.webp", x: 180, y: 140 },
      { label: "Expertise", icon: "/flow/expertise.webp", x: 500, y: 140 },
      { label: "Authority", icon: "/flow/authority.webp", x: 820, y: 140 },
    ],
    outputs: [
      { label: "Strategy", icon: "/flow/strategy.webp", x: 180, y: 1260 },
      { label: "System", icon: "/flow/system.webp", x: 500, y: 1260 },
      { label: "Launch", icon: "/flow/launch.webp", x: 820, y: 1260 },
    ],
    inputPaths: [
      "M180 310 C 180 420, 470 410, 492 524",
      "M500 310 C 500 390, 500 450, 500 524",
      "M820 310 C 820 420, 530 410, 508 524",
    ],
    outputPaths: [
      "M180 1175 C 180 1080, 470 1090, 492 990",
      "M500 1175 C 500 1110, 500 1050, 500 990",
      "M820 1175 C 820 1080, 530 1090, 508 990",
    ],
  },
];

export function ProductFlow() {
  return (
    <div className="product-flow" role="img" aria-label="Your audience, expertise, and authority combine into one product, powered by Obsidx strategy, systems, and launch.">
      {layouts.map((layout) => (
        <FlowStage layout={layout} key={layout.name} />
      ))}
    </div>
  );
}

function FlowStage({ layout }: { layout: Layout }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reducedMotion = useReducedMotion();
  const [sparks, setSparks] = useState(false);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const timer = window.setTimeout(() => setSparks(true), 1700);
    return () => window.clearTimeout(timer);
  }, [inView, reducedMotion]);

  const state = inView ? "visible" : "hidden";
  const { width, height } = layout;
  const offset = layout.name === "wide" ? 60 : 40;
  const style = { "--flow-w": width, aspectRatio: `${width} / ${height}` } as CSSProperties;
  const place = (x: number, y: number) => ({ left: `${(x / width) * 100}%`, top: `${(y / height) * 100}%` });

  const node = (item: Node, index: number, tone: "light" | "dark") => {
    const from = layout.name === "wide"
      ? { x: tone === "light" ? -offset : offset, y: 0 }
      : { x: 0, y: tone === "light" ? -offset : offset };
    return (
      <motion.div
        className={`flow-node flow-node--${tone}`}
        style={place(item.x, item.y)}
        key={item.label}
        initial="hidden"
        animate={state}
        variants={{
          hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, ...from, scale: 0.86 },
          visible: {
            opacity: 1, x: 0, y: 0, scale: 1,
            transition: { duration: reducedMotion ? 0.2 : 0.8, ease, delay: reducedMotion ? 0 : (tone === "light" ? 0.05 : 0.95) + index * 0.12 },
          },
        }}
      >
        <span className="flow-tile"><Image src={item.icon} alt="" width={320} height={320} sizes="(max-width: 760px) 18vw, 110px" /></span>
        <span className="flow-label">{item.label}</span>
      </motion.div>
    );
  };

  const wire = (d: string, index: number, delay: number) => (
    <motion.path
      key={d}
      d={d}
      className="flow-wire"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.9, ease, delay: reducedMotion ? 0 : delay + index * 0.12 }}
    />
  );

  return (
    <div className={`flow-stage flow-stage--${layout.name}`} ref={ref} style={style} aria-hidden="true">
      <svg className="flow-wires" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <radialGradient id={`flow-spark-${layout.name}`}>
            <stop offset="0" stopColor="#fffaf0" />
            <stop offset="0.35" stopColor="#ffd58e" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fcba4b" stopOpacity="0" />
          </radialGradient>
        </defs>
        {layout.inputPaths.map((d, index) => wire(d, index, 0.35))}
        {layout.outputPaths.map((d, index) => wire(d, index, 1.05))}
        {sparks && [...layout.inputPaths, ...layout.outputPaths].map((d, index) => (
          [0, 1].map((copy) => (
            <g key={`${d}-${copy}`} opacity="0">
              <circle r={layout.name === "wide" ? 16 : 20} fill={`url(#flow-spark-${layout.name})`} />
              <circle r={layout.name === "wide" ? 4.5 : 6} fill="#fffaf0" />
              <animateMotion
                dur="3.4s"
                begin={`${(index % 3) * 0.55 + copy * 1.7 + (index > 2 ? 0.8 : 0)}s`}
                repeatCount="indefinite"
                path={d}
                calcMode="spline"
                keyTimes="0;1"
                keyPoints="0;1"
                keySplines="0.45 0 0.35 1"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.82;1"
                dur="3.4s"
                begin={`${(index % 3) * 0.55 + copy * 1.7 + (index > 2 ? 0.8 : 0)}s`}
                repeatCount="indefinite"
              />
            </g>
          ))
        ))}
      </svg>

      {layout.inputs.map((item, index) => node(item, index, "light"))}

      <motion.div
        className="flow-doc"
        style={place(layout.doc.x, layout.doc.y)}
        initial="hidden"
        animate={state}
        variants={{
          hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 30 },
          visible: { opacity: 1, scale: 1, y: 0, transition: { duration: reducedMotion ? 0.2 : 0.9, ease, delay: reducedMotion ? 0 : 0.7 } },
        }}
      >
        <div className="flow-doc-float">
          <Image className="flow-doc-img" src="/flow/product.webp" alt="" width={640} height={771} sizes="(max-width: 760px) 34vw, 200px" priority={false} />
        </div>
      </motion.div>

      <motion.p
        className="flow-title"
        style={place(layout.title.x, layout.title.y)}
        initial="hidden"
        animate={state}
        variants={{
          hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: reducedMotion ? 0.2 : 0.8, ease, delay: reducedMotion ? 0 : 1.15 } },
        }}
      >
        Perfect Product
      </motion.p>

      {layout.outputs.map((item, index) => node(item, index, "dark"))}
    </div>
  );
}
