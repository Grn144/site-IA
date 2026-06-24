export const nav = {
  logo: 'Claude Code',
  links: [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Casos de Uso', href: '#casos-de-uso' },
    { label: 'FAQ', href: '#faq' },
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

export const howItWorks = {
  badge: 'Processo',
  heading: 'Três passos do prompt ao site',
  highlight: 'prompt ao site',
  steps: [
    {
      number: '01',
      icon: 'PenLine',
      title: 'Descreva sua ideia',
      description:
        'Escreva em português o que você quer construir. Uma frase já é suficiente — o Claude Code entende contexto, tom e objetivo.',
    },
    {
      number: '02',
      icon: 'Cpu',
      title: 'Claude Code gera tudo',
      description:
        'Componentes, rotas, design system, animações e código de produção criados automaticamente. Arquitetura limpa desde o primeiro commit.',
    },
    {
      number: '03',
      icon: 'Rocket',
      title: 'Refine e publique',
      description:
        'Ajuste qualquer detalhe com uma mensagem em linguagem natural. Quando estiver pronto, faça o deploy em segundos para Vercel ou Netlify.',
    },
  ],
}

export const useCases = {
  badge: 'Possibilidades',
  heading: 'O que você pode criar',
  highlight: 'pode criar',
  subtitle:
    'Do projeto mais simples ao mais complexo — o Claude Code acompanha você em qualquer tipo de construção web.',
  cases: [
    {
      icon: 'Monitor',
      title: 'Landing Pages',
      description: 'Páginas de captura e conversão com design premium, animações e copy persuasivo.',
    },
    {
      icon: 'ShoppingCart',
      title: 'E-commerce',
      description: 'Lojas completas com catálogo, carrinho, checkout e integração com meios de pagamento.',
    },
    {
      icon: 'PenLine',
      title: 'Blogs e Portfólios',
      description: 'Sites de conteúdo com CMS, SEO otimizado e identidade visual única.',
    },
    {
      icon: 'BarChart3',
      title: 'Dashboards',
      description: 'Painéis de dados interativos com gráficos, filtros e atualização em tempo real.',
    },
    {
      icon: 'Building2',
      title: 'Sites Institucionais',
      description: 'Presença digital completa para empresas, com seções, formulários e mapa.',
    },
    {
      icon: 'Globe',
      title: 'Aplicações Web',
      description: 'SaaS, ferramentas internas e produtos digitais com lógica de negócio complexa.',
    },
  ],
}

export const faq = {
  badge: 'Dúvidas frequentes',
  heading: 'Perguntas que todo mundo faz',
  highlight: 'todo mundo faz',
  items: [
    {
      question: 'Preciso saber programar para usar o Claude Code?',
      answer:
        'Não. O Claude Code foi projetado para funcionar com linguagem natural. Você descreve o que quer e ele gera o código. Dito isso, se você souber programar, poderá iterar ainda mais rápido e com mais controle.',
    },
    {
      question: 'O código gerado é meu?',
      answer:
        'Sim, totalmente. Todo código gerado pelo Claude Code pertence a você. Não há vendor lock-in — o resultado é um projeto padrão que você pode hospedar, modificar e distribuir como quiser.',
    },
    {
      question: 'Funciona com qualquer framework?',
      answer:
        'O Claude Code tem suporte completo para React, Vue, Angular, Next.js, Astro, SvelteKit e muito mais. Você escolhe a stack e ele adapta a arquitetura.',
    },
    {
      question: 'Quanto tempo leva para criar um site do zero?',
      answer:
        'Depende da complexidade, mas uma landing page pode sair em menos de 30 minutos. Sites mais elaborados, com múltiplas páginas e integrações, costumam levar algumas horas de iteração.',
    },
    {
      question: 'Posso fazer alterações depois que o site estiver pronto?',
      answer:
        'Sim. O ciclo de iteração é um dos pontos fortes do Claude Code — basta descrever a mudança em linguagem natural e ele aplica no código existente, mantendo consistência com o que já foi construído.',
    },
    {
      question: 'O Claude Code substitui um desenvolvedor?',
      answer:
        'Para muitos projetos, sim — especialmente MVPs, landing pages e sites institucionais. Para sistemas de grande escala com requisitos muito específicos, ele funciona melhor como um acelerador poderoso ao lado de um desenvolvedor.',
    },
  ],
}

export const ctaFinal = {
  badge: 'Pronto para começar?',
  heading: 'Construa seu próximo site hoje',
  highlight: 'próximo site',
  subtitle:
    'Junte-se a milhares de criadores que já estão usando IA para construir mais rápido, com mais qualidade e sem travar em detalhes técnicos.',
  cta: 'Começar agora com Claude Code',
  ctaHref: 'https://claude.ai',
  secondary: 'Ver documentação',
  secondaryHref: 'https://docs.anthropic.com',
}

export const footer = {
  logo: 'Claude Code',
  links: [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Anthropic', href: 'https://anthropic.com' },
  ],
  copyright: `© ${new Date().getFullYear()} Claude Code. Todos os direitos reservados.`,
}
