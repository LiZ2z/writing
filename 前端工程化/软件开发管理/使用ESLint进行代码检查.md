# 使用ESLint进行代码检查

## ESLint

eslint 是一个静态代码检测工具，不用执行代码就可以发现代码中的错误或缺陷（语法、结构、未使用的变量等），从而减少代码运行时出错的几率。合理利用eslint不但可以优化代码质量，还可以美化代码样式。

### 工作原理

ESLint使用Espree（类似@babel/parser）将代码解析成AST，然后分析AST来对代码进行检查。

### 使用

2. 安装

    - 安装为项目依赖，这样我们可以在项目中通过`yarn eslint`  来手动执行检测：
    ```bash
      yarn add eslint -D
    ```
    - 安装为IDE插件，可以在我们开发的时候直接给予提示信息。以vscode为例，直接在插件商店找到eslint安装即可。

3. 配置文件

    不管是本地安装的ESLint，还是IDE插件都会优先读取项目根目录中的配置文件，并根据其中的配置进行检测工作。我们可以通过设置配置文件自定义我们想要的检查规则。

    - 配置文件一般放在项目根目录中。

    - 配置文件格式可以为 `json`、`javascript`、`yaml`，按喜好使用。

    - 配置文件名可以为`.eslintrc`、`.eslintrc.json`、`.eslintrc.js`、`.eslintrc.yml`。

    - 配置文件大致内容如下：
    
    ```json
    {
      // ESLint工作时，首先用解析器将我们的代码转换成AST，这就需要解析器能识别我们源代码中所有的语法，
  // 否则就无法转换。如果解析器不能识别我们使用的一些高级语法，即使代码写的没问题，也可能因为解析器
      // 无法识别而抛出错误。这时，我们可以通过更换更高级的解析器来解决这个问题。
      //
      // parser字段允许我们自定义解析器（记得安装解析器）。例如：如果我们使用了typescript，我们就可以
      // 设置：
      // "parser": "@typescript-eslint/parser",
      //
      // 默认：
      "parser": "esprima",
      // parserOptions 将会在运行时传递给parser，以实现不同的解析功能。不同的parser有不同的options，
  // 记得看它们的说明。
      "parserOptions": {},
      
      // 我们的javascript 代码可能运行在不同的环境（浏览器、nodejs），不同的环境有不同的环境变量。
  // 我们需要告诉ESLint，以让它预先定义这些环境变量，否则会报错。
      "env": {},
     
      // 简单来说，如果我们在使用服务端渲染，后端可能会在window上挂载一些自定义的数据，例如：`window._user`，
      // 当我们在代码中获取这个`window._user`时，ESLint会报错。因为标准的`window`上是没有这个属性的，所以
      // 我们需要告诉ESLint。
      "globals": {
        // 不允许覆写
        "_user": "readonly",
        "var2": "writable"
      },
      
      // ESLint是基于插件设计的。前面说了ESLint会将代码转换成AST，然后分析AST以进行代码检查，ESLint提供了
      // 插件机制以让我们自定义规则并开发对应的分析代码（如果你不想开发，已经有很多第三方插件供你使用了）。
      //
      // 插件可以定义代码检测的规则（rule）并包含对应的检查代码，添加了哪些插件即意味着你将拥有哪些规则，
      // 同一个插件可以定义一个至多个规则。
      //
      // 以代码样式检测为例，我们希望在模块引入代码下面必须留一个空行，就可以使用`eslint-plugin-import`
      // 这个插件。
      // 可以只写import，eslint会自动加上前缀 `eslint-plugin-`
      "plugins": ['import'],
      "rules": {
        // 添加了插件，我们就拥有了下面这条规则（eslint-plugin-import 定义了若干条规则，这只是其中之一）。
        // 下面这行配置的意思是：“规定 import a from 'a'; 与正式代码之间必须存在3个空行”。
        "import/newline-after-import": ["warn", {count: 3}]
        
        // NOTE：除非我们想对其进行配置，一般我们不用把规则全列出来，插件会提供默认配置。
      },
      
      // ESLint支持将共享设置添加到配置文件中。 您可以将设置对象添加到ESLint配置文件，它将提供给将要执行的
      // 每个规则。 如果你要添加自定义规则，并希望它们可以访问相同的信息并且易于配置，这可能会很有用。
      "settings":{
        
      },
      
      // ESLint会向父级文件夹查找配置文件，直到根目录，这方便所有项目使用同一个配置文件。但是如果你不想这样，
      // 设置 root字段
      "root": true,
      
      // 可以通过extends字段使用别人的ESLint配置，当然，我们的配置也可以提供给别人使用
      "extends": []
    }
    ```
    
    更多见：[ESLint配置](https://eslint.org/docs/user-guide/configuring)

## 高级用法

### 搭配prettier进行代码风格检测


  prettier 提供了统一的代码风格，你没有太多的选择，也就省去了很多的折腾，默认风格也比较好看，是目前使用非常多的代码格式化工具，它主要针对的是代码风格，比如缩进、单双引号等等。

  prettier 提供了一个搭配ESLint一起使用的插件`eslint-plugin-prettier`，使用方式如下：

1. 安装：

   ```bash
    yarn add prettier eslint-plugin-prettier eslint-config-prettier -D
   ```

    在`.eslintrc`中：

    ```javascript
    {
      extends : [ 
        // ... 其他预设插件
        // prettier 放在最后
        'plugin:prettier/recommended'
      ] 
    }
    ```

    prettier 插件放在最后，这样他就可以覆盖掉所有其他插件关于代码风格的配置，并由自己负责。

    另外，prettier还支持针对react、typescript的特殊配置：

    ```json
    {
      "extends": [
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/react",
        "prettier/standard"
      ]
    }
    ```

    更多见：[prettier](https://prettier.io/) \ [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) \ [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

### 使用`eslint-plugin-import`做ES6模块导入\导出语法检测


  这个插件可以帮助我们做ES6模块语法的检测，帮助我们避免的因为拼写错误导致的bug及其他问题，_**ES6模块语法在设计时所希望提供的优点，都能通过这个插件进行约束（换句话说，你可以通过读这个插件的规则来了解ES6模块语法的优点，及它想解决的事情）**_。

1. 安装：

    ```bash
    yarn add eslint-plugin-import -D
    ```
    所有规则默认关闭，所以需要自己设置，或者使用推荐预设：

    ```javascript
    // 自定义
    {
      plugins: ['import'],
      rules: {
        'import/named': 2,
        // ... 其他
      }
    }

    // 使用预设
    {
      extends: [
        'plugin:import/errors',
        'plugin:import/warnings'
      ]
    }
    ```

2. 配置（settings）：

作为一个检测模块语法的插件，自然需要分析各个路径是否正确。由于现代javascript开发工具提供了千奇百怪的路径引入功能，以webpack为例，提供了 alias、loader(`import 'file!./    whatever'`)、externals 等，这些功能nodejs原生都不支持，所以就会报错，所以为了解决这些问题，该插件提供了很多配置：

- import/extensions 用于配置查找的文件后缀

```json
  {
    "settings": {
      "import/extensions": [".js", ".ts"]
    }
  }
```

- import/resolver

  推荐使用`eslint-import-resolver-node`    

- import/parsers

当已将 `eslint.parser` 设置成 `@typescript-eslint/parser` 时，没必要针对tsx文件继续配置

### 搭配`@typescript-eslint/eslint-plugin`来做typescript语法检测

TODO

## Trouble Shooting

- 一旦配置出错，VSCode的eslint插件就无法执行，不会标记错误，此时不要认为自己的代码都是正确的。可以特意写一些错误代码，看看ESLint是否正常工作。