import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";

/**
 * MobileAlternatingSection (Page-Shift Transition Runtime):
 * Creates a distinct, physical page-shift animation on both Desktop and Mobile:
 * - Odd pages / direction 'right': sweeps into view with dynamic pop-in from the RIGHT side (+60px on desktop, +44px on mobile)
 * - Even pages / direction 'left': sweeps into view with dynamic pop-in from the LEFT side (-60px on desktop, -44px on mobile)
 * - Uses calibrated spring physics (stiffness: 85, damping: 18) for smooth settling without layout jumps
 * - Triggers seamlessly both on initial scroll and while shifting between pages
 */
export default function MobileAlternatingSection({
  children,
  direction = "right",
  id,
  className = "",
}) {
  const reducedMotion = useReducedMotionSafe();
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth <= 768 : false));

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, []);

  const isFromRight = direction === "right";
  // Alternating entry: Right side (+60px / +44px) vs Left side (-60px / -44px)
  const initialX = isFromRight ? (isMobile ? 44 : 64) : (isMobile ? -44 : -64);
  const initialY = isMobile ? 18 : 28;
  const initialScale = isMobile ? 0.96 : 0.98;

  return (
    <motion.div
      id={id}
      className={`w-full overflow-hidden ${className}`}
      initial={
        reducedMotion
          ? {}
          : {
              opacity: 0.15,
              x: initialX,
              y: initialY,
              scale: initialScale,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: false, amount: 0.08 }}
      transition={{
        type: "spring",
        stiffness: 85,
        damping: 18,
        mass: 0.9,
        restDelta: 0.001,
      }}
    >
      {children}
    </motion.div>
  );
}
