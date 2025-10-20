'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import RightPanel from "@/components/RightPanel";
import { Container } from "@/components/Container";

type Feature = {
  id: string;
  name: string;
  headline: string;
  description: string;
  media: { type: "image" | "video"; src: string; alt?: string };
};

const FEATURES: Feature[] = [
  {
    id: "renewal",
    name: "Smart Renewals",
    headline: "Automate renewals—hands-off.",
    description:
      "Texts, emails, and calls trigger automatically; docs are checked for accuracy and compliance.",
    media: { type: "image", src: "/preview-renewal.png", alt: "Renewal flow preview" },
  },
  {
    id: "ocr",
    name: "Document OCR",
    headline: "Catch errors before they cost you.",
    description:
      "We flag missing endorsements, wrong dates, and limits—then follow up with broker + borrower.",
    media: { type: "image", src: "/preview-ocr.png", alt: "OCR preview" },
  },
  {
    id: "dashboard",
    name: "Portfolio Dashboard",
    headline: "Live status across your book.",
    description:
      "See every pending cert, escalations, and aging items—so you're always audit-ready.",
    media: { type: "video", src: "/preview-dashboard.mp4", alt: "Dashboard animation" },
  },
];


function useMagnetic(delta = 20) {
  // Small, snappy magnetic effect for the CTA
  const x = useSpring(0, { stiffness: 500, damping: 30, mass: 0.2 });
  const y = useSpring(0, { stiffness: 500, damping: 30, mass: 0.2 });

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (target.left + target.width / 2);
    const relY = e.clientY - (target.top + target.height / 2);
    x.set((relX / (target.width / 2)) * delta);
    y.set((relY / (target.height / 2)) * delta);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }
  return { x, y, onMouseMove, onMouseLeave };
}

export default function FeatureShowcase() {
  const [active, setActive] = React.useState<Feature>(FEATURES[0]);
  const [resetKey, setResetKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const mag = useMagnetic(14);

  // Handle feature switching
  const handleFeatureSwitch = (feature: Feature, index: number) => {
    setActive(feature);
    setResetKey(prev => prev + 1);
  };

  return (
    <section id="showcase" ref={sectionRef} className="relative w-full bg-gradient-to-b from-white to-slate-50">
      <Container className="py-16 md:py-24">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: Feature list */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Automate the painful parts of servicing.
            </h2>
            <p className="mt-3 max-w-prose text-slate-600">
              Pick a feature to see it in action. Everything is built to layer on top of your current system with minimal lift.
            </p>


            <ul className="mt-8 space-y-2">
              {FEATURES.map((f, index) => {
                const isActive = active.id === f.id;
                
                return (
                  <li key={f.id}>
                    <button
                      onMouseEnter={() => setActive(f)}
                      onClick={() => handleFeatureSwitch(f, index)}
                      className={[
                        "group w-full rounded-xl border px-4 py-3 text-left transition-all duration-500",
                        isActive
                          ? "border-sky-400 bg-sky-50/70"
                          : "border-slate-200 hover:border-slate-300 hover:bg-white cursor-pointer"
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={[
                              "inline-block h-2 w-2 rounded-full transition-all duration-500",
                              isActive 
                                ? "bg-sky-500" 
                                : "bg-slate-300 group-hover:bg-slate-400",
                            ].join(" ")}
                          />
                          <span
                            className={[
                              "text-sm font-medium transition-colors duration-500",
                              isActive 
                                ? "text-sky-700" 
                                : "text-slate-800",
                            ].join(" ")}
                          >
                            {f.name}
                          </span>
                        </div>
                        <span
                          className={[
                            "text-xs transition-colors duration-500",
                            isActive 
                              ? "text-sky-600" 
                              : "text-slate-400 group-hover:text-slate-500",
                          ].join(" ")}
                        >
                          Hover to preview →
                        </span>
                      </div>
                      <p
                        className={[
                          "mt-1 text-sm leading-relaxed transition-colors duration-500",
                          isActive 
                            ? "text-sky-900" 
                            : "text-slate-600",
                        ].join(" ")}
                      >
                        {f.description}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Magnetic CTA */}
            <div className="mt-8 flex items-center gap-4">
              <motion.button
                onMouseMove={mag.onMouseMove}
                onMouseLeave={mag.onMouseLeave}
                style={{ x: mag.x, y: mag.y }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center justify-center gap-2 rounded-2xl border border-sky-300 bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500"
              >
                Book a Demo
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
                {/* subtle glow */}
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-sky-400/30 blur-xl" />
              </motion.button>

              <a
                href="#learn-more"
                className="text-sm font-medium text-slate-700 underline-offset-4 transition hover:underline"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* Right: Scene Switcher */}
          <RightPanel active={active.id as "renewal" | "ocr" | "dashboard"} resetKey={resetKey} />
        </div>
      </Container>
    </section>
  );
}
