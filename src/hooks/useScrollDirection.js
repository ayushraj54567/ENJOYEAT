import { useState, useEffect, useRef } from "react";

/**
 * useScrollDirection:
 * Tracks whether the user is scrolling down or scrolling up.
 * Returns true if scrolling down (or at rest after scrolling down),
 * and false when the user actively scrolls upwards.
 */
export function useScrollDirection() {
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          // Threshold of 4px to avoid micro-jitter on trackpads
          if (Math.abs(currentY - lastScrollY.current) > 4) {
            setIsScrollingDown(currentY > lastScrollY.current);
            lastScrollY.current = currentY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrollingDown;
}

