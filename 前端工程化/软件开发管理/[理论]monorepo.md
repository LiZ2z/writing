# **monorepo**

> `mono` 是希腊语，意为“单个、一个“，`repo`是 `repository` 的缩写，`monorepo`即为单个仓库。

monorepo 是一种软件开发策略，即将多个项目（project）放在同一个仓库(repo)中管理。

### **优势**

- **方便代码复用**

  类似的功能，或者公用的模块可以直接抽离为单独的 project 放在 repo 中，其他人可以直接引用而不用先发到 npm 再在各个项目引入

- **简化依赖管理**

  多个项目可能都依赖某个第三方包，对于多个项目，就需要多次下载，速度慢，而且占空间。通过 monorepo 策略进行管 理，对于重复依赖的包可以只下载一次

- **原子化提交**

  当 project 之间相互关联，一个 project 的版本发布需要更新其他几个 project 时，对于大型项目的依赖管理及版 本兼容问题会非常麻烦。但是通过 monorepo 策略，开发人员在修改 project 的时候，可以同时更新其他 project， 然后统一发布

- **方便大规模代码重构**

  开发人员可以访问统一 repo 中的所有 project，那么可以通过统一脚本等方式，很方便的确认重构后的代码在每个项目 中都能正常工作

- **方便跨团队协作**

  假设你依赖了统一 repo 的其他 project，当这个 project 出问题了，你可以很容易的直接对其进行修复

### **限制**

- **可能缺乏足够的版本信息**

  有些 repo 采用统一的版本策略，这可能导致每个单独的 project 的版本信息丢失

  > 通过[lerna](https://github.com/lerna/lerna)，可以实现对仓库中每个 project 的单独版本控制

- **缺乏访问控制**

  使用拆分存储库，可以根据需要授予对存储库的访问权限。 monorepo 允许对项目中的所有 project 进行读取访问，可 能会带来新的安全问题

  > Note that there are versioning systems in which this limitation is not an issue. For example, when Subversion is used, it's possible to download any part of the repo (even a single directory), and path-based authorization can be used to restrict access to certain parts of a repository. Likewise almost all versioning systems do not require a download of the whole repository, such that a download size or disk space used is not in principle not different from multiple repos

### **应用**

see: [使用 yarn 与 lerna 来管理 monorepo](./使用yarn与lerna来管理monorepo.md)

参考：

- [monorepo - wiki](https://en.wikipedia.org/wiki/Monorepo)
- [monorepo](https://danluu.com/monorepo/)
- [Monorepo 是什么，为什么大家都在用？](https://zhuanlan.zhihu.com/p/77577415)
