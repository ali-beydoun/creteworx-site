# Creteworx Design Principles
## Apple Liquid Glass Design System for Local Business Websites

This document captures Apple's Liquid Glass design principles as they apply to the Creteworx website. Use this as a reference when making design decisions to maintain visual consistency.

---

## What is Liquid Glass?

Liquid Glass is Apple's design language introduced at WWDC 2025 for iOS 26 and macOS Tahoe. It creates translucent UI elements that reflect and refract their surroundings while letting content shine through.

> "A digital meta-material that dynamically bends and shapes light" — Apple

**Key difference from old glassmorphism:** Liquid Glass isn't just frosted blur. It uses light bending on curved edges, localized distortion, and specular highlights that respond to context.

---

## Core Principles

### 1. Content Always Leads
- Glass elements float above content, never obscure it
- UI controls should enhance, not compete with hero imagery
- Keep glass transparent enough to see the image beneath

### 2. Three-Layer Composition
Every Liquid Glass element is built from three visual layers:

| Layer | Purpose |
|-------|---------|
| **Highlight** | Bright top edge simulating light catching glass |
| **Shadow** | Subtle bottom edge creating depth separation |
| **Illumination** | The translucent body with blur and tint |

### 3. Use Glass Sparingly
- Best for navigation layers (hero content boxes, CTAs)
- **Never layer glass on glass** — creates visual noise
- Reserve for focal points, not entire page sections

### 4. Dynamic Adaptation
- Glass should appear different over light vs dark backgrounds
- Color tints adapt to surrounding content
- Test glass elements over various background images

---

## CSS Implementation

### Base Glass Card
```css
.glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px) saturate(120%);
    -webkit-backdrop-filter: blur(16px) saturate(120%);
    border: 1.5px solid transparent;
    border-radius: 32px;
}
```

### Edge Effects (The "Natural Glass" Look)
```css
.glass-card {
    /* Gradient from light top to subtle dark bottom */
    background-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.12) 0%,    /* Bright top edge */
        rgba(255, 255, 255, 0.03) 8%,
        rgba(255, 255, 255, 0.01) 50%,   /* Clear middle */
        rgba(0, 0, 0, 0.02) 92%,
        rgba(0, 0, 0, 0.08) 100%         /* Dark bottom edge */
    );

    box-shadow:
        /* Outer glow */
        0 0 0 1px rgba(255, 255, 255, 0.08),
        /* Top highlight - bright edge */
        inset 0 1px 1px rgba(255, 255, 255, 0.4),
        inset 0 2px 4px rgba(255, 255, 255, 0.1),
        /* Bottom shadow - natural glass edge */
        inset 0 -1px 1px rgba(0, 0, 0, 0.15),
        /* Ambient shadow */
        0 8px 32px rgba(0, 0, 0, 0.15);
}
```

### Recommended Values

| Property | Light Glass | Medium Glass | Heavy Glass |
|----------|-------------|--------------|-------------|
| **Background opacity** | 0.03 (3%) | 0.08 (8%) | 0.15 (15%) |
| **Blur amount** | 12-16px | 20-30px | 40px+ |
| **Border radius** | 24-32px | 16-20px | 10-12px |
| **Top highlight** | 0.4 alpha | 0.3 alpha | 0.2 alpha |
| **Bottom shadow** | 0.15 alpha | 0.1 alpha | 0.08 alpha |

### Glass Chips/Pills (Feature Tags)
```css
.feature-chip {
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    box-shadow:
        0 2px 12px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.12);
}
```

### Accent-Tinted Glass (Blue)
```css
.feature-chip--accent {
    background: rgba(74, 111, 165, 0.25);
    border-color: rgba(107, 140, 186, 0.4);
}
```

---

## Color Guidelines

### Glass Tinting
- Tint glass to complement the brand (orange, blue accents)
- Keep tints subtle — 20-30% opacity maximum
- Ensure tinted glass maintains text legibility

### Text on Glass
- Use white text with subtle text-shadow for dark image backgrounds
- Add `text-shadow: 0 1px 2px rgba(0,0,0,0.15)` for legibility
- Never rely solely on blur for text contrast

### Brand Colors with Glass
| Element | Color | Glass Treatment |
|---------|-------|-----------------|
| Primary CTA | Orange (#ff6b35) | Solid with subtle inset highlight |
| Secondary CTA | Blue (#4a6fa5) | 25-30% opacity glass |
| Feature chips | White | 12% opacity glass |
| Accent chips | Blue | 25% opacity tinted glass |

---

## Do's and Don'ts

### Do
- **Test over multiple backgrounds** — glass that works on one image may fail on another
- **Prioritize legibility** — if text is hard to read, increase blur or add overlay
- **Use rounded corners** — Liquid Glass aligns with Apple's rounded hardware aesthetic
- **Add specular highlights** — the bright top edge is essential to the effect
- **Keep glass containers compact** — works best for focused content areas

### Don't
- **Never use `opacity` property** — it breaks backdrop-filter; use `rgba()` instead
- **Don't layer glass on glass** — creates muddy, illegible results
- **Don't over-blur** — 15-20px is usually sufficient; more looks messy
- **Don't use glass for body text areas** — reserve for navigation/hero elements
- **Don't forget the bottom shadow** — without it, glass looks flat

---

## Creteworx-Specific Applications

### Hero Sections
- Use light glass (3% opacity, 16px blur) for hero content containers
- Strong top highlight + bottom shadow for natural glass edges
- Keep hero images visible through the glass

### Feature Chips
- Use glass chips for key selling points (location, speed, trust signals)
- One chip can use accent color (blue) for visual variety
- Keep text short and scannable

### Call-to-Action Buttons
- Primary CTA: Solid orange with gradient and glow
- Secondary CTA: Blue-tinted glass for contrast variety
- Both should have rounded corners (14px+)

### Navigation
- Header uses existing glass treatment (frosted white)
- Mobile nav cards can use light glass effect
- Keep navigation functional over decorative

---

## Accessibility Considerations

### Contrast Requirements
- Test text contrast with WebAIM Contrast Checker
- Glass over busy images may need darker overlay
- Consider users with dyslexia — visual noise affects readability

### Fallbacks
- Always provide `-webkit-backdrop-filter` for Safari
- Test in browsers without backdrop-filter support
- Ensure content remains usable without glass effects

### Motion Sensitivity
- Specular highlights should be subtle, not animated
- Avoid continuous movement in glass effects
- Respect `prefers-reduced-motion` user preference

---

## Browser Support

| Browser | backdrop-filter | Notes |
|---------|-----------------|-------|
| Chrome | ✅ Full | Best support |
| Safari | ✅ Full | Requires `-webkit-` prefix |
| Firefox | ✅ Full | Since v103 |
| Edge | ✅ Full | Chromium-based |
| Older browsers | ❌ | Falls back to solid background |

---

## References

- [Apple Newsroom: Liquid Glass Announcement](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- [CSS-Tricks: Getting Clarity on Apple's Liquid Glass](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/)
- [Apple Developer: Meet Liquid Glass (WWDC25)](https://developer.apple.com/videos/play/wwdc2025/219/)
- [LiquidGlass.shop Implementation Guide](https://liquidglass.shop/en/guides/liquid-glass)

---

*Last updated: January 2026*
