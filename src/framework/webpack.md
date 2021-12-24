# webpack

## 备忘

在公共配置中，可能会出现某个配置的某个选项在开发环境和生产环境中采用不同的配置，这个时候我们有两种选择：

- 分别在 dev 和 prod 配置文件中写一遍，common 中就不写了
- 设置某个环境变量，根据这个环境变量来判别不同环境。

### path.resolve

`path.resolve`：node 的官方 api，可以将路径或者路径片段解析成绝对路径。
`__dirname` ：其总是指向被执行 js 文件的绝对路径，比如在我们 webpack 文件中访问了 \_\_dirname ，那么它的值就是在电脑系统上的绝对路径，比如在我电脑上的 my framework 就是：

/Users/mlamp/Documents/projects/my-framework/config

path.resolve(\_\_dirname, ''../src/index.js)的作用是：把相对路径转换成了绝对路径

### common plugins

- HtmlWebpackPlugin: 生成一个 HTML 文件，使用 lodash 模板提供模板，或者使用你自己的 loader; 会自动引入打包完成的所有资源;
- MiniCssExtractPlugin：本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。本插件基于 webpack v5 的新特性构建，并且需要 webpack 5 才能正常工作。
- WebpackBar: 在控制台显示打包进度

development env：

- HotModuleReplacementPlugin：module 热更新

production env：

### devServer

proxy：配置 api 代理

### 动态导入(dynamic import)

当涉及到动态代码拆分时，webpack 提供了两个类似的技术。第一种，也是推荐选择的方式是，使用符合 ECMAScript 提案 的 import() 语法 来实现动态导入。第二种，则是 webpack 的遗留功能，使用 webpack 特定的 require.ensure。

通过 dynamic import(动态导入) 来分离出一个 chunk：

```javascript
function getComponent() {
  return import("lodash")
    .then(({ default: _ }) => {
      const element = document.createElement("div");

      element.innerHTML = _.join(["Hello", "webpack"], " ");
      return element;
    })
    .catch((error) => "An error occurred while loading the component");
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```

### Tree shaking

sideEffects: false | []

"side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

package.json

```javascript
// ...
"sideEffects": [
  "**/*.css",
  "**/*.scss",
  "./esnext/index.js",
  "./esnext/configure.js"
],
```

**结论**
我们学到为了利用 tree shaking 的优势， 你必须...

1. 使用 ES2015 模块语法（即 import 和 export）。
2. 确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的（顺带一提，这是现在常用的 @babel/preset-env 的默认行为，详细信息请参阅文档）。
3. 在项目的 package.json 文件中，添加 "sideEffects" 属性。
4. 使用 mode 为 "production" 的配置项以启用更多优化项，包括压缩代码与 tree shaking。

## Optimization

1. minimize: 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle
2. nodeEnv: 告知 webpack 将 process.env.NODE_ENV 设置为一个给定字符串
3. splitChunks: 开箱即用。默认情况下，它只会影响到按需加载的 chunks

**webpack 将根据以下条件自动拆分 chunks：**

1. 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
2. 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
3. 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
4. 当加载初始化页面时，并发请求的最大数量小于或等于 30
   当尝试满足最后两个条件时，最好使用较大的 chunks。

下面这个配置对象代表 SplitChunksPlugin 的默认行为。

```javascript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

### code Split 代码分割

代码分割分为三种：

1. 多入口文件会自动进行代码分割
2. optimization.splitChunks 控制代码分割
3. optimization.splitChunks + import() 进行代码分割

优点： 进行代码分割可以有效拒绝 js 文件过于庞大。

### DllPlugin（详见 my-framework 的实现）

实现了拆分 bundles，同时还大幅度提升了构建的速度。"DLL" 一词代表微软最初引入的动态链接库

## webpack 打包优化

production plugins：

1. PurgeCSSPlugin: 去除没有用到的 css。
2. image-minimizer-webpack-plugin: 压缩图片。详见文档。
3. 开启 babel-loader 缓存

```javascript
{
    loader: "babel-loader",
    options: {
        // 优化手段
        // babel-loader 在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，
        // 所以我们开启 cacheDirectory 将这些公共文件缓存起来，下次编译就会加快很多
        cacheDirectory: true,
},
```
