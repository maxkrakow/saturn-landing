'use client'

import React from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

type Step = {
  id: string
  title: string
  art: string // svg path (public/ or imported)
}

const STEPS: Step[] = [
  { id: 'upload', title: 'Step 1 — Upload Image', art: '/stack_step1.svg' },
  { id: 'crop', title: 'Step 2 — Crop Image', art: '/stack_step2.svg' },
  { id: 'edit', title: 'Step 3 — Edit Text', art: '/stack_step3.svg' },
  { id: 'download', title: 'Step 4 — Download DOC', art: '/stack_step4.svg' },
]

export default function RightStackShowcase({
  steps = STEPS,
  layerSrc = '/glass_layer.svg',
  loopMs = 1900,
  tilt = true,
  activeIndex,
}: {
  steps?: Step[]
  layerSrc?: string
  loopMs?: number // timing per step
  tilt?: boolean
  activeIndex?: number
}) {
  const [i, setI] = React.useState(0)

  // Use activeIndex if provided, otherwise use internal state
  const currentIndex = activeIndex !== undefined ? activeIndex : i

  // subtle interactive tilt like the video
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useTransform(my, [-80, 80], [6, -6])
  const ry = useTransform(mx, [-80, 80], [-6, 6])

  React.useEffect(() => {
    // Only use internal timer if activeIndex is not provided
    if (activeIndex === undefined) {
      const t = setTimeout(() => setI((n) => (n + 1) % steps.length), loopMs)
      return () => clearTimeout(t)
    }
  }, [i, loopMs, steps.length, activeIndex])

  // layer offsets (back to front)
  const layers = [
    { y: 52, scale: 0.96, opacity: 0.45, blur: 'blur-[0.5px]' },
    { y: 26, scale: 0.98, opacity: 0.65, blur: 'blur-[0.25px]' },
    { y: 0, scale: 1.0, opacity: 0.85, blur: '' },
  ]

  const current = steps[currentIndex]

  return (
    <motion.div
      onMouseMove={
        tilt
          ? (e) => {
              const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
              mx.set(e.clientX - (r.left + r.width / 2))
              my.set(e.clientY - (r.top + r.height / 2))
            }
          : undefined
      }
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      style={tilt ? { rotateX: rx, rotateY: ry } : {}}
      className="relative aspect-[5/3] w-full select-none overflow-hidden rounded-3xl border border-[#7AA8FF]/30 bg-[#0A5DFF] p-3 shadow-xl md:p-4"
    >
      {/* inner blue plate */}
      <div className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-[#0F67FF] via-[#0B5BFF] to-[#0A52EA]" />

      {/* thin inner border like the reference */}
      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/25" />

      {/* content area */}
      <div className="relative z-10 flex h-full items-center justify-center p-4 md:p-6">
        {/* Stack showcase */}
        <div className="relative w-full max-w-lg">
          {/* Layer stack */}
          <div className="absolute inset-0 flex items-center justify-center">
            {layers.map((L, idx) => (
              <motion.img
                key={idx + '-' + currentIndex}
                src={layerSrc}
                alt=""
                className={`pointer-events-none ${L.blur}`}
                initial={{ y: L.y + 18, scale: L.scale * 0.985, opacity: 0 }}
                animate={{ y: L.y, scale: L.scale, opacity: L.opacity }}
                exit={{ y: L.y - 18, scale: L.scale * 1.01, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))' }}
              />
            ))}
          </div>

          {/* Phone art (step) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.art}
                alt={current.title}
                className="w-[82%] max-w-[520px]"
                initial={{ opacity: 0, y: 24, rotate: 0.8, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, rotate: -0.6, scale: 0.997 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  filter: 'drop-shadow(0 10px 28px rgba(7,25,73,0.35))',
                }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
