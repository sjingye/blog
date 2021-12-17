# 前端框架

## 从头开始打造工具链

一组 JavaScript 构建工具链通常由这些组成：

- 一个 package 管理器，比如 Yarn 或 npm。它能让你充分利用庞大的第三方 package 的生态系统，并且轻松地安装或更新它们。
- 一个打包器，比如 webpack 或 Parcel。它能让你编写模块化代码，并将它们组合在一起成为小的 package，以优化加载时间。
- 一个编译器，例如 Babel。它能让你编写的新版本 JavaScript 代码，在旧版浏览器中依然能够工作。

`别忘了确保你自定义的工具链针对生产环境进行了正确配置。`

## webpack

webpack config 文件的相对位置 是参照于 项目目录的

### common plugins

- HtmlWebpackPlugin
- MiniCssExtractPlugin

本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

本插件基于 webpack v5 的新特性构建，并且需要 webpack 5 才能正常工作。

## tslint

```
# Install the global CLI and its peer dependency
yarn global add tslint typescript

# Navigate to your sources folder
cd path/to/project

# Generate a basic configuration file
tslint --init

# Lint TypeScript source globs
tslint -c tslint.json 'src/**/*.ts'
tslint -c tslint.json 'src/**/*.tsx'
```
