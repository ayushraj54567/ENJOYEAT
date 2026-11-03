import { useState, useEffect, useRef } from "react";
import { useScroll, useMotionValue } from "framer-motion";

/**
 * useOneWayScrollProgress:
 * Tracks scroll progress within a target element and ensures the progress value
 * ONLY advances forward (monotonic ratchet).
 * When scrolling down: progress increases smoothly from 0 towards 1, driving entrance animations.
 * When scrolling up: progress retains its highest reached position (or completes), so elements
 * do NOT reverse-animate, disappear, or re-run backwards.
 */
export function useOneWayScrollProgress(targetRef, options = { offset: ["start start", "end end"] }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    ...options,
  });

  const oneWayProgress = useMotionValue(0);
  const maxReached = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > maxReached.current) {
        maxReached.current = latest;
        oneWayProgress.set(latest);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, oneWayProgress]);

  return oneWayProgress;
}

