# 使用[`yarn v2`](https://yarnpkg.com/features/workspaces)与[`lerna`](https://github.com/lerna/lerna)来实施 monorepo

### **`yarn` 能做什么**

- 规范化 repo 结构

- 依赖管理，帮助你更好的简化依赖安装

  - 通过`yarn`指令安装所有依赖项

  - 通过`yarn workspace <command>`来针对各个 project 执行指令

- 其他功能：跨 project 的 scripts 调用

### `lerna` 能做什么

- 针对每个 project 的独立版本控制

  ```javascript
  // lerna.json
  {
  "npmClient": "yarn",
  // 声明独立的版本控制
  "version": "independent"
  }
  ```

### **step by step 配置**

1. 创建远程 git repo，并关联本地文件夹

2. 执行`yarn set version berry`将当前工作目录的 yarn 版本切换为 yarn v2

3. 执行`yarn init --workspace`
   你会发现根目录长这样：

   ```
     root
     |
     |-- package.json
     |-- packages/
     \-- yarn.lock
   ```

   生成的 package.json 长这样：

   ```json
   {
     "name": "xxx",
     "private": true,
     "workspaces": {
       "packages": ["packages/*"]
     }
   }
   ```

   `private: true`是因为我们不会也不应该把整个 repo 发布到 npm 上去

   `workspaces` 指定工作区，可以指定多个 （todo）

   `packages` 自动生成的文件夹，即一个 workspace （todo）

4. 提交配置到远程仓库

> 到这里，我们的基础配置就完成了

5. 开始配置一些开发辅助工具：lint、prettier、ignore、ts 等，一般来说，这些规则都是类似或相同的，我们没必要针对每个 project 都配置一遍，所以直接在根目录下配置，这样所有的 project 共享同样的配置：

   ```bash
   yarn add eslint prettier typescript ... -D
   ```

   你会发现`node_modules`不见了，取而代之多了`.yarn/cache` 文件夹及 `.pnp.js`文件，这是因为 yarn v2 默认开启了 yarn Pnp 和 zero install，下载的所有资源都以压缩包的方式存放在`.yarn/cache`中，`.pnp.js`则指明了如何找到并解析我们下载的资源。

   开发辅助工具配置完成后，我们可能发现它们在一些编辑器中并不能正常工作，这是因为编辑器的插件依赖项目中的资源来工作，编辑器的插件默认会从项目目录中的`node_modules`文件夹中找这些资源，但是现在`node_modules`文件夹已经没有了，所以我们还需要告诉编辑器如何找这些资源

6. 配置编辑器，yarn 提供了一些简单的指令：

   针对 vs code

   ```bash
   yarn dlx @yarnpkg/pnpify --sdk vscode
   ```

   > 上面命令的意思是 执行 @yarnpkg/pnpify 这个包针对 vscode 的 sdk 配置指令，`yarn dlx` 意思是临时执行，它会先下载 @yarnpkg/pnpify，等指令执行完成后自动删除，而不是下载到本地。

   目前 vscode sdk 支持的工具有：Builtin VSCode TypeScript Server、vscode-eslint、prettier-vscode、vscode-stylelint、flow-for-vscode\*

   另外，如果这些开发辅助工具不是一次性安装的，你需要在每次安装之后都执行一遍`yarn dlx @yarnpkg/pnpify --sdk vscode`。

7. 最后，执行一下：

   ```bash
   yarn install
   # or
   yarn
   # for short
   ```

> 完成 ✅

### **Troubleshooting**

- typescript 不能找到包

  这时候需要弹出`node_modules`文件夹

  ```bash
    yarn config set nodeLinker node-modules && yarn install
  ```

- eslint 不能解析路径

  如果使用了`eslint-plugin-import`，可能会报错，因为它还不支持 yarn Pnp，需要安装：

  ```bash
    eslint-import-resolver-node
  ```

  然后在`eslintrc`中配置:

  ```JavaScript
  {
    "settings": {
      "import/resolve": "node"
    }
    // ... 其他配置
  }
  ```
