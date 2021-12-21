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
  this.SymbolPolyfill = SymbolPolyfill;
})();
const a = SymbolPolyfill('a')
console.dir(a.toString());

