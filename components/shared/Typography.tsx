import React from 'react'
import { cn } from '@/lib/utils'
import {
  TYPE_EYEBROW,
  TYPE_H1_HERO,
  TYPE_H2_SECTION,
  TYPE_H3,
  TYPE_BODY,
  N3_TEXT_SUB_DARK,
  N3_HEADING_DARK,
  N3_TEXT_BODY_LIGHT,
  N3_ACCENT_DIM,
} from '@/lib/brandbook'

// ──────────────────────────────────────────────────────────────────────────
// H1 Hero — Largest heading for landing page hero section
// ──────────────────────────────────────────────────────────────────────────
export function H1Hero({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn(TYPE_H1_HERO, className)} {...props}>
      {children}
    </h1>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// H2 Section — Large section heading
// ──────────────────────────────────────────────────────────────────────────
export function H2Section({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn(TYPE_H2_SECTION, className)} {...props}>
      {children}
    </h2>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// H3 — Standard heading
// ──────────────────────────────────────────────────────────────────────────
export function H3({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn(TYPE_H3, className)} {...props}>
      {children}
    </h3>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Eyebrow — Small label above headings
// ──────────────────────────────────────────────────────────────────────────
export function Eyebrow({
  children,
  className,
  color = N3_ACCENT_DIM,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { color?: string }) {
  return (
    <p className={cn(TYPE_EYEBROW, `text-[${color}]`, className)} style={{ color }} {...props}>
      {children}
    </p>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Body Text — Standard paragraph text
// ──────────────────────────────────────────────────────────────────────────
export function Body({
  children,
  className,
  variant = 'light',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { variant?: 'light' | 'dark' }) {
  const colorMap = {
    light: N3_TEXT_BODY_LIGHT,
    dark: '#d9e3e0',
  }

  return (
    <p
      className={cn('text-base leading-8', className)}
      style={{ color: colorMap[variant] }}
      {...props}
    >
      {children}
    </p>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Mono Step Number — For numbered steps (01, 02, etc)
// ──────────────────────────────────────────────────────────────────────────
export function MonoStep({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('font-mono text-xs', `text-[${N3_TEXT_SUB_DARK}]`, className)} style={{ color: N3_TEXT_SUB_DARK }} {...props}>
      {children}
    </p>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Heading with Eyebrow — Convenience component for the common pattern
// ──────────────────────────────────────────────────────────────────────────
export function HeadingWithEyebrow({
  eyebrow,
  children,
  headingClassName,
  eyebrowClassName,
  level = 'h2',
  ...props
}: {
  eyebrow: React.ReactNode
  children: React.ReactNode
  headingClassName?: string
  eyebrowClassName?: string
  level?: 'h1' | 'h2' | 'h3'
} & React.HTMLAttributes<HTMLElement>) {
  const HeadingComponent = {
    h1: H1Hero,
    h2: H2Section,
    h3: H3,
  }[level]

  return (
    <div {...props}>
      <Eyebrow className={eyebrowClassName}>{eyebrow}</Eyebrow>
      <HeadingComponent className={cn('mt-3', headingClassName)}>{children}</HeadingComponent>
    </div>
  )
}
