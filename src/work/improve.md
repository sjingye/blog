# 项目优化

性能优化是前端开发一个非常重要的组成部分，如何更好地进行网络传输，如何优化浏览器渲染过程，来定位项目中存在的问题。Chrome DevTools 给我们提供了 2 种常用方式 Lighthouse 和 Performance。Lighthouse 可以对页面进行性能评分，同时，还会给我们提供一些优化建议。而 Performance 提供了非常多的运行时数据，能让我们看到更多细节数据。

## 性能分析

### Lighthouse

根据 Google Developers Docs 上的描述

> Lighthouse 是一种开源的自动化工具，用于提高网页质量。你可以在任何网页上运行它。它能够针对性能、可访问性、渐进式 Web 应用等进行审核。
> 你可以在 Chrome DevTools 中从命令行运行 Lighthouse。当你向 Lighthouse 提供了一个 URL 来进行审核时，它会针对该页面运行一系列审核，然后生成一个关于该页面执行情况的报告。这份报告可以作为如何改进页面的指标。每次审核都会产生一份参考文档，解释了这些审核为什么重要，以及如何解决等内容。

目前测试项包括页面性能、PWA、可访问性（无障碍）、最佳实践、SEO。
Lighthouse 会对各个测试项的结果打分，并给出优化建议，这些打分标准和优化建议可以视为 Google 的网页最佳实践。

**一、以本地环境群侧边栏首页为例，通过 Lighthouse 对页面进行性能评分**

![image](../img/6.png)

**二、优化建议如下**

![image](../img/7.png)

**三、实践**

1.Reduce unused JavaScript
Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity.

> Build tool for support for removing unused code
> Check out the following Tooling.Report tests to find out if your bundler supports features that make it easier to avoid or remove unused code:

**Code Splitting**
代码分割是由诸如 Webpack，Rollup 和 Browserify（factor-bundle）这类打包器支持的一项技术，能够创建多个包并在运行时动态加载。
可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量。

常见做法：

- 入口起点：使用 entry 配置手动地分离代码。比如分离业务代码和第三方库（ vendor ）
- 防止重复：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。比如按需加载（利用 import() 语法）

**Unused Code Elimination**

index.js

```javascript
import { logCaps } from "./utils.js";
logCaps(exclaim("This is index"));

function thisIsNeverCalled() {
  console.log(`No, really, it isn't`);
}
```

utils.js

```javascript
export function logCaps(msg) {
  console.log(msg.toUpperCase());
}

export function thisIsNeverCalledEither(msg) {
  return msg + "!";
}
```

Once built for production, both the thisIsNeverCalled and thisIsNeverCalledEither functions should be completely removed from the bundle(s).

以 webpack 为例：
Webpack's Dead Code Elimination is implemented by annotating and removing unused module exports, then relying on [Terser] to perform Dead Code Elimination. As with minification, the preservation of some module boundaries in Webpack bundles can limit the amount of optimization Terser can perform.

**Unused Imported Code**
index.js

```javascript
(async function() {
  const { logCaps } = await import("./utils.js");
  logCaps("This is index");
})();
```

utils.js

```javascript
export function logCaps(msg) {
  console.log(msg.toUpperCase());
}

export function thisIsNeverCalled(msg) {
  return msg + "!";
}
```

Once built for production, the thisIsNeverCalled function from utils.js should not be present in the resulting bundle(s).

以 webpack 为例：
Webpack doesn't understand the special destructuring syntax to elimitate dead code:

```javascript
(async function() {
  const { logCaps } = await import("./utils.js");
})();
```

But it allows to manually list the exports that are used via magic comment:

```javascript
const { logCaps } = await import(/* webpackExports: "logCaps" */ "./utils.js");
```

针对 React 项目，可以
React
If you are not server-side rendering, split your JavaScript bundles with React.lazy(). Otherwise, code-split using a third-party library such as loadable-components.

参考资料：

[Remove unused JavaScript](https://web.dev/unused-javascript/)

**四、按照建议优化后性能评分**

![image](../img/6.png)

### Performance

以群侧边栏首页为例，尝试通过 Performance 来分析出哪些代码影响性能

第一部分：概览
这里最主要是整体的界面渲染的时候，每个时间段执行的事件顺序，通过上图我们就能知道我们每个时间段（精确到毫秒）都做了什么，当鼠标放上去的时候，我们还可以大图的形式去查看我们每个时间段界面的渲染情况，Performance 就会将几个关键指标，诸如页面帧速 (FPS)、CPU 资源消耗、网络请求流量、V8 内存使用量 (堆内存) 等，按照时间顺序做成图表的形式展现出来。

第二部分：性能面板
性能面板主要包括以下几部分
1.Network 这里我们可以直观的看到资源加载的顺序与时长
2.Interactions 用来记录用户交互操作，比如点击鼠标、输入文字、动画等
3.Timings 用来记录一些关键的时间节点在何时产生的数据信息，诸如 FP、FCP、LCP 等
4.Main 是 Performance 工具中比较重要的部分，记录了渲染进程中主线程的执行记录，点击 main 可以看到某个任务执行的具体情况
5.Compositor 合成线程的执行记录，用来记录 html 绘制阶段 (Paint)结束后的图层合成操作
6.Raster 光栅化线程池，用来让 GPU 执行光栅化的任务
7.GPU GPU 进程主线程的执行过程记录，如 可以直观看到何时启动 GPU 加速…
Memory 选项，在勾选后，就会显示该折线图，通过该图可以看出我们在不同的时间段的执行情况。我们可以看到页面中的内存使用的情况，比如 JS Heap(堆)，如果曲线一直在增长，则说明存在内存泄露，如果相当长的一段时间，内存曲线都是没有下降的，这里是有发生内存泄露的可能的。
通过对性能面板各个部分的分析与问题定位，可以更深刻的理解浏览器是如何工作的

第三部分：Summary（性能摘要）
它是一个用来统计在我们检测性能的时间范围内，都做了哪些事情：
Loading ：加载时间
Scripting ：js 计算时间
Rendering ：渲染时间
Painting ：绘制时间
Other ：其他时间
Idle ：浏览器闲置时间

### React Profiler