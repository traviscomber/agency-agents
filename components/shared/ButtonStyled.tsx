import React from 'react'
import { cn } from '@/lib/utils'
import {
  N3_ACCENT,
  N3_ACCENT_HOVER,
  N3_BORDER_MID,
  N3_CANVAS_MID,
  N3_TEXT_PRIMARY,
} from '@/lib/brandbook'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonStyledProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const variantStyles = {
  primary: `bg-[${N3_ACCENT}] text-[#06100f] font-semibold hover:bg-[${N3_ACCENT_HOVER}] transition-colors`,
  secondary: `border border-[${N3_BORDER_MID}] bg-[${N3_CANVAS_MID}] text-[${N3_TEXT_PRIMARY}] font-semibold hover:bg-[#142522] transition-colors`,
  tertiary: `text-[${N3_ACCENT}] font-semibold hover:text-[${N3_ACCENT_HOVER}] transition-colors`,
}

const sizeStyles = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function ButtonStyled({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonStyledProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        variantStyles[variant],
        sizeStyles[size],
        disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      style={{
        backgroundColor:
          variant === 'primary' ? N3_ACCENT : variant === 'secondary' ? N3_CANVAS_MID : 'transparent',
        borderColor: variant === 'secondary' ? N3_BORDER_MID : 'transparent',
        color:
          variant === 'primary'
            ? '#06100f'
            : variant === 'secondary'
              ? N3_TEXT_PRIMARY
              : N3_ACCENT,
      }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

// Convenience export as "Button" for easy import
export { ButtonStyled as Button }
