# webpack 性能优化

这里的性能优化指的是加快 build 速度，即减少 build 时间。

> 性能优化基本原则：
>
> - 跳过不必要的任务
> - 缓存，尽量复用之前的执行结果
> - 多线程，通过 worker 来处理任务
> - 优先级，优先处理重要的任务

我们根据以上原则来具体看：

### 跳过不必要的任务

- loader

  > 将 loader 应用于最少数量的必要模块，通过使用 include 字段，仅将 loader 应用在实际需要将其转换。

- bootstrap

  > 每个额外的 loader/plugin 都有其启动时间。尽量少地使用工具。

  一些用于性能分析的 `plugin`反而会增加打包时间，谨慎使用。

- resolve

  > - 减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中条目数量，因为他们会增加文件系统调用的次数。
  > - 如果你不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve.symlinks: false。
  > - 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 resolve.cacheWithContext: false。

- dll

  > 使用`webpack.DllPlugin`为更改不频繁的代码（如：第三方库）生成单独的编译结果。这可以提高应用程序的编译速度，尽管它增加了构建过程的复杂度。

- Smaller = Faster

  > 减少编译结果的整体大小，以提高构建性能。尽量保持 chunk 体积小。
  >
  > - 使用数量更少/体积更小的 library。
  > - 在多页面应用程序中使用 SplitChunksPlugin。
  > - 使用数量更少/体积更小的 library。

- Source Maps

  生成 source map 非常消耗资源，谨慎选择自己需要的 sourc map。

- 环境

  关掉对于当前环境无意义的功能：

  - 在开发环境中，代码混淆、压缩、拆分、某些 hash 生成等等都是没意义的，可以关掉
  - 在生产环境中，类似于`style-loader`这些只在开发环境有效的 loader 是没意义的

- 输出结果不携带路径信息

  > webpack 会在输出的 bundle 中生成路径信息。然而，在打包数千个模块的项目中，这会导致造成垃圾回收性能压力。在 options.output.pathinfo 设置中关闭：
  >
  > ```javascript
  > module.exports = {
  >   // ...
  >   output: {
  >     pathinfo: false,
  >   },
  > };
  > ```

### 缓存

> 使用 cache-loader 启用持久化缓存。使用 package.json 中的 "postinstall" 清除缓存目录。

- babel

  使用 babel-loader 时，配置其缓存属性

### 多线程

> thread-loader 可以将非常消耗资源的 loader 分流给一个 worker pool

> 不要使用太多的 worker，因为 Node.js 的 runtime 和 loader 都有启动开销。最小化 worker 和 main process(主进程) 之间的模块传输。进程间通讯(IPC, inter process communication)是非常消耗资源的。

[parallel-webpack](https://github.com/trivago/parallel-webpack) allows you to run multiple webpack builds in parallel, spreading the work across your processors and thus helping to significantly speed up your build

参考：

- [构建性能](https://webpack.docschina.org/guides/build-performance/)
