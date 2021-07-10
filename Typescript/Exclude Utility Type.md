## Exclude Utility Type



```typescript
type Exclude<T, U> = T extends U ? never : T;

type AB = 'a'|'b';

type BC = 'b'| 'c';

type R = Exclud<AB, BC>; // 'a'
```

