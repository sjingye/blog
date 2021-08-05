# Hooks

## 解决的问题

### 1.在组件之间复用状态逻辑很难

React 没有提供将可复用性行为“附加”到组件的途径，之前的解决方案有：比如 render props 和 高阶组件。但是这类方案需要重新组织你的组件结构，这可能会很麻烦。

可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。

### 2.复杂组件变得难以理解

组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。

### 3.难以理解的 class

比如 this 指向等

## Hook 规则

- 只在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook
  因为 React 靠的是 Hook 调用的顺序，来正确地将内部 state 和对应的 Hook 进行关联，所以需要 Hook 的调用顺序在每次渲染中都是相同的。

- 只在 React 函数中调用 Hook，不在普通的 JavaScript 函数中调用 Hook。你可以：
  ✅ 在 React 的函数组件中调用 Hook
  ✅ 在自定义 Hook 中调用其他 Hook

**from Dan：**
[为什么顺序调用对 React Hooks 很重要？](https://overreacted.io/zh-hans/why-do-hooks-rely-on-call-order/)

## 渲染闭包

为防止内存泄漏，清除函数会在组件卸载前执行。
如果组件多次渲染，则在执行下一个 effect 之前，上一个 effect 就已被清除, 即执行 return 的函数。

详见这个[codesandbox 例子](https://codesandbox.io/s/admiring-platform-vkywj?file=/src/App.js)

点击几次后，你会发现输出如下结果：

```
执行更新：0

清除上一次副作用：0
执行更新：1

清除上一次副作用：1
执行更新：2

清除上一次副作用：2
执行更新：3
```

那么为什么在浏览器渲染完后，再执行清理的方法还能找到上次的 state 呢？

**原因很简单，我们在 useEffect 中返回的是一个函数，这形成了一个闭包，这能保证我们上一次执行函数存储的变量不被销毁和污染。**

## 实现一个 useState

_特点：_

1. 一个 useState 的基本结构，它接收一个初始值，返回一个状态和一个改变状态的函数
2. 状态存储的实现
   - 新状态替换旧状态
   - 重新渲染组件
3. 多个 state 并存

```javascript
let state;

function useState(initialValue) {
  state = state || initialValue;
  const setState = (value) => {
    state = value;
    // 触发视图重新渲染
    render();
  };
  return [state, setState];
}
```

> this.setState 与 useState 区别
>
> 1. 通过 useState 的 setXXX 修改数据，不会和 setState 一样进行对象属性合并，会直接覆盖。
> 2. Hooks 函数组件中，存在渲染闭包的概念，在一次渲染闭包中，state 是固定不变的。
> 3. Hooks 函数组件，默认开启类`Object.is`的浅层比较，类似默认开启 PureComponent 的优化方式。

## 实现一个 useEffect

_特点：_

1. 有两个参数 callback 和 dependencies 数组
2. 如果 dependencies 不存在，那么 callback 每次 render 都会执行
3. 如果 dependencies 存在，只有当它发生了变化， callback 才会执行

```javascript
let deps;

function useEffect(callback, depArray) {
  // 如果 dependencies 不存在
  const shouldUpdate = !depArray;
  // 两次的 dependencies 是否完全相等
  const depsChange = deps
    ? !depArray.every((depItem, index) => depItem === deps[index])
    : true;
  /* 如果 dependencies 不存在，或者 dependencies 有变化*/
  if (shouldUpdate || depsChange) {
    callback();
    deps = depArray;
  }
}
```

## 性能优化

**减少渲染次数：**
默认情况，只要父组件状态变了（不管子组件依不依赖该状态），子组件也会重新渲染；

- 类组件：可以使用 pureComponent
- 函数组件(见下文)

### 1.FC 组件实现 shouldComponentUpdate

`控制 整个 component 不要 re-render`
你可以用 [React.memo](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo) 包裹一个组件来对它的 props 进行浅比较：

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

React.memo 为高阶组件，等效于 PureComponent，但它只比较 props。

如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现（比较新旧 props。如果函数返回 true，就会跳过更新）。

React.memo() 的使用方式：

```javascript
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

使用方式很简单，在 Function Component 之外，在声明一个 areEqual 方法来判断两次 props 有什么不同，如果第二个参数不传递，则默认只会进行 props 的浅比较。

最终 export 的组件，就是 React.memo() 包装之后的组件

React.memo 不比较 state，因为没有单一的 state 对象可供比较。但你也可以让子节点变为纯组件，或者 用 useMemo 优化每一个具体的子节点。

### 2. 使用 useMemo() 进行细粒度性能优化

`控制 部分 component 不要进行 re-render`

useMemo() 基本用法如下：

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

useMemo() 是在 render 期间执行的，所以不能进行一些额外的副操作，比如网络请求等。

如果没有提供依赖数组（上面的 [a,b]）则每次都会重新计算 memoized 值，也就会 re-render

useMemo 本身也有开销。

useMemo 会记住一些值，同时在后续 render 时，将依赖数组中的值取出来和上一次记录的值进行比较，如果不相等才会重新执行回调函数，否则直接返回记住的值。

这个过程本身就会消耗一定的内存和计算资源。因此，过度使用 useMemo 可能会影响程序的性能。

## 学习资料

[官方文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)
[Hooks FAQ](https://zh-hans.reactjs.org/docs/hooks-faq.html)
[React.memo() 和 useMemo() 的用法与区别](https://mp.weixin.qq.com/s?src=11&timestamp=1628157434&ver=3234&signature=fyA5coriHS5bLBjX0kTdMD9nyJT*-RVmxos64SAxn-s1auTo-j0Vr2w9a8F6WoWjJSg11qel0f0AxYXJ2jyN2cCv5ZKpxttwSYkq4rNiST*Xj5zM-pRaqBmRlnxL0BgQ&new=1)
[JS 核心理论之《React 状态复用与 Hooks 用法》](https://zhuanlan.zhihu.com/p/163493445)

