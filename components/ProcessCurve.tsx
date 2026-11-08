"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    title: "Find the Opportunity",
    body: "Audience, expertise, existing demand, and commercial signals reveal your strongest business opportunity.",
  },
  {
    title: "Shape the Offer",
    body: "Product, positioning, pricing, and customer journey, shaped into a clear, relevant, compelling offer.",
  },
  {
    title: "Build the System",
    body: "Tools, sales process, delivery experience, and operating workflow, connected into one system built to launch and grow.",
  },
  {
    title: "Launch and Improve",
    body: "Customer behavior, revenue, retention, and feedback guide every improvement after launch.",
  },
] as const;

// Desktop wave in a 1000x140 box: horizontal tangents at each node, nodes at x = 12.5%, 37.5%, 62.5%, 87.5%.
const wavePath = "M0 96C50 96 70 28 125 28C250 28 250 112 375 112C500 112 500 28 625 28C750 28 750 112 875 112C930 112 950 70 1000 60";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProcessCurve() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ol
      className="process-curve"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <svg className="process-curve-wave" viewBox="0 0 1000 140" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="process-curve-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FCBA4B" stopOpacity="0" />
            <stop offset="0.12" stopColor="#FCBA4B" />
            <stop offset="0.6" stopColor="#FFD58E" />
            <stop offset="0.9" stopColor="#FCBA4B" />
            <stop offset="1" stopColor="#FCBA4B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={wavePath} className="process-curve-track" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={wavePath}
          className="process-curve-line"
          vectorEffect="non-scaling-stroke"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1.8, ease } } }}
        />
      </svg>

      {steps.map((step, index) => (
        <motion.li
          className={`process-step ${index % 2 === 0 ? "process-step--high" : "process-step--low"}`}
          key={step.title}
          variants={{
            hidden: { opacity: 0, y: index % 2 === 0 ? -14 : 14 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25 + index * 0.35, ease } },
          }}
        >
          <svg className="process-step-connector" viewBox="0 0 48 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={index % 2 === 0 ? "M24 0C46 34 2 66 24 100" : "M24 0C2 34 46 66 24 100"} vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="process-step-node" aria-hidden="true">0{index + 1}</span>
          <div className="process-step-copy">
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
