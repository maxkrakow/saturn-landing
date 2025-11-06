'use client'

import Image from 'next/image'

import { DemoButton } from '@/components/DemoButton'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-newsletter.jpg'

function ArrowRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
      <path
        d="m14 7 5 5-5 5M19 12H5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Newsletter() {
  return (
    <section id="contact" aria-label="Contact" className="relative z-10 -mb-16">
      <div className="bg-indigo-100 dark:bg-indigo-950">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Ready to dive in?
            <br />
            Book a product demo today.
          </h2>
          <div className="mt-10 lg:mt-0 lg:shrink-0">
            <DemoButton className="w-full px-24 py-3 text-sm">Book demo</DemoButton>
          </div>
        </div>
      </div>
    </section>
  )
}
