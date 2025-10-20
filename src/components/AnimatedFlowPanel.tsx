'use client';

import React from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

type Step = {
  id: string;
  icon?: React.ReactNode;
  title: string;
  desc?: string;
};

const DEFAULT_STEPS: Step[] = [
  { id: "reminder", title: "Reminder", desc: "Broker ping sent" },
  { id: "renewal", title: "Renewal", desc: "New COI uploaded" },
  { id: "ocr", title: "OCR Check", desc: "Endorsements validated" },
  { id: "done", title: "Portfolio Dashboard", desc: "Marked compliant" },
];

const cardVariants = {
  enter: { opacity: 0, y: 16, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
};

// Removed progressVariants due to TypeScript issues

const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5 } },
};

export default function AnimatedFlowPanel({
  steps = DEFAULT_STEPS,
  loopDelayMs = 800,
  tilt = true,
}: {
  steps?: Step[];
  loopDelayMs?: number;
  tilt?: boolean;
}) {
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<"idle" | "filling" | "checked">("idle");

  // subtle interactive tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-80, 80], [8, -8]);
  const ry = useTransform(mx, [-80, 80], [-8, 8]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
  };

  React.useEffect(() => {
    // timeline per step: progress fill -> check -> next
    setPhase("filling");
    const t1 = setTimeout(() => setPhase("checked"), 1200);
    const t2 = setTimeout(() => {
      setIndex((i) => (i + 1) % steps.length);
      setPhase("idle");
    }, 1200 + 500 + loopDelayMs);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [index, steps.length, loopDelayMs]);

  const current = steps[index];

  return (
    <motion.div
      onMouseMove={tilt ? onMove : undefined}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={tilt ? { rotateX: rx, rotateY: ry } : {}}
      className="relative w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-xl md:p-6"
    >
      {/* subtle bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-sky-100 via-white to-indigo-50" />

      {/* header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Automate renewals—hands-off</h3>
          <p className="text-sm text-slate-600">
            Messages trigger automatically; docs are checked for accuracy.
          </p>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600">
          Live
          <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
        </span>
      </div>

      {/* stack area */}
      <div className="relative h-72 w-full">
        {/* ghost cards behind for depth */}
        <div className="absolute inset-x-0 top-8 mx-auto h-20 w-[92%] rounded-2xl bg-slate-100/70 blur-[1px]" />
        <div className="absolute inset-x-0 top-14 mx-auto h-20 w-[88%] rounded-2xl bg-slate-100/60" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="absolute inset-x-0 top-0 mx-auto w-full"
          >
            <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10">
                    {/* simple icon placeholder */}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-sky-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 7h16M4 12h16M4 17h10" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{current.title}</div>
                    {current.desc && (
                      <div className="text-xs text-slate-600">{current.desc}</div>
                    )}
                  </div>
                </div>

                {/* status area: progress bar -> check */}
                <div className="w-28">
                  {phase !== "checked" ? (
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        className="h-full origin-left rounded-full bg-sky-500"
                        initial={{ scaleX: 0 }}
                        animate={{ 
                          scaleX: phase === "filling" ? 1 : 0,
                          transition: { duration: 1.2, ease: "easeInOut" }
                        }}
                      />
                    </div>
                  ) : (
                    <motion.svg
                      viewBox="0 0 24 24"
                      className="mx-auto h-6 w-6 text-emerald-600"
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        variants={checkVariants}
                        initial="hidden"
                        animate="visible"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </div>
              </div>

              {/* shimmer on success */}
              <AnimatePresence>
                {phase === "checked" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700"
                  >
                    Updated and compliant
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* footer hints */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-slate-600">
        <div className="rounded-lg border border-slate-200 bg-white px-2 py-1">
          SMS sent to broker
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-2 py-1">
          Email follow-up queued
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-2 py-1">
          COI parsed via OCR
        </div>
      </div>

      {/* soft ring */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40" />
    </motion.div>
  );
}
