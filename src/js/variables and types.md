# 变量和类型

（JavaScript variables and types）

**1.JavaScript 规定了几种语言类型**

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

**2.JavaScript 对象的底层数据结构是什么**

**3.Symbol 类型在实际开发中的应用、可手动实现一个简单的 Symbol**

**应用**

1.定义类的私有变量/方法

User.js

```javascript
const AGE = Symbol();
const GET_AGE = Symbol();
class User {
  constructor(name, sex, age) {
    this.name = name;
    this.sex = sex;
    this[AGE] = age;
    this[GET_AGE] = function() {
      return this[AGE];
    };
  }
  printAge() {
    console.log(this[GET_AGE]());
  }
}
module.exports = User;
```

test.js

```javascript
let User = require("./User");

let u1 = new User("xm", "M", 18);
let u2 = new User("xh", "W", 20);
console.log(u1.name); // xm
console.log(u1.age); // undefined
u1.printAge(); // 18
console.log(u2.name); // xh
console.log(u2.age); // undefined
u2.printAge(); // 20
```

2.运用在单例模式中

Phone.js

```javascript
class Phone {
  constructor() {
    this.name = "小米";
    this.price = "1999";
  }
}

let key = Symbol.for("Phone");

if (!global[key]) {
  global[key] = new Phone();
}

module.exports = global[key];
```

test.js

```javascript
let p1 = require("./Phone");
let p2 = require("./Phone");
console.log(p1 === p2); // true
```

**实现**

```javascript
(function() {
  function SymbolPolyfill(description) {
    // 实现特性第 2 点：Symbol 函数前不能使用 new 命令
    if (this instanceof SymbolPolyfill) {
      throw new Error("SymbolPolyfill can not be a constructor");
    }

    var symbol = Object.create({
      toString() {
        return `Symbol(${this._description})`;
      },
    });

    Object.defineProperties(symbol, {
      _description: {
        value: description,
        enumerable: false,
        writeable: false,
        configurable: false,
      },
    });

    return symbol;
  }
  //用意： 全局绑定
  this.SymbolPolyfill = SymbolPolyfill;
})();

const a = SymbolPolyfill("a");
console.dir(a.toString());
```

[参考资料](https://github.com/mqyqingfeng/Blog/issues/87)

**4.JavaScript 中的变量在内存中的具体存储形式**

[answer](https://juejin.cn/post/6844903885367148557)

**5.基本类型对应的内置对象，以及他们之间的装箱拆箱操作**

装拆箱操作主要是基于基本包装类型来进行的。ECMAScript 提供了 3 个基本包装类型：Boolean、Number 和 String。这个三种基本包装类型是 3 个特殊的引用类型，属于 Object 类型。

**基本字符串和字符串对象的区别**
请注意区分 JavaScript 字符串对象和基本字符串值 . ( 对于 Boolean 和 Numbers 也同样如此.)

> 字符串字面量 (通过单引号或双引号定义) 和 直接调用 String 方法(没有通过 new 生成字符串对象实例)的字符串都是基本字符串。JavaScript 会自动将基本字符串转换为字符串对象，只有将基本字符串转化为字符串对象之后才可以使用字符串对象的方法。当基本字符串需要调用一个字符串对象才有的方法或者查询值的时候(基本字符串是没有这些方法的)，JavaScript 会自动将基本字符串转化为字符串对象并且调用相应的方法或者执行查询。

```javascript
var s_prim = "foo";
var s_obj = new String(s_prim);

console.log(typeof s_prim); // Logs "string"
console.log(typeof s_obj); // Logs "object"
```

**6.理解值类型和引用类型**

**7.null 和 undefined 的区别**
[answer](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

**8.至少可以说出三种判断 JavaScript 数据类型的方式，以及他们的优缺点，如何准确的判断数组类型**

**9.可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用**

**10.出现小数精度丢失的原因，JavaScript 可以存储的最大数字、最大安全数字，JavaScript 处理大数字的方法、避免精度丢失的方法**
[answer](https://github.com/camsong/blog/issues/9)
[一日一技：为什么浮点数在计算机中可能不准确](https://blog.csdn.net/qq_39241986/article/details/104404249)
[浮点数比较的精度问题](https://zhuanlan.zhihu.com/p/161971793)
