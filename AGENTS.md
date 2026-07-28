<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ghost Studio — Projeto de Referência

## Stack
- **Next.js 16** (App Router, standalone output)
- **React 19** + **TypeScript 5** (strict mode)
- **Tailwind CSS v4** (PostCSS plugin)
- **GSAP 3** + **@gsap/react** (animações Hero, Ken Burns, ScrollTrigger)
- **Lenis** (smooth scroll via SmoothScrollProvider)
- **Framer Motion** (animações de entrada com whileInView)
- **Swiper** (carrosséis mobile: Testimonials, Blog)
- **lucide-react** (ícones)
- **react-hook-form** (formulário de contato)
- **i18n custom** (pt/en/zh com Context + localStorage)

## Estrutura de Rotas
```
src/app/
├── layout.tsx           → RootLayout (fontes + SmoothScrollProvider + I18nProvider)
├── page.tsx             → Home: Hero apenas
├── work/page.tsx        → Portfolio: PortfolioShowcaseGrid (bento grid 4×3, viewport-fit)
├── services/page.tsx    → Services: lista de serviços
├── about/page.tsx       → About: WhyWorkWithUs + BentoGrid
├── contact/page.tsx     → Contact: ContactForm + Footer
└── blog/[slug]/page.tsx → Blog: artigos SSG dinâmicos
```

## Componentes (26 arquivos, todos "use client")
```
src/components/
├── Header.tsx              → Header fixo + menu mobile + MosaicProvider integration
├── Hero.tsx                → Video bg + GSAP timeline + Ken Burns + bottom bar
├── PortfolioShowcaseGrid.tsx → CSS Grid 4×3 com fr units, 100dvh, viewport-fit
├── ShowcaseCard.tsx        → Video tiles com VideoPlaybackPool, click desktop+mobile
├── Services.tsx            → Lista de serviços com capaservices.jpeg bg
├── WhyWorkWithUs.tsx       → 2 video blocks + BentoGrid
├── BentoGrid.tsx           → 10-image CSS Grid (desktop 4col, mobile 2col)
├── VideoShowcase.tsx       → Seção de vídeo lazy-loaded
├── BrazilShowcase.tsx      → Seção Brasil lazy-loaded
├── TrustedBy.tsx           → Marquee de logos (CSS animation) — removido da home
├── Testimonials.tsx        → Cards de depoimentos (Swiper mobile)
├── FAQ.tsx                 → Accordion de perguntas
├── Blog.tsx                → Artigos (Swiper mobile, masonry grid)
├── BlogCard.tsx            → Card individual de blog
├── BlogArticle.tsx         → Página de artigo completo
├── ContactForm.tsx         → Formulário de contato (placeholder, sem backend)
├── Footer.tsx              → Newsletter + social links
├── LanguageSwitcher.tsx    → Toggle PT/EN/ZH
├── SmoothScrollProvider.tsx → Lenis + GSAP ScrollTrigger wiring
├── ChunkErrorBoundary.tsx  → Error boundary para chunk load errors
├── SpriteAnimation.tsx     → [DEAD CODE] sprites removidos
├── Mosaic/
│   ├── MosaicProvider.tsx  → Context state para overlay
│   ├── MosaicOverlay.tsx   → Overlay com bento grid + hover blur
│   ├── MosaicGrid.tsx      → Grid de imagens do mosaic
│   ├── Lightbox.tsx        → Lightbox fullscreen (mobile + desktop)
│   └── BackToGhostBox.tsx  → Botão "Back to Ghost"
```

## Padrões Identificados
1. **Multi-rota** com layout compartilhado (Header + SmoothScrollProvider + I18nProvider)
2. **Viewport-fit** no /work — zero scroll, CSS Grid com fr units, 100dvh
3. **VideoPlaybackPool** — gerenciamento centralizado de concorrência de vídeo (desktop=6, mobile=3, low-end=2)
4. **Lazy-loading de vídeo** via IntersectionObserver + poster fallback
5. **GSAP** para Hero (timeline + Ken Burns) + ScrollTrigger para scroll animations
6. **Framer Motion** para whileInView entrance animations em 11 componentes
7. **Responsivo mobile-first** com Tailwind breakpoints (md:, lg:)
8. **i18n custom** com Context API + persistência em localStorage (EN default)
9. **Swiper** para carrosséis em mobile (Testimonials, Blog)
10. **Mosaic overlay** com bento grid, hover blur, lightbox fullscreen

## Deploy
- **Docker** standalone multi-stage build (node:20-alpine, non-root user)
- **GitHub Actions** deploy via SSH (push to main → docker compose up)
- **Nginx** reverse proxy (ghost.felbatista.tech, port 8082)
- **Lighthouse CI** com budgets (Performance ≥0.9, Accessibility ≥0.9, LCP ≤2.5s, CLS ≤0.1)

## Tipo de Projeto: Landing Page / Marketing

**Conceitos relevantes para esta análise:**
1. Rendering Pipeline
2. Design System
3. Accessibility
4. Bundle Architecture
5. Performance Budgets
6. Design Responsivo/Mobile
