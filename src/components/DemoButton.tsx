'use client'

import { useCalendly } from '@/contexts/CalendlyContext'
import clsx from 'clsx'

interface DemoButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
}

export function DemoButton({ className, children, href, onClick, ...props }: DemoButtonProps) {
  const { openCalendly } = useCalendly()

  className = clsx(
    'inline-flex justify-center items-center rounded-md px-8 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors',
    'bg-indigo-600',
    className
  )

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openCalendly()
    if (onClick) {
      onClick(e)
    }
  }

  if (href) {
    return (
      <a href={href} className={className} onClick={handleClick} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
