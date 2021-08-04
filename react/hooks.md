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

## 学习资料

[官方文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)
[Hooks FAQ](https://zh-hans.reactjs.org/docs/hooks-faq.html)
[JS 核心理论之《React 状态复用与 Hooks 用法](https://zhuanlan.zhihu.com/p/163493445)
