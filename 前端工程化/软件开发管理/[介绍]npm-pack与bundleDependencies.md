# `npm pack` 指令 与 `bundleDependencies`


## **`npm pack`**

#### **使用**

`npm pack` 是一个打包指令📦 ，不同于webpack那种打包，`npm pack` 使用 _**tarball**_ 工具🔧将整个文件夹打包成一个单独的tarball文件（以`.tgz`做后缀）。

> tarball，一种在 linux 上用于管理和备份一组文件的工具。可以通过`tar`命令进行使用tarball，可以将一组文件打包成一个二进制的文件（有时会压缩文件），打包后的文件格式名通常为`.tar`\\`.tgz`等，可以通过`tar -x`进行解包。

可以通过 `npm install <tarball file>`  或 `npm install <tarball url>` 指令安装通过`npm pack`打包的tarball文件。


## **bundleDependencies**

#### **使用**

[bundleDependencies](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#bundleddependencies) 是一个在package.json 中的配置，它允许你以数组的形式声明一组依赖项。

```json
{
  "bundleDependencies": ["redux"]
}
```

#### **工作原理**

不同于`dependencies`配置，`bundleDependencies`声明的是打包时（`npm pack`）的依赖。以上面的配置为例，npm会将`node_modules/redux`一起打包，当其他用户安装这个tarball文件时，也就同时安装了这个`redux`，目前看起来好像跟`dependencies`没有太多实际上的区别。

#### **应用场景**

- 当我们对一个依赖的第三方包做了本地的修改，不是通过fork 它的代码，修改，然后提交pr，这一套流程，就可以在项目中通过`bundleDependencies`声明这个包，然后通过`npm pack`把我们的代码跟被修改的第三方包一起打包并发布。

- `bundleDependencies`可以让我们将第三方依赖直接与我们的代码一起打包并安装，所以这也是一种有效的锁定依赖版本的方法。







[npm-pack]: (https://docs.npmjs.com/cli/v6/commands/npm-pack) 