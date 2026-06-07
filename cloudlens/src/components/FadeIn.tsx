"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({ children, className, delay = 0, direction = "up" }: FadeInProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const offsetMap = { up: 24, down: -24, left: 24, right: -24, none: 0 };
  const offset = offsetMap[direction];

  const initial =
    direction === "up" || direction === "down"
      ? { opacity: 0, y: offset }
      : direction === "none"
        ? { opacity: 0 }
        : { opacity: 0, x: offset };

  const animate = inView
    ? direction === "up" || direction === "down"
      ? { opacity: 1, y: 0 }
      : direction === "none"
        ? { opacity: 1 }
        : { opacity: 1, x: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
