import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps =
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })

export function Button({ className, ...props }: ButtonProps) {
  className = clsx(
    'relative inline-flex justify-center items-center rounded-xl px-6 py-3 text-sm font-bold text-white uppercase tracking-wide shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all duration-200 ease-out overflow-hidden group',
    'bg-[#007AFF] hover:bg-[#0056CC] shadow-[#007AFF]/25 hover:shadow-[#007AFF]/40',
    'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0)] before:bg-[length:16px_16px] before:animate-[dots-move_2s_linear_infinite]',
    'after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] after:bg-[length:24px_24px] after:animate-[dots-move_3s_linear_infinite_reverse]',
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props}>
      <span className="relative z-10">{props.children}</span>
    </button>
  ) : (
    <Link className={className} {...props}>
      <span className="relative z-10">{props.children}</span>
    </Link>
  )
}
