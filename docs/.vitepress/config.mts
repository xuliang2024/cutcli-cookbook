import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'cutcli',
  description: 'CapCut / 剪映 草稿命令行工具 — 官方文档与案例库',
  lang: 'zh-CN',
  cleanUrls: false,
  lastUpdated: true,
  ignoreDeadLinks: 'localhostLinks',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#ff5a36' }],
    ['meta', { property: 'og:title', content: 'cutcli — CapCut/剪映 草稿 CLI' }],
    ['meta', { property: 'og:url', content: 'https://docs.cutcli.com/' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'cutcli',

    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '案例', link: '/cookbook/index' },
      { text: '命令参考', link: '/reference/cli' },
      { text: '提示词', link: '/prompts/' },
      {
        text: '相关',
        items: [
          { text: '官网 cutcli.com', link: 'https://cutcli.com' },
          { text: 'GitHub', link: 'https://github.com/m007/cutcli-cookbook' },
          { text: '更新日志', link: 'https://github.com/m007/cutcli-cookbook/blob/main/CHANGELOG.md' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '安装与配置', link: '/guide/installation' },
            { text: '30 分钟做第一个草稿', link: '/guide/first-draft' },
            { text: '时间单位 (微秒)', link: '/guide/time-units' },
            { text: '坐标系与位置', link: '/guide/coordinate-system' },
          ],
        },
        {
          text: '集成',
          items: [
            { text: 'AI 工具集成 (Cursor / Claude / OpenClaw)', link: '/guide/ai-integration' },
          ],
        },
      ],
      '/cookbook/': [
        {
          text: '场景教程',
          items: [
            { text: '案例总览', link: '/cookbook/index' },
            { text: '做一个 Vlog', link: '/cookbook/make-a-vlog' },
            { text: '产品宣传片', link: '/cookbook/product-promo' },
            { text: '知识科普卡片', link: '/cookbook/knowledge-card' },
            { text: 'TikTok 风格短视频', link: '/cookbook/tiktok-style' },
          ],
        },
      ],
      '/reference/': [
        {
          text: '命令参考',
          items: [
            { text: 'CLI 速查', link: '/reference/cli' },
            { text: 'captions 字幕', link: '/reference/captions' },
            { text: 'images 图片', link: '/reference/images' },
            { text: 'videos 视频', link: '/reference/videos' },
            { text: 'audios 音频', link: '/reference/audios' },
            { text: 'effects 特效', link: '/reference/effects' },
            { text: 'filters 滤镜', link: '/reference/filters' },
            { text: 'transitions 转场', link: '/reference/transitions' },
            { text: 'stickers 贴纸', link: '/reference/stickers' },
            { text: 'keyframes 关键帧', link: '/reference/keyframes' },
            { text: 'masks 遮罩', link: '/reference/masks' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/m007/cutcli-cookbook' },
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2026 m007 and cutcli-cookbook contributors',
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除搜索',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    editLink: {
      pattern: 'https://github.com/m007/cutcli-cookbook/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    lastUpdatedText: '最后更新',
  },
});
