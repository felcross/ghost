<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ghost Studio — Projeto de Referência

## Stack
- **Next.js 16** (App Router, standalone output)
- **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (PostCSS plugin)
- **Framer Motion** (animações)
- **Swiper** (carrosséis mobile)
- **lucide-react** (ícones)
- **i18n custom** (pt/en/zh com Context + localStorage)

## Estrutura
```
src/
├── app/
│   ├── layout.tsx      → RootLayout com fontes + I18nProvider
│   ├── page.tsx        → Página única com todas as seções
│   └── globals.css     → Imports Tailwind + animações custom
├── components/         → 13 componentes todos "use client"
│   ├── Header.tsx      → Header fixo + menu mobile
│   ├── Hero.tsx        → Video background + rotação de keywords
│   ├── VideoShowcase.tsx → Seção de vídeo lazy-loaded
│   ├── BrazilShowcase.tsx → Seção Brasil lazy-loaded
│   ├── TrustedBy.tsx   → Carrossel de logos (CSS animation)
│   ├── SelectedWork.tsx → Lista interativa de portfólio
│   ├── WhyWorkWithUs.tsx → Showcase de equipe
│   ├── Services.tsx    → Lista de serviços com imagens
│   ├── Testimonials.tsx → Cards de depoimentos (Swiper mobile)
│   ├── FAQ.tsx         → Accordion de perguntas
│   ├── Blog.tsx        → Artigos (Swiper mobile)
│   ├── Footer.tsx      → Newsletter + social links
│   └── LanguageSwitcher.tsx → Toggle PT/EN/ZH
└── i18n/               → Sistema de tradução custom
```

## Padrões Identificados
1. **Todos os componentes são client-side** ("use client")
2. **Arquitetura de página única** com navegação por hash (#work, #services, etc.)
3. **Lazy-loading de vídeo** via IntersectionObserver
4. **Animações** usando Framer Motion com triggers baseados em viewport
5. **Responsivo mobile-first** com Tailwind breakpoints (md:, lg:)
6. **i18n custom** com Context API + persistência em localStorage
7. **Swiper** para carrosséis em mobile (Testimonials, Blog)

## Tipo de Projeto: Landing Page / Marketing

**Conceitos relevantes para esta análise:**
1. Rendering Pipeline
2. Design System
3. Accessibility
4. Bundle Architecture
5. Performance Budgets
6. Design Responsivo/Mobile
