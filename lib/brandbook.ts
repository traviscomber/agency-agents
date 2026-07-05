/**
 * N3uralia Studio Brandbook
 * Design system tokens — derived from the N3uralia visual language.
 * Single source of truth for all color, typography, and spacing decisions.
 */

// ── Canvas ──────────────────────────────────────────────────────────────────
export const N3_CANVAS        = '#060a10'   // deepest dark — hero bg
export const N3_CANVAS_MID    = '#0b1715'   // mid-dark panel bg
export const N3_CANVAS_SURFACE = '#102624'  // raised dark surface

// ── Borders ──────────────────────────────────────────────────────────────────
export const N3_BORDER_DARK   = '#1e3431'   // dark surface card border
export const N3_BORDER_MID    = '#28413d'   // slightly lighter dark border
export const N3_BORDER_LIGHT  = '#d8e5e2'   // light surface card border

// ── Accent (sage-teal) ────────────────────────────────────────────────────────
export const N3_ACCENT        = '#8fb2aa'   // primary brand accent
export const N3_ACCENT_HOVER  = '#d9e3e0'   // accent on hover / highlight
export const N3_ACCENT_DIM    = '#789b96'   // muted accent — labels
export const N3_ACCENT_XDIM   = '#9db7b1'   // very muted accent — nav links

// ── Text — Dark surface ───────────────────────────────────────────────────────
export const N3_TEXT_PRIMARY   = '#f5fbfa'  // main body text on dark
export const N3_TEXT_BODY_DARK = '#d9e3e0'  // secondary body on dark
export const N3_TEXT_SUB_DARK  = '#a7b9b4'  // sub-text / step numbers on dark

// ── Text — Light surface ──────────────────────────────────────────────────────
export const N3_HEADING_DARK   = '#173634'  // deep green heading on light bg
export const N3_TEXT_BODY_LIGHT = '#52605d' // body text on light bg
export const N3_TEXT_SUB_LIGHT  = '#65706d' // sub-text on light bg

// ── Light surfaces ────────────────────────────────────────────────────────────
export const N3_SURFACE_LIGHT  = '#f1f6f4'  // section / page bg on light
export const N3_SURFACE_WHITE  = '#fbfbfa'  // white-ish card bg
export const N3_SURFACE_ALT    = '#edf4f1'  // alternate stripe bg

// ── Utility ──────────────────────────────────────────────────────────────────
export const SHADOW_CARD_DARK  = '0 0 0 1px #1e3431'
export const SHADOW_CARD_LIGHT = '0 12px 36px -24px rgba(23,54,52,0.18)'

// ── Typography scale ──────────────────────────────────────────────────────────
export const TYPE_EYEBROW = 'text-xs font-semibold uppercase tracking-[0.24em]'
export const TYPE_MONO_STEP = 'font-mono text-xs text-[#a7b9b4]'
export const TYPE_H1_HERO = 'text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.94] tracking-[-0.025em]'
export const TYPE_H2_SECTION = 'text-4xl md:text-6xl font-light leading-tight'
export const TYPE_H3 = 'text-2xl font-light'
export const TYPE_BODY = 'text-base leading-8 text-[#9db7b1]'

// ── Buttons ──────────────────────────────────────────────────────────────────
export const BTN_PRIMARY = 'bg-[#8fb2aa] px-6 py-3 text-sm font-semibold text-[#06100f] hover:bg-[#7da099]'
export const BTN_SECONDARY = 'border border-[#28413d] bg-[#0b1715] px-5 py-3 text-sm font-semibold text-[#e7eeee] hover:bg-[#142522]'

// ── Cards & Layout ───────────────────────────────────────────────────────────
export const CARD_DARK = 'border border-[#1e3431] bg-[#0d1917]'
export const CARD_LIGHT = 'border border-[#d8e5e2] bg-[#fbfbfa]'
export const GRID_GAP_BORDER = 'gap-px border border-[#d8e5e2] bg-[#d8e5e2]'
export const MAX_WIDTH = 'max-w-7xl'
