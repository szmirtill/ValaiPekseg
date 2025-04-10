// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Valai Pékség',
  tagline: 'Digitális pékségdokumentáció ASP.NET + React alapon',
  favicon: 'img/logo.png',

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'valai-pekseg',
  projectName: 'dokumentacio',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'hu',
    locales: ['hu'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/valai-pekseg/dokumentacio/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Valai Pékség',
        logo: {
          alt: 'Valai Pékség logó',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Dokumentáció',
          },
          {
            href: 'https://github.com/valai-pekseg',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            
            items: [
              {
                label: 'Valai Pékség GitHub',
                href: 'https://github.com/valai-pekseg',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Valai Pékség. Minden jog fenntartva.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
