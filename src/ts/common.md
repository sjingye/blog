# TypeScript 常见用法

静态类型、动态类型和弱类型、强类型

- 静态类型：编译期就知道每一个变量的类型。类型错误编译失败是语法问题。如 Java、C++。
- 动态类型：编译期不知道类型，运行时才知道。类型错误抛出异常发生在运行时。如 JS、Python。
- 弱类型：容忍隐式类型转换。如 JS，1+'1'='11'，数字型转成了字符型。
- 强类型：不容忍隐式类型转换。如 Python，1+'1'会抛出 TypeError。

## void

在 TS 中，void 和 undefined 功能高度类似，可以在逻辑上避免不小心使用了空指针导致的错误。

```typescript
function foo() {} // 这个空函数没有返回任何值，返回类型缺省为void
const a = foo(); // 此时a的类型定义为void，你也不能调用a的任何属性方法
```

void 和 undefined 类型最大的区别是，你可以理解为 undefined 是 void 的一个子集，当你对函数返回值并不在意时，使用 void 而不是 undefined。举一个 React 中的实际的例子。

```typescript
// Child.tsx
type Props = {
    // 这里的void表示逻辑上不关注具体的返回值类型，number、string、undefined等都可以
  getValue: () => void;
}
function Child({ getValue }: Props) => <div>{getValue()}</div>
```

## const 断言

## extends

extends 关键字既可以来扩展已有的类型，也可以对类型进行条件限定

类型推导式：

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

我们还可以使用 , 号来分隔多种约束类型，比如：<T extends Type1, Type2, Type3>。

## 运算符

1. 非空断言运算符 !
   特别适用于我们已经明确知道不会返回空值的场景，从而减少冗余的代码判断，如 React 的 Ref。

```typescript
function Demo(): JSX.Elememt {
  const divRef = useRef<HTMLDivElement>();
  useEffect(() => {
    // 当组件Mount后才会触发useEffect，故current一定是有值的
    divRef.current!.scrollIntoView();
  }, []);
  return <div ref={divRef}>Demo</div>;
}
```

2. 可选链运算符 ?.
   相比上面!作用于编译阶段的非空判断，?.这个是开发者最需要的运行时(当然编译时也有效)的非空判断。

```
obj?.prop    obj?.[index]    func?.(args)
```

?.用来判断左侧的表达式是否是 null | undefined，如果是则会停止表达式运行，可以减少我们大量的 && 运算。
比如我们写出 a?.b 时，编译器会自动生成如下代码

```typescript
a === null || a === void 0 ? void 0 : a.b;
```

这里涉及到一个小知识点:undefined 这个值在非严格模式下会被重新赋值，使用 void 0 必定返回真正的 undefined。

3. 空值合并运算符 ??

??与||的功能是相似的，区别在于 ??在左侧表达式结果为 null 或者 undefined 时，才会返回右侧表达式 。
比如我们书写了 let b = a ?? 10，生成的代码如下：

```typescript
let b = a !== null && a !== void 0 ? a : 10;
```

## 封装

我们都知道，封装在对于面向对象软件设计非常有用，而封装各个模块的实现细节，就可以在有效管理软件的复杂度。
TS 对于代码封装性的帮助主要体现在它提供了类似于 Java 的访问控制符。有了 private/protected/public，我们可以自主的控制类需要对外暴露的接口。访问权限需尽可能严，也就是说无需对外暴露的用 private 或者 protected ，如无需被子类使用的就用 private，只有明确需要对外暴露的接口采用 public 来描述。在一些非 React 组件的公共类，封装特性尤为必要。

## 问题

『以前总感觉 JS 一复杂，就感觉质量难以保证，线上运行也有点虚，说不定什么时候就爆出一个 's' is undefined, 'b' is not a function 之类的错误。现在有了静态检查，心里更有底了』

1、怎么做到基本上没有 any 的类型，如服务端返回的 json 对象，不用 any 实现是用啥？

A: 试一下定义一个类，然后用类的类型

2、我是 ts 尝试者，现在遇到一个问题：如果一个 ts 文件 import 了一个 js 文件，ts 加载器对 ts 进行了检查的同时也对 js 进行了检查，但是这个 js 是不太可能或者没必要符合 ts 的规范的，这个你们是怎么解决的呢?

A: ...... compilerOptions: { "skipLibCheck": true } in tsconfig.json

## 学习资料

[TypeScript 高级用法](https://juejin.cn/post/6926794697553739784)
[TypeScript 中高级应用与最佳实践](https://juejin.cn/post/6844903904140853255)
[TypeScript 实践](https://juejin.cn/post/6844903569552834568)
[总结 TypeScript 在项目开发中的应用实践体会](https://juejin.cn/post/6970841540776329224)
