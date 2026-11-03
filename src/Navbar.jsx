import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import officialLogo from "./assets/enjoyeat-official-logo.png";

const NAV_ITEMS = [
  { name: "Our Story", href: "#our-story" },
  { name: "Shop", href: "#shop" },
  { name: "Benefits", href: "#benefits" },
  { name: "Recipes", href: "#recipes" },
  { name: "Wholesale", href: "#wholesale" },
  { name: "Contact", href: "#contact" },
  {
    name: "Feedback",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfDwIJ3TV9YvPCXabIl-r-574K2XGneAGjMILfbcKWv6oo6aw/viewform?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
    isExternal: true,
  },
];

const SECTION_IDS = [
  "hero",
  "our-story",
  "shop",
  "benefits",
  "recipes",
  "wholesale",
  "contact",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  /* ── Track which section is in view ── */
  useEffect(() => {
    const observers = [];
    const thresholds = [0.25];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: thresholds, rootMargin: "-80px 0px -40% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isActive = (href) => {
    const id = href.replace("#", "");
    return activeSection === id;
  };

  /* ── Smooth scroll handler with robust cross-browser / mobile fallback ── */
  const handleNav = (e, item) => {
    if (item.isExternal) {
      setMobileOpen(false);
      return; // allow default anchor navigation to external link
    }

    e.preventDefault();
    setMobileOpen(false);

    const href = item.href;
    const id = href.replace("#", "");
    const isMobileViewport =
      typeof window !== "undefined" && window.innerWidth <= 768;

    // Prefer the mobile section/wrapper on mobile, and the desktop section on desktop
    const target = isMobileViewport
      ? document.getElementById(`${id}-mobile-wrap`) ||
        document.getElementById(`${id}-mobile`) ||
        document.getElementById(id) ||
        document.querySelector(href)
      : document.getElementById(id) ||
        document.getElementById(`${id}-mobile-wrap`) ||
        document.getElementById(`${id}-mobile`) ||
        document.querySelector(href);

    if (target) {
      const navHeight = 72;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 72,
        zIndex: 100,
        background: "rgba(237, 229, 212, 0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(180,165,138,0.35)",
        boxShadow: "0 2px 16px rgba(61,42,31,0.06)",
      }}
    >
      <nav
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          height: "100%",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
        aria-label="Main Navigation"
      >
        {/* ── Official Brand Logo ── */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
          aria-label="Enjoyeat Makhana Home"
        >
          <img
            src={officialLogo}
            alt="Enjoyeat Official Logo"
            style={{ width: 48, height: 48, objectFit: "contain" }}
          />
          <div
            style={{
              fontFamily:
                "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              lineHeight: 1.1,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#1E3B2B",
                textTransform: "uppercase",
              }}
            >
              ENJOYEAT
            </div>
            <divtyguh
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: "#A25F27",
                textTransform: "uppercase",
                marginTop: 1,
              }}
            >
              MAKHANA
            </divtyguh>
          </div>
        </a>

        {/* ── Center nav links (desktop) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "absolute",
            left: "58%",
            transform: "translateX(-50%)",
          }}
          className="nav-desktop-links"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.name}
                href={item.href}
                id={`nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={(e) => handleNav(e, item)}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                style={{
                  fontSize: 13.5,
                  fontWeight: active ? 600 : 500,
                  color: active ? "#2B261F" : "#4A3B2C",
                  textDecoration: "none",
                  paddingBottom: 4,
                  borderBottom: active
                    ? "2px solid #8C6D3B"
                    : "2px solid transparent",
                  letterSpacing: "0.01em",
                  transition: "color 0.2s, border-color 0.2s",
                  whiteSpace: "nowrap",
                  fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.target.style.color = "#9E7B42";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.target.style.color = "#4A3B2C";
                }}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* ── Right: CTA + mobile toggle ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <a
            href="#shop"
            id="nav-shop-btn"
            onClick={(e) => handleNav(e, { name: "Shop", href: "#shop" })}
            className="px-3.5 py-1.5 text-[11px] md:px-4 md:py-2 md:text-[11.5px] font-semibold rounded-md whitespace-nowrap cursor-pointer touch-manipulation"
            style={{
              background: "linear-gradient(135deg, #c9a55a, #8C6D3B)",
              color: "#fff",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 3px 12px rgba(140,109,59,0.3)",
              transition: "opacity 0.2s, transform 0.15s",
              fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
              pointerEvents: "auto",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.88";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "1";
              e.target.style.transform = "none";
            }}
          >
            ORDER NOW
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="nav-hamburger touch-manipulation cursor-pointer"
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              color: "#3b2c20",
              touchAction: "manipulation",
              pointerEvents: "auto",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(237,229,212,0.98)",
              borderTop: "1px solid rgba(180,165,138,0.3)",
              padding: "12px 24px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              overflow: "hidden",
            }}
          >
            {/* WhatsApp Mobile Quick Button */}
            <a
              href="https://wa.me/919876543210?text=Hello%20EnjoyEat,%20I%20would%20like%20to%20order%20Makhana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold text-white text-xs uppercase tracking-wider mb-2"
              style={{ background: "#25D366" }}
            >
              Chat / Order on WhatsApp
            </a>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNav(e, item)}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="cursor-pointer touch-manipulation"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#3b2c20",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(180,165,138,0.3)",
                  fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                  touchAction: "manipulation",
                  pointerEvents: "auto",
                }}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
