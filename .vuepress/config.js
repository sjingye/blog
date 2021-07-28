module.exports = {
  title: 'blog',
  description: '个人博客',
  dest: 'public',
  themeConfig: {
    repo: '',
    repoLabel: '',
    lastUpdated: '上次更新',
    sidebar: getSidebar(),
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.set({
        breaks: true,
        linkify: true,
      });
      md.use(require('markdown-it-mermaid').default);
      md.use(require('markdown-it-footnote'));
    },
  },
  evergreen: true,
};

function getSidebar() {
  return [
    '',
    {
      title: '计算机基础',
      children: [
        'basic/system'
      ],
    },
    {
      title: 'JS',
      children: [
        'js/promise'
      ],
    },
    {
      title: 'React',
      children: [
        'react/hooks'
      ],
    },
    {
      title: '工具',
      children: [
        'tool/git'
      ],
    },
  ];
};
