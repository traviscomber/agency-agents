import React from 'react'
import { cn } from '@/lib/utils'
import {
  N3_SURFACE_WHITE,
  N3_BORDER_LIGHT,
  N3_ACCENT_DIM,
  N3_CANVAS_SURFACE,
  N3_BORDER_DARK,
  N3_TEXT_PRIMARY,
  N3_ACCENT,
} from '@/lib/brandbook'

type BadgeVariant = 'light' | 'dark' | 'accent'
type BadgeSize = 'sm' | 'md'

interface BadgeStyledProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

const variantStyles = {
  light: {
    border: N3_BORDER_LIGHT,
    bg: N3_SURFACE_WHITE,
    text: N3_ACCENT_DIM,
  },
  dark: {
    border: N3_BORDER_DARK,
    bg: N3_CANVAS_SURFACE,
    text: N3_TEXT_PRIMARY,
  },
  accent: {
    border: N3_ACCENT,
    bg: 'transparent',
    text: N3_ACCENT,
  },
}

const sizeStyles = {
  sm: 'px-2 py-1 text-[10px]',
  md: 'px-3 py-2 text-xs',
}

/**
 * BadgeStyled — Tag/badge component with sharp borders.
 * No border-radius for N3uralia aesthetic.
 */
export function BadgeStyled({
  variant = 'light',
  size = 'md',
  className,
  children,
  ...props
}: BadgeStyledProps) {
  const styles = variantStyles[variant]

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold uppercase tracking-[0.18em] transition-colors duration-200',
        sizeStyles[size],
        className
      )}
      style={{
        border: `1px solid ${styles.border}`,
        backgroundColor: styles.bg,
        color: styles.text,
      }}
      {...props}
    >
      {children}
    </span>
  )
}

/**
 * Badge.Eyebrow — Special variant for section eyebrow labels (above headings)
 */
export function BadgeEyebrow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-xs font-semibold uppercase tracking-[0.24em]',
        className
      )}
      style={{ color: N3_ACCENT_DIM }}
      {...props}
    >
      {children}
    </p>
  )
}

/**
 * Badge.Inline — Inline text badge with accent color
 */
export function BadgeInline({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('font-semibold', className)}
      style={{ color: N3_ACCENT }}
      {...props}
    >
      {children}
    </span>
  )
}

// Compound component pattern
export const Badge = Object.assign(BadgeStyled, {
  Eyebrow: BadgeEyebrow,
  Inline: BadgeInline,
})
