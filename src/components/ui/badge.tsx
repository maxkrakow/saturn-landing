import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-1.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        green: 'border-transparent bg-green-50 text-green-700 ring-1 ring-green-600/20',
        red: 'border-transparent bg-red-50 text-red-700 ring-1 ring-red-600/10',
        blue: 'border-transparent bg-blue-50 text-blue-700 ring-1 ring-blue-700/10',
        orange: 'border-transparent bg-orange-50 text-orange-700 ring-1 ring-orange-600/20',
        gray: 'border-transparent bg-gray-50 text-gray-700 ring-1 ring-gray-600/10',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  icon?: React.ElementType
}

function Badge({ className, variant, icon: Icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {Icon && <Icon className="mr-1 h-3 w-3" />}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
