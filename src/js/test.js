(function() {
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
  console.log(instance_of(d, Father)); // true

})();
