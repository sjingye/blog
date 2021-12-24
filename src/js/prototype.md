# 原型和原型链

[继承与原型链MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
即便是在 ES2015/ES6 中引入了 class 关键字，但那也只是语法糖，JavaScript 仍然是基于原型的。

**1.理解原型设计模式以及 JavaScript 中的原型规则**

**2.instanceof 的底层实现原理，手动实现一个 instanceof**

```javascript
// instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可
function instance_of(l, r) {
  while (l.__proto__) {
    if (l.__proto__ === r.prototype) {
      return true;
    } else {
      l = l.__proto__;
    }
  }
  return false;
}

// 测试用例
var a = [];
var b = {};

function Foo() {}
var c = new Foo();

function Child() {}
function Father() {}
Child.prototype = new Father();
var d = new Child();

console.log(instance_of(a, Array)); // true
console.log(instance_of(b, Object)); // true
console.log(instance_of(b, Array)); // false
console.log(instance_of(a, Object)); // true
console.log(instance_of(c, Foo)); // true
console.log(instance_of(d, Child)); // true
console.log(instance_of(d, Father)); // true 实现了继承
```

**3.实现继承的几种方式以及他们的优缺点**

**4.至少说出一种开源项目(如 Node)中应用原型继承的案例**

**5.可以描述 new 一个对象的详细过程，手动实现一个 new 操作符**

**6.理解 es6 class 构造以及继承的底层实现原理**
