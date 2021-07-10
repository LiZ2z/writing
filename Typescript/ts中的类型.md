## Typescript中的类型



#### 基本类型

- `boolean`\`string`\`number`\`bigint`\`symbol`\`null`\`undefined`

- [`any`]() 

  可以将任意值赋值给`any`类型的变量，也可以对`any`类型的变量做任何操作。

- [`unknown`]([TypeScript: Documentation - More on Functions (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown))

  `unknown`代表任何值，即，可以将任意值赋值给`unknown`类型的变量。类似于`any`类型，但是更安全，因为不允许对`unknown`类型的变量做任何操作，除了`as`断言。

- [`never`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#the-never-type)

  `never`代表一个从不会出现的值。通常，`never`用于那些永远不可能返回的函数的返回类型，这些函数中要么会抛出错误，要么有死循环。

  `never`被认为是其他任何类型的「子类型」，可以被赋值给其他类型，因为当有`never`赋值出现时，后面的代码永远不会被触达（执行到），赋值操作永远不会完成。但是其他类型不可以被赋值给`never`。

  因为never是每个类型的子类型，所以它总是从联合类型中被忽略，并且只要有其他类型被返回，它就会在函数返回类型推断中被忽略。

- [`void`]([TypeScript: Documentation - More on Functions (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/2/functions.html#void))

  `void`代表没有声明返回值的函数的返回值类型。即，当一个函数没有返回语句，或返回语句中没有显示的声明返回值，TS认为它的返回值类型是`void`。js中当一个函数没有返回值时，将会隐式的返回`undefined`，但在TS中，这俩个是不同的。[see]([TypeScript: Documentation - More on Functions (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/2/functions.html#return-type-void))

#### 其他

- [Literal Types（字面量类型）]([TypeScript: Documentation - Everyday Types (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types))

  除了通用的`string`或`number`类型，也可以指定某些「特定的字符串或数字」作为类型。

  探讨这个类型出现背景的一个出发点是 从JavaScript赋值方式进行思考。在JavaScript中，通过`var`，`let`声明的变量，后续都可以修改它们的值，但是`const`声明的变量不可以。这也即时typescript为什么要有字面量类型。

  ```typescript
  let changingString = "Hello World";
  changingString = "Olá Mundo";
  // Because `changingString` can represent any possible string, that
  // is how TypeScript describes it in the type system
  changingString;
        
  let changingString: string
  
  const constantString = "Hello World";
  // Because `constantString` can only represent 1 possible string, it
  // has a literal type representation
  constantString;
        
  const constantString: "Hello World"
  ```

  单独使用的字面量类型通常没多大意义，就是限制一个变量只能被赋予指定的字面量。

  但是将字面量应用在联合类型中，通常可以表达出非常丰富的意思。比如`print`函数只能支持三种颜色，我们可以利用字面量联合类型来限制用户输入。

  ```typescript
  function print(text:string, color: 'red' | 'green' | 'blue') {
  	 //...
  }
  ```

  

#### 非基本类型

- [`object`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#object-type)

  ​	除了基本类型的值，其他任何值都是`object`类型。

  ```typescript
  function reverse(s: String): String {
    return s.split("").reverse().join("");
  }
  
  let a: object = [1,2]
  let b: object = reverse
  ```
  
- [交叉类型]()

- [`enum`]()

- [`tuple`]()

- [union type]()



#### 类型操作

TS支持使用已有类型来创建新类型。通过组合各种操作符将其应用在现有类型上，我们可以表达出其他各种复杂类型。这种时候就像是将类型作为值进行操作。

- [Conditional Types]([TypeScript: Documentation - Conditional Types (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html))

- [模板字面量类型]([TypeScript: Documentation - TypeScript 4.1 (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)) 、[模板字面量类型改善]([TypeScript: Documentation - TypeScript 4.3 (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#template-string-type-improvements))

  用于 building other string literal types.  It has the same syntax as [template literal strings in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), but is used in type positions. 

- [Mapped Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#mapped-types)



