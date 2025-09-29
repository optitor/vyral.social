import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'eca'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/authors/chakra',
    component: ComponentCreator('/blog/authors/chakra', 'ce7'),
    exact: true
  },
  {
    path: '/blog/authors/nima',
    component: ComponentCreator('/blog/authors/nima', '920'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/announcement',
    component: ComponentCreator('/blog/tags/announcement', '83c'),
    exact: true
  },
  {
    path: '/blog/tags/launch',
    component: ComponentCreator('/blog/tags/launch', '017'),
    exact: true
  },
  {
    path: '/blog/tags/social-media',
    component: ComponentCreator('/blog/tags/social-media', '9db'),
    exact: true
  },
  {
    path: '/blog/tags/vcoin',
    component: ComponentCreator('/blog/tags/vcoin', 'fde'),
    exact: true
  },
  {
    path: '/blog/tags/web3',
    component: ComponentCreator('/blog/tags/web3', 'fec'),
    exact: true
  },
  {
    path: '/blog/welcome-to-vyral',
    component: ComponentCreator('/blog/welcome-to-vyral', 'aff'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '8fc'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'e99'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'b35'),
            routes: [
              {
                path: '/docs/category/tutorial---basics',
                component: ComponentCreator('/docs/category/tutorial---basics', '20e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/tutorial---extras',
                component: ComponentCreator('/docs/category/tutorial---extras', '9ad'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/compliance/acceptable-use',
                component: ComponentCreator('/docs/compliance/acceptable-use', 'a78'),
                exact: true,
                sidebar: "complianceSidebar"
              },
              {
                path: '/docs/compliance/privacy',
                component: ComponentCreator('/docs/compliance/privacy', 'da6'),
                exact: true,
                sidebar: "complianceSidebar"
              },
              {
                path: '/docs/compliance/risk-disclosure',
                component: ComponentCreator('/docs/compliance/risk-disclosure', 'ab7'),
                exact: true,
                sidebar: "complianceSidebar"
              },
              {
                path: '/docs/compliance/terms',
                component: ComponentCreator('/docs/compliance/terms', '113'),
                exact: true,
                sidebar: "complianceSidebar"
              },
              {
                path: '/docs/tutorial/intro',
                component: ComponentCreator('/docs/tutorial/intro', '094'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial/tutorial-basics/congratulations',
                component: ComponentCreator('/docs/tutorial/tutorial-basics/congratulations', 'f5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/docs/tutorial/tutorial-basics/create-a-blog-post', '116'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial/tutorial-basics/create-a-document',
                component: ComponentCreator('/docs/tutorial/tutorial-basics/create-a-document', '12e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial/tutorial-basics/create-a-page',
                component: ComponentCreator('/docs/tutorial/tutorial-basics/create-a-page', '66e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/docs/tutorial/tutorial-basics/deploy-your-site', '3ee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial/tutorial-basics/markdown-features',
                component: ComponentCreator('/docs/tutorial/tutorial-basics/markdown-features', 'faf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/docs/tutorial/tutorial-extras/manage-docs-versions', '0f9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial/tutorial-extras/translate-your-site',
                component: ComponentCreator('/docs/tutorial/tutorial-extras/translate-your-site', '26c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/whitepaper/abstract',
                component: ComponentCreator('/docs/whitepaper/abstract', 'd2b'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/governance',
                component: ComponentCreator('/docs/whitepaper/governance', '07f'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/introduction',
                component: ComponentCreator('/docs/whitepaper/introduction', '645'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/legal',
                component: ComponentCreator('/docs/whitepaper/legal', '21a'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/liquidity-strategy',
                component: ComponentCreator('/docs/whitepaper/liquidity-strategy', '522'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/projections',
                component: ComponentCreator('/docs/whitepaper/projections', '226'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/risks',
                component: ComponentCreator('/docs/whitepaper/risks', 'c3c'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/roadmap',
                component: ComponentCreator('/docs/whitepaper/roadmap', 'ff6'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/security-compliance',
                component: ComponentCreator('/docs/whitepaper/security-compliance', '4b1'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/smart-contracts',
                component: ComponentCreator('/docs/whitepaper/smart-contracts', 'a3b'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/token-economics',
                component: ComponentCreator('/docs/whitepaper/token-economics', 'a26'),
                exact: true,
                sidebar: "whitepaperSidebar"
              },
              {
                path: '/docs/whitepaper/user-experience',
                component: ComponentCreator('/docs/whitepaper/user-experience', '13d'),
                exact: true,
                sidebar: "whitepaperSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
