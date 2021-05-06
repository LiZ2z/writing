---
tags: ['javascript','object']
createTime: '2019-01-23'
---
# javascript中的对象

## 万物皆对象？

经常有人说“javascript中万物皆对象”，这显然是错误的，null、undefined、string、boolean和number等基本类型的值显然都不属于对象。null有时会被当作一种对象（`typeof null === 'object'`），这其实是javascript的bug，null本身就是基本类型。
>原理是这样的，不同的对象在底层都表示为二进制，在JavaScript 中二进制前三位都为0的话会被判断为object 类型，null 的二进制表示是全0，自然前三位也是0，所以执行typeof 时会返回“object”

有人会说，既然string或number类型不是对象，那为什么可以通过`.`操作符来对其进行操作呢？那是因为javascript引擎会自动调用`new String()`或`new Number()`将其转换成对象，然后进行操作。
```javascript
'abc'.length  //  3
// =>
new String('abc').length //  3
```
## 创建对象

在javascript中有两种方法来创建对象，`字面量形式`与`new操作符`创建对象。
```javascript
let obj1 = {} // 字面量形式
let obj2 = new Object() // 使用new操作符创建对象
```
因为字面量形式更方便直观，所以大多数时候我们是用字面量形式创建对象，但是当我们想在创建对象的时候进行更多的配置时，就需要使用new操作符了。

