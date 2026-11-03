import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "./hooks/useReducedMotionSafe";
import book from "./story_book.jpg";
import pond from "./assets/story_real_harvest.jpeg";
import prep from "./assets/real_hand_roast.jpg";
import direct from "./assets/real_packaging_direct.jpg";
import m5 from "./story_m5.png";
import m6 from "./story_m6.png";
import sage from "./story_sage.png";
import plant from "./story_plant.png";
import leafTop from "./story_leafTop.png";

/* ── Desktop Canvas: 1024 x 572 ── */
const uD = (n) => `${((n / 1024) * 100).toFixed(4)}cqw`;
const boxD = (x, y, w, h) => ({
  position: "absolute",
  left: uD(x),
  top: uD(y),
  ...(w != null && { width: uD(w) }),
  ...(h != null && { height: uD(h) }),
});

/* ── Mobile Canvas: 480 x 780 Vertical Stage ── */
const uM = (n) => `${((n / 480) * 100).toFixed(4)}cqw`;
const boxM = (x, y, w, h) => ({
  position: "absolute",
  left: uM(x),
  top: uM(y),
  ...(w != null && { width: uM(w) }),
  ...(h != null && { height: uM(h) }),
});

const CSS = `
.es-wrap {
  width: 100%;
  background: #EFE7D6;
  position: relative;
}
@media (min-width: 769px) {
  .es-wrap {
    height: 150vh;
  }
  .es-sticky-container {
    position: sticky;
    top: 72px;
    height: calc(100vh - 72px);
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
@media (max-width: 768px) {
  .es-wrap {
    min-height: auto;
    padding: 16px 0 24px;
    display: block;
  }
}
.es-stage {
  position: relative;
  width: 100%;
  background: #EFE7D6;
  font-family: 'Inter', system-ui, sans-serif;
  color: #3b2c20;
  user-select: none;
}
.es-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
.es-book {
  position: absolute;
  max-width: none;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 10%), linear-gradient(to bottom, transparent 0, #000 10%, #000 90%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(to right, transparent 0, #000 10%), linear-gradient(to bottom, transparent 0, #000 10%, #000 90%, transparent 100%);
}
.es-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: contrast(1.02) saturate(1.05);
}

@media (min-width: 769px) {
  .es-desktop-only {
    display: block;
    aspect-ratio: 1024 / 572;
    container-type: inline-size;
    overflow: hidden;
  }
  .es-mobile-only {
    display: none !important;
  }
}
@media (max-width: 768px) {
  .es-desktop-only {
    display: none !important;
  }
  .es-mobile-only {
    display: block;
    aspect-ratio: 480 / 780;
    container-type: inline-size;
    overflow: hidden;
  }
}
`;

const CARDS = [
  {
    step: "1. ETHICAL HARVESTING",
    label: "ETHICAL HARVESTING",
    img: pond,
    title: ["Sourced from pristine", "wetlands of Mithila."],
    text: "Sustainably handpicked by skilled local harvesters.",
    x: 64,
  },
  {
    step: "2. ARTISAN ROASTING",
    label: "ARTISAN ROASTING",
    img: prep,
    title: ["Evenly slow-roasted for", "the ultimate crispness."],
    text: "Locked-in dietary fibre, calcium, and plant protein.",
    x: 215,
  },
  {
    step: "3. DIRECT FROM SOURCE",
    label: "DIRECT FROM SOURCE",
    img: direct,
    title: ["Freshly sealed & shipped", "straight to your doorstep."],
    text: "Guaranteed 100% natural, whole foxnut crunch.",
    x: 366,
  },
];

const W = 135;

export default function EnjoyeatStory() {
  const [active, setActive] = useState(1);
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotionSafe();

  // Scroll tracking across Page 2 (Our Story)
  // Reversible scroll progress: expands to cover page on scroll down, returns to original place when scrolling up!
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // User requirement:
  // "the book will properly cover the whole page when I was scrolling down and when I was scrolling to the upside the book was stuck in the middle So fix that properly like when I am scrolling to the upside and go back to the first page the book will be at the same place at the beginning"
  // [0.0]: Starts on the right side at natural scale (1.0), 0cqw
  // [0.0 -> 0.45]: Glides into the center (-26cqw) and expands to scale 2.25 so it completely covers the viewport!
  // [0.45 -> 1.0]: Stays locked in the center covering the stage
  // When user scrolls back up towards Page 1: Reverses smoothly back to 0cqw and scale 1.0 at the beginning!
  const bookX = useTransform(
    smoothProgress,
    [0, 0.45, 1.0],
    ["0cqw", "-26cqw", "-26cqw"],
  );
  const bookY = useTransform(
    smoothProgress,
    [0, 0.45, 1.0],
    ["0cqw", "4cqw", "4cqw"],
  );
  const bookScale = useTransform(
    smoothProgress,
    [0, 0.45, 1.0],
    [1, 2.25, 2.25],
  );
  const bookRotate = useTransform(smoothProgress, [0, 0.45, 1.0], [-2, 0, 0]);
  const bookZIndex = useTransform(smoothProgress, [0, 0.15, 1.0], [10, 30, 30]);

  return (
    <div className="es-wrap" id="our-story" ref={sectionRef}>
      <style>{CSS}</style>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP VIEW (width >= 769px): Sticky Pinning for Immersive Scroll
      ══════════════════════════════════════════════════════════════════ */}
      <div className="es-sticky-container">
        <section className="es-stage es-desktop-only" aria-label="Our story">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(112deg,rgba(255,255,255,.55) 0%,rgba(255,255,255,0) 38%)",
              pointerEvents: "none",
            }}
          />

          {/* Decorative Items */}
          <motion.img
            src={leafTop}
            alt=""
            draggable={false}
            style={{ ...boxD(696, 86, 42, 23), pointerEvents: "none" }}
            initial={{ scale: reducedMotion ? 1 : 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.img
            src={plant}
            alt=""
            draggable={false}
            style={{
              ...boxD(730, 388, 367, 261),
              pointerEvents: "none",
              filter: "blur(.15cqw)",
            }}
            initial={{ scale: reducedMotion ? 1 : 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          />

          <motion.img
            src={m6}
            alt=""
            draggable={false}
            style={boxD(14, 332, 24, 24)}
            animate={reducedMotion ? { opacity: 1 } : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={m5}
            alt=""
            draggable={false}
            style={boxD(398, 508, 18, 18)}
            animate={reducedMotion ? { opacity: 1 } : { y: [0, -6, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
          <motion.img
            src={sage}
            alt=""
            draggable={false}
            style={{ ...boxD(10, 456, 52, 40), transform: "rotate(25deg)" }}
            animate={reducedMotion ? { opacity: 1 } : { y: [0, -6, 0] }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />

          {/* Desktop Headings */}
          <motion.h1
            className="es-serif"
            initial={{ y: reducedMotion ? 0 : 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: "absolute",
              left: uD(64),
              top: uD(102),
              margin: 0,
              fontSize: uD(45),
              fontWeight: 600,
              letterSpacing: ".005em",
              lineHeight: 1.1,
              color: "#2b2019",
            }}
          >
            OUR ROOTS IN BIHAR
          </motion.h1>

          <motion.p
            initial={{ y: reducedMotion ? 0 : 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: "absolute",
              left: uD(64),
              top: uD(158),
              margin: 0,
              width: uD(520),
              fontSize: uD(15.2),
              lineHeight: uD(21),
            }}
          >
            Bringing you the pure goodness of Makhana (Foxnut),
            <br />
            straight from the ponds of Mithila, Bihar.
          </motion.p>

          {/* Gold Connecting Border */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeInOut" }}
            style={{
              ...boxD(226, 321, 426, 0),
              borderTop: `${uD(1.2)} solid #c9a96a`,
              transformOrigin: "left",
              zIndex: 1,
            }}
          />

          {/* 3 Timeline Cards on Desktop */}
          <div
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {CARDS.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ y: reducedMotion ? 0 : 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 * i + 0.12,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                whileHover={reducedMotion ? {} : { y: -8, scale: 1.03 }}
                onMouseEnter={() => setActive(i)}
                style={{
                  ...boxD(c.x, 237, W),
                  textAlign: "center",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    fontSize: uD(10.4),
                    letterSpacing: ".08em",
                    marginBottom: uD(7),
                    fontWeight: 400,
                  }}
                >
                  {c.label}
                </div>

                <div
                  style={{
                    width: "100%",
                    height: uD(128),
                    borderRadius: ".6cqw",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#EAE1CE",
                  }}
                >
                  {c.video ? (
                    <video
                      src={c.video}
                      poster={c.img}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="es-thumb"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      className="es-thumb"
                      src={c.img}
                      alt={c.label}
                      draggable={false}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>

                <div
                  style={{
                    marginTop: uD(11),
                    fontSize: uD(12.6),
                    fontWeight: 700,
                    lineHeight: uD(17),
                    letterSpacing: ".01em",
                  }}
                >
                  {c.title.map((t) => (
                    <div key={t}>{t}</div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: uD(5),
                    fontSize: uD(11.6),
                    lineHeight: uD(16),
                    color: "#4d3d30",
                    opacity: active === i ? 1 : 0.92,
                  }}
                >
                  {c.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Scrapbook Photo: Rapidly covers page, zooms in, and shifts left on scroll */}
          <motion.div
            style={{
              ...boxD(575, 78, 670, 424),
              x: reducedMotion ? 0 : bookX,
              y: reducedMotion ? 0 : bookY,
              scale: reducedMotion ? 1 : bookScale,
              rotate: reducedMotion ? 0 : bookRotate,
              zIndex: reducedMotion ? 10 : bookZIndex,
              cursor: "pointer",
              transformOrigin: "center center",
            }}
            whileHover={reducedMotion ? {} : { scale: 1.03 }}
          >
            <img
              className="es-book"
              src={book}
              alt="Enjoyeat Story Scrapbook"
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </motion.div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE VIEW (width <= 768px): 480 x 780 Vertical Stage
          - Heading & Subtitle on top
          - Prominent Scrapbook Journal photo centered
          - 3 Process Cards stacked cleanly with crisp images & readable text!
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="es-stage es-mobile-only"
        id="our-story-mobile"
        aria-label="Our story"
      >
        {/* Mobile Header */}
        <motion.div
          style={{
            position: "absolute",
            left: uM(18),
            top: uM(12),
            right: uM(18),
            zIndex: 10,
          }}
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="es-serif"
            style={{
              fontSize: uM(23),
              fontWeight: 700,
              letterSpacing: ".01em",
              lineHeight: 1.15,
              margin: 0,
              color: "#2b2019",
            }}
          >
            OUR ROOTS IN BIHAR
          </h2>
          <p
            style={{
              fontSize: uM(11.5),
              color: "#4d3d30",
              margin: `${uM(4)} 0 0`,
              lineHeight: 1.4,
            }}
          >
            Bringing you the pure goodness of Makhana (Foxnut), straight from
            the ponds of Mithila, Bihar.
          </p>
        </motion.div>

        {/* ── Mobile Scrapbook Photo (Prominent Centerpiece) ── */}
        <motion.div
          style={{
            ...boxM(24, 82, 432, 230),
            zIndex: 5,
          }}
          initial={reducedMotion ? {} : { opacity: 0, y: 30, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 14,
            delay: 0.1,
          }}
        >
          <img
            src={book}
            alt="Enjoyeat Story Scrapbook"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mixBlendMode: "multiply",
            }}
          />
        </motion.div>

        {/* ── 3 Mobile Process Cards (Stacked Vertically for Perfect Legibility) ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {CARDS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={
                reducedMotion
                  ? {}
                  : { opacity: 0, y: 25, x: i % 2 === 0 ? -25 : 25 }
              }
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 85,
                damping: 15,
                delay: 0.15 + i * 0.12,
              }}
              style={{
                ...boxM(16, 328 + i * 144, 448, 134),
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1.2px solid rgba(255, 255, 255, 0.95)",
                borderRadius: uM(14),
                padding: uM(10),
                display: "flex",
                alignItems: "center",
                gap: uM(14),
                boxShadow: "0 8px 22px rgba(60, 40, 20, 0.06)",
                pointerEvents: "auto",
                boxSizing: "border-box",
                zIndex: 10,
              }}
            >
              {/* Thumbnail / Video Media Container */}
              <div
                style={{
                  width: uM(114),
                  height: uM(114),
                  flexShrink: 0,
                  borderRadius: uM(10),
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  position: "relative",
                  backgroundColor: "#EAE1CE",
                }}
              >
                {c.video ? (
                  <video
                    src={c.video}
                    poster={c.img}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={c.img}
                    alt={c.label}
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              {/* Text Description */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: uM(2),
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: uM(9),
                    fontWeight: 700,
                    letterSpacing: ".08em",
                    color: "#8A6D3B",
                    textTransform: "uppercase",
                  }}
                >
                  {c.step}
                </span>
                <span
                  style={{
                    fontSize: uM(12),
                    fontWeight: 700,
                    lineHeight: 1.25,
                    color: "#2B2019",
                  }}
                >
                  {c.title.join(" ")}
                </span>
                <span
                  style={{
                    fontSize: uM(10),
                    lineHeight: 1.35,
                    color: "#554236",
                    marginTop: uM(2),
                  }}
                >
                  {c.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
