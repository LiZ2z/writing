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
'a'|'b' extends 'b' | 'c' ? never : T;
// 👇
('a' extends 'b' | 'c' ? never : T) | ('b' extends 'b' | 'c' ? never : T);
// 👇
'a' | never;
// 👇
'a'
```



