# IA & Claude Code — Landing Page

Landing page institucional premium sobre **a importância da Inteligência Artificial na criação de sites**, com foco no Claude Code. Desenvolvida do zero com Vite + React 18, CSS Modules e Framer Motion, seguindo o padrão visual de produtos como Stripe, Linear e Vercel.

🌐 **Demo ao vivo:** [Grn144.github.io/site-IA](https://Grn144.github.io/site-IA/)

---

## Visão Geral

O projeto é uma single-page application (SPA) institucional em **Português (BR)**, com design dark premium, animações suaves e layout totalmente responsivo. Todo o conteúdo é centralizado em um único arquivo de dados, facilitando atualizações de copy sem tocar nos componentes.

### Seções

| Seção | Descrição |
|---|---|
| **Hero** | Vídeo de fundo com overlay, headline principal, dois CTAs e scroll indicator animado |
| **Sobre** | Explicação do Claude Code com 4 cards de pilares (Arquitetura, Código, Iteração, Deploy) |
| **Como Funciona** | 3 passos numerados: Descreva → Claude gera → Publique |
| **O que você pode criar** | Grid de 6 casos de uso (Landing Pages, E-commerce, Blogs, Dashboards, Institucionais, Web Apps) |
| **FAQ** | Acordeão interativo com 6 perguntas frequentes |
| **CTA Final** | Seção de fechamento com gradiente e botões de ação |

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Build | Vite 5 |
| Framework | React 18 (function components + hooks) |
| Linguagem | JavaScript ES2022+ |
| Estilização | CSS Modules + tokens globais (`variables.css`) |
| Animações | Framer Motion 11 (`whileInView`, `staggerChildren`, `AnimatePresence`) |
| Ícones | lucide-react |
| Lint/Format | ESLint + Prettier |
| Deploy | GitHub Pages via GitHub Actions |

---

## Estrutura de Pastas

```
site_IA/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Deploy automático para GitHub Pages
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── main.jsx                # Entry point — importa estilos globais
│   ├── App.jsx                 # Composição de todas as seções
│   ├── assets/
│   │   └── videos/
│   │       └── robot-hero.mp4  # Vídeo do Hero
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container/      # Wrapper com max-width centralizado
│   │   │   ├── Navbar/         # Navbar sticky com scrollspy
│   │   │   └── Footer/         # Rodapé minimalista
│   │   ├── ui/
│   │   │   ├── Badge/          # Pill de categoria
│   │   │   ├── Button/         # Botão primary/ghost, suporta <a> ou <button>
│   │   │   ├── Card/           # Card glassmorphism com hover
│   │   │   └── SectionHeading/ # h2 com badge, destaque gradiente e subtítulo
│   │   └── sections/
│   │       ├── Hero/           # Vídeo + headline + CTAs
│   │       ├── About/          # 4 pilares do Claude Code
│   │       ├── HowItWorks/     # 3 passos do processo
│   │       ├── UseCases/       # 6 casos de uso
│   │       ├── FAQ/            # Acordeão de perguntas
│   │       └── CtaFinal/       # Seção de fechamento
│   ├── data/
│   │   └── content.js          # Todo o copy PT-BR centralizado
│   ├── hooks/
│   │   ├── useScrollReveal.js  # Variantes Framer Motion com suporte a prefers-reduced-motion
│   │   ├── useActiveSection.js # IntersectionObserver para scrollspy da Navbar
│   │   └── useMediaQuery.js    # Breakpoints reativos
│   ├── styles/
│   │   ├── variables.css       # Tokens de design (:root)
│   │   ├── global.css          # Reset, tipografia, scroll behavior
│   │   └── animations.css      # @keyframes reutilizáveis
│   └── utils/
│       └── constants.js        # SECTIONS, BREAKPOINTS, ANIMATION
├── docs/
│   └── architecture.md         # Documentação de arquitetura
├── .eslintrc.cjs
├── .prettierrc
├── vite.config.js
└── package.json
```

---

## Design System

### Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#0A0A0F` | Fundo principal |
| `--color-surface` | `#111118` | Cards e seções alternadas |
| `--color-brand-from` | `#7C3AED` | Roxo — início do gradiente |
| `--color-brand-to` | `#2563EB` | Azul — fim do gradiente |
| `--color-brand-accent` | `#A78BFA` | Destaques e ícones |
| `--color-text-primary` | `#F1F1F5` | Texto principal |
| `--color-text-secondary` | `#8B8FA8` | Texto secundário |

### Tipografia

Fonte: **Inter** (Google Fonts)

| Token | Valor | Uso |
|---|---|---|
| `--text-display` | `clamp(2.5rem, 6vw, 5rem)` | Headline do Hero |
| `--text-h2` | `clamp(1.75rem, 3.5vw, 2.75rem)` | Títulos de seção |
| `--text-h3` | `clamp(1.1rem, 2vw, 1.35rem)` | Títulos de card |
| `--text-body` | `clamp(0.9rem, 1.5vw, 1.1rem)` | Texto corrido |

---

## Hooks Customizados

### `useScrollReveal`
Retorna variantes do Framer Motion (`fadeUpVariants`, `staggerContainerVariants`, `cardVariants`) para animações de scroll reveal. Respeita `prefers-reduced-motion` via `useReducedMotion()` — devolve variantes vazias quando o usuário prefere menos movimento.

### `useActiveSection`
Usa `IntersectionObserver` para detectar qual seção está visível e retornar o ID ativo. Alimenta o scrollspy da Navbar para destacar o link da seção atual.

### `useMediaQuery`
Reage a mudanças de viewport via `window.matchMedia`. Util para lógica condicional baseada em breakpoints.

---

## Setup Local

```bash
# Clonar o repositório
git clone https://github.com/Grn144/site-IA.git
cd site-IA

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`.

### Adicionando o vídeo do Hero

O componente `Hero` espera o vídeo em:

```
src/assets/videos/robot-hero.mp4
```

Para reduzir o tamanho antes do deploy:

```bash
ffmpeg -i robot-hero.mp4 -vcodec libx264 -crf 28 -preset slow robot-hero-compressed.mp4
```

---

## Comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:5173` |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Pré-visualiza o build de produção em `http://localhost:4173` |
| `npm run lint` | Verifica erros com ESLint (0 warnings permitidos) |

---

## Deploy

### GitHub Pages (automático)

O deploy é feito automaticamente via GitHub Actions a cada push na branch `master`.

Para ativar na primeira vez:
1. Acesse **Settings → Pages** no repositório
2. Em **Source**, selecione **GitHub Actions**
3. O próximo push fará o deploy automaticamente

O site ficará disponível em: `https://Grn144.github.io/site-IA/`

### Deploy manual (Vercel / Netlify)

```bash
npm run build
# Faça upload da pasta dist/ no painel do Vercel ou Netlify
```

> **Atenção:** para deploy em subpath (ex: GitHub Pages), o `base` em `vite.config.js` deve corresponder ao nome do repositório. Para deploy na raiz do domínio (Vercel/Netlify), remova ou deixe `base: '/'`.

---

## Acessibilidade

- HTML semântico: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `aria-label` em todas as seções e elementos interativos
- `aria-hidden` em elementos decorativos
- `prefers-reduced-motion` respeitado em animações CSS e Framer Motion
- `scroll-behavior: auto` ativado quando o usuário prefere menos movimento
- `:focus-visible` com outline de marca em todos os elementos focáveis
- Contraste de texto AA em toda a paleta

---

## Licença

Este projeto foi desenvolvido com fins educacionais e de demonstração.  
Construído com [Claude Code](https://claude.ai/code) — Anthropic.
