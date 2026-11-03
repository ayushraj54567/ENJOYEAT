import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const POLICY_DATA = {
  privacy: {
    title: "Privacy Policy",
    subtitle: "How we collect, use, and protect your information",
    content: (
      <div className="space-y-4 text-[#3A2D23] text-sm leading-relaxed">
        <p>
          <strong>EnjoyEat</strong> (
          <strong>EnjoyEat Food Private Limited</strong>) is committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          website <strong>enjoyeat.com</strong>, including any other media form,
          media channel, mobile website, or mobile application related or
          connected thereto. Please read this privacy policy carefully. If you
          do not agree with the terms of this privacy policy, please do not
          access the site.
        </p>

        <p>
          We reserve the right to make changes to this Privacy Policy at any
          time and for any reason. We will alert you about any changes by
          updating the “Revised” date of this Privacy Policy. Any changes or
          modifications will be effective immediately upon posting the updated
          Privacy Policy on the Site, and you waive the right to receive
          specific notice of each such change or modification.
        </p>

        <div>
          <h4 className="font-semibold text-base text-[#1E1914] mb-2">
            Information We Collect
          </h4>
          <p className="mb-2">
            We may collect information about you in a variety of ways. The
            information we may collect on the Site includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Data:</strong> Personally identifiable
              information, such as your name, shipping address, email address,
              and telephone number, and demographic information, such as your
              age, gender, hometown, and interests, that you voluntarily give to
              us when you register with the Site or when you choose to
              participate in various activities related to the Site.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers
              automatically collect when you access the Site, such as your IP
              address, your browser type, your operating system, your access
              times, and the pages you have viewed directly before and after
              accessing the Site.
            </li>
            <li>
              <strong>Financial Data:</strong> Financial information, such as
              data related to your payment method (e.g., valid credit card
              number, card brand, expiration date) that we may collect when you
              purchase, order, return, exchange, or request information about
              our services from the Site.
            </li>
            <li>
              <strong>Data from Social Networks:</strong> User information from
              social networking sites, such as Instagram, Facebook, and YouTube,
              including your name, your social network username, location,
              gender, birth date, email address, profile picture, and public
              data for contacts, if you connect your account to such social
              networks.
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-base text-[#1E1914] mb-2">
            How We Use Your Information
          </h4>
          <p className="mb-2">
            We may use the information we collect about you in the following
            ways:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>To facilitate and manage your account and process payments.</li>
            <li>
              To deliver targeted advertising, coupons, newsletters, and other
              promotions regarding the Site.
            </li>
            <li>To send you an email regarding your account or order.</li>
            <li>To increase the efficiency and operation of the Site.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-base text-[#1E1914] mb-2">
            Sharing Your Information
          </h4>
          <p className="mb-2">
            We will share information about you only in these circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the
              release of information about you is necessary to respond to legal
              process, to investigate or remedy potential violations of our
              policies, or to protect the rights, property, and safety of
              others.
            </li>
            <li>
              <strong>Third-Party Service Providers:</strong> We may share your
              information with third parties that perform services for us or on
              our behalf, including payment processing, data analysis, email
              delivery, hosting services, customer service, and marketing
              assistance.
            </li>
          </ul>
        </div>
      </div>
    ),
  },

  terms: {
    title: "Terms and Conditions",
    subtitle: "Rules and regulations for using EnjoyEat",
    content: (
      <div className="space-y-4 text-[#3A2D23] text-sm leading-relaxed">
        <p>
          Welcome to <strong>EnjoyEat</strong>. These Terms and Conditions
          outline the rules and regulations for the use of EnjoyEat’s Website,
          located at <strong>enjoyeat.com</strong>.
        </p>

        <p>
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use EnjoyEat if you do not agree to
          take all of the terms and conditions stated on this page.
        </p>

        <p>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements: "Client",
          "You" and "Your" refers to you, the person log on this website and
          compliant to the Company’s terms and conditions. "The Company",
          "Ourselves", "We", "Our" and "Us", refers to our Company. "Party",
          "Parties", or "Us", refers to both the Client and ourselves.
        </p>

        <div>
          <h4 className="font-semibold text-base text-[#1E1914] mb-2">
            Intellectual Property Rights
          </h4>
          <p>
            Unless otherwise stated, EnjoyEat and/or its licensors own the
            intellectual property rights for all material on EnjoyEat. All
            intellectual property rights are reserved. You may access this from
            EnjoyEat for your own personal use subjected to restrictions set in
            these terms and conditions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-base text-[#1E1914] mb-2">
            User Restrictions
          </h4>
          <p className="mb-2">You must not:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Republish material from EnjoyEat;</li>
            <li>Sell, rent or sub-license material from EnjoyEat;</li>
            <li>Reproduce, duplicate or copy material from EnjoyEat;</li>
            <li>Redistribute content from EnjoyEat.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-base text-[#1E1914] mb-2">
            Limitation of Liability
          </h4>
          <p>
            The developer and creators of this website shall not be held liable
            for any damages that arise out of the use or inability to use the
            materials on this website. All responsibility for the operation,
            content, and maintenance of the website lies solely with the client
            or business owner. The developer assumes no liability for any
            claims, losses, or legal issues arising from the website's
            functionality or the products sold therein.
          </p>
        </div>
      </div>
    ),
  },

  shipping: {
    title: "Shipping and Refund Policy",
    subtitle:
      "Transparent fulfillment, shipping times, and satisfaction guarantees",
    content: (
      <div className="space-y-4 text-[#3A2D23] text-sm leading-relaxed">
        <p>
          Thank you for shopping at <strong>EnjoyEat</strong>. Our shipping and
          return policies are designed to ensure your satisfaction with our
          products.
        </p>

        <div className="border-l-4 border-[#747A55] pl-4 py-1 bg-[#F5EFE1]/70 rounded-r">
          <h4 className="font-semibold text-base text-[#1E1914] mb-1">
            Shipping Policy
          </h4>
          <p>
            Orders are processed and dispatched within two (2) business days of
            purchase. Deliveries are made via standard shipping partners and
            include tracking information provided to you upon dispatch. Delivery
            times vary based on the destination address. We are not responsible
            for delays caused by shipping carriers or unforeseen circumstances.
          </p>
        </div>

        <div className="border-l-4 border-[#B8914A] pl-4 py-1 bg-[#F5EFE1]/70 rounded-r">
          <h4 className="font-semibold text-base text-[#1E1914] mb-1">
            Refund and Replacement Policy
          </h4>
          <p>
            If your product arrives damaged or you receive an incorrect item, we
            offer a replacement. You must notify us within forty-eight (48)
            hours of delivery with photographic evidence of the damage or
            discrepancy. Due to the perishable nature of our products, we do not
            accept returns or offer monetary refunds for change of mind or
            incorrectly ordered items.
          </p>
        </div>

        <p className="text-xs text-[#6E5C4E] pt-2">
          For any shipping enquiries or replacement requests, please reach out
          to our team at <strong>info@enjoyeat.com</strong> with your order ID
          and photos.
        </p>
      </div>
    ),
  },
};

export default function PolicyModal({ activePolicy, onClose }) {
  useEffect(() => {
    if (activePolicy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePolicy]);

  if (!activePolicy || !POLICY_DATA[activePolicy]) return null;

  const current = POLICY_DATA[activePolicy];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        style={{
          background: "rgba(28, 20, 15, 0.65)",
          backdropFilter: "blur(6px)",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-[#FAF5EB] rounded-2xl shadow-2xl border border-[#D5C29D] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E0D1B6] bg-[#F1E8D5] flex items-center justify-between shrink-0">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2A1E17] tracking-tight">
                {current.title}
              </h3>
              <p className="text-xs text-[#705D4D] mt-0.5">
                {current.subtitle}
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

          {/* Scrollable Body */}
          <div className="p-6 overflow-y-auto overscroll-contain">
            {current.content}
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-[#E0D1B6] bg-[#F1E8D5] flex items-center justify-between shrink-0">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#2A1E17]">
                ENJOYEAT FOOD PRIVATE LIMITED • Sitamarhi, Bihar
              </span>
              <span className="text-[10px] text-[#7A695A]">
                CIN: U10799BR2026PTC088365 | GSTIN: 10AAKCE0169K1ZS
              </span>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-1.5 rounded-lg bg-[#536B46] hover:bg-[#435738] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
