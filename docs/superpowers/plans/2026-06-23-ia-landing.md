# Landing Page IA & Claude Code — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, production-ready single-page landing page in React + Vite about the role of AI (Claude Code) in modern web development, fully in Portuguese (BR).

**Architecture:** Single-page React 18 app with no router, assembled from isolated section components. CSS Modules handle per-component styles; `variables.css` provides shared design tokens. Framer Motion drives all scroll animations via `whileInView`. All text lives in `src/data/content.js`.

**Tech Stack:** Vite 5, React 18, CSS Modules, Framer Motion 11, lucide-react, ESLint, Prettier

## Global Constraints

- JavaScript only — no TypeScript
- CSS Modules per component — no inline styles, no monolithic CSS files
- Mobile-first media queries: 480px, 768px, 1024px, 1280px
- All copy in Portuguese (BR) via `src/data/content.js` — never hardcoded in JSX
- Color palette: `#0A0A0F` background, `#7C3AED → #2563EB` brand gradient
- `prefers-reduced-motion` respected via `useScrollReveal` hook
- One `<h1>` per page, semantic HTML throughout
- No comments unless WHY is non-obvious
- Commands run in PowerShell from: `C:\Users\guroc\OneDrive\Área de Trabalho\projetos\site_IA`

---

## File Map

```
package.json
vite.config.js
.eslintrc.cjs
.prettierrc
index.html
src/main.jsx                                         entry: imports global CSS, renders App
src/App.jsx                                          assembles all sections
src/data/content.js                                  all PT-BR copy
src/utils/constants.js                               breakpoints, SECTIONS array
src/styles/variables.css                             CSS custom properties (:root)
src/styles/global.css                                global rules, font import
src/styles/animations.css                            reusable @keyframes
src/assets/videos/robot-hero.mp4                     video (copied from Downloads in Task 2)
src/hooks/useMediaQuery.js
src/hooks/useActiveSection.js
src/hooks/useScrollReveal.js
src/components/ui/Button/Button.jsx + .module.css
src/components/ui/Badge/Badge.jsx + .module.css
src/components/ui/Card/Card.jsx + .module.css
src/components/ui/SectionHeading/SectionHeading.jsx + .module.css
src/components/layout/Container/Container.jsx + .module.css
src/components/layout/Navbar/Navbar.jsx + .module.css
src/components/layout/Footer/Footer.jsx + .module.css
src/components/sections/Hero/Hero.jsx + .module.css
src/components/sections/About/About.jsx + .module.css
public/favicon.svg
public/robots.txt
docs/architecture.md
README.md
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `vite.config.js`, `.eslintrc.cjs`, `.prettierrc`, `index.html`, `src/main.jsx`, `src/App.jsx`
- Create: all empty directories

**Interfaces:**
- Produces: `npm run dev` starts dev server showing a blank React root

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "ia-claude-code-landing",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^3.2.0",
    "vite": "^5.2.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
  },
})
```

- [ ] **Step 3: Create `.eslintrc.cjs`**

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  rules: {
    'react/prop-types': 'off',
  },
}
```

- [ ] **Step 4: Create `.prettierrc`**

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

- [ ] **Step 5: Create `index.html` (shell — SEO added in Task 11)**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Claude Code — IA para Criação de Sites</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 7: Create `src/App.jsx`**

```jsx
export default function App() {
  return <div>IA Landing</div>
}
```

- [ ] **Step 8: Create folder structure**

```powershell
$dirs = @(
  "src\assets\videos",
  "src\assets\images",
  "src\styles",
  "src\components\layout\Navbar",
  "src\components\layout\Footer",
  "src\components\layout\Container",
  "src\components\ui\Button",
  "src\components\ui\Card",
  "src\components\ui\Badge",
  "src\components\ui\SectionHeading",
  "src\components\sections\Hero",
  "src\components\sections\About",
  "src\hooks",
  "src\data",
  "src\utils",
  "public"
)
foreach ($d in $dirs) { New-Item -ItemType Directory -Force $d }
```

- [ ] **Step 9: Install dependencies**

```powershell
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 10: Verify dev server**

```powershell
npm run dev
```

Open `http://localhost:5173`. Expected: white text "IA Landing" on default background.

- [ ] **Step 11: Commit**

```powershell
git init
git add package.json vite.config.js .eslintrc.cjs .prettierrc index.html src/
git commit -m "chore: scaffold Vite React project with deps and config"
```

---

### Task 2: Video Asset + Global Styles

**Files:**
- Copy: `src/assets/videos/robot-hero.mp4`
- Create: `src/styles/variables.css`, `src/styles/global.css`, `src/styles/animations.css`
- Modify: `src/main.jsx`

**Interfaces:**
- Produces: dark `#0A0A0F` background visible; CSS tokens available via `var(--token)` everywhere

- [ ] **Step 1: Copy robot video**

```powershell
Copy-Item "C:\Users\guroc\Downloads\PixVerse_V6_Image_Text_360P_Ultra_futuristic_h.mp4" "src\assets\videos\robot-hero.mp4"
```

Expected: file exists at `src/assets/videos/robot-hero.mp4`.

- [ ] **Step 2: Create `src/styles/variables.css`**

```css
:root {
  --color-bg: #0a0a0f;
  --color-surface: #111118;
  --color-surface-hover: #16161f;
  --color-brand-from: #7c3aed;
  --color-brand-to: #2563eb;
  --color-brand-grad: linear-gradient(135deg, var(--color-brand-from), var(--color-brand-to));
  --color-text-primary: #f1f1f5;
  --color-text-secondary: #8b8fa8;
  --color-border-glass: rgba(255, 255, 255, 0.08);
  --color-overlay: rgba(10, 10, 15, 0.65);

  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --text-display: clamp(2.5rem, 6vw, 5rem);
  --text-h2: clamp(1.75rem, 3.5vw, 2.75rem);
  --text-h3: clamp(1.1rem, 2vw, 1.35rem);
  --text-body: clamp(0.9rem, 1.5vw, 1.1rem);
  --text-sm: 0.875rem;
  --text-xs: 0.75rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-tight: 1.2;
  --line-height-normal: 1.6;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-brand: 0 0 40px rgba(124, 58, 237, 0.25);

  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  --glass-bg: rgba(17, 17, 24, 0.6);
  --glass-blur: blur(12px);
  --glass-border: 1px solid var(--color-border-glass);

  --container-max: 1200px;
  --navbar-height: 64px;
}
```

- [ ] **Step 3: Create `src/styles/global.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
  font-size: var(--text-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

img,
video {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

:focus-visible {
  outline: 2px solid var(--color-brand-from);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Create `src/styles/animations.css`**

```css
@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(8px);
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
```

- [ ] **Step 5: Update `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './styles/global.css'
import './styles/animations.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 6: Verify dark background**

```powershell
npm run dev
```

Open `http://localhost:5173`. Expected: `#0A0A0F` dark background, "IA Landing" in light text, Inter font loaded.

- [ ] **Step 7: Commit**

```powershell
git add src/styles/ src/main.jsx "src/assets/videos/robot-hero.mp4"
git commit -m "chore: add global design tokens, styles, and robot video asset"
```

---

### Task 3: Data Layer + Public Assets

**Files:**
- Create: `src/data/content.js`, `src/utils/constants.js`, `public/favicon.svg`, `public/robots.txt`

**Interfaces:**
- Produces: named exports `nav`, `hero`, `about`, `footer` from `content.js`; `SECTIONS`, `BREAKPOINTS`, `ANIMATION` from `constants.js`

- [ ] **Step 1: Create `src/data/content.js`**

```js
export const nav = {
  logo: 'Claude Code',
  links: [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre', href: '#sobre' },
  ],
  cta: 'Começar agora',
}

export const hero = {
  badge: 'Powered by IA',
  headline: 'O futuro da criação de sites já chegou — e ele entende o que você precisa',
  subheadline:
    'Com o Claude Code, você descreve sua ideia em linguagem natural e recebe um site completo, com arquitetura sólida e código de produção. Sem limitações, sem templates — só o que você imaginar.',
  ctaPrimary: 'Começar agora',
  ctaSecondary: 'Ver mais',
}

export const about = {
  badge: 'Como funciona',
  heading: 'Da ideia ao ar em minutos',
  highlight: 'ao ar',
  body: 'O Claude Code não é apenas um assistente — é um engenheiro de software completo que trabalha em par com você. Descreva o que precisa, itere em linguagem natural e veja seu site ganhar vida com código de produção real.',
  pillars: [
    {
      icon: 'Layers',
      title: 'Arquitetura Automática',
      description:
        'Componentes, pastas, rotas e design system criados automaticamente com base na sua descrição.',
    },
    {
      icon: 'Code2',
      title: 'Código de Produção',
      description: 'Código limpo, semântico e otimizado — pronto para deploy sem retrabalho.',
    },
    {
      icon: 'MessageSquare',
      title: 'Iteração por Linguagem Natural',
      description: 'Refine qualquer detalhe com uma frase. Sem cliques, sem menus — só conversa.',
    },
    {
      icon: 'Rocket',
      title: 'De Ideia ao Deploy',
      description:
        'Do primeiro prompt ao site no ar em minutos. IA que acompanha cada etapa do processo.',
    },
  ],
}

export const footer = {
  logo: 'Claude Code',
  links: [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Anthropic', href: 'https://anthropic.com' },
  ],
  copyright: `© ${new Date().getFullYear()} Claude Code. Todos os direitos reservados.`,
}
```

- [ ] **Step 2: Create `src/utils/constants.js`**

```js
export const BREAKPOINTS = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

export const ANIMATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  stagger: 0.1,
}

export const SECTIONS = ['hero', 'sobre']
```

- [ ] **Step 3: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#g)"/>
  <text x="16" y="22" font-family="sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">C</text>
</svg>
```

- [ ] **Step 4: Create `public/robots.txt`**

```
User-agent: *
Allow: /
```

- [ ] **Step 5: Verify — no compile errors**

```powershell
npm run dev
```

Expected: dev server still runs, no errors.

- [ ] **Step 6: Commit**

```powershell
git add src/data/ src/utils/ public/
git commit -m "chore: add PT-BR content, constants, favicon, and robots.txt"
```

---

### Task 4: UI Atoms — Button + Badge

**Files:**
- Create: `src/components/ui/Button/Button.jsx` + `Button.module.css`
- Create: `src/components/ui/Badge/Badge.jsx` + `Badge.module.css`

**Interfaces:**
- Produces:
  - `Button({ children, variant='primary', size='md', href, onClick, 'aria-label' })` — renders `<a>` if `href`, else `<button>`
  - `Badge({ children })` — renders `<span>`

- [ ] **Step 1: Create `src/components/ui/Button/Button.jsx`**

```jsx
import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  'aria-label': ariaLabel,
  className = '',
}) {
  const cls = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Create `src/components/ui/Button/Button.module.css`**

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  border: none;
}

.primary {
  background: var(--color-brand-grad);
  color: #fff;
  box-shadow: var(--shadow-brand);
}

.primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 0 60px rgba(124, 58, 237, 0.4);
}

.ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-glass);
}

.ghost:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.sm { padding: var(--space-2) var(--space-4); font-size: var(--text-sm); }
.md { padding: var(--space-3) var(--space-6); font-size: var(--text-body); }
.lg { padding: var(--space-4) var(--space-8); font-size: 1.05rem; }
```

- [ ] **Step 3: Create `src/components/ui/Badge/Badge.jsx`**

```jsx
import styles from './Badge.module.css'

export default function Badge({ children }) {
  return <span className={styles.badge}>{children}</span>
}
```

- [ ] **Step 4: Create `src/components/ui/Badge/Badge.module.css`**

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(124, 58, 237, 0.15);
  color: #a78bfa;
  border: 1px solid rgba(124, 58, 237, 0.3);
}
```

- [ ] **Step 5: Smoke-test — temporarily update `src/App.jsx`**

```jsx
import Button from './components/ui/Button/Button'
import Badge from './components/ui/Badge/Badge'

export default function App() {
  return (
    <div style={{ padding: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge>Powered by IA</Badge>
      <Button>Primário</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Pequeno</Button>
    </div>
  )
}
```

Run `npm run dev`. Expected: purple badge, gradient primary button, ghost outline button. No console errors.

- [ ] **Step 6: Revert `src/App.jsx`**

```jsx
export default function App() {
  return <div>IA Landing</div>
}
```

- [ ] **Step 7: Commit**

```powershell
git add src/components/ui/Button/ src/components/ui/Badge/ src/App.jsx
git commit -m "feat: add Button and Badge UI atom components"
```

---

### Task 5: UI Molecules — Card + SectionHeading

**Files:**
- Create: `src/components/ui/Card/Card.jsx` + `Card.module.css`
- Create: `src/components/ui/SectionHeading/SectionHeading.jsx` + `SectionHeading.module.css`

**Interfaces:**
- Produces:
  - `Card({ children, className })` — glassmorphism wrapper
  - `SectionHeading({ badge, title, highlight, subtitle, centered })` — `<h2>` with optional gradient word

- [ ] **Step 1: Create `src/components/ui/Card/Card.jsx`**

```jsx
import styles from './Card.module.css'

export default function Card({ children, className = '' }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>
}
```

- [ ] **Step 2: Create `src/components/ui/Card/Card.module.css`**

```css
.card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg), 0 0 30px rgba(124, 58, 237, 0.1);
  border-color: rgba(124, 58, 237, 0.3);
}
```

- [ ] **Step 3: Create `src/components/ui/SectionHeading/SectionHeading.jsx`**

```jsx
import styles from './SectionHeading.module.css'
import Badge from '../Badge/Badge'

export default function SectionHeading({ badge, title, highlight, subtitle, centered = false }) {
  const parts = highlight ? title.split(highlight) : null

  return (
    <div className={`${styles.heading} ${centered ? styles.centered : ''}`}>
      {badge && <Badge>{badge}</Badge>}
      <h2 className={styles.title}>
        {parts ? (
          <>
            {parts[0]}
            <span className={styles.highlight}>{highlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/ui/SectionHeading/SectionHeading.module.css`**

```css
.heading {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.centered {
  align-items: center;
  text-align: center;
}

.title {
  font-size: var(--text-h2);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

.highlight {
  background: var(--color-brand-grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  max-width: 560px;
}
```

- [ ] **Step 5: Smoke-test — temporarily update `src/App.jsx`**

```jsx
import Card from './components/ui/Card/Card'
import SectionHeading from './components/ui/SectionHeading/SectionHeading'

export default function App() {
  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
      <SectionHeading
        badge="Como funciona"
        title="Da ideia ao ar em minutos"
        highlight="ao ar"
        subtitle="Subtítulo de exemplo."
      />
      <Card>
        <p style={{ color: 'white' }}>Conteúdo do card</p>
      </Card>
    </div>
  )
}
```

Run `npm run dev`. Expected: heading with "ao ar" in gradient, glassmorphism card visible, hover lift works.

- [ ] **Step 6: Revert `src/App.jsx`**

```jsx
export default function App() {
  return <div>IA Landing</div>
}
```

- [ ] **Step 7: Commit**

```powershell
git add src/components/ui/Card/ src/components/ui/SectionHeading/ src/App.jsx
git commit -m "feat: add Card and SectionHeading UI molecule components"
```

---

### Task 6: Layout Shell — Container, Navbar, Footer

**Files:**
- Create: `src/components/layout/Container/Container.jsx` + `Container.module.css`
- Create: `src/components/layout/Navbar/Navbar.jsx` + `Navbar.module.css`
- Create: `src/components/layout/Footer/Footer.jsx` + `Footer.module.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `nav`, `footer` from `content.js`; `Button`
- Produces: `Container({ children, className })`, `Navbar()` (scrollspy added Task 10), `Footer()`

- [ ] **Step 1: Create `src/components/layout/Container/Container.jsx`**

```jsx
import styles from './Container.module.css'

export default function Container({ children, className = '' }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>
}
```

- [ ] **Step 2: Create `src/components/layout/Container/Container.module.css`**

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-4);
}

@media (min-width: 768px) {
  .container { padding-inline: var(--space-8); }
}

@media (min-width: 1024px) {
  .container { padding-inline: var(--space-12); }
}
```

- [ ] **Step 3: Create `src/components/layout/Navbar/Navbar.jsx`**

Note: active link state (scrollspy) is added in Task 10.

```jsx
import { useState, useEffect } from 'react'
import Container from '../Container/Container'
import Button from '../../ui/Button/Button'
import { nav } from '../../../data/content'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Container>
        <nav className={styles.nav} aria-label="Navegação principal">
          <a href="#hero" className={styles.logo} aria-label="Voltar ao início">
            <span className={styles.logoGradient}>{nav.logo}</span>
          </a>
          <ul className={styles.links} role="list">
            {nav.links.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#sobre" size="sm">
            {nav.cta}
          </Button>
        </nav>
      </Container>
    </header>
  )
}
```

- [ ] **Step 4: Create `src/components/layout/Navbar/Navbar.module.css`**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--navbar-height);
  transition: background var(--transition-base), border-color var(--transition-base);
  border-bottom: 1px solid transparent;
}

.scrolled {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom-color: var(--color-border-glass);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
}

.logoGradient {
  background: var(--color-brand-grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.links {
  display: none;
  list-style: none;
  gap: var(--space-8);
}

.link {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.link:hover,
.link.active {
  color: var(--color-text-primary);
}

@media (min-width: 768px) {
  .links { display: flex; }
}
```

- [ ] **Step 5: Create `src/components/layout/Footer/Footer.jsx`**

```jsx
import Container from '../Container/Container'
import { footer } from '../../../data/content'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <span className={styles.logo}>{footer.logo}</span>
          <ul className={styles.links} role="list">
            {footer.links.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.copy}>{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
```

- [ ] **Step 6: Create `src/components/layout/Footer/Footer.module.css`**

```css
.footer {
  border-top: 1px solid var(--color-border-glass);
  padding-block: var(--space-8);
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
}

.logo {
  font-weight: var(--font-weight-bold);
  background: var(--color-brand-grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.links {
  display: flex;
  list-style: none;
  gap: var(--space-6);
}

.link {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.link:hover {
  color: var(--color-text-primary);
}

.copy {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

@media (min-width: 768px) {
  .inner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
```

- [ ] **Step 7: Update `src/App.jsx`**

```jsx
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <p style={{ color: 'white', padding: '4rem 2rem' }}>Conteúdo principal</p>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 8: Verify layout shell**

Run `npm run dev`. Expected: gradient "Claude Code" logo in sticky navbar, footer with copyright at bottom, glass effect appears on Navbar when scrolling.

- [ ] **Step 9: Commit**

```powershell
git add src/components/layout/ src/App.jsx
git commit -m "feat: add Container, Navbar, and Footer layout components"
```

---

### Task 7: Hooks

**Files:**
- Create: `src/hooks/useMediaQuery.js`, `src/hooks/useActiveSection.js`, `src/hooks/useScrollReveal.js`

**Interfaces:**
- Produces:
  - `useMediaQuery(query: string): boolean`
  - `useActiveSection(sectionIds: string[]): string` — ID of currently visible section
  - `useScrollReveal(): { fadeUpVariants, staggerContainerVariants, cardVariants }` — Framer Motion variants, empty when `prefers-reduced-motion` is set

- [ ] **Step 1: Create `src/hooks/useMediaQuery.js`**

```js
import { useState, useEffect } from 'react'

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const listener = (e) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
```

- [ ] **Step 2: Create `src/hooks/useActiveSection.js`**

```js
import { useState, useEffect } from 'react'

export default function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds])

  return active
}
```

- [ ] **Step 3: Create `src/hooks/useScrollReveal.js`**

```js
import { useReducedMotion } from 'framer-motion'

export default function useScrollReveal() {
  const reduce = useReducedMotion()

  if (reduce) {
    const instant = { hidden: {}, visible: {} }
    return { fadeUpVariants: instant, staggerContainerVariants: instant, cardVariants: instant }
  }

  return {
    fadeUpVariants: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
    staggerContainerVariants: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    },
    cardVariants: {
      hidden: { opacity: 0, y: 32 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
  }
}
```

- [ ] **Step 4: Verify no import errors**

```powershell
npm run dev
```

Expected: server still runs, no errors (hooks not yet consumed by components).

- [ ] **Step 5: Commit**

```powershell
git add src/hooks/
git commit -m "feat: add useMediaQuery, useActiveSection, useScrollReveal hooks"
```

---

### Task 8: Hero Section

**Files:**
- Create: `src/components/sections/Hero/Hero.jsx` + `Hero.module.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `hero` from `content.js`; `Button`, `Badge`, `Container`; `useScrollReveal`; video import
- Produces: `Hero()` with `id="hero"`, full-viewport video background + animated content

- [ ] **Step 1: Create `src/components/sections/Hero/Hero.jsx`**

```jsx
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import robotHeroSrc from '../../../assets/videos/robot-hero.mp4'
import Container from '../../layout/Container/Container'
import Button from '../../ui/Button/Button'
import Badge from '../../ui/Badge/Badge'
import useScrollReveal from '../../../hooks/useScrollReveal'
import { hero } from '../../../data/content'
import styles from './Hero.module.css'

export default function Hero() {
  const { fadeUpVariants, staggerContainerVariants } = useScrollReveal()

  return (
    <section id="hero" className={styles.hero} aria-label="Início">
      <video
        className={styles.video}
        src={robotHeroSrc}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <Container>
        <motion.div
          className={styles.content}
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpVariants}>
            <Badge>{hero.badge}</Badge>
          </motion.div>

          <motion.h1 className={styles.headline} variants={fadeUpVariants}>
            {hero.headline}
          </motion.h1>

          <motion.p className={styles.subheadline} variants={fadeUpVariants}>
            {hero.subheadline}
          </motion.p>

          <motion.div className={styles.ctas} variants={fadeUpVariants}>
            <Button href="#sobre" size="lg">
              {hero.ctaPrimary}
            </Button>
            <Button href="#sobre" variant="ghost" size="lg">
              {hero.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <a href="#sobre" className={styles.scrollIndicator} aria-label="Rolar para a próxima seção">
        <ChevronDown size={24} />
      </a>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/sections/Hero/Hero.module.css`**

```css
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  background: var(--color-overlay);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 760px;
  padding-block: var(--space-24);
}

.headline {
  font-size: var(--text-display);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

.subheadline {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  max-width: 540px;
  line-height: var(--line-height-normal);
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.scrollIndicator {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  z-index: 2;
  color: var(--color-text-secondary);
  animation: bounce 2s ease-in-out infinite;
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scrollIndicator:hover {
  color: var(--color-text-primary);
}
```

- [ ] **Step 3: Update `src/App.jsx`**

```jsx
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import Hero from './components/sections/Hero/Hero'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Verify Hero**

Run `npm run dev`. Expected:
- Robot video plays as background (looping, muted, full-viewport)
- Dark overlay makes text legible
- Badge, headline, subheadline, CTAs fade+slide up in sequence on load
- Bouncing chevron at bottom
- No console errors

- [ ] **Step 5: Commit**

```powershell
git add src/components/sections/Hero/ src/App.jsx
git commit -m "feat: add Hero section with video background and entry animations"
```

---

### Task 9: About Section

**Files:**
- Create: `src/components/sections/About/About.jsx` + `About.module.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `about` from `content.js`; `Card`, `SectionHeading`, `Container`; `useScrollReveal`; `Layers, Code2, MessageSquare, Rocket` from lucide-react
- Produces: `About()` with `id="sobre"`, 2-col desktop grid, 4 staggered pillar cards

- [ ] **Step 1: Create `src/components/sections/About/About.jsx`**

```jsx
import { motion } from 'framer-motion'
import { Layers, Code2, MessageSquare, Rocket } from 'lucide-react'
import Container from '../../layout/Container/Container'
import Card from '../../ui/Card/Card'
import SectionHeading from '../../ui/SectionHeading/SectionHeading'
import useScrollReveal from '../../../hooks/useScrollReveal'
import { about } from '../../../data/content'
import styles from './About.module.css'

const ICONS = { Layers, Code2, MessageSquare, Rocket }

export default function About() {
  const { fadeUpVariants, staggerContainerVariants, cardVariants } = useScrollReveal()

  return (
    <section id="sobre" className={styles.about} aria-label="Sobre a IA e o Claude Code">
      <Container>
        <div className={styles.grid}>
          <motion.div
            className={styles.textCol}
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUpVariants}>
              <SectionHeading
                badge={about.badge}
                title={about.heading}
                highlight={about.highlight}
                subtitle={about.body}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.cardsGrid}
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {about.pillars.map((pillar) => {
              const Icon = ICONS[pillar.icon]
              return (
                <motion.div key={pillar.title} variants={cardVariants}>
                  <Card>
                    <div className={styles.pillarIcon} aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                    <p className={styles.pillarDesc}>{pillar.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/sections/About/About.module.css`**

```css
.about {
  padding-block: var(--space-24);
}

.grid {
  display: grid;
  gap: var(--space-12);
}

.textCol {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cardsGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.pillarIcon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(124, 58, 237, 0.15);
  color: #a78bfa;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
  flex-shrink: 0;
}

.pillarTitle {
  font-size: var(--text-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.pillarDesc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

@media (min-width: 480px) {
  .cardsGrid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}
```

- [ ] **Step 3: Update `src/App.jsx`**

```jsx
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import Hero from './components/sections/Hero/Hero'
import About from './components/sections/About/About'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Verify About section**

Run `npm run dev`. Scroll past Hero. Expected:
- Heading appears with "ao ar" in gradient
- 4 cards animate in sequentially (stagger) as section enters viewport
- Cards show glassmorphism + hover lift
- 2-column grid on ≥480px, side-by-side text+cards on ≥1024px

- [ ] **Step 5: Commit**

```powershell
git add src/components/sections/About/ src/App.jsx
git commit -m "feat: add About section with 4-pillar stagger card grid"
```

---

### Task 10: Navbar Scrollspy

**Files:**
- Modify: `src/components/layout/Navbar/Navbar.jsx` — wire `useActiveSection`

**Interfaces:**
- Consumes: `useActiveSection` from hooks, `SECTIONS` from constants

- [ ] **Step 1: Replace `src/components/layout/Navbar/Navbar.jsx`**

```jsx
import { useState, useEffect } from 'react'
import Container from '../Container/Container'
import Button from '../../ui/Button/Button'
import useActiveSection from '../../../hooks/useActiveSection'
import { nav } from '../../../data/content'
import { SECTIONS } from '../../../utils/constants'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(SECTIONS)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Container>
        <nav className={styles.nav} aria-label="Navegação principal">
          <a href="#hero" className={styles.logo} aria-label="Voltar ao início">
            <span className={styles.logoGradient}>{nav.logo}</span>
          </a>
          <ul className={styles.links} role="list">
            {nav.links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.link} ${activeSection === href.slice(1) ? styles.active : ''}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#sobre" size="sm">
            {nav.cta}
          </Button>
        </nav>
      </Container>
    </header>
  )
}
```

- [ ] **Step 2: Verify scrollspy**

Run `npm run dev`. Expected: "Início" link is bright when at top; scrolling to About makes "Sobre" become active (brighter).

- [ ] **Step 3: Commit**

```powershell
git add src/components/layout/Navbar/Navbar.jsx
git commit -m "feat: wire scrollspy to Navbar active link state"
```

---

### Task 11: SEO + Docs + Build Verification

**Files:**
- Modify: `index.html` — full meta tags
- Create: `docs/architecture.md`, `README.md`

- [ ] **Step 1: Replace `index.html` with full SEO version**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Claude Code — O Futuro da Criação de Sites com IA</title>
    <meta
      name="description"
      content="Descubra como o Claude Code e a Inteligência Artificial estão transformando o desenvolvimento web. Crie sites completos através de prompts em linguagem natural."
    />
    <meta property="og:title" content="Claude Code — O Futuro da Criação de Sites com IA" />
    <meta
      property="og:description"
      content="Crie sites completos com IA. Arquitetura automática, código de produção e deploy em minutos."
    />
    <meta property="og:type" content="website" />
    <meta name="theme-color" content="#0A0A0F" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create `docs/architecture.md`**

```markdown
# Architecture

## Overview

Single-page React 18 app about AI and Claude Code. One scroll-based page, no router, no backend.

## CSS Strategy

Global tokens in `styles/variables.css`, imported once in `main.jsx`. Each component owns responsive behavior via mobile-first media queries in its own `.module.css`. No monolithic stylesheets.

## Data Flow

All copy lives in `src/data/content.js` as named exports. Components import only what they need — no prop drilling of strings.

## Animation

Framer Motion handles scroll reveals via `whileInView` + `viewport={{ once: true }}`. The `useScrollReveal` hook centralizes variant definitions and returns empty variants when `useReducedMotion()` is true.

## Hooks

- `useActiveSection` — IntersectionObserver watching `['hero', 'sobre']`, returns the visible section ID for Navbar scrollspy.
- `useScrollReveal` — Framer Motion variant presets; respects `prefers-reduced-motion`.
- `useMediaQuery` — reactive `window.matchMedia` wrapper.

## Video

`src/assets/videos/robot-hero.mp4` is imported via ES module in `Hero.jsx`. Vite handles the URL hash for cache-busting on deploy. `assetsInlineLimit: 0` in `vite.config.js` ensures the video is never base64-inlined.
```

- [ ] **Step 3: Create `README.md`**

```markdown
# IA & Claude Code — Landing Page

Landing page institucional sobre a importância da IA na criação de sites, com foco no Claude Code. Construída com Vite + React 18, CSS Modules e Framer Motion.

## Setup

```bash
npm install
npm run dev
```

## Adicionando o vídeo do robô

Coloque o arquivo de vídeo em:

```
src/assets/videos/robot-hero.mp4
```

O componente `Hero` importa este arquivo automaticamente via ES module.

## Comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:5173` |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | Verifica erros de lint |

## Deploy

Faça deploy da pasta `dist/` em Vercel ou Netlify (drag & drop ou CLI).

**Recomendação:** Comprima o vídeo antes do deploy para reduzir tempo de carregamento:

```bash
ffmpeg -i robot-hero.mp4 -vcodec libx264 -crf 28 -preset slow robot-hero-compressed.mp4
```
```

- [ ] **Step 4: Run lint**

```powershell
npm run lint
```

Expected: 0 errors, 0 warnings.

- [ ] **Step 5: Run production build**

```powershell
npm run build
```

Expected: `dist/` generated, no build errors.

- [ ] **Step 6: Preview production build**

```powershell
npm run preview
```

Open `http://localhost:4173`. Verify: video plays, animations work, all sections render, no console errors.

- [ ] **Step 7: Final commit**

```powershell
git add index.html docs/architecture.md README.md
git commit -m "docs: add SEO meta tags, architecture doc, and README"
```
