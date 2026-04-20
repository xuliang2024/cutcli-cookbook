import { defineConfig, type DefaultTheme } from 'vitepress';

const sharedSocialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'github', link: 'https://github.com/xuliang2024/cutcli-cookbook' },
];

const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'cutcli',
  alternateName: ['CapCut draft CLI', 'Jianying draft CLI', '剪映草稿命令行'],
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'VideoEditing',
  operatingSystem: 'macOS, Windows, Linux',
  description:
    'cutcli is a single-binary command-line tool that turns shell commands or JSON into a standard CapCut / Jianying (剪映) draft folder. The CapCut / Jianying desktop app opens the draft directly from its draft list — fully editable, with captions, animations, transitions, audio, keyframes, masks and effects intact.',
  url: 'https://cutcli.com',
  sameAs: [
    'https://github.com/xuliang2024/cutcli-cookbook',
    'https://docs.cutcli.com',
  ],
  downloadUrl: 'https://cutcli.com/cli',
  installUrl: 'https://cutcli.com/cli',
  softwareVersion: '0.1.0',
  releaseNotes: 'https://github.com/xuliang2024/cutcli-cookbook/releases/tag/v0.1.0',
  license: 'https://opensource.org/licenses/MIT',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'cutcli',
    url: 'https://cutcli.com',
  },
  featureList: [
    'Generate CapCut / Jianying drafts from shell commands or JSON',
    'AI agent integration (Cursor, Claude Code, ChatGPT, Gemini, OpenClaw, MCP)',
    'Captions, animations, transitions, audio, keyframes, masks, effects',
    'Cross-platform: macOS, Windows, Linux',
    'Open source under MIT license',
  ],
};

const faqPageLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is cutcli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'cutcli is a single-binary command-line tool that turns shell commands or JSON into a standard CapCut / Jianying (剪映) draft folder. Open CapCut on desktop and the draft is already in your draft list — fully editable, with captions, animations, transitions, audio and keyframes intact. Install with: curl -s https://cutcli.com/cli | bash',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use cutcli with Cursor, Claude Code or an MCP agent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Run "cutcli setup cursor" (or claude / openclaw / all) to install the cutcli SKILL into your AI tool. The assistant can then call cutcli commands directly. For ChatGPT / Gemini and other models, copy prompts/system/cutcli-expert.md into the model\'s system prompt. Full guide: https://docs.cutcli.com/guide/ai-integration',
      },
    },
    {
      '@type': 'Question',
      name: 'Does cutcli work with both CapCut (international) and Jianying (剪映 Chinese)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The draft format is the same on both apps; cutcli writes drafts that either client can open directly from its draft folder.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is cutcli different from manually editing CapCut JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hand-writing CapCut draft JSON means dealing with microsecond timestamps, undocumented enums, normalized 0–1 coordinates and a half-dozen sibling files that must stay in sync. cutcli handles all of that and exposes a stable CLI surface (cutcli draft create, cutcli captions add, cutcli draft easy, …) that survives CapCut version bumps.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I find runnable examples?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The cutcli-cookbook repository at https://github.com/xuliang2024/cutcli-cookbook ships 8 ready-to-run examples under examples/ — one caption with fade-in, image slideshow with BGM, TikTok-style keyword highlighting, audio-driven layout, keyframe zoom, 30-second product promo, knowledge science card, and vlog template.',
      },
    },
  ],
};

const enThemeConfig: DefaultTheme.Config = {
  nav: [
    { text: 'Guide', link: '/guide/installation' },
    { text: 'Cookbook', link: '/cookbook/index' },
    { text: 'CLI Reference', link: '/reference/cli' },
    { text: 'Prompts', link: '/prompts/' },
    {
      text: 'Related',
      items: [
        { text: 'cutcli.com', link: 'https://cutcli.com' },
        { text: 'GitHub', link: 'https://github.com/xuliang2024/cutcli-cookbook' },
        { text: 'Changelog', link: 'https://github.com/xuliang2024/cutcli-cookbook/blob/main/CHANGELOG.md' },
      ],
    },
  ],
  sidebar: {
    '/guide/': [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Build your first draft in 30 minutes', link: '/guide/first-draft' },
          { text: 'Time units (microseconds)', link: '/guide/time-units' },
          { text: 'Coordinate system & positioning', link: '/guide/coordinate-system' },
        ],
      },
      {
        text: 'Integrations',
        items: [
          { text: 'AI tools (Cursor / Claude / OpenClaw)', link: '/guide/ai-integration' },
        ],
      },
    ],
    '/cookbook/': [
      {
        text: 'Scenario tutorials',
        items: [
          { text: 'Cookbook overview', link: '/cookbook/index' },
          { text: 'Make a vlog', link: '/cookbook/make-a-vlog' },
          { text: 'Product promo (30s)', link: '/cookbook/product-promo' },
          { text: 'Knowledge science card', link: '/cookbook/knowledge-card' },
          { text: 'TikTok-style short video', link: '/cookbook/tiktok-style' },
        ],
      },
    ],
    '/reference/': [
      {
        text: 'Reference',
        items: [
          { text: 'CLI cheatsheet', link: '/reference/cli' },
          { text: 'captions', link: '/reference/captions' },
          { text: 'images', link: '/reference/images' },
          { text: 'videos', link: '/reference/videos' },
          { text: 'audios', link: '/reference/audios' },
          { text: 'effects', link: '/reference/effects' },
          { text: 'filters', link: '/reference/filters' },
          { text: 'transitions', link: '/reference/transitions' },
          { text: 'stickers', link: '/reference/stickers' },
          { text: 'keyframes', link: '/reference/keyframes' },
          { text: 'masks', link: '/reference/masks' },
        ],
      },
    ],
  },
  socialLinks: sharedSocialLinks,
  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2026 m007 and cutcli-cookbook contributors',
  },
  editLink: {
    pattern: 'https://github.com/xuliang2024/cutcli-cookbook/edit/main/docs/:path',
    text: 'Edit this page on GitHub',
  },
  docFooter: { prev: 'Previous', next: 'Next' },
  outline: { label: 'On this page', level: [2, 3] },
  lastUpdatedText: 'Last updated',
};

const zhThemeConfig: DefaultTheme.Config = {
  nav: [
    { text: '指南', link: '/zh/guide/installation' },
    { text: '案例', link: '/zh/cookbook/index' },
    { text: '命令参考', link: '/zh/reference/cli' },
    { text: '提示词', link: '/zh/prompts/' },
    {
      text: '相关',
      items: [
        { text: '官网 cutcli.com', link: 'https://cutcli.com' },
        { text: 'GitHub', link: 'https://github.com/xuliang2024/cutcli-cookbook' },
        { text: '更新日志', link: 'https://github.com/xuliang2024/cutcli-cookbook/blob/main/CHANGELOG.md' },
      ],
    },
  ],
  sidebar: {
    '/zh/guide/': [
      {
        text: '入门',
        items: [
          { text: '安装与配置', link: '/zh/guide/installation' },
          { text: '30 分钟做第一个草稿', link: '/zh/guide/first-draft' },
          { text: '时间单位 (微秒)', link: '/zh/guide/time-units' },
          { text: '坐标系与位置', link: '/zh/guide/coordinate-system' },
        ],
      },
      {
        text: '集成',
        items: [
          { text: 'AI 工具集成 (Cursor / Claude / OpenClaw)', link: '/zh/guide/ai-integration' },
        ],
      },
    ],
    '/zh/cookbook/': [
      {
        text: '场景教程',
        items: [
          { text: '案例总览', link: '/zh/cookbook/index' },
          { text: '做一个 Vlog', link: '/zh/cookbook/make-a-vlog' },
          { text: '产品宣传片', link: '/zh/cookbook/product-promo' },
          { text: '知识科普卡片', link: '/zh/cookbook/knowledge-card' },
          { text: 'TikTok 风格短视频', link: '/zh/cookbook/tiktok-style' },
        ],
      },
    ],
    '/zh/reference/': [
      {
        text: '命令参考',
        items: [
          { text: 'CLI 速查', link: '/zh/reference/cli' },
          { text: 'captions 字幕', link: '/zh/reference/captions' },
          { text: 'images 图片', link: '/zh/reference/images' },
          { text: 'videos 视频', link: '/zh/reference/videos' },
          { text: 'audios 音频', link: '/zh/reference/audios' },
          { text: 'effects 特效', link: '/zh/reference/effects' },
          { text: 'filters 滤镜', link: '/zh/reference/filters' },
          { text: 'transitions 转场', link: '/zh/reference/transitions' },
          { text: 'stickers 贴纸', link: '/zh/reference/stickers' },
          { text: 'keyframes 关键帧', link: '/zh/reference/keyframes' },
          { text: 'masks 遮罩', link: '/zh/reference/masks' },
        ],
      },
    ],
  },
  socialLinks: sharedSocialLinks,
  footer: {
    message: '基于 MIT 许可发布',
    copyright: 'Copyright © 2026 m007 and cutcli-cookbook contributors',
  },
  editLink: {
    pattern: 'https://github.com/xuliang2024/cutcli-cookbook/edit/main/docs/:path',
    text: '在 GitHub 上编辑此页',
  },
  docFooter: { prev: '上一页', next: '下一页' },
  outline: { label: '本页目录', level: [2, 3] },
  lastUpdatedText: '最后更新',
};

export default defineConfig({
  title: 'cutcli',
  description: 'CapCut / Jianying draft CLI — official docs & cookbook',
  cleanUrls: false,
  lastUpdated: true,
  ignoreDeadLinks: 'localhostLinks',
  sitemap: {
    hostname: 'https://docs.cutcli.com',
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#ff5a36' }],
    ['meta', { name: 'description', content: 'Cookbook, JSON templates, AI prompts and docs for cutcli — the CapCut / Jianying (剪映) draft CLI. Generate editable video drafts from code, Cursor, Claude Code or any MCP agent.' }],
    ['meta', { name: 'keywords', content: 'cutcli, CapCut, Jianying, 剪映, draft CLI, video automation, AI video, Cursor, Claude Code, MCP, ChatGPT' }],
    ['meta', { property: 'og:title', content: 'cutcli — CapCut / Jianying draft CLI cookbook' }],
    ['meta', { property: 'og:description', content: 'Open-source cookbook, JSON templates and AI prompts for the CapCut / Jianying draft CLI. Drive video drafts from Cursor, Claude Code or any MCP agent.' }],
    ['meta', { property: 'og:url', content: 'https://docs.cutcli.com/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://docs.cutcli.com/og.png' }],
    ['meta', { property: 'og:image:width', content: '1280' }],
    ['meta', { property: 'og:image:height', content: '640' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'cutcli — CapCut / Jianying draft CLI cookbook' }],
    ['meta', { name: 'twitter:description', content: 'Generate editable CapCut / 剪映 video drafts from code, Cursor, Claude Code or any MCP agent.' }],
    ['meta', { name: 'twitter:image', content: 'https://docs.cutcli.com/og.png' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(softwareApplicationLd)],
    ['script', { type: 'application/ld+json' }, JSON.stringify(faqPageLd)],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'cutcli',
    socialLinks: sharedSocialLinks,
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: enThemeConfig,
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: zhThemeConfig,
    },
  },

  search: {
    provider: 'local',
    options: {
      locales: {
        zh: {
          translations: {
            button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
            modal: {
              noResultsText: '没有找到相关结果',
              resetButtonTitle: '清除搜索',
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
            },
          },
        },
      },
    },
  } as DefaultTheme.LocalSearchOptions,
});
