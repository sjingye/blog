# NPM

## 常用命令

- 生成 package-lock.json 文件

  1. 使用 `npm i --package-lock-only`先下载 package-lock.json
  2. 安装完 package-lock.json 后，`npm i` 安装依赖包

- npm ci

  此命令类似于 npm-install，但它旨在用于自动化环境，如测试平台，持续集成和部署。通过跳过某些面向用户的功能，它可以比常规的 npm 安装快得多。它也比常规安装更严格，它可以帮助捕获由大多数 npm 用户的增量安装的本地环境引起的错误或不一致。

  总之，使用 npm install 和使用 npm ci 的主要区别是：

  1.该项目必须有一个 package-lock.json 或 npm-shrinkwrap.json。 2.如果程序包锁中的依赖项与其中的依赖项不匹配 package.json，npm ci 则将退出并显示错误，而不是更新程序包锁。
  3.npm ci 只能一次安装整个项目：使用此命令无法添加单个依赖项。 4.如果 a node_modules 已经存在，它将在 npm ci 开始安装之前自动删除。 5.它永远不会写入 package.json 或任何包锁：安装基本上是冻结的。

  [腾讯云 npm 文档](https://cloud.tencent.com/developer/section/1490280)

## 注意点

- npm scripts 考虑到跨平台的兼容性
