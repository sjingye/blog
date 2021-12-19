module.exports = {
  title: "blog",
  description: "个人博客",
  dest: "public",
  themeConfig: {
    repo: "",
    repoLabel: "",
    lastUpdated: "上次更新",
    sidebar: getSidebar(),
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.set({
        breaks: true,
        linkify: true,
      });
      md.use(require("markdown-it-mermaid").default);
      md.use(require("markdown-it-footnote"));
    },
  },
  evergreen: true,
};

function getSidebar() {
  return [
    "",
    {
      title: "CSS",
      children: ["../src/css/home"],
    },
    {
      title: "JS",
      children: ["../src/js/variables and types"],
    },
    {
      title: "框架通识",
      children: ["../src/framework/home"],
    },
    {
      title: "React",
      children: ["../src/react/home", "../src/react/hooks"],
    },
    {
      title: "Vue",
      children: ["../src/vue/home"],
    },
    {
      title: "TypeScript",
      children: ["../src/ts/common", "../src/ts/type", "../src/ts/InReact"],
    },
    {
      title: "工具",
      children: [
        "../src/tool/git",
        "../src/tool/npm",
        "../src/tool/vscode",
        "../src/tool/rules",
      ],
    },
    {
      title: "数据结构和算法",
      children: ["../src/algorithm/home", "../src/algorithm/book1"],
    },
    {
      title: "计算机基础",
      children: ["../src/basic/system.md"],
    },
    {
      title: "项目中的问题",
      children: [
        "../src/work/home",
        "../src/work/Lighthouse",
        "../src/work/Performance",
        "../src/work/ReactProfiler",
      ],
    },
    {
      title: "Java",
      children: ["../src/java/basic.md"],
    },
  ];
}
