import React, { useRef } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useReducedMotionSafe } from './hooks/useReducedMotionSafe';
import { useOneWayScrollProgress } from './hooks/useOneWayScrollProgress';
import roastImg from './assets/recipes/crispy_roast.jpg';
import kheerImg from './assets/recipes/makhana_kheer.jpg';
import masalaImg from './assets/recipes/masala_crunch.jpg';

/* Desktop Canvas: 1024 x 572 */
const uD = (n) => `${((n / 1024) * 100).toFixed(4)}cqw`;
const boxD = (x, y, w, h) => ({
  position: 'absolute',
  left: uD(x),
  top: uD(y),
  ...(w != null && { width: uD(w) }),
  ...(h != null && { height: uD(h) }),
});

/* Mobile Canvas: 480 x 780 */
const uM = (n) => `${((n / 480) * 100).toFixed(4)}cqw`;
const boxM = (x, y, w, h) => ({
  position: 'absolute',
  left: uM(x),
  top: uM(y),
  ...(w != null && { width: uM(w) }),
  ...(h != null && { height: uM(h) }),
});

const FONT_SERIF = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const FONT_SANS = "'Plus Jakarta Sans', Inter, -apple-system, BlinkMacSystemFont, sans-serif";

const RECIPES = [
  {
    tag: 'Quick Healthy Snack',
    title: 'Ghee-Roasted Golden Crunch',
    time: '5 Mins',
    desc: 'Lightly roasted in pure desi cow ghee with rock salt and freshly ground pepper for maximum crunch.',
    img: roastImg,
    steps: 'Dry roast on low heat for 4-5 mins • Toss with 1 tsp ghee & pinch of Himalayan salt • Enjoy warm!',
  },
  {
    tag: 'Royal Dessert',
    title: 'Festive Makhana Kheer',
    time: '15 Mins',
    desc: 'Slow-simmered in cardamom-infused milk with roasted nuts and natural saffron for rich creamy bliss.',
    img: kheerImg,
    steps: 'Coarsely crush roasted foxnuts • Boil with milk & crushed cardamom • Sweeten with jaggery or dates.',
  },
  {
    tag: 'Spicy Party Bowl',
    title: 'Tangy Masala Chaat',
    time: '8 Mins',
    desc: 'Tossed with crunchy peanuts, diced tomatoes, green coriander chutney, and zesty chaat masala.',
    img: masalaImg,
    steps: 'Combine crispy makhana with fresh diced veggies • Drizzle lemon & roasted cumin • Toss and serve fresh.',
  },
];

export default function RecipesSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotionSafe();

  // Scroll tracking across Recipes Section (250vh sticky track) - One-way progress (no reverse animation)
  const scrollYProgress = useOneWayScrollProgress(sectionRef, {
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    restDelta: 0.001,
  });

  // User requirement:
  // "when I Scroll down then it will goes to recipe page until hide all three recipes
  // when I'm more scrolling than the first recipe will be came with the pop up when I'm scrolling more than a second and then I'm scrolling again then 3rd"
  // [0.0 -> 0.15]: Initially all 3 recipes are hidden while header is established
  // [0.15 -> 0.40]: First recipe pops up into view with spring effect
  // [0.42 -> 0.65]: Second recipe pops up into view
  // [0.68 -> 0.90]: Third recipe pops up into view
  const recipe1Scale = useTransform(smoothProgress, [0.12, 0.35], [0, 1]);
  const recipe1Opacity = useTransform(smoothProgress, [0.12, 0.30], [0, 1]);
  const recipe1Y = useTransform(smoothProgress, [0.12, 0.35], [40, 0]);

  const recipe2Scale = useTransform(smoothProgress, [0.38, 0.60], [0, 1]);
  const recipe2Opacity = useTransform(smoothProgress, [0.38, 0.55], [0, 1]);
  const recipe2Y = useTransform(smoothProgress, [0.38, 0.60], [40, 0]);

  const recipe3Scale = useTransform(smoothProgress, [0.63, 0.85], [0, 1]);
  const recipe3Opacity = useTransform(smoothProgress, [0.63, 0.80], [0, 1]);
  const recipe3Y = useTransform(smoothProgress, [0.63, 0.85], [40, 0]);

  const recipeTransforms = [
    { scale: recipe1Scale, opacity: recipe1Opacity, y: recipe1Y },
    { scale: recipe2Scale, opacity: recipe2Opacity, y: recipe2Y },
    { scale: recipe3Scale, opacity: recipe3Opacity, y: recipe3Y },
  ];

  return (
    <div className="rc-wrap" id="recipes" ref={sectionRef}>
      <style>{CSS}</style>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP VIEW: Sticky Pinning with Scroll-by-Scroll Pop-Up
      ══════════════════════════════════════════════════════════════════ */}
      <div className="rc-sticky-container">
        <section className="rc-stage rc-desktop-only" aria-label="How to Consume & Recipes">
          {/* Header */}
          <motion.div
            style={{ position: 'absolute', left: uD(54), top: uD(36), zIndex: 2 }}
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span style={{ fontSize: uD(11.5), fontWeight: 700, letterSpacing: '.12em', color: '#8C6E41', textTransform: 'uppercase' }}>
              CULINARY INSPIRATIONS &amp; USE CASES
            </span>
            <h2
              style={{
                fontFamily: FONT_SERIF,
                fontSize: uD(34),
                fontWeight: 700,
                color: '#2B2019',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                lineHeight: 1.15,
                margin: `${uD(4)} 0 0`,
              }}
            >
              HOW TO ENJOY YOUR MAKHANA
            </h2>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: uD(13),
                color: '#5C4A30',
                margin: `${uD(6)} 0 0`,
                maxWidth: uD(600),
                lineHeight: 1.45,
              }}
            >
              From wholesome daily weight-loss snacking to festive Indian delicacies, explore authentic ways to prepare and serve.
            </p>
          </motion.div>

          {/* 3 Recipe / Use Case Cards: Each pops up on subsequent scroll */}
          <div style={{ position: 'absolute', left: uD(54), right: uD(54), top: uD(148), display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: uD(24), zIndex: 3 }}>
            {RECIPES.map((r, idx) => {
              const trans = recipeTransforms[idx];
              return (
                <motion.div
                  key={r.title}
                  style={{
                    background: 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: uD(16),
                    border: '1.2px solid rgba(215, 200, 175, 0.45)',
                    overflow: 'hidden',
                    boxShadow: '0 12px 28px rgba(60,40,20,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    scale: reducedMotion ? 1 : trans.scale,
                    opacity: reducedMotion ? 1 : trans.opacity,
                    y: reducedMotion ? 0 : trans.y,
                    transformOrigin: 'center center',
                  }}
                  whileHover={
                    reducedMotion
                      ? {}
                      : { y: -8, scale: 1.03, boxShadow: '0 20px 40px rgba(60,40,20,0.15)', transition: { duration: 0.25 } }
                  }
                >
                  {/* Recipe Real Photo */}
                  <div style={{ position: 'relative', width: '100%', height: uD(160), overflow: 'hidden' }}>
                    <img
                      src={r.img}
                      alt={r.title}
                      draggable={false}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: uD(12),
                        left: uD(12),
                        background: 'rgba(37, 28, 22, 0.78)',
                        backdropFilter: 'blur(6px)',
                        color: '#fff',
                        fontSize: uD(10),
                        fontWeight: 600,
                        padding: `${uD(3)} ${uD(10)}`,
                        borderRadius: '999px',
                        letterSpacing: '.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {r.tag}
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: uD(10),
                        right: uD(12),
                        background: '#8C6E41',
                        color: '#fff',
                        fontSize: uD(10),
                        fontWeight: 700,
                        padding: `${uD(2)} ${uD(8)}`,
                        borderRadius: uD(4),
                      }}
                    >
                      ⏱️ {r.time}
                    </span>
                  </div>

                  {/* Recipe Text Details */}
                  <div style={{ padding: `${uD(14)} ${uD(16)}`, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: FONT_SERIF,
                          fontSize: uD(19),
                          fontWeight: 700,
                          color: '#2B2019',
                          margin: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        {r.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: uD(11.5),
                          color: '#5C4A30',
                          margin: `${uD(6)} 0 0`,
                          lineHeight: 1.45,
                        }}
                      >
                        {r.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: uD(12),
                        padding: `${uD(8)} ${uD(10)}`,
                        background: '#F5EFE4',
                        borderRadius: uD(8),
                        fontSize: uD(10.5),
                        color: '#423326',
                        lineHeight: 1.4,
                        borderLeft: `${uD(3)} solid #8C6E41`,
                      }}
                    >
                      <strong>Preparation:</strong> {r.steps}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE VIEW: 480 x 780
      ══════════════════════════════════════════════════════════════════ */}
      <section id="recipes-mobile" className="rc-stage rc-mobile-only" aria-label="How to Consume & Recipes">
        <motion.div
          style={{ position: 'absolute', left: uM(18), top: uM(14), right: uM(18), zIndex: 2 }}
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <span style={{ fontSize: uM(9.5), fontWeight: 700, letterSpacing: '.12em', color: '#8C6E41', textTransform: 'uppercase' }}>
            CULINARY INSPIRATIONS &amp; USE CASES
          </span>
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: uM(22),
              fontWeight: 700,
              color: '#2B2019',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              lineHeight: 1.15,
              margin: `${uM(2)} 0 0`,
            }}
          >
            HOW TO ENJOY YOUR MAKHANA
          </h2>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: uM(11),
              color: '#5C4A30',
              margin: `${uM(4)} 0 0`,
              lineHeight: 1.4,
            }}
          >
            Explore healthy, authentic culinary ways to prepare and serve Makhana every day.
          </p>
        </motion.div>

        {/* Mobile Stacked Recipe Cards */}
        <div
          style={{
            position: 'absolute',
            left: uM(18),
            right: uM(18),
            top: uM(90),
            display: 'flex',
            flexDirection: 'column',
            gap: uM(14),
            zIndex: 3,
          }}
        >
          {RECIPES.map((r, idx) => (
            <motion.div
              key={r.title}
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                borderRadius: uM(14),
                border: '1.2px solid rgba(215, 200, 175, 0.5)',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(60,40,20,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: uM(12),
                padding: uM(10),
              }}
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div style={{ position: 'relative', width: uM(100), height: uM(100), flexShrink: 0, borderRadius: uM(10), overflow: 'hidden' }}>
                <img
                  src={r.img}
                  alt={r.title}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: uM(2) }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: uM(8.5), fontWeight: 700, color: '#8C6E41', textTransform: 'uppercase' }}>
                    {r.tag}
                  </span>
                  <span style={{ fontSize: uM(8.5), fontWeight: 600, color: '#5C4A30' }}>
                    ⏱️ {r.time}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: uM(15),
                    fontWeight: 700,
                    color: '#2B2019',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {r.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: uM(9.5),
                    color: '#5C4A30',
                    margin: 0,
                    lineHeight: 1.35,
                  }}
                >
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

const CSS = `
.rc-wrap {
  width: 100%;
  background: #EFE7D6;
  position: relative;
}
@media (min-width: 769px) {
  .rc-wrap {
    height: 250vh;
  }
  .rc-sticky-container {
    position: sticky;
    top: 72px;
    height: calc(100vh - 72px);
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
.rc-stage {
  position: relative;
  width: 100%;
  user-select: none;
}

@media (min-width: 769px) {
  .rc-desktop-only {
    display: block;
    aspect-ratio: 1024 / 572;
    container-type: inline-size;
    overflow: hidden;
  }
  .rc-mobile-only {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .rc-desktop-only {
    display: none !important;
  }
  .rc-mobile-only {
    display: block;
    aspect-ratio: 480 / 530;
    container-type: inline-size;
    overflow: hidden;
    padding: 12px 0 24px;
  }
}
`;

