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
