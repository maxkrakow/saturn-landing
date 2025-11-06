'use client'

import { useState, useEffect } from 'react'
import { PopupModal } from 'react-calendly'

interface CalendlyPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function CalendlyPopup({ isOpen, onClose }: CalendlyPopupProps) {
  // Pause all animations when popup is open
  useEffect(() => {
    if (isOpen) {
      // Add class to body to pause animations
      document.body.classList.add('pause-animations')
      // Also add to html element for extra coverage
      document.documentElement.classList.add('pause-animations')
    } else {
      // Remove class when popup closes
      document.body.classList.remove('pause-animations')
      document.documentElement.classList.remove('pause-animations')
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('pause-animations')
      document.documentElement.classList.remove('pause-animations')
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <PopupModal
      url="https://calendly.com/lended/saturn-demo-insurance-renewal-software?back=1"
      onModalClose={onClose}
      open={isOpen}
      rootElement={document.body}
    />
  )
}
