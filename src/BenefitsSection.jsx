import React, { useState, useRef } from "react";
import { motion, useTransform, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "./hooks/useReducedMotionSafe";
import { useOneWayScrollProgress } from "./hooks/useOneWayScrollProgress";
import MakhanaGuideModal from "./components/MakhanaGuideModal";
import realCenterImage from "./assets/benefits/real_benefits_center.png";

// Direct matching badge images from the brand image reference
import badgeLeaf from "./assets/benefits/badge_leaf_clean.png";
import badgeRoast from "./assets/benefits/badge_roast_clean.png";
import badgeHeart from "./assets/benefits/badge_heart_clean.png";
import badgeFreshness from "./assets/benefits/badge_freshness_clean.png";

/* Desktop Canvas: 1024 x 572 */
const uD = (n) => `${((n / 1024) * 100).toFixed(4)}cqw`;
const boxD = (x, y, w, h) => ({
  position: "absolute",
  left: uD(x),
  top: uD(y),
  ...(w != null && { width: uD(w) }),
  ...(h != null && { height: uD(h) }),
});

/* Mobile Canvas: 480 x 420 matching Video 2 mobile proportions */
const uM = (n) => `${((n / 480) * 100).toFixed(4)}cqw`;
const boxM = (x, y, w, h) => ({
  position: "absolute",
  left: uM(x),
  top: uM(y),
  ...(w != null && { width: uM(w) }),
  ...(h != null && { height: uM(h) }),
});

const FONT_SERIF = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const FONT_SANS =
  "'Plus Jakarta Sans', Inter, -apple-system, BlinkMacSystemFont, sans-serif";

export default function BenefitsSection() {
  const [activeGuide, setActiveGuide] = useState(null);
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotionSafe();

  const easeTransition = {
    duration: 0.85,
    ease: [0.16, 1, 0.3, 1],
  };

  // Scroll-linked animation for Benefits Section
  // Sticky scroll progress across 250vh - One-way progress (no reverse animation)
  const scrollYProgress = useOneWayScrollProgress(sectionRef, {
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    restDelta: 0.001,
  });

  // User requirement:
  // "in the benefit page when I'm scrolling the jar was still come from the center but I want that it will come from the left side from the screen's left side and came to the right side and also one more thing when I was scrolling down it the jar was come to the right side but the screen the page will also goes to the upside but I don't want like this I want it works like when I'm scrolling only the jar will scroll from left side to right side Not my page will scroll to the upside ...
  // after that when the jar was come to the right corner from the left corner when I am scrolling more then do not scroll my page just show the pop up and benefits were there and remove these benefits and add something other things"
  // [0.0 -> 0.40]: Jar starts offscreen on the far left (-46cqw) and travels across screen smoothly to the far right corner (+28cqw)!
  const centerImageX = useTransform(smoothProgress, [0.0, 0.40], ["-46cqw", "28cqw"]);
  const centerImageScale = useTransform(smoothProgress, [0.0, 0.40], [0.88, 1.05]);

  // [0.42 -> 0.85]: AFTER the jar stops on the right, the benefit cards pop up into the left & center areas!
  const card1Scale = useTransform(smoothProgress, [0.42, 0.52], [0, 1]);
  const card1Opacity = useTransform(smoothProgress, [0.42, 0.50], [0, 1]);

  const card2Scale = useTransform(smoothProgress, [0.52, 0.62], [0, 1]);
  const card2Opacity = useTransform(smoothProgress, [0.52, 0.60], [0, 1]);

  const card3Scale = useTransform(smoothProgress, [0.62, 0.72], [0, 1]);
  const card3Opacity = useTransform(smoothProgress, [0.62, 0.70], [0, 1]);

  const card4Scale = useTransform(smoothProgress, [0.72, 0.82], [0, 1]);
  const card4Opacity = useTransform(smoothProgress, [0.72, 0.80], [0, 1]);

  return (
    <div className="bn-wrap" id="benefits" ref={sectionRef}>
      <style>{CSS}</style>

      {/* Interactive Guide Modal */}
      <MakhanaGuideModal
        activeGuide={activeGuide}
        onClose={() => setActiveGuide(null)}
      />

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP VIEW (width >= 769px): Sticky Pinning with Scroll Journey
      ══════════════════════════════════════════════════════════════════ */}
      <div className="bn-sticky-container">
        <section
          className="bn-stage bn-desktop-only"
          aria-label="The Goodness of Makhana (Foxnut)"
        >
        {/* Section Header */}
        <motion.div
          style={{ position: "absolute", left: uD(54), top: uD(28), zIndex: 2 }}
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={easeTransition}
        >
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: uD(32),
              fontWeight: 700,
              color: "#7A5C2E",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            THE GOODNESS OF MAKHANA (FOXNUT)
          </h2>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: uD(13),
              color: "#5C4A30",
              margin: `${uD(6)} 0 0`,
              maxWidth: uD(540),
              lineHeight: 1.45,
            }}
          >
            Supports and promotes heart health, diabetes management, and natural
            weight loss.
          </p>

          {/* Guide Button */}
        </motion.div>

        {/* CENTER REAL PRODUCT SHOWCASE: Moves from left to right as user scrolls and fixes at the right side */}
        <motion.div
          style={{
            ...boxD(328, 128, 368, 332),
            x: reducedMotion ? 0 : centerImageX,
            scale: reducedMotion ? 1 : centerImageScale,
            zIndex: 4,
            transformOrigin: "center center",
          }}
        >
          <img
            src={realCenterImage}
            alt="Enjoyeat Makhana (Foxnut) Real Packaging"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 14px 28px rgba(50,35,15,0.14))",
            }}
          />
        </motion.div>

        {/* ── 4 Brand Promise / Goodness Cards: Pop up systematically across left & center area AFTER jar stops on the right ── */}

        {/* BENEFIT CARD 1: GI-Tagged Mithila Origin */}
        <motion.div
          style={{
            ...boxD(54, 150, 275, 92),
            zIndex: 5,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250,244,233,0.94) 100%)",
            borderRadius: uD(16),
            border: "1.2px solid rgba(195, 175, 145, 0.65)",
            boxShadow: "0 10px 26px rgba(60,40,20,0.08)",
            padding: `${uD(12)} ${uD(16)}`,
            display: "flex",
            alignItems: "center",
            gap: uD(14),
            boxSizing: "border-box",
            scale: reducedMotion ? 1 : card1Scale,
            opacity: reducedMotion ? 1 : card1Opacity,
            transformOrigin: "center center",
          }}
        >
          <div
            style={{
              width: uD(46),
              height: uD(46),
              flexShrink: 0,
              borderRadius: uD(12),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(67, 102, 60, 0.12)",
              backgroundColor: "#FAF5ED",
            }}
          >
            <img
              src={badgeLeaf}
              alt="GI-Tagged Mithila Origin Seal"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: uD(15),
                fontWeight: 700,
                color: "#2C1E14",
                lineHeight: 1.15,
                letterSpacing: "0.01em",
              }}
            >
              GI-Tagged Mithila Origin
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: uD(10),
                color: "#685646",
                marginTop: uD(4),
                lineHeight: 1.35,
              }}
            >
              Certified authentic geographical heritage from Bihar ponds.
            </span>
          </div>
        </motion.div>

        {/* BENEFIT CARD 2: Artisan Clay-Pot Roasting */}
        <motion.div
          style={{
            ...boxD(54, 260, 275, 92),
            zIndex: 5,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250,244,233,0.94) 100%)",
            borderRadius: uD(16),
            border: "1.2px solid rgba(195, 175, 145, 0.65)",
            boxShadow: "0 10px 26px rgba(60,40,20,0.08)",
            padding: `${uD(12)} ${uD(16)}`,
            display: "flex",
            alignItems: "center",
            gap: uD(14),
            boxSizing: "border-box",
            scale: reducedMotion ? 1 : card2Scale,
            opacity: reducedMotion ? 1 : card2Opacity,
            transformOrigin: "center center",
          }}
        >
          <div
            style={{
              width: uD(46),
              height: uD(46),
              flexShrink: 0,
              borderRadius: uD(12),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(166, 90, 24, 0.12)",
              backgroundColor: "#FAF5ED",
            }}
          >
            <img
              src={badgeRoast}
              alt="Artisan Clay-Pot Roasting Icon"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: uD(15),
                fontWeight: 700,
                color: "#2C1E14",
                lineHeight: 1.15,
                letterSpacing: "0.01em",
              }}
            >
              Artisan Clay-Pot Roasting
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: uD(10),
                color: "#685646",
                marginTop: uD(4),
                lineHeight: 1.35,
              }}
            >
              Hand-popped in iron woks preserving natural puff & minerals.
            </span>
          </div>
        </motion.div>

        {/* BENEFIT CARD 3: Zero Palm Oil & Preservatives */}
        <motion.div
          style={{
            ...boxD(348, 150, 275, 92),
            zIndex: 5,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250,244,233,0.94) 100%)",
            borderRadius: uD(16),
            border: "1.2px solid rgba(195, 175, 145, 0.65)",
            boxShadow: "0 10px 26px rgba(60,40,20,0.08)",
            padding: `${uD(12)} ${uD(16)}`,
            display: "flex",
            alignItems: "center",
            gap: uD(14),
            boxSizing: "border-box",
            scale: reducedMotion ? 1 : card3Scale,
            opacity: reducedMotion ? 1 : card3Opacity,
            transformOrigin: "center center",
          }}
        >
          <div
            style={{
              width: uD(46),
              height: uD(46),
              flexShrink: 0,
              borderRadius: uD(12),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(175, 45, 65, 0.12)",
              backgroundColor: "#FAF5ED",
            }}
          >
            <img
              src={badgeHeart}
              alt="Zero Palm Oil Clean Living Icon"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: uD(15),
                fontWeight: 700,
                color: "#2C1E14",
                lineHeight: 1.15,
                letterSpacing: "0.01em",
              }}
            >
              Zero Palm Oil & Preservatives
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: uD(10),
                color: "#685646",
                marginTop: uD(4),
                lineHeight: 1.35,
              }}
            >
              Clean label transparency with 100% natural seasonings only.
            </span>
          </div>
        </motion.div>

        {/* BENEFIT CARD 4: Freshness Shield Packaging */}
        <motion.div
          style={{
            ...boxD(348, 260, 275, 92),
            zIndex: 5,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250,244,233,0.94) 100%)",
            borderRadius: uD(16),
            border: "1.2px solid rgba(195, 175, 145, 0.65)",
            boxShadow: "0 10px 26px rgba(60,40,20,0.08)",
            padding: `${uD(12)} ${uD(16)}`,
            display: "flex",
            alignItems: "center",
            gap: uD(14),
            boxSizing: "border-box",
            scale: reducedMotion ? 1 : card4Scale,
            opacity: reducedMotion ? 1 : card4Opacity,
            transformOrigin: "center center",
          }}
        >
          <div
            style={{
              width: uD(46),
              height: uD(46),
              flexShrink: 0,
              borderRadius: uD(12),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(35, 95, 165, 0.12)",
              backgroundColor: "#FAF5ED",
            }}
          >
            <img
              src={badgeFreshness}
              alt="Freshness Shield Packaging Icon"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: uD(15),
                fontWeight: 700,
                color: "#2C1E14",
                lineHeight: 1.15,
                letterSpacing: "0.01em",
              }}
            >
              Freshness Shield Packaging
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: uD(10),
                color: "#685646",
                marginTop: uD(4),
                lineHeight: 1.35,
              }}
            >
              Triple-layer nitrogen flush foil & airtight seal for lasting crisp.
            </span>
          </div>
        </motion.div>
      </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE VIEW (width <= 768px): 480 x 420 Proportional Mobile Stage
          Matches Video 2 phone layout with generous vertical space & crisp text!
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="benefits-mobile"
        className="bn-stage bn-mobile-only"
        aria-label="The Goodness of Makhana (Foxnut)"
      >
        {/* Mobile Section Header */}
        <motion.div
          style={{
            position: "absolute",
            left: uM(18),
            top: uM(14),
            right: uM(18),
            zIndex: 2,
          }}
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={easeTransition}
        >
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: uM(21),
              fontWeight: 700,
              color: "#7A5C2E",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            THE GOODNESS OF MAKHANA (FOXNUT)
          </h2>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: uM(10.5),
              color: "#5C4A30",
              margin: `${uM(3)} 0 0`,
              lineHeight: 1.35,
            }}
          >
            Supports &amp; promotes heart health, diabetes management, and
            natural weight loss.
          </p>

          {/* Mobile Guide Buttons - Removed Recipes Guide button since Recipes is now its own page */}
          <div style={{ display: "flex", gap: uM(8), marginTop: uM(8) }}>
            <button
              type="button"
              onClick={() => setActiveGuide("benefits")}
              style={{
                flex: 1,
                padding: `${uM(6)} ${uM(8)}`,
                borderRadius: uM(6),
                background: "#747A55",
                color: "#ffffff",
                border: 0,
                fontSize: uM(10),
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(116,122,85,0.25)",
              }}
            >
              📖 Makhana Health Benefits Guide
            </button>
          </div>
        </motion.div>

        {/* Mobile SVG Connector Lines with Terminal Dots */}
        <motion.svg
          viewBox="0 0 480 420"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
          initial={reducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          {/* Mobile Connector 1: Top-Left Card -> Center */}
          <line
            x1="145"
            y1="130"
            x2="168"
            y2="130"
            stroke="#B8A07A"
            strokeWidth="1.4"
            strokeDasharray="3 2.5"
          />
          <circle cx="168" cy="130" r="2.8" fill="#B8A07A" />

          {/* Mobile Connector 2: Bottom-Left Card -> Center */}
          <line
            x1="145"
            y1="240"
            x2="168"
            y2="240"
            stroke="#B8A07A"
            strokeWidth="1.4"
            strokeDasharray="3 2.5"
          />
          <circle cx="168" cy="240" r="2.8" fill="#B8A07A" />

          {/* Mobile Connector 3: Top-Right Card -> Center */}
          <line
            x1="335"
            y1="130"
            x2="312"
            y2="130"
            stroke="#B8A07A"
            strokeWidth="1.4"
            strokeDasharray="3 2.5"
          />
          <circle cx="312" cy="130" r="2.8" fill="#B8A07A" />

          {/* Mobile Connector 4: Bottom-Right Card -> Center */}
          <line
            x1="335"
            y1="240"
            x2="312"
            y2="240"
            stroke="#B8A07A"
            strokeWidth="1.4"
            strokeDasharray="3 2.5"
          />
          <circle cx="312" cy="240" r="2.8" fill="#B8A07A" />
        </motion.svg>

        {/* ── Mobile Center Stage: Left 2 Cards, Center Pouch, Right 2 Cards ── */}

        {/* MOBILE LEFT CARD 1: GI-Tagged Origin */}
        <motion.div
          style={{
            ...boxM(12, 102, 136, 68),
            zIndex: 2,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250,244,233,0.94) 100%)",
            border: "1.2px solid rgba(195, 175, 145, 0.65)",
            borderRadius: uM(12),
            padding: `${uM(6)} ${uM(8)}`,
            display: "flex",
            alignItems: "center",
            gap: uM(7),
            boxShadow: "0 4px 12px rgba(60,40,20,0.06)",
          }}
          initial={reducedMotion ? {} : { x: -35, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.08,
          }}
        >
          <div
            style={{
              width: uM(28),
              height: uM(28),
              borderRadius: uM(8),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              backgroundColor: "#FAF5ED",
            }}
          >
            <img
              src={badgeLeaf}
              alt="GI Origin"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: uM(9.5),
                fontWeight: 700,
                color: "#2C1E14",
                lineHeight: 1.15,
              }}
            >
              GI-Tagged Origin
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: uM(7),
                color: "#685646",
                marginTop: uM(2),
                lineHeight: 1.25,
              }}
            >
              Harvested from pristine Bihar wetlands.
            </span>
          </div>
        </motion.div>

        {/* MOBILE LEFT CARD 2: Artisan Clay Roasting */}
        <motion.div
          style={{
            ...boxM(12, 212, 136, 68),
            zIndex: 2,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250,244,233,0.94) 100%)",
            border: "1.2px solid rgba(195, 175, 145, 0.65)",
            borderRadius: uM(12),
            padding: `${uM(6)} ${uM(8)}`,
            display: "flex",
            alignItems: "center",
            gap: uM(7),
            boxShadow: "0 4px 12px rgba(60,40,20,0.06)",
          }}
          initial={reducedMotion ? {} : { x: -35, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.18,
          }}
        >
          <div
            style={{
              width: uM(28),
              height: uM(28),
              borderRadius: uM(8),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              backgroundColor: "#FAF5ED",
            }}
          >
            <img
              src={badgeRoast}
              alt="Clay Roasting"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: uM(9.5),
                fontWeight: 700,
                color: "#2C1E14",
                lineHeight: 1.15,
              }}
            >
              Clay-Pot Roasted
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: uM(7),
                color: "#685646",
                marginTop: uM(2),
                lineHeight: 1.25,
              }}
            >
              Hand-popped preserving natural crunch.
            </span>
          </div>
        </motion.div>

        {/* MOBILE CENTER REAL PACKAGING PHOTO */}
        <motion.div
          style={{ ...boxM(152, 95, 176, 195), zIndex: 3 }}
          initial={reducedMotion ? {} : { scale: 0.88, opacity: 0, y: 20 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 16,
            delay: 0.02,
          }}
        >
          <img
            src={realCenterImage}
            alt="EnjoyEat Foxnut Packaging"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 6px 14px rgba(45,30,15,0.18))",
            }}
          />
        </motion.div>

        {/* MOBILE RIGHT CARD 3: Zero Palm Oil */}
        <motion.div
          style={{
            ...boxM(332, 102, 136, 68),
            zIndex: 2,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250,244,233,0.94) 100%)",
            border: "1.2px solid rgba(195, 175, 145, 0.65)",
            borderRadius: uM(12),
            padding: `${uM(6)} ${uM(8)}`,
            display: "flex",
            alignItems: "center",
            gap: uM(7),
            boxShadow: "0 4px 12px rgba(60,40,20,0.06)",
          }}
          initial={reducedMotion ? {} : { x: 35, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.12,
          }}
        >
          <div
            style={{
              width: uM(28),
              height: uM(28),
              borderRadius: uM(8),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              backgroundColor: "#FAF5ED",
            }}
          >
            <img
              src={badgeHeart}
              alt="Zero Palm Oil"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: uM(9.5),
                fontWeight: 700,
                color: "#2C1E14",
                lineHeight: 1.15,
              }}
            >
              Zero Palm Oil
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: uM(7),
                color: "#685646",
                marginTop: uM(2),
                lineHeight: 1.25,
              }}
            >
              100% clean-label natural ingredients.
            </span>
          </div>
        </motion.div>

        {/* MOBILE RIGHT CARD 4: Freshness Shield */}
        <motion.div
          style={{
            ...boxM(332, 212, 136, 68),
            zIndex: 2,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(250,244,233,0.94) 100%)",
            border: "1.2px solid rgba(195, 175, 145, 0.65)",
            borderRadius: uM(12),
            padding: `${uM(6)} ${uM(8)}`,
            display: "flex",
            alignItems: "center",
            gap: uM(7),
            boxShadow: "0 4px 12px rgba(60,40,20,0.06)",
          }}
          initial={reducedMotion ? {} : { x: 35, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.22,
          }}
        >
          <div
            style={{
              width: uM(28),
              height: uM(28),
              borderRadius: uM(8),
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              backgroundColor: "#FAF5ED",
            }}
          >
            <img
              src={badgeFreshness}
              alt="Freshness Shield"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: FONT_SERIF,
                fontSize: uM(9.5),
                fontWeight: 700,
                color: "#2C1E14",
                lineHeight: 1.15,
              }}
            >
              Freshness Shield
            </span>
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: uM(7),
                color: "#685646",
                marginTop: uM(2),
                lineHeight: 1.25,
              }}
            >
              Triple-layer sealed crisp protection.
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const CSS = `
.bn-wrap {
  width: 100%;
  background: #EFE7D6;
  position: relative;
}
@media (min-width: 769px) {
  .bn-wrap {
    height: 250vh;
  }
  .bn-sticky-container {
    position: sticky;
    top: 72px;
    height: calc(100vh - 72px);
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
.bn-stage {
  position: relative;
  width: 100%;
  user-select: none;
}

/* Desktop layout (width > 768px) */
@media (min-width: 769px) {
  .bn-desktop-only {
    display: block;
    aspect-ratio: 1024 / 572;
    container-type: inline-size;
    overflow: hidden;
  }
  .bn-mobile-only {
    display: none !important;
  }
}

/* Mobile layout (width <= 768px) */
@media (max-width: 768px) {
  .bn-desktop-only {
    display: none !important;
  }
  .bn-mobile-only {
    display: block;
    aspect-ratio: 480 / 380;
    container-type: inline-size;
    overflow: hidden;
    padding: 12px 0;
  }
}
`;
