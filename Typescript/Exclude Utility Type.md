## Exclude Utility Type

`Exclude` Utility Type的表现让人比较迷惑：

```typescript
type Exclude<T, U> = T extends U ? never : T;

type AB = 'a'|'b';

type BC = 'b'| 'c';

type R = Exclude<AB, BC>; // 'a'
```

主要跟`union types`在`Conditional Types` 中的特定表现有关，[see Distributive Conditional Types]([TypeScript: Documentation - Conditional Types (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types))

当条件类型作用于联合类型时，条件类型就变成了分布式的：

```typescript
Exclude<'a'|'b', 'b'|'c'>;
// 👇
'a' | 'b' extends 'b' | 'c' ? never : 'a' | 'b';
// 👇
('a' extends 'b' | 'c' ? never : 'a') | ('b' extends 'b' | 'c' ? never : 'b');
// 👇
'a' | never;
// 👇
'a'
```

根据实际表现，只有`extends` 左侧的联合类型会被分布式处理，这很正常，因为`extends`左侧的类型是被操作的类型。

官网有个例子：

```typescript
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;
// 官网说上面类似于👇
ToArray<string> | ToArray<number>;
```

不清楚typescript是不是真正可以从`ToArray<string | number>`推断出`ToArray<string> | ToArray<number>`，但我觉得只有当解析到`Type extends any ? Type[] : never`才能知道是不是需要做分布式。