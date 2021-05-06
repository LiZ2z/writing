# 为什么 airbnb JavaScript 代码规范中不允许使用`for...of`遍历数组

参考：[for...of api](http://es6.ruanyifeng.com/#docs/iterator)

首先，明确`for...of`的工作原理：

> 一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 for...of 循环遍历它的成员。也就是说，for...of 循环内部调用的是数据结构的 Symbol.iterator 方法。

当使用`for...of`，就会使用到到数据结构的`Symbol.iterator`方法，而这个方法就是一个`generator`函数，这本身不构成任何问题。那么为什么 airbnb 规范中不让使用`for...of`遍历数组呢？

这是因为当前还有部分不原生支持 ES6 的浏览器存在，我们在发布代码之前还是需要对代码进行编译。当代码中涉及到`generator`时，Babel 在编译时会引入 re-generator runtime 代码，用来给不支持原生`generator`的浏览器做 polyfill。而这段代码大小达到了**23kb**左右，这对于前端代码来说算是挺重的一个包了。

再看看我们要实现的功能———遍历数组。数组原型中已经包含了很多用于遍历数组的方法了，我们完全可以使用这些方法进行数组遍历，而避免因为使用`for...of`而引入一个高达**23k**的库，这也是 airbnb 规范中为什么不推荐的原因。

关于`for...of`语法另外需要注意的是，在通过 Babel 编译后，其生成的代码中会直接使用到`Symbol.iterator`，也就是说，如果你的代码**需要兼容**不支持原生`Symbol`浏览器，你还需要额外引入`Symbol`的 polyfill，这个 polyfill 的体积也不小。

总结：`for...of`语法需要引入大量 polyfill，如果你需要尽可能少的减少代码量，尽量用其它方法替代。

下面是一个使用`for...of`遍历字符串`abcdefg`的例子：

```javascript
// 源码
for (const key of "abcdefg") {
  console.log(key);
}

// 编译后
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;
try {
  for (
    var _iterator = "abcdefg"[Symbol.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = true
  ) {
    var key = _step.value;
    console.log(key);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
```
