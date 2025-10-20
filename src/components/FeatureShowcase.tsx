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
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mag = useMagnetic(14);

  // Handle feature switching
  const handleFeatureSwitch = (feature: Feature, index: number) => {
    setActive(feature);
    setCurrentFeatureIndex(index);
    setResetKey(prev => prev + 1);
  };

  // Start automatic animation sequence
  const startAnimationSequence = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentFeatureIndex(0);
    setActive(FEATURES[0]);
    setResetKey(prev => prev + 1);

    // Animation durations based on actual component animations
    const animationDurations = [14000, 5000, 2000]; // Renewal (8 messages * 2000ms), OCR (5s), Dashboard

    // Cycle through each feature with proper timing
    FEATURES.forEach((feature, index) => {
      if (index === 0) return; // Skip first one as it's already set
      
      const delay = animationDurations.slice(0, index).reduce((sum, duration) => sum + duration, 0);
      
      animationTimeoutRef.current = setTimeout(() => {
        setActive(feature);
        setCurrentFeatureIndex(index);
        setResetKey(prev => prev + 1);
        
        // If this is the last feature, complete the sequence after its duration
        if (index === FEATURES.length - 1) {
          setTimeout(() => {
            setIsAnimating(false);
          }, animationDurations[index]);
        }
      }, delay);
    });
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

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
              {isAnimating 
                ? "Watch the features in action. Everything is built to layer on top of your current system with minimal lift."
                : "Pick a feature to see it in action, or watch the full sequence. Everything is built to layer on top of your current system with minimal lift."
              }
            </p>

            {/* Animation controls */}
            <div className="mt-4">
              {!isAnimating ? (
                <button
                  onClick={startAnimationSequence}
                  className="inline-flex items-center gap-2 rounded-lg border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Full Sequence
                </button>
              ) : (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Auto-playing features...</span>
                </div>
              )}
            </div>


            <ul className="mt-8 space-y-2">
              {FEATURES.map((f, index) => {
                const isActive = active.id === f.id;
                const isCurrentInSequence = currentFeatureIndex === index && isAnimating;
                const isUpcoming = index > currentFeatureIndex && isAnimating;
                const isCompleted = index < currentFeatureIndex && isAnimating;
                
                return (
                  <li key={f.id}>
                    <button
                      onMouseEnter={() => !isAnimating && setActive(f)}
                      onClick={() => !isAnimating && handleFeatureSwitch(f, index)}
                      disabled={isAnimating}
                      className={[
                        "group w-full rounded-xl border px-4 py-3 text-left transition-all duration-500",
                        isActive
                          ? "border-sky-400 bg-sky-50/70"
                          : isCompleted
                          ? "border-green-200 bg-green-50/50"
                          : isCurrentInSequence
                          ? "border-blue-400 bg-blue-50/70 ring-2 ring-blue-200"
                          : isUpcoming
                          ? "border-slate-200 bg-slate-50/50"
                          : "border-slate-200 hover:border-slate-300 hover:bg-white",
                        isAnimating ? "cursor-default" : "cursor-pointer"
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={[
                              "inline-block h-2 w-2 rounded-full transition-all duration-500",
                              isActive 
                                ? "bg-sky-500" 
                                : isCompleted
                                ? "bg-green-500"
                                : isCurrentInSequence
                                ? "bg-blue-500 animate-pulse"
                                : isUpcoming
                                ? "bg-slate-300"
                                : "bg-slate-300 group-hover:bg-slate-400",
                            ].join(" ")}
                          />
                          <span
                            className={[
                              "text-sm font-medium transition-colors duration-500",
                              isActive 
                                ? "text-sky-700" 
                                : isCompleted
                                ? "text-green-700"
                                : isCurrentInSequence
                                ? "text-blue-700"
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
                              : isCompleted
                              ? "text-green-600"
                              : isCurrentInSequence
                              ? "text-blue-600"
                              : isAnimating
                              ? "text-slate-400"
                              : "text-slate-400 group-hover:text-slate-500",
                          ].join(" ")}
                        >
                          {isAnimating 
                            ? (isCompleted ? "✓ Completed" : isCurrentInSequence ? "Playing..." : "Upcoming...")
                            : "Hover to preview →"
                          }
                        </span>
                      </div>
                      <p
                        className={[
                          "mt-1 text-sm leading-relaxed transition-colors duration-500",
                          isActive 
                            ? "text-sky-900" 
                            : isCompleted
                            ? "text-green-800"
                            : isCurrentInSequence
                            ? "text-blue-800"
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
                onMouseMove={!isAnimating ? mag.onMouseMove : undefined}
                onMouseLeave={!isAnimating ? mag.onMouseLeave : undefined}
                style={{ x: !isAnimating ? mag.x : 0, y: !isAnimating ? mag.y : 0 }}
                whileTap={!isAnimating ? { scale: 0.97 } : {}}
                disabled={isAnimating}
                className={[
                  "relative inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold shadow-lg transition",
                  isAnimating
                    ? "border-slate-300 bg-slate-400 text-slate-200 cursor-not-allowed"
                    : "border-sky-300 bg-sky-600 text-white shadow-sky-600/20 hover:bg-sky-500"
                ].join(" ")}
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
                className={[
                  "text-sm font-medium underline-offset-4 transition",
                  isAnimating
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-slate-700 hover:underline"
                ].join(" ")}
                onClick={isAnimating ? (e) => e.preventDefault() : undefined}
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
