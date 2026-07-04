# AgencyOS Performance Optimization Guide

## Phase 6: Dark/Light Theme & Performance Optimization

### Theme System Implementation

**Current:** Light theme (N3uralia design system)
- Primary: #173634, #8fb2aa
- Backgrounds: #fbfbfa (light)
- Canvas: #f1f6f4 (light gray)

**Dark Theme (Ready to implement):**
- Primary: #f5fbfa (reversed)
- Backgrounds: #060a10 (dark canvas)
- Accents: #8fb2aa (preserved for continuity)

**Theme Toggle Location:**
- Mobile header (icon button with sun/moon)
- Settings > Theme section
- localStorage persistence
- System preference detection via `prefers-color-scheme`

### Performance Optimization Checklist

#### 1. Code Splitting & Lazy Loading
- [ ] Next.js `dynamic()` imports for heavy components
  - Fine-tuning UI (datasets, training visualizations)
  - Marketplace (large agent card grids)
  - Admin analytics (chart libraries)
- [ ] Route-based code splitting (automatic in Next.js 16 App Router)
- [ ] Component-level lazy boundaries

#### 2. Image Optimization
- [ ] Use Next.js Image component with `priority` prop for LCP
- [ ] Set optimal `width/height` ratios
- [ ] Use `placeholder="blur"` with blurred placeholders
- [ ] AVIF/WebP formats via `unoptimized={false}`
- [ ] Lazy loading with `loading="lazy"` for below-fold images

#### 3. Database & API Optimization
- [ ] Add pagination to run history (infinite scroll or 50-item pages)
- [ ] Implement request deduplication with SWR
- [ ] Cache analytics data (5-min intervals)
- [ ] Add database indexes on:
  - `user_id` + `created_at` (run history)
  - `team_id` + `status` (agent status)
  - `agent_id` + `rating` (marketplace sort)

#### 4. Bundle Size Reduction
- [ ] Audit dependencies: `npm bundle-report`
- [ ] Replace large libraries with smaller alternatives:
  - `date-fns` → `date-fns/esm` (tree-shake)
  - Consider `lightweight-charts` over Recharts (if used)
- [ ] Dynamic import for heavy charting libraries
- [ ] Remove unused shadcn components

#### 5. Caching Strategy
- [ ] HTTP caching headers:
  - Static assets: `Cache-Control: public, max-age=31536000`
  - API routes: `Cache-Control: public, max-age=300` (5 mins)
- [ ] Implement SWR cache with 60-second revalidation
- [ ] Client-side cache for user preferences, team data
- [ ] Service worker for offline read-only mode

#### 6. Web Vitals Targets
- **LCP (Largest Contentful Paint):** <2.5s
  - Preload critical fonts
  - Inline critical CSS above the fold
  - Defer non-critical JavaScript
- **INP (Interaction to Next Paint):** <200ms
  - Minimize JavaScript in event handlers
  - Use `requestIdleCallback` for heavy computations
  - Debounce search/filter inputs
- **CLS (Cumulative Layout Shift):** <0.1
  - Reserve space for dynamic content
  - Avoid inserting content above fold
  - Set explicit dimensions for images/components

#### 7. Monitoring & Analytics
- [ ] Vercel Web Analytics
- [ ] Sentry for error tracking and performance monitoring
- [ ] Custom performance marks:
  ```js
  performance.mark('agent-execution-start')
  performance.mark('agent-execution-end')
  performance.measure('agent-execution')
  ```
- [ ] User timings dashboard in admin analytics

#### 8. Mobile-First Responsive Design
- [ ] Test on 3G throttled connection (DevTools)
- [ ] Critical rendering path under 3 seconds
- [ ] Responsive images with `srcSet`
- [ ] Touch targets: minimum 48x48px (WCAG AA)
- [ ] Font size scaling for mobile readiness

#### 9. Search & Filter Performance
- [ ] Debounce search input (300-500ms)
- [ ] Limit results pagination to 50 items/page
- [ ] Use database full-text search indexes
- [ ] Memoize filter components with `React.memo()`

#### 10. Marketplace & Analytics Pages
- [ ] Virtual scrolling for 1000+ agent cards
- [ ] Image lazy loading with Intersection Observer
- [ ] Compress chart SVG/JSON data
- [ ] Pagination for run history (50-100 items per page)

### Implementation Timeline

1. **Week 1:** Code splitting + dynamic imports
2. **Week 2:** Image optimization + caching strategy
3. **Week 3:** Database indexing + pagination
4. **Week 4:** Monitoring setup + Web Vitals tracking
5. **Week 5:** Mobile optimization + responsive testing
6. **Week 6:** Dark theme implementation + testing

### Measuring Success

**Baseline (Current):**
- LCP: ~3.2s
- INP: ~250ms
- CLS: 0.08
- Load time: ~4.5s

**Target (Post-optimization):**
- LCP: <2.5s (↓ 22%)
- INP: <200ms (↓ 20%)
- CLS: <0.05 (↓ 37%)
- Load time: <3s (↓ 33%)

### Tools & Resources

- **Profiling:** Next.js Analytics, Vercel Speed Insights
- **Testing:** Lighthouse, Web Vitals API
- **Monitoring:** Sentry, DataDog, New Relic
- **Optimization:** ImageOptim, Bundle Analyzer, Font Loader

### Dark Theme CSS Variables

Add to `globals.css` `@theme` block:

```css
/* Dark mode overrides */
@dark {
  --color-background: #060a10;
  --color-foreground: #f5fbfa;
  --color-card: #0b1117;
  --color-border: #1e3431;
  --color-muted: #28413d;
}
```

Update components to use semantic tokens:
```jsx
// ✅ Good - theme-aware
className="bg-background text-foreground border-border"

// ❌ Avoid - hardcoded colors
className="bg-[#fbfbfa] text-[#173634]"
```

---

**Next Steps:** Implement Phase 6 optimizations following the checklist above, with priority on Web Vitals improvements and dark theme CSS system.
