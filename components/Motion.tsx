"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroEntrance({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.1 } },
      }}
    >
      {Children.toArray(children).map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.16 : 0.36, ease } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ScrollReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: reducedMotion ? 0.16 : 0.56, ease }}
    >
      {children}
    </motion.div>
  );
}
