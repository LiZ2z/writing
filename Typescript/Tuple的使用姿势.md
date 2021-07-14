# Tuple 的使用姿势

## Tuples in rest parameters and spread expressions

TypeScript 3.0 adds support to multiple new capabilities to interact with function parameter lists as tuple types.

With these features it becomes possible to strongly type a number of higher-order functions that transform functions and their parameter lists.

### 1. [Rest parameters with Tuple types（🎉重要功能）](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#rest-parameters-with-tuple-types)

当一个rest Parameters的类型是Tuple，Tuple类型被扩展为一系列离散参数。

> L: TS现在可以理解在声明函数时将Tuple作为Rest Parameters类型的写法，TS会将他们当作离散参数处理

```typescript
declare function foo(...args: [number, string, boolean]): void; // 声明，rest parameters
// 上下↕️两个声明是一样的
declare function foo(args_0: number, args_1: string, args_2: boolean): void;
```

### 2. [Spread expressions with tuple types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#spread-expressions-with-tuple-types)

当函数调用将**_Tuple类型的扩展表达式作为最后一个参数_**时，扩展表达式对应于元组元素类型的离散参数序列。

```typescript
const args: [number, string, boolean] = [42, "hello", true]; // Tuple
// 👇三个函数调用是等价的
foo(42, "hello", true);
foo(args[0], args[1], args[2]);
foo(...args); // 调用，spread expression
```

### 3. [Generic rest parameters（🎉重要功能）](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#generic-rest-parameters)

函数的rest parameters 的类型可以用范型来表示，**_范型必须满足数组类型约束（`T extends any[]`）_**，TS的类型推断器可以推断出这个「范型rest parameters」的Tuple类型。

这可以实现部分函数参数的高阶捕获及传播：



### 4. [Optional elements in tuple types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#optional-elements-in-tuple-types)

Tuple types now permit a `?` postfix on element types to indicate that the element is optional:

```typescript
let t: [number, string?, boolean?];
t = [42, "hello", true];
t = [42, "hello"];
t = [42];
```

### 5. [Rest elements in tuple types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#rest-elements-in-tuple-types)

Tuple类型的**_最后一个元素_**可以是形式为`...T`的rest元素，其中`T`是数组类型。rest元素表示Tuple类型是开放式结尾（open-ended），可以有0个或多个数组内元素类型的附加元素。例如， `[number, ...string[]]`  意味着该Tuple类型有一个`number` 类型元素，后面可以跟着任意数量的`string`类型的元素。

> The last element of a tuple type can be a rest element of the form `...X`, where `X` is an array type. A rest element indicates that the tuple type is open-ended and may have zero or more additional elements of the array element type. For example, `[number, ...string[]]` means tuples with a `number` element followed by any number of `string` elements.

```typescript
function tuple<T extends any[]>(...args: T): T {
  return args;
}
const numbers: number[] = getArrayOfNumbers();
const t1 = tuple("foo", 1, true); // [string, number, boolean]
const t2 = tuple("bar", ...numbers); // [string, ...number[]]
```

## TS4.0

### 1. [Variadic Tuple Types（🎉重要功能）](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)



