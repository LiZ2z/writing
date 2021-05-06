

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

#### 2.2 Navigating the spec

> - 5~9 类型及类型转换等基本定义
> - 10～15 静态语义、运行时语义
> - 15～* APIs

The ECMAScript specification talks about a **HUGE** amount of things. Even though its authors try their best to separate it into logical chunks, it’s still a huge text.

Personally, I like to divide the spec into five parts:

- Conventions and basics ("what is a Number? what does it mean when the spec says 'throw a **TypeError** exception'?")
- Grammar productions of the language ("how does one write a `for`-`in` loop?")
- Static semantics of the language ("how are variable names determined in a `var` statement?")
- Runtime semantics of the language ("how is a `for`-`in` loop executed?")
- APIs ("what does `String.prototype.substring()` do?")

but that’s not how the spec organizes it. Instead, it puts the first bullet point in [§5 Notational Conventions](https://tc39.es/ecma262/#sec-notational-conventions) through [§9 Ordinary and Exotic Objects Behaviours](https://tc39.es/ecma262/#sec-ordinary-and-exotic-objects-behaviours), the next three in an interleaved form in [§10 ECMAScript Language: Source Code](https://tc39.es/ecma262/#sec-ecmascript-language-source-code) through [§15 ECMAScript Language: Scripts and Modules](https://tc39.es/ecma262/#sec-ecmascript-language-scripts-and-modules), like

> - [§13.6 The `if` Statement](https://tc39.es/ecma262/#sec-if-statement) **Grammar productions**
>   - §13.6.1-6 **Static semantics**
>   - §13.6.7 **Runtime sematics**
> - [§13.7 Iteration Statements](https://tc39.es/ecma262/#sec-iteration-statements) **Grammar productions**
>   - §13.7.1 Shared **static** and **runtime semantics**
>   - §13.7.2 The `do`-`while` Statement
>     - §13.7.2.1-5 **Static semantics**
>     - §13.7.2.6 **Runtime semantics**
>   - §13.7.3 The `while` Statement
>     - ...

while the APIs are spread out through clauses [§18 The Global Object](https://tc39.es/ecma262/#sec-global-object) through [§26 Reflection](https://tc39.es/ecma262/#sec-reflection).

At this point, I’d like to point out that **absolutely no one** reads the spec from top to bottom. Rather, only look at the section corresponding to what you are trying to look for, and *in* that section only look at what you need. Try to determine which one of the five big sections your specific question relates to; and if you are having trouble determining which one it is, ask yourself the question "at which time is *this* (whatever you are trying to confirm) evaluated?" which may help. Don’t worry, navigating the spec will only become easier with practice.

### 参考：

- [How to Read the ECMAScript specification ?](https://timothygu.me/es-howto/#navigating-the-spec)