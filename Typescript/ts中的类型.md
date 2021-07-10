## Typescript中的类型



#### 基本类型

- [`never`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#the-never-type)

  `never`代表一个从不会出现的值。通常，`never`用于那些永远不可能返回的函数的返回类型，这些函数中要么会抛出错误，要么有死循环。

  `never`被认为是其他任何类型的「子类型」，可以被赋值给其他类型，因为当有`never`赋值出现时，后面的代码永远不会被触达（执行到），赋值操作永远不会完成。但是其他类型不可以被赋值给`never`。

  因为never是每个类型的子类型，所以它总是从联合类型中被忽略，并且只要有其他类型被返回，它就会在函数返回类型推断中被忽略。

- [`unknown`]()

- [`any`]()

- [`void`]()

#### 非基本类型

- [`object`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#object-type)

#### 其他

- 字面量类型
- union type
- [交叉类型]()
- [`enum`]()
- [`tuple`]()
- 
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#mapped-types)



