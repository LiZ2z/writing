### Optinal Chaining

#### 简单使用

1. 支持属性访问

   ```javascript
   a?.b
   a?.['c']
   a?.d()
   ```

2. 支持函数调用

   ```javascript
   a?.b?.() 
   a?.()
   ```

3. 支持`delete`

   ```javascript
   delete a?.b
   // 👇
   a === null || a === void 0 ? true : delete a.b
   ```

   

#### 注意事项

不同于`&&`遇到所有“falsy”的值（`undefined`|`null`|`''`|`0`）都会短路 ，optional chaining只针对`null`和`undefined`生效

```javascript
a?.b 
// 👇
a === null || a === void 0 ? void 0 : a.b;
```

#### 参考：

1. [Optional Chaining for JavaScript](https://github.com/tc39/proposal-optional-chaining/)
2. [TypeScript 3.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)





