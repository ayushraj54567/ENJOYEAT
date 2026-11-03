import React, { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "./hooks/useReducedMotionSafe";

import leftPouch from "./assets/shop/jar-product.png";
import shopCenterScene from "./assets/shop/shop-center-scene-new.png";
import shopBulkSacks from "./assets/shop/shop-bulk-sacks.png";

/* ── Desktop Canvas: 2576 x 1438 (Preserves exact 1:1 original desktop fidelity) ── */
const WD = 2576,
  HD = 1438;
const posD = (x, y, w, h) => ({
  left: `${(x / WD) * 100}%`,
  top: `${(y / HD) * 100}%`,
  ...(w ? { width: `${(w / WD) * 100}%` } : {}),
  ...(h ? { height: `${(h / HD) * 100}%` } : {}),
});
const fsD = (px) => `${(px / WD) * 100}cqw`;

/* ── Mobile Canvas: 480 x 860 Vertical Layout ── */
const uM = (n) => `${((n / 480) * 100).toFixed(4)}cqw`;
const boxM = (x, y, w, h) => ({
  position: "absolute",
  left: uM(x),
  top: uM(y),
  ...(w != null && { width: uM(w) }),
  ...(h != null && { height: uM(h) }),
});

const SIZES = ["100g", "250g"];

/* Text stretched to the exact width for Desktop SVG text */
function Fit({ x, y, w, size, children, className = "" }) {
  return (
    <svg
      className={`abs ${className}`}
      style={{ ...posD(x, y, w, size * 1.3), pointerEvents: "none" }}
      viewBox={`0 0 ${w} ${size * 1.3}`}
      aria-label={children}
    >
      <text
        x="0"
        y={size}
        textLength={w}
        lengthAdjust="spacingAndGlyphs"
        fontSize={size}
      >
        {children}
      </text>
    </svg>
  );
}

const HEADLINE_TEXT = "CHOOSE YOUR NATURAL CRUNCH";
const SUBTITLE_TEXT =
  "Premium raw makhana from Bihar, packed with natural goodness.";

export default function ChooseCrunchPage() {
  const [size, setSize] = useState("100g");
  const reducedMotion = useReducedMotionSafe();

  // Letter stagger variants for Left-to-Right typewriter typing effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.22, ease: "easeOut" },
    },
  };

  const subtitleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 1.1,
      },
    },
  };

  const subtitleLetterVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.18, ease: "easeOut" },
    },
  };

  return (
    <div className="pg" id="shop">
      <style>{css}</style>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP VIEW (width >= 769px): 2576 x 1438 Wide Stage
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="stage shop-desktop-only"
        aria-label="Choose your natural crunch"
      >
        {/* Headline & Subtitle with Typewriter Animation */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <motion.div
            className="abs"
            style={{
              ...posD(165, 175, 1925, 140),
              display: "flex",
              alignItems: "baseline",
              flexWrap: "nowrap",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: fsD(102),
              color: "#3d2a1f",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              userSelect: "none",
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {HEADLINE_TEXT.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="abs sub"
            style={{
              ...posD(165, 335, 1300),
              fontSize: fsD(40),
              lineHeight: `${fsD(54)}`,
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              color: "#554236",
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
            }}
            variants={subtitleContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {SUBTITLE_TEXT.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={subtitleLetterVariants}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* ── Left Product: One-Way Pop-Up ── */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.75, y: 120 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 75,
            damping: 18,
            mass: 0.9,
            delay: 0.15,
          }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <img
            className="abs fl drop-shadow-[0_20px_25px_rgba(0,0,0,0.25)]"
            style={{ ...posD(250, 630, 340), pointerEvents: "auto" }}
            src={leftPouch}
            alt="EnjoyEat Flavoured Makhana Jar"
            draggable={false}
          />
          <Fit x={180} y={1010} w={480} size={45} className="ttl">
            FLAVOURED MAKHANA
          </Fit>
          <a
            className="abs enq"
            href="https://wa.me/8084044728?text=Hello%20EnjoyEat,%20I%20would%20like%20to%20order%20Flavoured%20Makhana%20(Foxnut)%20Jar"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                "https://wa.me/8084044728?text=Hello%20EnjoyEat,%20I%20would%20like%20to%20order%20Flavoured%20Makhana%20(Foxnut)%20Jar",
                "_blank",
              );
            }}
            style={{
              ...posD(250, 1085, 340, 80),
              fontSize: fsD(34),
              zIndex: 99,
              pointerEvents: "auto",
              cursor: "pointer",
            }}
          >
            ORDER NOW
          </a>
          <p
            className="abs szl"
            style={{
              ...posD(250, 1180, 340),
              fontSize: fsD(32),
              pointerEvents: "none",
            }}
          >
            {SIZES.join(" | ")}
          </p>
        </motion.div>

        {/* ── Centre Hero Centerpiece: One-Way Pop-Up Bounce ── */}
        <motion.div
          className="abs ctr"
          style={{ ...posD(698, 460, 1180), zIndex: 10, pointerEvents: "none" }}
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.9, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            mass: 1.1,
            delay: 0.1,
          }}
          whileHover={reducedMotion ? {} : { scale: 1.025 }}
        >
          <img
            src={shopCenterScene}
            alt="Enjoyeat Makhana (Foxnut) Raw"
            draggable={false}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              mixBlendMode: "multiply",
              WebkitMaskImage:
                "radial-gradient(closest-side, black 75%, transparent 100%)",
              maskImage:
                "radial-gradient(closest-side, black 75%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* ── Right Product: One-Way Pop-Up ── */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.75, y: 120 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 75,
            damping: 18,
            mass: 0.9,
            delay: 0.25,
          }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <img
            className="abs fl slow"
            style={{
              ...posD(1855, 670, 550),
              mixBlendMode: "multiply",
              WebkitMaskImage:
                "radial-gradient(closest-side, black 75%, transparent 100%)",
              maskImage:
                "radial-gradient(closest-side, black 75%, transparent 100%)",
              pointerEvents: "auto",
            }}
            src={shopBulkSacks}
            alt="Bulk makhana pouches and jute sacks"
            draggable={false}
          />
          <Fit x={1850} y={1010} w={560} size={45} className="ttl">
            BULK &amp; WHOLESALE MAKHANA
          </Fit>
          <a
            className="abs enq"
            href="#wholesale"
            onClick={(e) => {
              e.stopPropagation();
              const el = document.getElementById("wholesale");
              if (el) {
                const navHeight = 72;
                const pos =
                  el.getBoundingClientRect().top +
                  window.pageYOffset -
                  navHeight;
                window.scrollTo({ top: Math.max(0, pos), behavior: "smooth" });
              }
            }}
            style={{
              ...posD(1960, 1085, 340, 80),
              fontSize: fsD(34),
              zIndex: 99,
              pointerEvents: "auto",
              cursor: "pointer",
            }}
          >
            ORDER NOW
          </a>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE VIEW (width <= 768px): 480 x 860 Dedicated Vertical Stage
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="shop-mobile"
        className="stage shop-mobile-only"
        aria-label="Choose your natural crunch - Mobile"
      >
        {/* Mobile Header: Title & Subtitle with Left-to-Right Typewriter typing */}
        <motion.div
          style={{
            position: "absolute",
            left: uM(20),
            top: uM(14),
            right: uM(20),
            zIndex: 10,
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: uM(23),
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1.15,
              margin: 0,
              color: "#3d2a1f",
              textTransform: "uppercase",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {HEADLINE_TEXT.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <motion.p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: uM(11.5),
              fontWeight: 400,
              color: "#554236",
              margin: `${uM(4)} 0 0`,
              lineHeight: 1.4,
              display: "flex",
              flexWrap: "wrap",
            }}
            variants={subtitleContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {SUBTITLE_TEXT.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={subtitleLetterVariants}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        {/* ── 1. Flagship Centerpiece: Sattvik Makhana Hero Card (Top / Prominent) ── */}
        <motion.div
          style={{
            ...boxM(20, 84, 440, 370),
            zIndex: 8,
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 245, 235, 0.85) 100%)",
            border: "1.2px solid rgba(255, 255, 255, 0.95)",
            borderRadius: uM(18),
            boxShadow: "0 12px 30px rgba(60, 40, 20, 0.08)",
            padding: uM(12),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
          }}
          initial={reducedMotion ? {} : { opacity: 0, y: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.1,
          }}
        >
          {/* Sattvik Center Scene Image */}
          <div
            style={{
              width: uM(280),
              height: uM(200),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={shopCenterScene}
              alt="Enjoyeat Makhana Sattvik Gold Edition"
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </div>

          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: uM(20),
              fontWeight: 700,
              color: "#3d2a1f",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              marginTop: uM(2),
            }}
          >
            MAKHANA (FOXNUT)
          </span>

          {/* Size Selector Pills */}
          <div
            style={{
              display: "flex",
              gap: uM(8),
              marginTop: uM(8),
              position: "relative",
              zIndex: 15,
            }}
          >
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                style={{
                  padding: `${uM(4)} ${uM(12)}`,
                  borderRadius: uM(14),
                  fontSize: uM(11),
                  fontWeight: size === s ? 600 : 500,
                  fontFamily: "Inter, sans-serif",
                  border:
                    size === s
                      ? "1.5px solid #25D366"
                      : "1.2px solid rgba(85,66,54,0.25)",
                  background: size === s ? "#25D366" : "rgba(255,255,255,0.7)",
                  color: size === s ? "#ffffff" : "#3d2a1f",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  touchAction: "manipulation",
                  transition: "all 0.2s ease",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* WhatsApp Direct Order CTA */}
          <a
            href={`https://wa.me/8084044728?text=Hello%20EnjoyEat,%20I%20would%20like%20to%20order%20Makhana%20(Foxnut)%20-%20${size}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: uM(10),
              width: "80%",
              maxWidth: uM(280),
              height: uM(36),
              background: "#25D366",
              color: "#ffffff",
              borderRadius: uM(8),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: uM(12),
              fontWeight: 600,
              letterSpacing: "0.05em",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(37, 211, 102, 0.32)",
              cursor: "pointer",
              pointerEvents: "auto",
              touchAction: "manipulation",
              position: "relative",
              zIndex: 15,
            }}
          >
            ORDER ON WHATSAPP • {size}
          </a>
        </motion.div>

        {/* ── 2. Left Product: Flavoured Makhana Jar ── */}
        <motion.div
          style={{
            ...boxM(20, 474, 440, 168),
            zIndex: 6,
            background: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(10px)",
            border: "1.2px solid rgba(255, 255, 255, 0.95)",
            borderRadius: uM(16),
            boxShadow: "0 8px 22px rgba(60, 40, 20, 0.06)",
            padding: uM(12),
            display: "flex",
            alignItems: "center",
            gap: uM(16),
            boxSizing: "border-box",
          }}
          initial={reducedMotion ? {} : { opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.18,
          }}
        >
          <div
            style={{
              width: uM(120),
              height: uM(144),
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={leftPouch}
              alt="Flavoured Makhana Jar"
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.18))",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: uM(4),
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: uM(16.5),
                fontWeight: 700,
                color: "#3d2a1f",
                letterSpacing: "0.02em",
                lineHeight: 1.2,
              }}
            >
              FLAVOURED MAKHANA
            </span>
            <span
              style={{
                fontSize: uM(10.5),
                color: "#665a53",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Roasted &amp; Seasoned • Natural Crunch
            </span>
            <a
              href="https://wa.me/8084044728?text=Hello%20EnjoyEat,%20I%20would%20like%20to%20order%20Flavoured%20Makhana%20(Foxnut)%20Jar"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  "https://wa.me/8084044728?text=Hello%20EnjoyEat,%20I%20would%20like%20to%20order%20Flavoured%20Makhana%20(Foxnut)%20Jar",
                  "_blank",
                );
              }}
              style={{
                marginTop: uM(6),
                width: uM(140),
                height: uM(32),
                background: "#7e8458",
                color: "#ffffff",
                border: 0,
                borderRadius: uM(6),
                fontSize: uM(10.5),
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 3px 8px rgba(126, 132, 88, 0.28)",
                pointerEvents: "auto",
                touchAction: "manipulation",
                position: "relative",
                zIndex: 25,
              }}
            >
              ORDER NOW
            </a>
          </div>
        </motion.div>

        {/* ── 3. Right Product: Bulk & Wholesale Makhana (Horizontal Compact Card) ── */}
        <motion.div
          style={{
            ...boxM(20, 660, 440, 168),
            zIndex: 6,
            background: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(10px)",
            border: "1.2px solid rgba(255, 255, 255, 0.95)",
            borderRadius: uM(16),
            boxShadow: "0 8px 22px rgba(60, 40, 20, 0.06)",
            padding: uM(12),
            display: "flex",
            alignItems: "center",
            gap: uM(16),
            boxSizing: "border-box",
          }}
          initial={reducedMotion ? {} : { opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.25,
          }}
        >
          <div
            style={{
              width: uM(128),
              height: uM(144),
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={shopBulkSacks}
              alt="Bulk & Wholesale Makhana Sacks"
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: uM(4),
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: uM(16.5),
                fontWeight: 700,
                color: "#3d2a1f",
                letterSpacing: "0.02em",
                lineHeight: 1.2,
              }}
            >
              BULK &amp; WHOLESALE
            </span>
            <span
              style={{
                fontSize: uM(10.5),
                color: "#665a53",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Custom packing &amp; commercial supply
            </span>
            <a
              href="#wholesale"
              onClick={(e) => {
                e.preventDefault();
                const el =
                  document.getElementById("wholesale-mobile") ||
                  document.getElementById("wholesale-mobile-wrap") ||
                  document.getElementById("wholesale");
                if (el) {
                  const navHeight = 72;
                  const pos =
                    el.getBoundingClientRect().top +
                    window.pageYOffset -
                    navHeight;
                  window.scrollTo({
                    top: Math.max(0, pos),
                    behavior: "smooth",
                  });
                }
              }}
              style={{
                marginTop: uM(6),
                width: uM(140),
                height: uM(32),
                background: "#7e8458",
                color: "#ffffff",
                borderRadius: uM(6),
                fontSize: uM(10.5),
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 3px 8px rgba(126, 132, 88, 0.28)",
                cursor: "pointer",
                pointerEvents: "auto",
                touchAction: "manipulation",
              }}
            >
              ORDER NOW
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const css = `
.pg {
  --ink: #3d2a1f;
  --gold: #b8914a;
  font-family: Inter, sans-serif;
  color: var(--ink);
  background: #EFE7D6;
  overflow: hidden;
  min-height: 100svh;
  display: flex;
  align-items: center;
}
@media (max-width: 768px) {
  .pg {
    min-height: auto;
    padding: 16px 0 24px;
    display: block;
  }
}
.pg * { box-sizing: border-box; }
.stage {
  position: relative;
  width: 100%;
  user-select: none;
}

/* Desktop layout (width > 768px) */
@media (min-width: 769px) {
  .shop-desktop-only {
    display: block;
    aspect-ratio: 2576 / 1438;
    container-type: inline-size;
    overflow: hidden;
  }
  .shop-mobile-only {
    display: none !important;
  }
}

/* Mobile layout (width <= 768px) */
@media (max-width: 768px) {
  .shop-desktop-only {
    display: none !important;
  }
  .shop-mobile-only {
    display: block;
    aspect-ratio: 480 / 860;
    container-type: inline-size;
    overflow: hidden;
  }
}

.abs { position: absolute; margin: 0; }
img.abs { display: block; height: auto; }
.ttl {
  font-family: 'Inter Tight', Inter, sans-serif;
  font-weight: 600;
  fill: var(--ink);
  overflow: visible;
}
.soon, .enq {
  display: grid;
  place-items: center;
  border: 0;
  border-radius: .25em;
  color: #fff;
  font-weight: 400;
  font-family: Inter, sans-serif;
  text-decoration: none;
  transition: transform .25s, box-shadow .25s;
}
.soon { background: #665a53; cursor: not-allowed; }
.enq { background: #7e8458; cursor: pointer; }
.enq:hover { transform: translateY(-4px); box-shadow: 0 1.2cqw 2cqw #3d2a1f33; }
.szl { text-align: center; font-weight: 300; white-space: nowrap; }
.ctr { z-index: 2; }

@media(prefers-reduced-motion: reduce) {
  .pg * { animation: none !important; transition: none !important; }
}
`;
