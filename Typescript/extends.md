```typescript
type PrimaryType = string | number | undefined | null | boolean;
type Rest<V, T> = V extends T ? never : V;
type NotEmpty<T> = T extends null | undefined | infer U ? U : never;
type a = Rest<PrimaryType, undefined | null>;
type B = NotEmpty<PrimaryType>;
```

