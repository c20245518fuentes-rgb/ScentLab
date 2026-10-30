# Scent Lab — Custom Perfume Studio

**Live site:** https://YOUR-USERNAME.github.io/YOUR-REPO/

## About

Scent Lab is a fictional custom perfume studio where visitors can explore fragrance families, build a fragrance concept, and browse a sample collection. The site is a frontend demonstration and uses illustrative demo content.

## Design System

### Palette (60-30-10)

| Role | Share | Color | Used for |
|---|---|---|---|
| Dominant | 60% | `#F5F0E8` | Page background |
| Secondary | 30% | `#29251F` | Cards, sections, navigation, footer |
| Accent | 10% | `#B58A5A` | Buttons, links, highlights |

*(Note: `#7A5A38` is used for small gold text on cream backgrounds to pass WCAG AA contrast for normal text).*

### Visual style

**Style chosen:** Luxury Minimalism

**Why I chose it:** To create a sophisticated fragrance brand using elegant serif typography, warm neutral colors, generous whitespace, and subtle animations that communicate craftsmanship.

### Contrast check

Body text color vs. background color: `#29251F` on `#F5F0E8`
Contrast ratio: **14.01 : 1** (exceeds 4.5 : 1 WCAG AA requirement)
Tool used: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Features

- [x] Mobile-first responsive layout
- [x] Dark mode toggle with `localStorage` persistence
- [x] Page-load intro animation (GSAP timeline)
- [x] Scroll reveals on every section below the hero (ScrollTrigger)
- [x] Scroll progress bar (scrub)
- [x] Reduced-motion support (via `gsap.matchMedia()`)
- [x] Interactive 3-step fragrance customizer
- [x] Semantic form validation

## Built With

HTML, Tailwind CSS, JavaScript, GSAP, ScrollTrigger