import React, { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "./hooks/useReducedMotionSafe";
import wholesalePallet from "./assets/wholesale-pallet.jpg";
import elM1 from "./assets/hero/el_m1.png";
import elM2 from "./assets/hero/el_m2.png";
import elM3 from "./assets/hero/el_m3.png";

/* ── Desktop Canvas: 1024 x 572 ── */
const uD = (n) => `${((n / 1024) * 100).toFixed(4)}cqw`;
const boxD = (x, y, w, h) => ({
  position: "absolute",
  left: uD(x),
  top: uD(y),
  ...(w != null && { width: uD(w) }),
  ...(h != null && { height: uD(h) }),
});

/* ── Mobile Canvas: 480 x 680 Vertical Stage ── */
const uM = (n) => `${((n / 480) * 100).toFixed(4)}cqw`;
const boxM = (x, y, w, h) => ({
  position: "absolute",
  left: uM(x),
  top: uM(y),
  ...(w != null && { width: uM(w) }),
  ...(h != null && { height: uM(h) }),
});

const FONT_SERIF = "'Playfair Display', 'Cormorant Garamond', Georgia, serif";
const FONT_SANS =
  "'Plus Jakarta Sans', Inter, -apple-system, BlinkMacSystemFont, sans-serif";

const PILLS = [
  "• Premium Quality Sourcing",
  "• Fast & Reliable Shipping",
  "• Bulk Custom Quantities",
];

const WHATSAPP_NUMBER = "918084044728";

export default function WholesaleSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    quantity: "",
    location: "",
  });
  const reducedMotion = useReducedMotionSafe();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Bulk Enquiry from ${form.name}\nEmail/Phone: ${form.email}\nQuantity: ${form.quantity}\nLocation: ${form.location}`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <div className="ws-wrap" id="wholesale">
      <style>{CSS}</style>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP VIEW (width >= 769px): 1024 x 572 Wide Canvas
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="ws-stage ws-desktop-only"
        aria-label="Partner with us — Wholesale"
      >
        {/* Decorative elements */}
        <img
          src={elM1}
          alt=""
          aria-hidden
          style={{ ...boxD(18, 120, 26, 26), pointerEvents: "none", zIndex: 0 }}
        />
        <img
          src={elM2}
          alt=""
          aria-hidden
          style={{
            ...boxD(470, 160, 24, 24),
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <img
          src={elM3}
          alt=""
          aria-hidden
          style={{
            ...boxD(490, 480, 25, 25),
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── LEFT: Title, Subtitle, Pallet Image with Staggered Badges ── */}
        <motion.div
          style={{ position: "absolute", left: uD(54), top: uD(36), zIndex: 2 }}
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontSize: uD(38),
              fontWeight: 700,
              color: "#2A1E17",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Partner
            <br />
            With Us
          </h1>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: uD(12),
              color: "#3B3026",
              maxWidth: uD(410),
              margin: `${uD(8)} 0 0`,
              lineHeight: 1.5,
            }}
          >
            Grow your business with India's premium makhana. Fill out the form
            for bulk &amp; wholesale enquiries.
          </p>
        </motion.div>

        {/* Pallet image */}
        <motion.div
          style={{ ...boxD(54, 185, 420, 320), zIndex: 1 }}
          initial={{ opacity: 0, x: -40, y: 15, scale: 0.94 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.1,
          }}
        >
          <img
            src={wholesalePallet}
            alt="Makhana bags piled on wooden pallet"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.12))",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%)",
              maskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%)",
            }}
          />
        </motion.div>

        {/* 3 Staggered Floating Badges */}
        {PILLS.map((pill, i) => (
          <motion.div
            key={pill}
            style={{
              ...boxD(210 + i * 15, 315 + i * 48),
              background: "#7A7E59",
              color: "#FFFFFF",
              fontFamily: FONT_SANS,
              fontSize: uD(10.8),
              fontWeight: 600,
              padding: `${uD(6)} ${uD(14)}`,
              borderRadius: uD(8),
              border: "1px solid rgba(255,255,255,0.7)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
              whiteSpace: "nowrap",
              zIndex: 3,
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.15 }}
          >
            {pill}
          </motion.div>
        ))}

        {/* ── RIGHT: Bulk Enquiry Form Card ── */}
        <motion.div
          style={{
            ...boxD(530, 36, 440, 495),
            background: "#F5F0E6",
            borderRadius: uD(18),
            padding: `${uD(18)} ${uD(26)}`,
            boxShadow: "0 16px 45px rgba(0,0,0,0.08)",
            border: "1px solid #FFFFFF",
            zIndex: 2,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
          initial={{ x: 45, y: 15, opacity: 0, scale: 0.95 }}
          whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.12,
          }}
        >
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: uD(21),
              fontWeight: 700,
              color: "#2A1E17",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              margin: `0 0 ${uD(4)} 0`,
            }}
          >
            Wholesale Enquiry
          </h2>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: uD(10.8),
              color: "#5A4E44",
              margin: `0 0 ${uD(14)} 0`,
              lineHeight: 1.4,
            }}
          >
            We supply nationwide with competitive bulk pricing &amp;
            export-grade quality.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: uD(10) }}
          >
            {[
              {
                label: "Full Name",
                name: "name",
                type: "text",
                placeholder: "e.g. Rajesh Kumar",
              },
              {
                label: "Email or WhatsApp",
                name: "email",
                type: "text",
                placeholder: "e.g. rajesh@company.com",
              },
              {
                label: "Estimated Quantity",
                name: "quantity",
                type: "text",
                placeholder: "e.g. 500 kg / 2 Metric Tons",
              },
              {
                label: "Delivery Location (City, State)",
                name: "location",
                type: "text",
                placeholder: "e.g. Mumbai, Maharashtra",
              },
            ].map((f) => (
              <div
                key={f.name}
                style={{ display: "flex", flexDirection: "column", gap: uD(3) }}
              >
                <label
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: uD(9.8),
                    fontWeight: 600,
                    color: "#3B3026",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "#EFE9DC",
                    border: "1px solid #B8B0A0",
                    borderRadius: uD(6),
                    padding: `${uD(8)} ${uD(12)}`,
                    fontSize: uD(11),
                    color: "#1E1914",
                    outline: "none",
                    fontFamily: FONT_SANS,
                  }}
                />
              </div>
            ))}

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#747A55",
                color: "#FFFFFF",
                fontFamily: FONT_SANS,
                fontSize: uD(12),
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: `${uD(10)} 0`,
                borderRadius: uD(6),
                border: "none",
                cursor: "pointer",
                marginTop: uD(4),
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                transition: "background 0.2s",
              }}
            >
              SUBMIT ENQUIRY
            </button>
          </form>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE VIEW (width <= 768px): 480 x 680 Vertical Stage
          - Title & subtitle on top
          - Pallet image with badges centered
          - Bulk enquiry form card cleanly placed below with touch inputs
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="wholesale-mobile"
        className="ws-stage ws-mobile-only"
        aria-label="Partner with us — Wholesale"
      >
        {/* Mobile Header */}
        <motion.div
          style={{
            position: "absolute",
            left: uM(18),
            top: uM(14),
            right: uM(18),
            zIndex: 10,
          }}
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: uM(22),
              fontWeight: 700,
              color: "#2A1E17",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            PARTNER WITH US
          </h2>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: uM(11.5),
              color: "#3B3026",
              margin: `${uM(4)} 0 0`,
              lineHeight: 1.4,
            }}
          >
            Grow your business with India's premium makhana. Fill out the form
            for bulk &amp; wholesale enquiries.
          </p>
        </motion.div>

        {/* ── MOBILE PALLET IMAGE ── */}
        <motion.div
          style={{ ...boxM(20, 80, 440, 200), zIndex: 1 }}
          initial={reducedMotion ? {} : { opacity: 0, y: 25, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.08,
          }}
        >
          <img
            src={wholesalePallet}
            alt="Makhana bags piled on wooden pallet"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mixBlendMode: "multiply",
            }}
          />
        </motion.div>

        {/* ── MOBILE FORM CARD ── */}
        <motion.div
          style={{
            ...boxM(16, 290, 448, 360),
            background: "#F5F0E6",
            borderRadius: uM(16),
            padding: `${uM(14)} ${uM(18)}`,
            boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
            border: "1.2px solid #FFFFFF",
            zIndex: 10,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          initial={reducedMotion ? {} : { opacity: 0, y: 30, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.16,
          }}
        >
          <div
            style={{
              fontSize: uM(13),
              fontWeight: 700,
              color: "#2A1E17",
              textTransform: "uppercase",
            }}
          >
            Wholesale Enquiry Form
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: uM(6),
              flex: 1,
              justifyContent: "space-between",
              marginTop: uM(6),
            }}
          >
            {[
              {
                label: "Full Name",
                name: "name",
                type: "text",
                placeholder: "e.g. Rajesh Kumar",
              },
              {
                label: "Email or WhatsApp",
                name: "email",
                type: "text",
                placeholder: "e.g. rajesh@company.com",
              },
              {
                label: "Estimated Quantity",
                name: "quantity",
                type: "text",
                placeholder: "e.g. 500 kg / 2 Metric Tons",
              },
              {
                label: "Delivery Location (City, State)",
                name: "location",
                type: "text",
                placeholder: "e.g. Mumbai, Maharashtra",
              },
            ].map((f) => (
              <div
                key={f.name}
                style={{ display: "flex", flexDirection: "column", gap: uM(1) }}
              >
                <label
                  style={{
                    fontSize: uM(9),
                    fontWeight: 600,
                    color: "#3B3026",
                    textTransform: "uppercase",
                  }}
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  required
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background: "#EFE9DC",
                    border: "1px solid #B8B0A0",
                    borderRadius: uM(5),
                    padding: `${uM(5)} ${uM(8)}`,
                    fontSize: uM(10),
                    color: "#1E1914",
                    outline: "none",
                  }}
                />
              </div>
            ))}

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#747A55",
                color: "#FFFFFF",
                fontFamily: FONT_SANS,
                fontSize: uM(11),
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: `${uM(7)} 0`,
                borderRadius: uM(6),
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                marginTop: uM(2),
                pointerEvents: "auto",
                touchAction: "manipulation",
              }}
            >
              SUBMIT ENQUIRY →
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

const CSS = `
.ws-wrap {
  width: 100%;
  background: #EFE7D6;
  overflow: hidden;
}
.ws-stage {
  position: relative;
  width: 100%;
  user-select: none;
}

@media (min-width: 769px) {
  .ws-desktop-only {
    display: block;
    aspect-ratio: 1024 / 572;
    container-type: inline-size;
    overflow: hidden;
  }
  .ws-mobile-only {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .ws-desktop-only {
    display: none !important;
  }
  .ws-mobile-only {
    display: block;
    aspect-ratio: 480 / 680;
    container-type: inline-size;
    overflow: hidden;
    padding: 16px 0 24px;
  }
}
`;
