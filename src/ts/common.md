# TypeScript 常见用法

契约高于实现

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

## 泛型

[泛型](https://juejin.cn/post/6926794697553739784#heading-13)

## 泛型工具

### 其他常用工具类型

由 set 生成 map

```typescript
type Record<K extends keyof any, T> = { [P in K]: T };

type Size = "small" | "default" | "big";
/*
{
    small: number
    default: number
    big: number
}
 */
type SizeMap = Record<Size, number>;
```

保留 map 的一部分

```typescript
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
/*
{
    default: number
    big: number
}
 */
type BiggerSizeMap = Pick<SizeMap, "default" | "big">;
```

删除 map 的一部分

```typescript
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
/*
{
    default: number
}
 */
type DefaultSizeMap = Omit<BiggerSizeMap, "big">;
```

### [泛型工具](https://juejin.cn/post/6926794697553739784#heading-19)

## 学习资料

[TypeScript 高级用法](https://juejin.cn/post/6926794697553739784)
[TypeScript 中高级应用与最佳实践](https://juejin.cn/post/6844903904140853255)
