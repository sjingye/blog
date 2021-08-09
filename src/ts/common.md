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

## 泛型

其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

- K（Key）：表示对象中的键类型；
- V（Value）：表示对象中的值类型；
- E（Element）：表示元素类型。

我们在什么时候需要使用泛型呢？

- 当你的函数、接口或类将处理多种数据类型时；
- 当函数、接口或类在多个地方使用该数据类型时。

**泛型接口**

```typescript
interface Identities<V, M> {
  value: V;
  message: M;
}
```

**泛型类**

```typescript
interface GenericInterface<U> {
  value: U;
  getIdentity: () => U;
}

class IdentityClass<T> implements GenericInterface<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getIdentity(): T {
    return this.value;
  }
}

const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity()); // 68

const myStringClass = new IdentityClass<string>("Semlinker!");
console.log(myStringClass.getIdentity()); // Semlinker!
```

**泛型条件类型**
条件类型会以一个条件表达式进行类型关系检测，从而在两种类型中选择其一：
`T extends U ? X : Y`

以上表达式的意思是：若 T 能够赋值给 U，那么类型是 X，否则为 Y。在条件类型表达式中，我们通常还会结合 infer 关键字，实现类型抽取：

```typescript
interface Dictionary<T = any> {
  [key: string]: T;
}

type StrDict = Dictionary<string>;

type DictMember<T> = T extends Dictionary<infer V> ? V : never;
type StrDictMember = DictMember<StrDict>; // string
```

在上面示例中，当类型 T 满足 `T extends Dictionary`约束时，我们会使用 infer 关键字声明了一个类型变量 V，并返回该类型，否则返回 never 类型。

除了上述的应用外，利用条件类型和 infer 关键字，我们还可以方便地实现获取 Promise 对象的返回值类型，比如：

```typescript
async function stringPromise() {
  return "Hello, Semlinker!";
}

interface Person {
  name: string;
  age: number;
}

async function personPromise() {
  return { name: "Semlinker", age: 30 } as Person;
}

type PromiseType<T> = (args: any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;

type extractStringPromise = UnPromisify<typeof stringPromise>; // string
type extractPersonPromise = UnPromisify<typeof personPromise>; // Person
```

[一文读懂 TypeScript 泛型及应用（ 7.8K 字）](https://juejin.cn/post/6844904184894980104)
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

### 资料

[泛型工具](https://juejin.cn/post/6926794697553739784#heading-19)

## 学习资料

[TypeScript 高级用法](https://juejin.cn/post/6926794697553739784)
[TypeScript 中高级应用与最佳实践](https://juejin.cn/post/6844903904140853255)
