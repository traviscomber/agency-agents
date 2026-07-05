import React from 'react'
import { cn } from '@/lib/utils'
import {
  N3_BORDER_DARK,
  N3_BORDER_LIGHT,
  N3_CANVAS_SURFACE,
  N3_SURFACE_WHITE,
} from '@/lib/brandbook'

type CardVariant = 'dark' | 'light'

interface CardStyledProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  interactive?: boolean
}

const variantStyles = {
  dark: `border border-[${N3_BORDER_DARK}] bg-[${N3_CANVAS_SURFACE}]`,
  light: `border border-[${N3_BORDER_LIGHT}] bg-[${N3_SURFACE_WHITE}]`,
}

/**
 * CardStyled — Sharp-edge card component with dark/light variants.
 * Zero border-radius for N3uralia aesthetic.
 */
export function CardStyled({
  variant = 'light',
  interactive = false,
  className,
  children,
  ...props
}: CardStyledProps) {
  return (
    <div
      className={cn(
        'transition-all duration-200',
        interactive && 'group hover:shadow-lg',
        className
      )}
      style={{
        border: `1px solid ${variant === 'dark' ? N3_BORDER_DARK : N3_BORDER_LIGHT}`,
        backgroundColor: variant === 'dark' ? N3_CANVAS_SURFACE : N3_SURFACE_WHITE,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card.Root — Container element with padding
 */
export function CardRoot({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * Card.Header — Top section for title/description
 */
export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('border-b border-current border-opacity-10 pb-4', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * Card.Content — Main content area
 */
export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('py-4', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * Card.Footer — Bottom section for actions
 */
export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('border-t border-current border-opacity-10 pt-4', className)} {...props}>
      {children}
    </div>
  )
}

// Compound component pattern
export const Card = Object.assign(CardStyled, {
  Root: CardRoot,
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
})
