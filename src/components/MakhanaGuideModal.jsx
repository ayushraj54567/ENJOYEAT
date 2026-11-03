import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MakhanaGuideModal({ activeGuide, onClose }) {
  useEffect(() => {
    if (activeGuide) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeGuide]);

  if (!activeGuide) return null;

  const isBenefits = activeGuide === 'benefits';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        style={{ background: 'rgba(28, 20, 15, 0.7)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-2xl max-h-[88vh] bg-[#FAF5EB] rounded-2xl shadow-2xl border border-[#D5C29D] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E0D1B6] bg-[#F1E8D5] flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#747A55] text-white uppercase tracking-wider">
                  EnjoyEat Official Guide
                </span>
                <span className="text-xs text-[#8A7147] font-medium">GI-Tagged Mithila Makhana</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2A1E17] mt-1 tracking-tight">
                {isBenefits ? 'Health Benefits & Wellness Guide' : 'How to Consume & Easy Recipes'}
              </h3>
              <p className="text-xs text-[#705D4D] mt-0.5">
                {isBenefits
                  ? 'Supporting Heart Health, Diabetes Management & Natural Weight Loss'
                  : 'Creative, healthy ways to use and consume Makhana (Foxnut)'}
              </p>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="w-9 h-9 rounded-full bg-[#E5D8BE] hover:bg-[#D8C7A8] text-[#2A1E17] flex items-center justify-center text-lg font-semibold transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto overscroll-contain text-[#3A2D23] text-sm leading-relaxed space-y-5">
            {isBenefits ? (
              <>
                <div className="p-4 rounded-xl bg-[#F5EFE1] border-l-4 border-[#747A55]">
                  <h4 className="font-serif font-bold text-lg text-[#2A1E17] mb-1">
                    Nature's Superfood from the Lotus Ponds of Mithila
                  </h4>
                  <p className="text-xs text-[#635142]">
                    Makhana (Foxnut) is an ancient Ayurvedic super-snack packed with high-quality plant protein, essential calcium, low sodium, and potent flavonoid antioxidants.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-[#E2D4BA] p-4 rounded-xl bg-white/70">
                    <h5 className="font-bold text-[#2A1E17] flex items-center gap-2 text-base">
                      <span>❤️</span> 1. Supports & Promotes Heart Health
                    </h5>
                    <p className="text-xs text-[#524335] mt-1">
                      Makhana contains an abundance of magnesium and extremely low sodium. This ideal ratio helps regulate healthy blood pressure and oxygen flow, protecting cardiovascular longevity.
                    </p>
                  </div>

                  <div className="border border-[#E2D4BA] p-4 rounded-xl bg-white/70">
                    <h5 className="font-bold text-[#2A1E17] flex items-center gap-2 text-base">
                      <span>🩺</span> 2. Diabetes-Friendly & Low Glycemic Index
                    </h5>
                    <p className="text-xs text-[#524335] mt-1">
                      With a low glycemic index (GI), Makhana releases glucose slowly and steadily into the bloodstream, preventing dangerous insulin spikes and supporting blood sugar control.
                    </p>
                  </div>

                  <div className="border border-[#E2D4BA] p-4 rounded-xl bg-white/70">
                    <h5 className="font-bold text-[#2A1E17] flex items-center gap-2 text-base">
                      <span>⚖️</span> 3. Natural Weight Loss & Metabolism
                    </h5>
                    <p className="text-xs text-[#524335] mt-1">
                      High in dietary fiber and plant protein yet naturally low in calories and saturated fat, a handful of roasted makhana promotes long-lasting satiety and prevents unhealthy binge eating.
                    </p>
                  </div>

                  <div className="border border-[#E2D4BA] p-4 rounded-xl bg-white/70">
                    <h5 className="font-bold text-[#2A1E17] flex items-center gap-2 text-base">
                      <span>🦴</span> 4. Bone Strength & Digestive Wellness
                    </h5>
                    <p className="text-xs text-[#524335] mt-1">
                      Rich in calcium and phosphorus for bone and joint health, and gentle on the stomach with natural astringent properties that soothe digestion.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-[#F5EFE1] border-l-4 border-[#B8914A]">
                  <h4 className="font-serif font-bold text-lg text-[#2A1E17] mb-1">
                    Delicious & Versatile Ways to Consume Makhana
                  </h4>
                  <p className="text-xs text-[#635142]">
                    EnjoyEat Makhana can be enjoyed raw, crisp-roasted, seasoned with savoury spices, or blended into wholesome sweet and savoury recipes.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-[#E2D4BA] p-4 rounded-xl bg-white/70">
                    <h5 className="font-bold text-[#2A1E17] text-base">
                      🍿 1. Crispy Ghee Roast (Quick Everyday Snack)
                    </h5>
                    <p className="text-xs text-[#524335] mt-1">
                      Heat 1 teaspoon of pure cow ghee in a pan. Add EnjoyEat Makhana on low-medium flame and roast for 4–5 minutes until crunchy. Season with pink Himalayan salt, black pepper, or chaat masala.
                    </p>
                  </div>

                  <div className="border border-[#E2D4BA] p-4 rounded-xl bg-white/70">
                    <h5 className="font-bold text-[#2A1E17] text-base">
                      🥣 2. Royal Makhana Kheer (Healthy Dessert)
                    </h5>
                    <p className="text-xs text-[#524335] mt-1">
                      Coarsely crush roasted makhana and simmer in low-fat warm milk with cardamom, saffron, and crushed almonds. Sweeten with organic jaggery or dates for a guilt-free traditional treat.
                    </p>
                  </div>

                  <div className="border border-[#E2D4BA] p-4 rounded-xl bg-white/70">
                    <h5 className="font-bold text-[#2A1E17] text-base">
                      🥗 3. Crunchy Protein Salad Bowl
                    </h5>
                    <p className="text-xs text-[#524335] mt-1">
                      Toss roasted makhana with diced cucumbers, fresh tomatoes, mint coriander chutney, and boiled chickpeas for a high-protein mid-day energy boost.
                    </p>
                  </div>

                  <div className="border border-[#E2D4BA] p-4 rounded-xl bg-white/70">
                    <h5 className="font-bold text-[#2A1E17] text-base">
                      🍛 4. Traditional Makhana Curry
                    </h5>
                    <p className="text-xs text-[#524335] mt-1">
                      Simmer whole makhana in a mildly spiced onion-tomato gravy with green peas (Matar Makhana) for a royal North Indian dinner staple.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer with company details and print/download */}
          <div className="px-6 py-3.5 border-t border-[#E0D1B6] bg-[#F1E8D5] flex items-center justify-between shrink-0">
            <span className="text-xs text-[#7A695A]">
              EnjoyEat Food Private Limited • info@enjoyeat.com
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-1.5 rounded-lg border border-[#8C6D3B] text-[#8C6D3B] hover:bg-[#8C6D3B]/10 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Print / Save PDF
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-1.5 rounded-lg bg-[#536B46] hover:bg-[#435738] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

