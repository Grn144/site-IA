# Design: Landing Page Institucional — IA & Claude Code

**Data:** 2026-06-23  
**Status:** Aprovado  
**Idioma do site:** Português (BR)  

---

## Objetivo

Landing page institucional premium de página única sobre o tema:
> "A importância da Inteligência Artificial na criação de sites — com foco no Claude Code"

Comunica como o Claude Code transforma o desenvolvimento web permitindo criar sites completos via prompts. Padrão visual e de código equivalente ao de Stripe, Linear e Vercel.

---

## Stack Técnica

| Camada | Escolha |
|---|---|
| Build | Vite (última versão estável) |
| Framework | React 18+ (function components + hooks) |
| Linguagem | JavaScript ES2022+ (sem TypeScript) |
| Estilização | CSS Modules por componente + camada global (`variables.css`, `global.css`, `animations.css`) |
| Animações | Framer Motion (`whileInView`, `staggerChildren`, `useReducedMotion`) |
| Ícones | lucide-react |
| Roteamento | Nenhum — scroll/anchor navigation com `IntersectionObserver` |
| Lint/Format | ESLint + Prettier |
| Deploy | Estático — Vercel/Netlify |

---

## Arquitetura de Pastas

```
ia-claude-code-landing/
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── assets/
│   │   └── videos/
│   │       └── robot-hero.mp4
│   ├── styles/
│   │   ├── variables.css       # design tokens (:root)
│   │   ├── global.css          # box-sizing, scroll-behavior, font-face
│   │   └── animations.css      # @keyframes reutilizáveis
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── Container/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Badge/
│   │   │   └── SectionHeading/
│   │   └── sections/
│   │       ├── Hero/
│   │       └── About/
│   ├── hooks/
│   │   ├── useScrollReveal.js
│   │   ├── useActiveSection.js
│   │   └── useMediaQuery.js
│   ├── data/
│   │   └── content.js          # todo o copy PT-BR
│   └── utils/
│       └── constants.js
├── docs/
├── .eslintrc.cjs
├── .prettierrc
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

**Princípio de CSS:** camada global importada uma única vez em `main.jsx`; responsividade mobile-first dentro de cada `.module.css` via media queries. Nenhum CSS inline, nenhum arquivo monolítico.

---

## Design System (`variables.css`)

### Paleta — Gradiente Roxo → Azul

```css
--color-bg:          #0A0A0F;
--color-surface:     #111118;
--color-brand-from:  #7C3AED;
--color-brand-to:    #2563EB;
--color-brand-grad:  linear-gradient(135deg, #7C3AED, #2563EB);
--color-text-primary:   #F1F1F5;
--color-text-secondary: #8B8FA8;
--color-border-glass:   rgba(255,255,255,0.08);
```

### Tipografia — Inter (Google Fonts)

```css
--font-display: 'Inter', sans-serif;
--text-display: clamp(2.5rem, 6vw, 5rem);    /* hero headline */
--text-h2:      clamp(1.75rem, 3.5vw, 2.75rem);
--text-body:    clamp(0.9rem, 1.5vw, 1.1rem);
```

### Espaçamento (base 4px)

`--space-1` (4px) → `--space-2` (8px) → `--space-3` (12px) → `--space-4` (16px) → `--space-6` (24px) → `--space-8` (32px) → `--space-12` (48px) → `--space-16` (64px) → `--space-24` (96px) → `--space-32` (128px)

### Glassmorphism

```css
background: rgba(17, 17, 24, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

---

## Seções

### Navbar
- `position: sticky; top: 0; z-index: 100`
- Fundo transparente → glass ao rolar (`useActiveSection` + scroll listener)
- Logo wordmark | links âncora `#hero #sobre` | CTA "Começar agora"
- Link ativo destacado via scrollspy

### Hero
- **Vídeo:** `robot-hero.mp4` como background (`autoPlay muted loop playsInline`), copiado de Downloads durante setup
- **Overlay:** `rgba(10,10,15,0.65)` sobre o vídeo para legibilidade
- **Headline (h1):** *"O futuro da criação de sites já chegou — e ele entende o que você precisa"*
- **Subheadline:** explica Claude Code como ferramenta de criação via IA
- **CTAs:** primário gradiente "Começar agora" + ghost "Ver mais"
- **Scroll indicator:** chevron com bounce animation
- **Entrada:** `fade-in + slide-up` com `staggerChildren` (Framer Motion)

### About / Sobre
- Layout: grid 2 col desktop, 1 col mobile
- Texto explicativo à esquerda + grid de 4 pilares à direita
- **Pilares (Cards com ícone lucide-react):**
  1. **Arquitetura Automática** — ícone `Layers`
  2. **Código de Produção** — ícone `Code2`
  3. **Iteração por Linguagem Natural** — ícone `MessageSquare`
  4. **De Ideia ao Deploy** — ícone `Rocket`
- Cards entram em stagger `delay: index * 0.1s` via `whileInView`

### Footer
- Linha única: logo + links secundários + copyright
- Minimalista, alinhado ao design system

---

## Hooks

| Hook | Responsabilidade |
|---|---|
| `useScrollReveal` | Wraper de `whileInView` do Framer Motion para animações on-scroll |
| `useActiveSection` | IntersectionObserver — retorna seção ativa para scrollspy da Navbar |
| `useMediaQuery` | Breakpoints reativos via `window.matchMedia` |

---

## Requisitos Não Negociáveis

- HTML semântico: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Acessibilidade: `alt`, `aria-label`, contraste AA, `prefers-reduced-motion` via `useReducedMotion()`
- Mobile-first: breakpoints 480 / 768 / 1024 / 1280px
- SEO: `<title>`, `meta description`, Open Graph, único `<h1>`
- Copy separado em `data/content.js` — nunca hardcoded em JSX
- Sem comentários óbvios, sem código morto

---

## Estratégia de Animação

**Escolha: Framer Motion full (Opção A)**

- `whileInView` + `viewport={{ once: true }}` para scroll reveal
- `staggerChildren` nos grids de cards
- `useReducedMotion()` nativo do Framer para respeitar `prefers-reduced-motion`
- `AnimatePresence` reservado para transições futuras se necessário

---

## Ordem de Implementação

1. Init Vite + React, configurar ESLint/Prettier
2. Copiar vídeo do robô para `src/assets/videos/robot-hero.mp4`
3. Criar estrutura de pastas completa
4. Definir tokens em `variables.css`, `global.css`, `animations.css`
5. Construir componentes UI base (Button, Card, Badge, SectionHeading)
6. Construir Container, Navbar, Footer
7. Construir Hero (vídeo + overlay + copy + CTAs + animações)
8. Construir About (grid texto + 4 cards em stagger)
9. Implementar hooks (`useScrollReveal`, `useActiveSection`, `useMediaQuery`)
10. Revisar acessibilidade, responsividade, SEO
11. Escrever `docs/architecture.md`
12. Escrever `README.md` com instruções de setup e onde colocar o vídeo
