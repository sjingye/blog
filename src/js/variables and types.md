# 变量和类型（JavaScript variables and types）

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

## symbol

### 应用

**1.定义类的私有变量/方法**

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

**2.运用在单例模式中**

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
### 实现
[参考资料](https://github.com/mqyqingfeng/Blog/issues/87)
