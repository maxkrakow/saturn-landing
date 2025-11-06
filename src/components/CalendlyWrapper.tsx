'use client'

import { useCalendly } from '@/contexts/CalendlyContext'
import { CalendlyPopup } from './CalendlyPopup'

export function CalendlyWrapper() {
  const { isCalendlyOpen, closeCalendly } = useCalendly()

  return <CalendlyPopup isOpen={isCalendlyOpen} onClose={closeCalendly} />
}
