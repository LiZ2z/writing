# webpack 学习笔记

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

**[webpack][concepts]** 是一个针对现代 `Javascript` 程序的静态模块化打包工具。**webpack** 工作时，会从入口文件开始，分析整个项目的依赖项从而生成**依赖关系图**（dependency graph），**依赖关系图**映射了所有你项目中所需的模块，最终根据这些模块生成一个或多个 `bundle`.

- [entry][entry], [output][output] （输入与输出）

  可以通过配置 **[entry][entry]** 来告诉**webpack** 该从哪个地方开始它的工作。同样通过配置 **[output][output]** 来告诉**webpack** 将 `bundle` 输出在何处以及如何输出。

- [Loaders][loader]

  **webpack**将所有被依赖的资源都视为模块，这也是它被定义为 _**模块化打包工具的原因**_ 。但事实上，**webpack** 本身只能处理 `JavaScript` 和 `JSON`文件，但是 **[Loaders][loader]**可以让**webpack**能够处理其他类型的文件，并将其转换成能在你的项目中使用且能被添加到**依赖关系图**的有效模块。

- [Plugin][plugins]

  与**Loaders**专门被用于转换某些类型的模块不同，**[Plugin][plugins]** 可用于执行更广泛的任务，如打包优化、静态资源管理以及环境变量注入等。

- [Mode][mode]

  通过设置 **[Mode][mode]** 参数（`development`, `production` 或 `none`），可以启动 **webpack** 针对各个模式的内置优化。

- [Browser Compatibility][browser-compatibility]（浏览器兼容性）

  **webpack** 支持所有兼容 `es5` 的浏览器(不支持 IE8 及以下版本)。 **webpack** 需要`Promise`来实现 `import()` 和 `require.ensure()`。如果你想支持旧的浏览器，你需要在使用这些表达式之前引入`Promise` 的 polyfill。

- [Environment][environment] （运行环境）

  **webpack** 在 Node.js 8.x 及更高版本上运行。对于 webpack 5，至少需要 Node.js 10.13.0 (LTS)，参考：[To v5 from v4 #preparations](https://webpack.js.org/migrate/5/#preparations)。

## 与其他自动化工具的对比

gulp, grunt

参考：

1. [webpack Concepts][concepts]

[concepts]: https://webpack.js.org/concepts/ "webpack Concepts"
[entry]: https://webpack.js.org/concepts/#entry
[output]: https://webpack.js.org/concepts/#output
[loader]: https://webpack.js.org/concepts/#loaders
[plugins]: https://webpack.js.org/concepts/#plugins
[mode]: https://webpack.js.org/concepts/#mode
[browser-compatibility]: https://webpack.js.org/concepts/#browser-compatibility
[environment]: https://webpack.js.org/concepts/#environment
