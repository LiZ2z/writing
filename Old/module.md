---
tags: ['前端', '模块化']
---

# 模块化

::: tip 概述
如今javascript有AMD、CMD两种模块化规范，这篇博客我们来说一下CMD规范的应用。
:::

现在的前端应用开发大多数基于webpack构建，开发过程中，我们将js代码分成一个个文件模块，通过`module.exports`导出数据，在另一个文件用`require`进行引用。开发完成后，webpack将所有引用的js文件打包后生成一个boundle.js。那么，`module.exports`、`require`的原理是啥呢？

这里有三个文件：

main.js：
```javascript
import one from './one'
const greeter = require('./two');
one('xixiixx')
const div = document.querySelector("#root")
console.log(div)  
div.appendChild(greeter());
```
one.js：
```javascript
//使用es6模块导出api
export default function(v) {
  console.log(v)
}
```
two.js：
```javascript
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings! 1123123";
  return greet;
};
```
webpack将所有js文件按照文件引用路生成如下格式的模块Map：
```javascript
{

   "./src/main.js": (function (module, __webpack_exports__, __webpack_require__) {

       "use strict";
       eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _one__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./one */ \"./src/one.js\");\n\r\nconst greeter = __webpack_require__(/*! ./two */ \"./src/two.js\");\r\n\r\nObject(_one__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('xixiixx')\r\n\r\nconst div = document.querySelector(\"#root\")\r\nconsole.log(div)\r\n\r\ndiv.appendChild(greeter());");

     }),
   "./src/one.js":(function (module, __webpack_exports__, __webpack_require__) {

       "use strict";
       eval("__webpack_require__.r(__webpack_exports__);\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(v) {\r\n  console.log(v)\r\n});");
     }),

   "./src/two.js": (function (module, exports) {

       eval("module.exports = function() {\r\n  var greet = document.createElement('div');\r\n  greet.textContent = \"Hi there and greetings! 1123123\";\r\n  return greet;\r\n};");

     })

 }
```
这样，我们通过`require()`引用模块时，只需要根据传入`require`的路径，在模块Map中查找到对应的函数并执行，就可以获取对应的值。
大致思路类似于:
```javascript
// 这里是类似上方的文件Map
const moduleMap = {
  // 每一个.js文件其实都是在一个函数作用域中， 所以我们定义的变量都是在作用域内的，不会污染全局
  fileOne: function() {
    // 这里就是我们平时写代码的地方
    // ...
    module.exports = function() {
      return 'msg from one'
    }
  },
  fileTwo: function() {
    var msgGenerator = require('fileOne')
    console.log(msgGenerator())
  }
}
// webpack提供的 module require
const module = {
  exports: null
}
function require(moduleName) {
  moduleMap[moduleName]()
}
// 执行入口文件
moduleMap.fileTwo() // 输出 'msg from one'

```

编译后的完整代码如下：
```javascript
  /**
   * @function - 一个全局的立即执行函数
   * 
   * @params modules 所有的js文件模块组成Map对象
   */
 (function (modules) { // webpackBootstrap
  // 1. 用于缓存已经被require()的模块代码 的执行结果
   // The module cache
   var installedModules = {};
   //2. 定义 require 函数  The require function
   // var x = require('./util')
   // 返回的是 module.exports
   function __webpack_require__(moduleId) {

    // 1. 检测是否模块已在缓存中， 如果有， 直接从缓存中取出来用
    // 所以，module之会执行一次
     // Check if module is in cache
     if (installedModules[moduleId]) {
       return installedModules[moduleId].exports;
     }
     // 2. 创建一个新的module，然后添加进 installedModules || Create a new module (and put it into the cache)
     // 在文件中， 访问的module，就是这个 module.exports ..
     var module = installedModules[moduleId] = {
       i: moduleId,
       l: false,
       exports: {}
     };
     // 3. 执行 module 函数
     // Execute the module function
     modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
     //4. module已加载
     // Flag the module as loaded
     module.l = true;

     // 5. Return the exports of the module
     return module.exports;
   }


   // expose the modules object (__webpack_modules__)
   __webpack_require__.m = modules;

   // expose the module cache
   __webpack_require__.c = installedModules;

   // define getter function for harmony exports
   __webpack_require__.d = function (exports, name, getter) {
     if (!__webpack_require__.o(exports, name)) {
       Object.defineProperty(exports, name, {
         configurable: false,
         enumerable: true,
         get: getter
       });
     }
   };

   // 在exports上定义一个__esModule属性 ||　define __esModule on exports
   // 如果在模块中使用了　es6 的模块功能， 则module.exports.__esModule = true
   __webpack_require__.r = function (exports) {
     Object.defineProperty(exports, '__esModule', {
       value: true
     });
   };

   // getDefaultExport function for compatibility with non-harmony modules
   __webpack_require__.n = function (module) {
     var getter = module && module.__esModule ?
       function getDefault() {
         return module['default'];
       } :
       function getModuleExports() {
         return module;
       };
     __webpack_require__.d(getter, 'a', getter);
     return getter;
   };

   // Object.prototype.hasOwnProperty.call
   __webpack_require__.o = function (object, property) {
     return Object.prototype.hasOwnProperty.call(object, property);
   };

   // __webpack_public_path__
   __webpack_require__.p = "";


   // Load entry module and return exports
   return __webpack_require__(__webpack_require__.s = 0);
 })
 /************************************************************************/
 ({

   /***/
   "./src/main.js":
     /*!*********************!*\
       !*** ./src/main.js ***!
       \*********************/
     /*! no exports provided */
     /***/
     (function (module, __webpack_exports__, __webpack_require__) {

       "use strict";
       eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _one__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./one */ \"./src/one.js\");\n\r\nconst greeter = __webpack_require__(/*! ./two */ \"./src/two.js\");\r\n\r\nObject(_one__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('xixiixx')\r\n\r\nconst div = document.querySelector(\"#root\")\r\nconsole.log(div)\r\n\r\ndiv.appendChild(greeter());");

       /***/
     }),

   /***/
   "./src/one.js":
     /*!********************!*\
       !*** ./src/one.js ***!
       \********************/
     /*! exports provided: default */
     /***/
     (function (module, __webpack_exports__, __webpack_require__) {

       "use strict";
       eval("__webpack_require__.r(__webpack_exports__);\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(v) {\r\n  console.log(v)\r\n});");

       /***/
     }),

   /***/
   "./src/two.js":
     /*!********************!*\
       !*** ./src/two.js ***!
       \********************/
     /*! no static exports found */
     /***/
     (function (module, exports) {

       eval("module.exports = function() {\r\n  var greet = document.createElement('div');\r\n  greet.textContent = \"Hi there and greetings! 1123123\";\r\n  return greet;\r\n};");

       /***/
     }),

   /***/
   0:
     /*!*****************************************************************************!*\
       !*** multi (webpack)-dev-server/client?http://localhost:3000 ./src/main.js ***!
       \*****************************************************************************/
     /*! no static exports found */
     /***/
     (function (module, exports, __webpack_require__) {

       __webpack_require__( /*! D:\TEST\node_modules\webpack-dev-server\client\index.js?http://localhost:3000 */ "./node_modules/webpack-dev-server/client/index.js?http://localhost:3000");
       module.exports = __webpack_require__( /*! D:\TEST\src\main.js */ "./src/main.js");


       /***/
     })

 });
```