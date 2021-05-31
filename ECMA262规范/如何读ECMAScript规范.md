

## why

ECMAScript specification 是所有「Javascript实现（名词。例如：浏览器、nodejs）」行为的权威规范。大部分情况不需要读，除非你想更深入了解Javascript。

## how

#### 2.1 哪些属于ECMAScript spec，哪些不属于？

| -                                                            | 属于？ | 说明                                                         |
| :----------------------------------------------------------- | ------ | ------------------------------------------------------------ |
| 语法（i.e., 一个有效的`for`..`in`是啥样）                    | ✅      |                                                              |
| 语义（i.e., `typeof null` 返回值是啥）                       | ✅      |                                                              |
| `Object`, `Array`, `Function`, `Number`, `Math`, `RegExp`, `Proxy`, `Map`, `Promise`, `ArrayBuffer`, `Uint8Array`, `globalThis`, ... | ✅      |                                                              |
| `console`, `setTimeout()`, `setInterval()`, `clearTimeout()`, `clearInterval()` | ❌      | 这些方法在浏览器及nodejs中都可以使用，但不属于ECMAScript spec。对于nodejs环境，它们由no dejs官方文档定义。对于浏览器环境，`console`由[console规范](https://console.spec.whatwg.org/#namespacedef-console)定义，其他的由[HTML规范](https://html.spec.whatwg.org/multipage/)定义 |
| `Buffer`, `process`, `global`*                               | ❌      | nodejs专有                                                   |
| `module `,`exports`, `require()`, `__dirname`, `__filename`  | ❌      | nodejs专有全局变量                                           |
| `window`, `alert()`, `confirm()`, the DOM (`document`, `HTMLElement`, `addEventListener()`, `Worker`, ...) | ❌      | 浏览器专有，由HTML规范定义                                   |
| `import a from 'a';`                                         | ❓      | ECMAScript  spec 规定了模块声明的语法及含义，但是并未指明他们应该如何工作。 |

#### 2.2 内容导航

- [§5 Notational Conventions ](https://tc39.es/ecma262/#sec-notational-conventions) ～ [§10 Ordinary and Exotic Objects Behaviours](https://tc39.es/ecma262/#sec-ordinary-and-exotic-objects-behaviours)  

  类型及类型转换等基本定义。例如：数值类型是什么？

- [§11 ECMAScript Language: Source Code](https://tc39.es/ecma262/#sec-ecmascript-language-source-code)  ～ [§16 ECMAScript Language: Scripts and Modules](https://tc39.es/ecma262/#sec-ecmascript-language-scripts-and-modules) 

  - 语法定义。i.e. 如何写一个 `for`-`in` 循环？

  - 静态语义。i.e. 在一个变量声明语句中，哪个部分是变量名？

  - 运行时语义。i.e.  `for`-`in` 循环是怎么执行的？

- [§19 The Global Object](https://tc39.es/ecma262/#sec-global-object) ～ [§28 Reflection](https://tc39.es/ecma262/#sec-reflection)

  ​	APIs。i.e.  `String.prototype.substring()`方法做了什么？

> At this point, I’d like to point out that **absolutely no one** reads the spec from top to bottom. Rather, only look at the section corresponding to what you are trying to look for, and *in* that section only look at what you need. Try to determine which one of the five big sections your specific question relates to; and if you are having trouble determining which one it is, ask yourself the question "at which time is *this* (whatever you are trying to confirm) evaluated?" which may help. Don’t worry, navigating the spec will only become easier with practice.

下面的指南摘自规范本身：

> The remainder of this specification is organized as follows:
>
> Clause [5](https://tc39.es/ecma262/#sec-notational-conventions) defines the notational conventions used throughout the specification.
>
> Clauses [6](https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values) through [10](https://tc39.es/ecma262/#sec-ordinary-and-exotic-objects-behaviours) define the execution environment within which ECMAScript programs operate.
>
> Clauses [11](https://tc39.es/ecma262/#sec-ecmascript-language-source-code) through [17](https://tc39.es/ecma262/#sec-error-handling-and-language-extensions) define the actual ECMAScript programming language including its syntactic encoding and the execution semantics of all language features.
>
> Clauses [18](https://tc39.es/ecma262/#sec-ecmascript-standard-built-in-objects) through [28](https://tc39.es/ecma262/#sec-reflection) define the ECMAScript standard library. They include the definitions of all of the standard objects that are available for use by ECMAScript programs as they execute.
>
> Clause [29](https://tc39.es/ecma262/#sec-memory-model) describes the memory consistency model of accesses on SharedArrayBuffer-backed memory and methods of the Atomics object.

### 参考：

- [How to Read the ECMAScript specification ?](https://timothygu.me/es-howto/#navigating-the-spec)