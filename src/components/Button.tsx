import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps =
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })

export function Button({ className, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex justify-center items-center rounded-md px-8 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors',
    'bg-indigo-600',
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props}>
      {props.children}
    </button>
  ) : (
    <Link className={className} {...props}>
      {props.children}
    </Link>
  )
}
