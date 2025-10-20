'use client';

import { Hero } from '@/components/Hero'
import { Newsletter } from '@/components/Newsletter'
import { Features } from '@/components/Features'
import FeatureShowcase from '@/components/FeatureShowcase'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeatureShowcase />
      <Newsletter />
    </>
  )
}
