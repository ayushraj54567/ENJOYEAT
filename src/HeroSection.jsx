import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "./hooks/useReducedMotionSafe";
import pouchPeriPeri from "./assets/hero/pouchRawMakhana.png";
import jarPeriPeri from "./assets/hero/jarPeriPeri.png";
import jarTangyTomato from "./assets/hero/jarTangyTomato.png";
import el_bigL from "./assets/hero/el_bigL.png";
import el_bigR from "./assets/hero/el_bigR.png";
import el_m1 from "./assets/hero/el_m1.png";
import el_m2 from "./assets/hero/el_m2.png";
import el_m3 from "./assets/hero/el_m3.png";
import el_m4 from "./assets/hero/el_m4.png";
import el_m5 from "./assets/hero/el_m5.png";
import el_m6 from "./assets/hero/el_m6.png";
import el_m7 from "./assets/hero/el_m7.png";
import el_m8 from "./assets/hero/el_m8.png";
import el_m9 from "./assets/hero/el_m9.png";
import el_basil from "./assets/hero/el_basil.png";
import el_sage from "./assets/hero/el_sage.png";
import el_leafR from "./assets/hero/el_leafR.png";
import el_map from "./assets/hero/el_map.png";
import el_bowl from "./assets/hero/el_bowl.png";
import el_m11 from "./assets/hero/el_m11.png";
import el_m10 from "./assets/hero/el_m10.png";

/* ── Desktop Canvas: 1024 x 559 ── */
const uD = (n) => `${((n / 1024) * 100).toFixed(4)}cqw`;
const boxD = (x, y, w, h) => ({
  position: "absolute",
  left: uD(x),
  top: uD(y),
  ...(w != null && { width: uD(w) }),
  ...(h != null && { height: uD(h) }),
});

/* ── Mobile Canvas: 480 x 640 Vertical Layout ── */
const uM = (n) => `${((n / 480) * 100).toFixed(4)}cqw`;
const boxM = (x, y, w, h) => ({
  position: "absolute",
  left: uM(x),
  top: uM(y),
  ...(w != null && { width: uM(w) }),
  ...(h != null && { height: uM(h) }),
});

const CSS = `
.ee-wrap {
  width: 100%;
  background: #EFE7D6;
  overflow: hidden;
  padding-top: 72px;
  min-height: auto;
  display: flex;
  align-items: center;
}
@media (max-width: 768px) {
  .ee-wrap {
    min-height: auto;
    padding-top: 60px;
    padding-bottom: 10px;
    display: block;
  }
}
.ee-stage {
  position: relative;
  width: 100%;
  background: #EFE7D6;
  font-family: 'Inter', system-ui, sans-serif;
  color: #2b2019;
  user-select: none;
}
.ee-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
.ee-script { font-family: 'Great Vibes', cursive; }
.ee-link { position: absolute; white-space: nowrap; cursor: pointer; transition: color .2s; text-decoration: none; color: inherit; }
.ee-link:hover { color: #4f6b52; }
.ee-btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4f6b52;
  color: #fff;
  cursor: pointer;
  transition: background .2s, transform .2s;
  border: 0;
  font-family: inherit;
  text-decoration: none;
}
.ee-btn:hover { background: #42594a; transform: translateY(-1px); }

/* Desktop vs Mobile stages */
@media (min-width: 769px) {
  .ee-desktop-only {
    display: block;
    aspect-ratio: 1024 / 560;
    container-type: inline-size;
    overflow: hidden;
  }
  .ee-mobile-only {
    display: none !important;
  }
}
@media (max-width: 768px) {
  .ee-desktop-only {
    display: none !important;
  }
  .ee-mobile-only {
    display: block;
    aspect-ratio: 480 / 530;
    container-type: inline-size;
    overflow: hidden;
  }
}

/* Seamless packaging video blend mask:
   Keeps 100% full opacity and maximum ultra-HD sharpness on the product jars in the center,
   while smoothly dissolving the bottom baseline (with organic shadow) and outer perimeter edges into #EFE7D6. */
.ee-packages-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: contrast(1.02) saturate(1.02);
  image-rendering: -webkit-optimize-contrast;
  -webkit-mask-image: radial-gradient(ellipse 90% 78% at 50% 46%, black 50%, rgba(0,0,0,0.85) 68%, transparent 94%);
  mask-image: radial-gradient(ellipse 90% 78% at 50% 46%, black 50%, rgba(0,0,0,0.85) 68%, transparent 94%);
}

/* Continuous scrolling ticker animation */
@keyframes marqueeScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.ee-ticker-track {
  display: flex;
  width: max-content;
  animation: marqueeScroll 28s linear infinite;
}
.ee-ticker-track:hover {
  animation-play-state: paused;
}
`;

const DECO = {
  bigL: { img: el_bigL, x: 6.67, y: 151.67, w: 95.67, h: 105 },
  bigR: { img: el_bigR, x: 919, y: 143, w: 94.33, h: 91.33 },
  m1: { img: el_m1, x: 175, y: 236, w: 30, h: 34.67 },
  m2: { img: el_m2, x: 242.33, y: 277.67, w: 38.33, h: 40.33 },
  m3: { img: el_m3, x: 185.67, y: 315, w: 34.33, h: 31.33 },
  m4: { img: el_m4, x: 289.67, y: 427, w: 54, h: 40 },
  m5: { img: el_m5, x: 768.33, y: 249.67, w: 23.67, h: 24 },
  m6: { img: el_m6, x: 752.67, y: 301, w: 32.33, h: 32.33 },
  m7: { img: el_m7, x: 796.67, y: 320.67, w: 28, h: 25.33 },
  m8: { img: el_m8, x: 671.33, y: 391.33, w: 31, h: 30 },
  m9: { img: el_m9, x: 716, y: 369.67, w: 24.67, h: 24.67 },
  basil: { img: el_basil, x: 97.33, y: 360.67, w: 52.67, h: 51.33 },
  sage: { img: el_sage, x: 172.67, y: 424.33, w: 52, h: 35.67 },
  leafR: { img: el_leafR, x: 866, y: 275, w: 53, h: 55 },
  map: { img: el_map, x: 241.67, y: 352, w: 59.33, h: 44.33 },
  m10: { img: el_m10, x: 690.67, y: 456.33, w: 39.67, h: 30.33 },
  m11: { img: el_m11, x: 742, y: 458, w: 28, h: 28 },
  bowl: { img: el_bowl, x: 724, y: 366, w: 160, h: 121 },
};

const FLOATERS = {
  bigL: [0, 9],
  bigR: [1.2, 8],
  m1: [0.4, 6],
  m2: [1.1, 6],
  m3: [0.7, 5],
  m4: [1.6, 7],
  m5: [0.3, 5],
  m6: [1.3, 6],
  m7: [0.9, 5],
  m8: [1.9, 6],
  m9: [1.4, 5],
  m10: [0.8, 6],
  basil: [0.6, 7],
  sage: [1.2, 7],
  leafR: [0.2, 7],
};

function DecoD({ id, style = {} }) {
  const item = DECO[id];
  const floater = FLOATERS[id];

  if (floater) {
    return (
      <motion.img
        src={item.img}
        alt=""
        draggable={false}
        style={{ ...boxD(item.x, item.y, item.w, item.h), ...style }}
        animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floater[0],
        }}
      />
    );
  }

  return (
    <img
      src={item.img}
      alt=""
      draggable={false}
      style={{ ...boxD(item.x, item.y, item.w, item.h), ...style }}
    />
  );
}

const TICKER_ITEMS = [
  "Zero chemicals",
  "100% Organic",
  "Crunchy",
  "No Black Shell",
  "Hygienically Packed",
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const videoDesktopRef = useRef(null);
  const videoMobileRef = useRef(null);
  const [shiftIndex, setShiftIndex] = useState(0);
  const reducedMotion = useReducedMotionSafe();

  /* Continuous non-stop video playback watchdog */
  useEffect(() => {
    const playVideos = () => {
      [videoDesktopRef.current, videoMobileRef.current].forEach((vid) => {
        if (vid) {
          vid.muted = true;
          vid.playsInline = true;
          if (vid.paused) {
            vid.play().catch(() => {});
          }
        }
      });
    };

    playVideos();
    const timer = setInterval(playVideos, 2000);
    return () => clearInterval(timer);
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  return (
    <div className="ee-wrap" id="hero" ref={sectionRef}>
      <style>{CSS}</style>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP VIEW (width >= 769px): 1024 x 559 Wide Canvas
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="ee-stage ee-desktop-only"
        aria-label="Enjoyeat Makhana hero"
      >
        {/* Parallax Background Deco */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "auto",
          }}
        >
          {Object.keys(DECO)
            .filter(
              (id) =>
                id !== "bigL" && id !== "bowl" && id !== "m11" && id !== "map",
            )
            .map((id) => (
              <DecoD key={id} id={id} />
            ))}
        </div>

        {/* Radial ground shadows under pouches */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {[
            [313, 128],
            [446, 134],
            [590, 125],
          ].map(([x, w]) => (
            <div
              key={x}
              style={{
                ...boxD(x, 458, w, 14),
                background:
                  "radial-gradient(ellipse, rgba(70,55,30,.28), transparent 70%)",
              }}
            />
          ))}
        </div>

        {/* ── Center Packaging Video: Directly replacing the packages centerpiece ── */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: uD(235),
            transform: "translateX(-50%)",
            width: uD(1300),
            height: uD(285),
            zIndex: 25,
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Deep organic ground contact shadow beneath the jars */}
          <div
            style={{
              position: "absolute",
              bottom: uD(10),
              width: "74%",
              height: uD(28),
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(55,40,25,.36) 0%, rgba(65,48,30,.22) 45%, transparent 75%)",
              zIndex: 1,
              pointerEvents: "none",
              filter: "blur(4px)",
            }}
          />

          <video
            ref={videoDesktopRef}
            src="/packages-hero.mp4"
            className="ee-packages-video"
            autoPlay
            loop
            muted
            playsInline
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play().catch(() => {});
            }}
            style={{
              zIndex: 2,
            }}
          />
        </div>

        {/* Headings & CTA Buttons */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 60,
            pointerEvents: "auto",
          }}
        >
          <h1
            className="ee-serif"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: uD(84),
              margin: 0,
              textAlign: "center",
              fontSize: uD(37),
              fontWeight: 600,
              letterSpacing: ".012em",
              lineHeight: 1.15,
            }}
          >
            HEALTHY SNACKING, HAPPIER LIVING
          </h1>
          <div
            className="ee-script"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: uD(121),
              textAlign: "center",
              fontSize: uD(41),
              lineHeight: 1.2,
            }}
          >
            from the Ponds of Bihar to the World
          </div>
          <p
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: uD(171),
              margin: 0,
              textAlign: "center",
              fontSize: uD(10.9),
            }}
          >
            Experience the pure goodness of authentic premium Makhana (Foxnut),
            sourced fresh from Mithila and crafted for mindful everyday
            snacking.
          </p>

          <a
            href="#shop"
            className="ee-btn"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("shop");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              ...boxD(343, 203, 196, 35),
              borderRadius: uD(4),
              fontSize: uD(11.8),
              fontWeight: 500,
              letterSpacing: ".05em",
              zIndex: 50,
            }}
          >
            EXPLORE OUR PRODUCTS
          </a>
          <a
            href="#our-story"
            className="ee-link"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("our-story");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              left: uD(551),
              top: uD(212),
              fontSize: uD(13.2),
              zIndex: 50,
            }}
          >
            Discover Our Story →
          </a>
        </div>

        {/* ── Continuous Horizontal Flowing Advertisement / Highlights Ticker (Desktop) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: uD(38),
            background: "#FBF7EF",
            borderTop: "1px solid rgba(198, 178, 150, 0.45)",
            borderBottom: "1px solid rgba(198, 178, 150, 0.35)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            zIndex: 65,
            boxShadow: "0 -2px 10px rgba(50, 35, 20, 0.04)",
          }}
        >
          <div className="ee-ticker-track">
            {[
              ...TICKER_ITEMS,
              ...TICKER_ITEMS,
              ...TICKER_ITEMS,
              ...TICKER_ITEMS,
            ].map((item, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: uD(11.2),
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "#2C3E2D",
                  fontFamily:
                    "'Plus Jakarta Sans', Inter, system-ui, sans-serif",
                  whiteSpace: "nowrap",
                  padding: `0 ${uD(28)}`,
                  textTransform: "uppercase",
                }}
              >
                {item}
                <span
                  style={{
                    display: "inline-block",
                    width: uD(5.5),
                    height: uD(5.5),
                    borderRadius: "50%",
                    background: "#A48B69",
                    marginLeft: uD(28),
                    opacity: 0.85,
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE VIEW (width <= 768px): 480 x 640 Responsive Vertical Stage
          - Headings & CTAs on top with crisp, readable typography
          - Prominent 3D Pouches centerpiece below with bowl & floaters
          - Clean vertical composition eliminating horizontal squishing!
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="hero-mobile"
        className="ee-stage ee-mobile-only"
        aria-label="Enjoyeat Makhana hero"
      >
        {/* Floating herbs/makhana background */}
        <img
          src={el_bigL}
          alt=""
          aria-hidden
          style={{
            ...boxM(10, 140, 52, 58),
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />
        <img
          src={el_bigR}
          alt=""
          aria-hidden
          style={{
            ...boxM(420, 130, 50, 48),
            pointerEvents: "none",
            opacity: 0.6,
          }}
        />
        <img
          src={el_m1}
          alt=""
          aria-hidden
          style={{ ...boxM(35, 230, 22, 26), pointerEvents: "none" }}
        />
        <img
          src={el_m4}
          alt=""
          aria-hidden
          style={{ ...boxM(425, 250, 26, 20), pointerEvents: "none" }}
        />
        <img
          src={el_basil}
          alt=""
          aria-hidden
          style={{
            ...boxM(15, 410, 32, 32),
            pointerEvents: "none",
            opacity: 0.7,
          }}
        />
        <img
          src={el_leafR}
          alt=""
          aria-hidden
          style={{
            ...boxM(430, 390, 34, 36),
            pointerEvents: "none",
            opacity: 0.7,
          }}
        />

        {/* Mobile Header Block */}
        <motion.div
          style={{
            position: "absolute",
            left: uM(16),
            right: uM(16),
            top: uM(14),
            zIndex: 30,
            textAlign: "center",
          }}
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="ee-serif"
            style={{
              fontSize: uM(23),
              fontWeight: 700,
              letterSpacing: ".012em",
              lineHeight: 1.15,
              margin: 0,
              color: "#2b2019",
            }}
          >
            HEALTHY SNACKING, HAPPIER LIVING
          </h1>
          <div
            className="ee-script"
            style={{
              fontSize: uM(27),
              lineHeight: 1.2,
              marginTop: uM(3),
              color: "#3d2a1f",
            }}
          >
            from the Ponds of Bihar to the World
          </div>
          <p
            style={{
              fontSize: uM(11),
              color: "#55483D",
              margin: `${uM(6)} auto 0`,
              maxWidth: uM(420),
              lineHeight: 1.4,
            }}
          >
            Experience the pure goodness of authentic premium Makhana (Foxnut),
            sourced fresh from Mithila and crafted for mindful everyday
            snacking.
          </p>

          {/* CTA Buttons in a clean touch-friendly row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: uM(14),
              marginTop: uM(12),
              position: "relative",
              zIndex: 100,
            }}
          >
            <a
              href="#shop"
              className="ee-btn"
              onClick={(e) => {
                e.preventDefault();
                const el =
                  document.getElementById("shop-mobile") ||
                  document.getElementById("shop-mobile-wrap") ||
                  document.getElementById("shop");
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
                position: "relative",
                padding: `${uM(8)} ${uM(18)}`,
                borderRadius: uM(6),
                fontSize: uM(11),
                fontWeight: 600,
                letterSpacing: ".04em",
                pointerEvents: "auto",
                touchAction: "manipulation",
                cursor: "pointer",
              }}
            >
              EXPLORE OUR PRODUCTS
            </a>
            <a
              href="#our-story"
              className="ee-link"
              onClick={(e) => {
                e.preventDefault();
                const el =
                  document.getElementById("our-story-mobile") ||
                  document.getElementById("story-mobile-wrap") ||
                  document.getElementById("our-story");
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
                position: "relative",
                fontSize: uM(12),
                fontWeight: 600,
                pointerEvents: "auto",
                touchAction: "manipulation",
                cursor: "pointer",
              }}
            >
              Discover Our Story →
            </a>
          </div>
        </motion.div>

        {/* ── Mobile Packaging Video Centerpiece: Directly replacing the packages ── */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: uM(215),
            transform: "translateX(-50%)",
            width: uM(1100),
            height: uM(275),
            zIndex: 25,
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Deep organic ground contact shadow beneath the jars */}
          <div
            style={{
              position: "absolute",
              bottom: uM(6),
              width: "74%",
              height: uM(22),
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(55,40,25,.34) 0%, rgba(65,48,30,.20) 45%, transparent 75%)",
              zIndex: 1,
              pointerEvents: "none",
              filter: "blur(3px)",
            }}
          />

          <video
            ref={videoMobileRef}
            src="/packages-hero.mp4"
            className="ee-packages-video"
            autoPlay
            loop
            muted
            playsInline
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play().catch(() => {});
            }}
            style={{
              zIndex: 2,
            }}
          />
        </div>

        {/* ── Continuous Horizontal Flowing Advertisement / Highlights Ticker (Mobile) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: uM(32),
            background: "#FBF7EF",
            borderTop: "1px solid rgba(198, 178, 150, 0.45)",
            borderBottom: "1px solid rgba(198, 178, 150, 0.35)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            zIndex: 65,
            boxShadow: "0 -2px 8px rgba(50, 35, 20, 0.04)",
          }}
        >
          <div className="ee-ticker-track">
            {[
              ...TICKER_ITEMS,
              ...TICKER_ITEMS,
              ...TICKER_ITEMS,
              ...TICKER_ITEMS,
            ].map((item, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: uM(10),
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "#2C3E2D",
                  fontFamily:
                    "'Plus Jakarta Sans', Inter, system-ui, sans-serif",
                  whiteSpace: "nowrap",
                  padding: `0 ${uM(18)}`,
                  textTransform: "uppercase",
                }}
              >
                {item}
                <span
                  style={{
                    display: "inline-block",
                    width: uM(4.5),
                    height: uM(4.5),
                    borderRadius: "50%",
                    background: "#A48B69",
                    marginLeft: uM(18),
                    opacity: 0.85,
                  }}
                />
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
