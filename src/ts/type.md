# 泛型

泛型，简单说就是泛化的类型

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

## 泛型工具

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

## 学习资料

[泛型工具](https://juejin.cn/post/6926794697553739784#heading-19)
[一文读懂 TypeScript 泛型及应用（ 7.8K 字）](https://juejin.cn/post/6844904184894980104)
[泛型](https://juejin.cn/post/6926794697553739784#heading-13)
