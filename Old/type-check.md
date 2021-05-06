---
tags: ['javascript','类型检测']
createTime: '2018-10-22'
eject: arr = [null, void 0, '', NaN, ' ', 'a','-1','0','1',   0, 1, -1,function () {}, {}, new Object(), false, true]
---

# 类型检测
在js中有五种基础类型：String、Number、undefined、null、Boolean，还有一种引用类型值Object。在撸码时，如何准确的验证变量的类型非常重要。下面就详细说下变量类型的检测。
## 1. `string`、`number`、`boolean`类型验证
这三个基础类型可以直接通过`typeof`操作符进行检测
```javascript
typeof t === 'string'
typeof t === 'number'
typeof t === 'boolean'
```
## 2. `undefined`类型
`undefined`的检测，也可以通过`typeof`操作符：
```javascript
typeof t === 'undefined'
```
需要注意的是将一个值与`undefined`直接比较的情况。事实上，将一个值直接与`undefined`比较的结果不一定是准确的。因为，`undefined`在js中不是保留字，也就是说，你可以写出：
```javascript
undefined = 'some str'
var x
x === undefined // false, 此时判断就不准确了
```
此时，可以通过`void`操作符来进行严格的验证：
```javascript
var x 
x === void 0 // true void 0的运算结果为 undefined
```
## 3. `null`类型
使用`typeof`操作符检测`null`会返回`'object'`， 所以不够准确。想准确的检测一个变量是否是`null`，可以直接将变量与`null`比较：
```javascript
t === null
```
## 4. `function`类型检测
检测一个变量是不是函数，也可以使用`typeof`操作符：
```javascript
typeof t === 'function'
````
有的时候我们想检测一个函数是不是执行环境原生的函数，可以通过如下代码检测：

```javascript
function isNativeFn(t) {
  return String(t).indexOf('[navtive code]') > -1
}
```
## 5. 数组检测
js中，数组是对象的一种。一般来说，数组这种引用类型的值，可以通过`instanceof`操作符进行检测：
```javascript
[] instanceof Array // true
```
但实际上还是有些漏洞的，当你在多个frame中回来跳的时候，这种方法就惨了。由于每一个frame都有自己的一套执行环境，跨frame实例化的对象彼此并不共享原型链，通过`instanceof`操作符和`constructor`属性检测的方法自然会失败。
```javascript
// 创建iframe并添加到DOM中
var iframe = document.createElement('iframe'); //创建iframe
document.body.appendChild(iframe); //将创建的iframe添加到body中
otherArray = window.frames[window.frames.length - 1].Array;
var arr = new otherArray("1","2"); //声明数组["1","2"]
console.log(arr instanceof Array);        // false
console.log(arr.constructor === Array);   // false
```
#### 更准确的数组检测方法
```javascript
const isArray = (function () {
  if(Array.isArray) {   //如果浏览器支持 es5 的 Array.isArray。 毕竟原生的更好用
    return Array.isArray
  }
  const toString = Object.prototype.toString
  const arrayString = toString.call([])
  return function(t) {
    return arrayString === toString.call(t)
  }
}())
```
## 7. `object`类型检测
除了上面的类型外，使用`typeof`操作符检测任何值，都会返回`'object'`，所以想检测一个变量是不是普通对象，需要做多步验证。
```javascript
const isPlainObj = function(t) {
  if(!t) return false
  if(isArray(t)) return false
  return typeof t === 'object'
}
```
#### 字面量对象的检测
有的时候我们想检测一个对象是不是通过字面量方式或者`new Object()`创建的，可以通过如下方法：
```javascript
// const a = {}
// const b = new Object
// function X() {}
// const c = new X

function isRawObject(t) {
  if (typeof t !== 'object' || t === null) return false
  let last = first = proto =  Object.getPrototypeOf(t)
  while(proto) {
    last = proto
    proto = Object.getPrototypeOf(proto)
  }
  return last === first
}
function
```
## 8. 判断`NaN`
`NaN`是一个特殊的数值。检测一个变量是不是`NaN`，常用的方法如下：
```javascript
isNaN(t) && t !== t//只有NaN类型才不会等于自身
```
不可单独用`isNaN()`来检测，因为`isNaN()`会将传入的参数先用`Number`函数转换后，再进行检测，所有不能转换成数值类型的参数都会被判断成`NaN`。

如果浏览器原生支持`es6`的`Object.is()`方法，可以用过下面的函数检测：
```javascript
function isNaN(t){
  return Object.is(t, NaN)
}
```
## 9. 判断一个值存不存在
有时我们写代码时判断一个值不存在，会直接使用如下写法：
```javascript
if(!t)
```
需要注意的是，如果传入的参数`t=0`，也是会被认为是不存在的。

如果我们只是想忽略`undefined`、`null`、`''`(空字符串)、`NaN`，则可以用下面函数：
```javascript
function isValidate(t) {
  if(t===0) return true
  if(typeof t === 'boolean') return true
  return !!t      //   !!NaN === false
}
```