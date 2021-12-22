(function() {
  function myInstanceof(l, r) {
    while (l.__proto__ ) {
      console.log(l.__proto__)
      if (l.__proto__  === r.prototype) {
        return true;
      } else {
        l = r.prototype;
      }
    }
    return false;
  }

  var o = {
    a: 2,
    m: function(){
      return this.a + 1;
    }
  };
  var p = Object.create(o);
  p.a = 4; // 创建 p 的自身属性 'a'
  console.log(p)

  console.log(myInstanceof(p, o))
})();
