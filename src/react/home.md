# 深入理解 React

## [函数式组件与类组件有何不同？](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)

函数式组件捕获了渲染所使用的值，而类组件总是会通过 this 拿到最新的 props/state。

但是如果我们想要读取并不属于这一次特定渲染的，最新的 props 和 state 呢？如果我们想要“从未来读取他们”呢？

在类中，你通过读取 this.props 或者 this.state 来实现，因为 this 本身是可变的。React 改变了它。在函数式组件中，你也可以拥有一个在所有的组件渲染帧中共享的可变变量。它被称为“ref”：

```javascript
function MyComponent() {
  const ref = useRef(null);
  // You can read or write `ref.current`.
  // ...
}
```

但是，你必须自己管理它。

一个 ref 与一个实例字段扮演同样的角色。这是进入可变的命令式的世界的后门。你可能熟悉’DOM refs’，但是 ref 在概念上更为广泛通用。它只是一个你可以放东西进去的盒子。

甚至在视觉上，this.something 就像是 something.current 的一个镜像。他们代表了同样的概念。

默认情况下，React 不会在函数式组件中为最新的 props 和 state 创造 refs。在很多情况下，你并不需要它们，并且分配它们将是一种浪费。但是，如果你愿意，你可以这样手动地来追踪这些值：

```javascript
function MessageThread() {
  const [message, setMessage] = useState('');
  const latestMessage = useRef('');

  const showMessage = () => {
    alert('You said: ' + latestMessage.current);
  };

  const handleSendClick = () => {
    setTimeout(showMessage, 3000);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    latestMessage.current = e.target.value;
  };
```

### React 状态复用

技术发展路线：Mixin -> HOC -> Hook

Mixin（混入）是一种通过扩展收集功能的方式。
它本质上是将一个对象的属性拷贝到另一个对象上面去，不过你可以拷贝任意多个对象的任意个方法到一个新对象上去，这是继承所不能实现的。它的出现主要就是为了解决代码复用问题。

高阶组件
React 对装饰模式的一种实现，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。是没有副作用的纯函数。
[JS 核心理论之《React 状态复用与 Hooks 用法》](https://zhuanlan.zhihu.com/p/163493445)

## 参考资料

[函数式组件与类组件有何不同？](https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/)
[实现说明](https://zh-hans.reactjs.org/docs/implementation-notes.html)
[设计理念](https://zh-hans.reactjs.org/docs/design-principles.html)
[FAQ](https://zh-hans.reactjs.org/docs/faq-ajax.html)
[Dan's blog](https://overreacted.io/zh-hans/)
