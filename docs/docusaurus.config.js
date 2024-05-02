// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'swiftui-react-native',
  tagline: '',
  url: 'https://github.com/andrew-levy/swiftui-react-native',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'andrew-levy', // Usually your GitHub org/user name.
  projectName: 'swiftui-react-native', // Usually your repo name.
  staticDirectories: ['static'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'SwiftUI React Native',
        logo: {
          alt: 'SwiftUI React Native',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/andrew-levy/swiftui-react-native',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://github.com/andrew-levy/swiftui-react-native-example',
            label: 'Example',
            position: 'right',
          },
        ],
      },
      footer: {
        copyright: 'Copyright © 2022 Andrew Levy',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['swift'],
      },
    }),
};

module.exports = config;
