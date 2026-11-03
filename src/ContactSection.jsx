import React, { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "./hooks/useReducedMotionSafe";
import PolicyModal from "./components/PolicyModal";
import biharMapClean from "./assets/bihar-map-clean.jpg";
import elM1 from "./assets/hero/el_m1.png";
import elM4 from "./assets/hero/el_m4.png";
import elM7 from "./assets/hero/el_m7.png";
import elBasil from "./assets/hero/el_basil.png";
import elSage from "./assets/hero/el_sage.png";

/* ── Desktop Canvas: 1024 x 572 ── */
const uD = (n) => `${((n / 1024) * 100).toFixed(4)}cqw`;
const boxD = (x, y, w, h) => ({
  position: "absolute",
  left: uD(x),
  top: uD(y),
  ...(w != null && { width: uD(w) }),
  ...(h != null && { height: uD(h) }),
});

/* ── Mobile Canvas: 480 x 640 matching Video 3 phone viewport ── */
const uM = (n) => `${((n / 480) * 100).toFixed(4)}cqw`;
const boxM = (x, y, w, h) => ({
  position: "absolute",
  left: uM(x),
  top: uM(y),
  ...(w != null && { width: uM(w) }),
  ...(h != null && { height: uM(h) }),
});

const FONT_SERIF =
  "'Cinzel', 'Playfair Display', 'Cormorant Garamond', Georgia, serif";
const FONT_SANS =
  "'Plus Jakarta Sans', Inter, -apple-system, BlinkMacSystemFont, sans-serif";

/* ── 3D Custom Rendered Icons ── */
const CertShieldIcon = () => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    style={{
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 3px 6px rgba(70,50,25,0.25))",
    }}
  >
    <defs>
      <linearGradient id="certGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFD1B8" />
        <stop offset="50%" stopColor="#C5AD84" />
        <stop offset="100%" stopColor="#9C7E51" />
      </linearGradient>
    </defs>
    <path
      d="M22 6L9 11.5V20.5C9 28.5 14.5 35.8 22 38C29.5 35.8 35 28.5 35 20.5V11.5L22 6Z"
      fill="url(#certGrad)"
    />
    <path
      d="M17 21.5L20.5 25L27 18.5"
      stroke="#FFFFFF"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EnvelopeIcon = () => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    style={{
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 3px 6px rgba(70,50,25,0.25))",
    }}
  >
    <defs>
      <linearGradient id="envGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D8C39F" />
        <stop offset="50%" stopColor="#BBA075" />
        <stop offset="100%" stopColor="#967A4F" />
      </linearGradient>
      <linearGradient id="envFlap" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#E6D7B9" />
        <stop offset="100%" stopColor="#BAA076" />
      </linearGradient>
      <linearGradient id="envInner" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8C7046" />
        <stop offset="100%" stopColor="#6E5633" />
      </linearGradient>
    </defs>
    <rect x="5" y="11" width="34" height="24" rx="4" fill="url(#envGrad)" />
    <polygon points="5,11 22,24 39,11" fill="url(#envFlap)" opacity="0.95" />
    <polyline points="5,11 22,24 39,11" stroke="#A68B5E" strokeWidth="0.8" />
    <polygon points="5,35 18,22 5,14" fill="url(#envInner)" opacity="0.22" />
    <polygon points="39,35 26,22 39,14" fill="url(#envInner)" opacity="0.22" />
    <polygon points="5,35 22,22 39,35" fill="url(#envGrad)" />
    <polyline
      points="5,35 22,22 39,35"
      stroke="#FFFFFF"
      strokeWidth="0.6"
      strokeOpacity="0.4"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    style={{
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 3px 6px rgba(45,60,35,0.28))",
    }}
  >
    <defs>
      <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8DA078" />
        <stop offset="50%" stopColor="#71845C" />
        <stop offset="100%" stopColor="#51633F" />
      </linearGradient>
      <radialGradient id="phShine" cx="35%" cy="30%" r="55%">
        <stop offset="0%" stopColor="#C8DAB6" stopOpacity="0.75" />
        <stop offset="60%" stopColor="#71845C" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="22" cy="22" r="16" fill="url(#phGrad)" />
    <circle cx="22" cy="22" r="16" fill="url(#phShine)" />
    <circle
      cx="22"
      cy="22"
      r="15.5"
      stroke="#FFFFFF"
      strokeOpacity="0.25"
      strokeWidth="0.8"
    />
    <path
      d="M18.2 14.8C17.3 14.8 16 16.1 16 17.5C16 23.3 20.7 28 26.5 28C27.9 28 29.2 26.7 29.2 25.8L27.4 21.8C27 21.3 26.1 21.3 25.7 21.7L24.3 23C22 21.7 20.3 20 19 17.7L20.3 16.3C20.7 15.9 20.7 15 20.2 14.6L18.2 14.8Z"
      fill="#FFFFFF"
    />
  </svg>
);

const LocationPinIcon = () => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    style={{
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 3px 6px rgba(70,50,25,0.25))",
    }}
  >
    <defs>
      <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D5C09B" />
        <stop offset="50%" stopColor="#BBA075" />
        <stop offset="100%" stopColor="#8C6E41" />
      </linearGradient>
      <radialGradient id="pinShine" cx="35%" cy="25%" r="50%">
        <stop offset="0%" stopColor="#F5E8D3" stopOpacity="0.9" />
        <stop offset="65%" stopColor="#BBA075" stopOpacity="0" />
      </radialGradient>
    </defs>
    <path
      d="M22 9C17 9 13 13 13 18C13 24.5 22 34 22 34C22 34 31 24.5 31 18C31 13 27 9 22 9Z"
      fill="url(#pinGrad)"
    />
    <circle cx="22" cy="18" r="4.2" fill="#FFFFFF" opacity="0.95" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 36 36"
    style={{
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
    }}
  >
    <circle cx="18" cy="18" r="16" fill="#833AB4" />
    <rect
      x="11.5"
      y="11.5"
      width="13"
      height="13"
      rx="3.8"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      fill="none"
    />
    <circle
      cx="18"
      cy="18"
      r="3.2"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      fill="none"
    />
    <circle cx="21.8" cy="14.2" r="0.9" fill="#FFFFFF" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 36 36"
    style={{
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
    }}
  >
    <circle cx="18" cy="18" r="16" fill="#1877F2" />
    <path
      d="M19.5 26.5V18.8H22.1L22.5 15.8H19.5V13.9C19.5 13 19.8 12.5 21 12.5H22.6V9.8C22.3 9.8 21.3 9.7 20.2 9.7C17.8 9.7 16.2 11.2 16.2 13.7V15.8H13.6V18.8H16.2V26.5H19.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    viewBox="0 0 36 36"
    style={{
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
    }}
  >
    <circle cx="18" cy="18" r="16" fill="#FF0000" />
    <polygon points="15.5,13 23,18 15.5,23" fill="#FFFFFF" />
  </svg>
);

const INSTAGRAM_URL =
  "https://www.instagram.com/enjoyeat_makhana?xtok=MXczaTJlcDc3bnkyMQ%3D%3D&utm_source=qr";
const SUGGESTION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfDwIJ3TV9YvPCXabIl-r-574K2XGneAGjMILfbcKWv6oo6aw/viewform?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

const CONTACT_ITEMS = [
  {
    label: "Company Name",
    value: "ENJOYEAT FOOD PRIVATE LIMITED",
    href: null,
    icon: <CertShieldIcon />,
  },
  {
    label: "Email",
    value: "Support.enjoyeat@gmail.com",
    href: "mailto:Support.enjoyeat@gmail.com",
    icon: <EnvelopeIcon />,
  },
  {
    label: "Phone / WhatsApp",
    value: "+91 80840 44728",
    href: "https://wa.me/8084044728",
    icon: <PhoneIcon />,
  },
  {
    label: "Customer Suggestion & Feedback",
    value: "Share Your Suggestions & Feedback ✍️",
    href: SUGGESTION_FORM_URL,
    icon: <EnvelopeIcon />,
  },
  {
    label: "Address",
    value: "Sitamarhi, Bihar, India",
    subtext: "📍 Open in Google Maps",
    href: "https://maps.google.com/?q=Sitamarhi,+Bihar,+India",
    icon: <LocationPinIcon />,
  },
];

export default function ContactSection() {
  const reducedMotion = useReducedMotionSafe();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [activePolicy, setActivePolicy] = useState(null);

  const handleFormChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello EnjoyEat,\nName: ${formState.name}\nEmail/Phone: ${formState.email}\nMessage: ${formState.message}`,
    );
    window.open(`https://wa.me/8084044728?text=${text}`, "_blank");
  };

  return (
    <div className="ct-wrap">
      <style>{CSS}</style>

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP VIEW (width >= 769px): 1024 x 572 Balanced Stage
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="ct-stage ct-desktop-only"
        aria-label="Get in Touch"
      >
        {/* Scattered decorative makhana & leaves */}
        <img
          src={elM1}
          alt=""
          aria-hidden
          style={{ ...boxD(15, 230, 24, 24), pointerEvents: "none", zIndex: 0 }}
        />
        <img
          src={elM4}
          alt=""
          aria-hidden
          style={{
            ...boxD(440, 210, 24, 24),
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <img
          src={elM7}
          alt=""
          aria-hidden
          style={{
            ...boxD(920, 160, 26, 26),
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <img
          src={elBasil}
          alt=""
          aria-hidden
          style={{
            ...boxD(10, 420, 40, 40),
            pointerEvents: "none",
            opacity: 0.75,
            zIndex: 0,
            transform: "rotate(45deg)",
          }}
        />
        <img
          src={elSage}
          alt=""
          aria-hidden
          style={{
            ...boxD(960, 360, 40, 32),
            pointerEvents: "none",
            opacity: 0.8,
            zIndex: 0,
            transform: "rotate(-30deg)",
          }}
        />

        {/* ── Title, Subtitle ── */}
        <motion.div
          style={{ position: "absolute", left: uD(54), top: uD(36), zIndex: 2 }}
          initial={reducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontSize: uD(36),
              fontWeight: 700,
              color: "#2D2016",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            GET IN TOUCH
          </h1>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: uD(12),
              color: "#55483D",
              margin: `${uD(6)} 0 0`,
              maxWidth: uD(380),
              lineHeight: 1.5,
            }}
          >
            Have questions about our products or want to say hello? Reach out to
            us.
          </p>
        </motion.div>

        {/* Desktop Contact Card */}
        <motion.div
          style={{
            ...boxD(54, 136, 380, 360),
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1.5px solid rgba(255, 255, 255, 0.95)",
            borderRadius: uD(18),
            padding: `${uD(18)} ${uD(22)}`,
            boxShadow: "0 14px 34px rgba(50, 35, 15, 0.06)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 2,
          }}
          initial={
            reducedMotion ? {} : { opacity: 0, x: -45, y: 15, scale: 0.94 }
          }
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.08,
          }}
        >
          {CONTACT_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: uD(10),
                borderBottom: "1px solid rgba(215, 200, 175, 0.35)",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: uD(2) }}
              >
                <span
                  style={{
                    fontSize: uD(11),
                    fontWeight: 600,
                    color: "#7D7164",
                  }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontSize: uD(13),
                      fontWeight: 700,
                      color: "#241A13",
                      textDecoration: "none",
                    }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: uD(13),
                      fontWeight: 700,
                      color: "#241A13",
                    }}
                  >
                    {item.value}
                  </span>
                )}
                {item.subtext && (
                  <span
                    style={{
                      fontSize: uD(10.5),
                      fontWeight: 600,
                      color: "#8C6E41",
                      marginTop: uD(1),
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.subtext}
                  </span>
                )}
              </div>
              <div
                style={{
                  width: uD(34),
                  height: uD(34),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
            </div>
          ))}

          {/* Follow Us Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: uD(2),
            }}
          >
            <span
              style={{ fontSize: uD(13), fontWeight: 700, color: "#241A13" }}
            >
              Follow Us
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: uD(10),
                background: "#D1BE9C",
                padding: `${uD(5)} ${uD(14)}`,
                borderRadius: "999px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.14)",
              }}
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: uD(26),
                  height: uD(26),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InstagramIcon />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: uD(26),
                  height: uD(26),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FacebookIcon />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  width: uD(26),
                  height: uD(26),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Desktop Map & Google Maps Location ── */}
        <motion.div
          style={{
            ...boxD(460, 80, 510, 420),
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          initial={
            reducedMotion ? {} : { opacity: 0, x: 45, y: 15, scale: 0.94 }
          }
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.15,
          }}
        >
          <div
            style={{
              width: "100%",
              height: uD(340),
              borderRadius: uD(16),
              overflow: "hidden",
              boxShadow: "0 12px 30px rgba(50, 35, 15, 0.12)",
              border: "1.5px solid rgba(255, 255, 255, 0.9)",
              position: "relative",
              background: "#EFE6D5",
            }}
          >
            <iframe
              title="Google Map Location - ENJOYEAT Sitamarhi Bihar"
              src="https://maps.google.com/maps?q=Sitamarhi,+Bihar,+India&t=&z=11&ie=UTF8&iwloc=&output=embed"
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                filter: "contrast(1.02) saturate(0.95)",
              }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* ── Footer Bar ── */}
        <footer
          style={{
            ...boxD(0, 526, 1024, 46),
            background: "#251912",
            padding: `0 ${uD(48)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
            zIndex: 10,
          }}
        >
          <span
            style={{ color: "#E2D7C2", fontSize: uD(10.5), fontWeight: 400 }}
          >
            © 2026 ENJOYEAT FOOD PRIVATE LIMITED. All Rights Reserved. &nbsp; |
            &nbsp; CIN: U10799BR2026PTC088365 &nbsp;|&nbsp; GSTIN:
            10AAKCE0169K1ZS
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: uD(8) }}>
            <button
              type="button"
              onClick={() => setActivePolicy("privacy")}
              style={{
                background: "none",
                border: "none",
                color: "#E2D7C2",
                fontSize: uD(10.5),
                cursor: "pointer",
                padding: 0,
              }}
            >
              Privacy Policy
            </button>
            <span style={{ color: "#E2D7C2", opacity: 0.4, fontSize: uD(10) }}>
              |
            </span>
            <button
              type="button"
              onClick={() => setActivePolicy("terms")}
              style={{
                background: "none",
                border: "none",
                color: "#E2D7C2",
                fontSize: uD(10.5),
                cursor: "pointer",
                padding: 0,
              }}
            >
              Terms &amp; Conditions
            </button>
            <span style={{ color: "#E2D7C2", opacity: 0.4, fontSize: uD(10) }}>
              |
            </span>
            <button
              type="button"
              onClick={() => setActivePolicy("shipping")}
              style={{
                background: "none",
                border: "none",
                color: "#E2D7C2",
                fontSize: uD(10.5),
                cursor: "pointer",
                padding: 0,
              }}
            >
              Shipping &amp; Refund Policy
            </button>
          </div>
        </footer>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE VIEW (width <= 768px): 480 x 480 Balanced Mobile Stage
          - Left: Contact Info Card (Email, Phone, Address, Socials)
          - Right: 3D Bihar Map (placed where message form was)
          - Footer: Clean copyright & policy links
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-mobile"
        className="ct-stage ct-mobile-only"
        aria-label="Get in Touch"
      >
        {/* Mobile Header */}
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
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontSize: uM(22),
              fontWeight: 700,
              color: "#2D2016",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            GET IN TOUCH
          </h2>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: uM(11.5),
              color: "#55483D",
              margin: `${uM(4)} 0 0`,
              lineHeight: 1.4,
            }}
          >
            Have questions about our products or want to say hello? Reach out to
            us.
          </p>
        </motion.div>

        {/* ── MOBILE CARD: Contact Info Card (Left) ── */}
        <motion.div
          style={{
            ...boxM(16, 88, 224, 275),
            background: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1.5px solid rgba(255, 255, 255, 0.95)",
            borderRadius: uM(14),
            padding: `${uM(12)} ${uM(12)}`,
            boxShadow: "0 10px 24px rgba(50, 35, 15, 0.07)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 2,
          }}
          initial={
            reducedMotion ? {} : { opacity: 0, x: -45, y: 20, scale: 0.93 }
          }
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.08,
          }}
        >
          {CONTACT_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: uM(8),
                borderBottom: "1px solid rgba(215, 200, 175, 0.35)",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: uM(1) }}
              >
                <span
                  style={{ fontSize: uM(9), fontWeight: 600, color: "#7D7164" }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontSize: uM(10.5),
                      fontWeight: 700,
                      color: "#241A13",
                      textDecoration: "none",
                    }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: uM(10.5),
                      fontWeight: 700,
                      color: "#241A13",
                    }}
                  >
                    {item.value}
                  </span>
                )}
                {item.subtext && (
                  <span
                    style={{
                      fontSize: uM(8),
                      fontWeight: 600,
                      color: "#8C6E41",
                      marginTop: uM(1),
                    }}
                  >
                    {item.subtext}
                  </span>
                )}
              </div>
              <div
                style={{
                  width: uM(24),
                  height: uM(24),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
            </div>
          ))}

          {/* Follow Us Pill on Mobile */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: uM(2),
            }}
          >
            <span
              style={{ fontSize: uM(10.5), fontWeight: 700, color: "#241A13" }}
            >
              Follow Us
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: uM(6),
                background: "#D1BE9C",
                padding: `${uM(4)} ${uM(8)}`,
                borderRadius: "999px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.14)",
              }}
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: uM(18),
                  height: uM(18),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── MOBILE MAP: Google Maps Interactive Location ── */}
        <motion.div
          style={{
            ...boxM(248, 88, 222, 275),
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          initial={
            reducedMotion ? {} : { opacity: 0, x: 45, y: 20, scale: 0.93 }
          }
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{
            type: "spring",
            stiffness: 85,
            damping: 15,
            delay: 0.16,
          }}
        >
          <div
            style={{
              width: "100%",
              height: uM(225),
              borderRadius: uM(12),
              overflow: "hidden",
              boxShadow: "0 4px 14px rgba(50, 35, 15, 0.14)",
              border: "1.2px solid rgba(255, 255, 255, 0.9)",
              position: "relative",
              background: "#EFE6D5",
            }}
          >
            <iframe
              title="Google Map Location - ENJOYEAT Mobile"
              src="https://maps.google.com/maps?q=Sitamarhi,+Bihar,+India&t=&z=11&ie=UTF8&iwloc=&output=embed"
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                filter: "contrast(1.02) saturate(0.95)",
              }}
              loading="lazy"
              allowFullScreen
            />
          </div>

          <a
            href="https://maps.google.com/?q=Sitamarhi,+Bihar,+India"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: uM(8),
              display: "inline-flex",
              alignItems: "center",
              gap: uM(4),
              padding: `${uM(4)} ${uM(10)}`,
              borderRadius: uM(14),
              background: "#7e8458",
              color: "#ffffff",
              fontSize: uM(9),
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 6px rgba(126, 132, 88, 0.28)",
            }}
          >
            <span>📍</span> Google Maps
          </a>
        </motion.div>

        {/* Mobile Footer */}
        <div
          style={{
            position: "absolute",
            bottom: uM(10),
            left: uM(16),
            right: uM(16),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: uM(4),
            borderTop: "1px solid rgba(85, 72, 61, 0.2)",
            paddingTop: uM(8),
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: uM(9),
              color: "#55483D",
              opacity: 0.95,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            © {new Date().getFullYear()} ENJOYEAT FOOD PRIVATE LIMITED.
          </div>
          <div
            style={{
              fontSize: uM(7.8),
              color: "#8C6E41",
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            CIN: U10799BR2026PTC088365 | GST: 10AAKCE0169K1ZS
          </div>
          <div
            style={{
              display: "flex",
              gap: uM(10),
              fontSize: uM(9),
              color: "#747A55",
            }}
          >
            <button
              type="button"
              onClick={() => setActivePolicy("privacy")}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                fontSize: "inherit",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActivePolicy("terms")}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                fontSize: "inherit",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Terms
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActivePolicy("shipping")}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                fontSize: "inherit",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Shipping &amp; Refund
            </button>
          </div>
        </div>
      </section>

      {/* Pop-up Interactive Policy Modal */}
      <PolicyModal
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </div>
  );
}

const CSS = `
.ct-wrap {
  width: 100%;
  background: #EFE7D6;
  overflow: hidden;
  position: relative;
}
.ct-stage {
  position: relative;
  width: 100%;
  user-select: none;
}

/* Desktop layout (width > 768px) */
@media (min-width: 769px) {
  .ct-desktop-only {
    display: block;
    aspect-ratio: 1024 / 572;
    container-type: inline-size;
    overflow: hidden;
  }
  .ct-mobile-only {
    display: none !important;
  }
}

/* Mobile layout (width <= 768px) */
@media (max-width: 768px) {
  .ct-desktop-only {
    display: none !important;
  }
  .ct-mobile-only {
    display: block;
    aspect-ratio: 480 / 480;
    container-type: inline-size;
    overflow: hidden;
    padding: 16px 0 24px;
  }
}
`;
