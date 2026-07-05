# Design System Guide — N3uralia AgencyOS

## Overview

The design system consists of 4 core components built from `lib/brandbook.ts` tokens. All use sharp edges (no border-radius) and the sage-teal accent color.

---

## 1. Typography Component

**File:** `components/shared/Typography.tsx`

### H1Hero
Largest heading for landing page hero sections.
```tsx
import { H1Hero } from '@/components/shared/Typography'

<H1Hero>
  Build agents that run your operations
</H1Hero>
```
- Size: `text-5xl md:text-7xl lg:text-[5.5rem]`
- Weight: `font-light`
- Usage: Landing hero, page headers

### H2Section
Large section heading.
```tsx
import { H2Section } from '@/components/shared/Typography'

<H2Section>
  How it becomes a system
</H2Section>
```
- Size: `text-4xl md:text-6xl`
- Weight: `font-light`
- Usage: Section titles, major content breaks

### H3
Standard medium heading.
```tsx
import { H3 } from '@/components/shared/Typography'

<H3>
  Agents absorb repetitive load
</H3>
```
- Size: `text-2xl`
- Weight: `font-light`
- Usage: Subsections, card titles

### Eyebrow
Small label above headings.
```tsx
import { Eyebrow } from '@/components/shared/Typography'

<Eyebrow>TWIN CONTROL SURFACE</Eyebrow>
<H2Section>Replicable by role</H2Section>
```
- Size: `text-xs`
- Weight: `font-semibold`
- Tracking: `tracking-[0.24em]`
- Color: `#789b96` (accent-dim)
- Usage: Above section headings, status labels

### Body
Standard paragraph text.
```tsx
import { Body } from '@/components/shared/Typography'

<Body variant="light">
  Our agents are built for Chilean SMBs
</Body>

<Body variant="dark">
  Deep technical details go here
</Body>
```
- Size: `text-base`
- Line-height: `leading-8`
- Variant: `light` or `dark`
- Usage: Paragraphs, descriptions

### MonoStep
Monospace number for steps (01, 02, etc).
```tsx
import { MonoStep } from '@/components/shared/Typography'

<MonoStep>01</MonoStep>
```
- Font: `font-mono`
- Size: `text-xs`
- Color: `#a7b9b4` (text-sub-dark)
- Usage: Step numbers in numbered lists

### HeadingWithEyebrow
Convenience component for the common pattern.
```tsx
import { HeadingWithEyebrow } from '@/components/shared/Typography'

<HeadingWithEyebrow
  eyebrow="IMPLEMENTATION RHYTHM"
  level="h2"
>
  Measurement, not hope
</HeadingWithEyebrow>
```

---

## 2. Button Component

**File:** `components/shared/ButtonStyled.tsx`

### Primary Button
Main call-to-action button.
```tsx
import { Button } from '@/components/shared/ButtonStyled'

<Button variant="primary" size="md">
  Start free
</Button>
```
- Background: `#8fb2aa` (sage-teal)
- Text: `#06100f` (deep dark)
- Hover: `#d9e3e0` (accent-hover)
- No border-radius

### Secondary Button
Alternative action button.
```tsx
<Button variant="secondary" size="md">
  Learn more
</Button>
```
- Border: `1px solid #28413d`
- Background: `#0b1715` (canvas-mid)
- Text: `#e7eeee` (light)
- No border-radius

### Tertiary Button
Text-only button.
```tsx
<Button variant="tertiary" size="md">
  View details
</Button>
```
- No background, no border
- Text: `#8fb2aa` (accent)
- Hover: `#d9e3e0` (accent-hover)

### Sizes
- `sm`: `px-3 py-2 text-xs`
- `md`: `px-5 py-3 text-sm` (default)
- `lg`: `px-6 py-3 text-base`

### Loading State
```tsx
<Button variant="primary" isLoading>
  Creating...
</Button>
```
Shows animated spinner on the left.

---

## 3. Card Component

**File:** `components/shared/CardStyled.tsx`

### Basic Card
```tsx
import { Card } from '@/components/shared/CardStyled'

<Card variant="light" className="p-6">
  <h3>Card title</h3>
  <p>Card content</p>
</Card>
```

### Card with Compound Structure
```tsx
<Card variant="dark" className="p-0">
  <Card.Header className="p-6">
    <h3>Title</h3>
  </Card.Header>
  <Card.Content className="p-6">
    Content here
  </Card.Content>
  <Card.Footer className="p-6">
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

### Variants
- `light`: `border #d8e5e2`, `bg #fbfbfa`
- `dark`: `border #1e3431`, `bg #0d1917`

### Interactive Mode
```tsx
<Card variant="light" interactive className="p-6">
  Hover to see shadow effect
</Card>
```

### No Border-Radius
All cards have sharp edges (0 border-radius).

---

## 4. Badge Component

**File:** `components/shared/BadgeStyled.tsx`

### Light Badge
```tsx
import { Badge } from '@/components/shared/BadgeStyled'

<Badge variant="light" size="md">
  Chile & Latam
</Badge>
```
- Border: `1px solid #d8e5e2`
- Background: `#fbfbfa`
- Text: `#789b96` (accent-dim)
- Uppercase, tracking-[0.18em]

### Dark Badge
```tsx
<Badge variant="dark" size="md">
  Operational System
</Badge>
```
- Border: `1px solid #1e3431`
- Background: `#0d1917`
- Text: `#f5fbfa` (text-primary)

### Accent Badge
```tsx
<Badge variant="accent" size="md">
  12-minute setup
</Badge>
```
- Border: `1px solid #8fb2aa`
- Background: Transparent
- Text: `#8fb2aa` (accent)

### Badge.Eyebrow
Section label variant (same as Eyebrow component).
```tsx
<Badge.Eyebrow>TWIN OPERATING LOOP</Badge.Eyebrow>
```

### Badge.Inline
Inline text with accent color.
```tsx
<p>
  This is <Badge.Inline>highlighted</Badge.Inline> text.
</p>
```

### Sizes
- `sm`: `px-2 py-1 text-[10px]`
- `md`: `px-3 py-2 text-xs` (default)

---

## Best Practices

### 1. Always Use Brandbook Tokens
```tsx
// ✅ Good
import { N3_ACCENT } from '@/lib/brandbook'
<Button style={{ color: N3_ACCENT }}>

// ❌ Bad
<Button style={{ color: '#8fb2aa' }}>
```

### 2. No Rounded Corners
```tsx
// ✅ Good
<Card variant="light">
  Content
</Card>

// ❌ Bad
<div className="rounded-lg border border-gray-200">
```

### 3. Use Compound Components for Structure
```tsx
// ✅ Good
<Card variant="light">
  <Card.Header>Title</Card.Header>
  <Card.Content>Content</Card.Content>
</Card>

// ❌ Bad
<div className="border p-6">
  <div className="border-b pb-4">Title</div>
  <div className="pt-4">Content</div>
</div>
```

### 4. Proper Typography Hierarchy
```tsx
// ✅ Good
<div>
  <Eyebrow>SECTION LABEL</Eyebrow>
  <H2Section>Main Heading</H2Section>
  <Body>Supporting text</Body>
</div>

// ❌ Bad
<h2>SECTION LABEL Main Heading</h2>
<p>Supporting text</p>
```

### 5. Consistent Button Usage
```tsx
// ✅ Good
<Button variant="primary" size="lg">
  Primary action
</Button>
<Button variant="secondary">
  Secondary action
</Button>

// ❌ Bad
<button className="bg-blue-500 px-6 py-3">
  Click me
</button>
```

---

## Token Reference

All tokens are in `lib/brandbook.ts`. Key ones:

**Canvas (Dark Backgrounds)**
- `N3_CANVAS` — `#060a10` (darkest)
- `N3_CANVAS_MID` — `#0b1715` (mid)
- `N3_CANVAS_SURFACE` — `#102624` (raised)

**Borders**
- `N3_BORDER_DARK` — `#1e3431` (dark cards)
- `N3_BORDER_LIGHT` — `#d8e5e2` (light cards)

**Accent (Sage-Teal)**
- `N3_ACCENT` — `#8fb2aa` (primary brand)
- `N3_ACCENT_HOVER` — `#d9e3e0` (on hover)
- `N3_ACCENT_DIM` — `#789b96` (labels)

**Text**
- `N3_TEXT_PRIMARY` — `#f5fbfa` (on dark)
- `N3_HEADING_DARK` — `#173634` (on light)

---

## What's Next

These 4 components unblock:
1. Landing page redesign (Phase 2.2)
2. Auth page styling (Phase 2.3)
3. App page updates (Phase 3)
4. Admin panel (Phase 4)

All pages should import from these components instead of creating custom styles.
