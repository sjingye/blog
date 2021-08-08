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
      title: 'CSS',
      children: [
        '../src/css/home'
      ],
    },
    {
      title: 'JS',
      children: [
        '../src/js/promise'
      ],
    },
    {
      title: '框架通识',
      children: [
        '../src/framework/home',
      ],
    },
    {
      title: 'React',
      children: [
        '../src/react/home',
        '../src/react/hooks'
      ],
    },
    {
      title: 'Vue',
      children: [
        '../src/vue/home',
      ],
    },
    {
      title: 'TS',
      children: [
        '../src/ts/common',
        '../src/ts/InReact'
      ],
    },
    {
      title: '工具',
      children: [
        '../src/tool/git',
        '../src/tool/npm',
        '../src/tool/vscode',
      ],
    },
    {
      title: '算法和数据结构',
      children: [
        '../src/algorithm/home'
      ],
    },
    {
      title: '计算机基础',
      children: [
        '../src/basic/system.md'
      ],
    },
    {
      title: '项目中的问题',
      children: [
        '../src/work/home'
      ],
    },
  ];
};
