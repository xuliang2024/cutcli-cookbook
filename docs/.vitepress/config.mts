import { defineConfig, type DefaultTheme } from 'vitepress';

const sharedSocialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'github', link: 'https://github.com/xuliang2024/cutcli-cookbook' },
];

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

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#ff5a36' }],
    ['meta', { property: 'og:title', content: 'cutcli — CapCut / Jianying draft CLI' }],
    ['meta', { property: 'og:url', content: 'https://docs.cutcli.com/' }],
    ['meta', { property: 'og:type', content: 'website' }],
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
