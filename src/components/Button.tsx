import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonAsButton = React.ComponentPropsWithoutRef<'button'> & {
  href?: never
}

type ButtonAsLink = React.ComponentPropsWithoutRef<typeof Link> & {
  href: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const classes = cn(
      'inline-flex justify-center items-center rounded-md px-8 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors',
      'bg-indigo-600',
      className
    )

    if ('href' in props && props.href) {
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...props}>
          {props.children}
        </Link>
      )
    }

    const { href: _href, ...buttonProps } = props as ButtonAsButton
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...buttonProps}>
        {buttonProps.children}
      </button>
    )
  }
)

Button.displayName = 'Button'
