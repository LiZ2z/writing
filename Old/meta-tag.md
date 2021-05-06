---
tags: ['前端','基础知识']
---
# meta标签
## 一、meta标签是什么？
meta标签是HTML语言head区的一个辅助性标签
## 二、meta标签是干什么用的？
meta标签用来描述一个HTML网页文档的属性，例如作者、日期和时间、网页描述、关键词、页面刷新等。它提供的信息虽然用户不可见，但却是文档的最基本的`元数据`。
>元数据(Metadata)是用来概括描述数据的一些基本数据。也就是描述数据的数据。例如：你今天在下班途中邂逅了一个美女，然后回到家之后你就迫不及待的想跟你的朋友炫耀一下。但是你不能只说你邂逅了一个美女，你得描述具体点啊，不然谁信啊？所以你得通过年龄、身高、相貌、性格来描述。

这个例子中的”年龄”、”身高”、”相貌”、”性格”，就是元数据，因为它们是用来描述具体数据/信息的数据/信息。
## 三、meta标签常用属性
meta标签常用属性有：`name`、`charset`、`content`、`http-equiv`等。`content`属性用于定义与 `http-equiv`或`name`属性相关的元信息。
## 四、`name`属性常用配置
name属性主要用于描述网页，比如网页的关键词，叙述等。与之对应的属性值为content，content中的内容是对name填入类型的具体描述，便于搜索引擎抓取。meta标签中name属性语法格式是：
```html
<meta name='参数' content='具体描述'>
```
### 1. keywords
用于告诉搜索引擎，此网站的关键字。例:
```html
<meta name='keywords' content='LiZ2z,blog,博客,前端'>
```
### 2. description
用来告诉搜索引擎你的网站主要内容。当用户在搜索引擎中搜索找到页面时，在搜索结果列表中补充描述该页面。在description中含有的词语， *同样会被搜索引擎识别* ，并且同样的可以在某种程度上作为关键词参与排名。description的内容将会很大程度影响用户是否点击你的页面。写作description时有点像出售对应页面的广告语，一定要写的 *吸引人点击* ，并且不要夸大事实。description的长度 *最好不要超过160字节* 。例：
```html
<meta name='description' content='此站是一个个人的前端知识分享博客。'>
```
### 3. viewport
该属性用于设置移动设备的可视视口。例:
```html
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
```
### 4. robots
用来告诉搜索引擎爬虫哪些页面需要索引，哪些页面不需要索引。例:
```html
<meta name='robots' content='none'> 
```
#### 具体参数如下：

all：文件将被检索，且页面上的链接可以被查询；

none：文件将不被检索，且页面上的链接不可以被查询；

index：文件将被检索；

follow：页面上的链接可以被查询；

noindex：文件将不被检索，但页面上的链接可以被查询；

nofollow：文件将被检索，但页面上的链接不可以被查询；

### 5. 其它
  author（作者）、generator（网页制作软件）、copyright（版权）、revisit-after（搜索引擎爬虫重访时间）、renderer（双核浏览器渲染方式）

## 五、`http-equiv`属性常用配置
equiv的全称是["equivalent"](https://fanyi.baidu.com/translate?query=equivalent&smartresult=dict&lang=auto2zh#en/zh/equivalent)，意思是相等，相当于。http-quiv的意思就是相当于http参数的作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。例：
```html
<meta http-equiv="参数" content="具体的描述">
```
### 1. expires(页面有效期限)

说明：可以用于设定网页的到期时间。一旦网页过期，再次进入此网页时，不可读取缓存，必须到服务器上重新读取。

用法：
```html
<meta http-equiv="expires" content="Fri,12Jan200118:18:18GMT"> 
```
注意：必须使用GMT的时间格式。

### 2. pragma(cache模式)

说明：禁止浏览器从本地计算机的缓存中访问页面内容，设定后一旦离开网页就无法从Cache中再调出 。

用法：
```html
<meta http-equiv="Pragma" content="no-cache"> 
```
注意：这样设定，访问者将无法脱机浏览。

### 3. refresh(刷新)

说明：自动刷新并指向新页面。

用法：
```html
<meta http-equiv="Refresh" content="2;URL=http://www.haorooms.com">
```
注意：其中的2是指停留2秒钟后自动刷新。URL可选，如果没有，则刷新此页，否则跳转到URL网址。

### 4. set-cookie(cookie设定)

说明：如果网页cookie过期，那么存盘的cookie将被删除。

用法：
```html
<meta http-equiv="set-cookiee" content="cookie value=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/"> 
```
注意：必须使用GMT的时间格式。

### 5. window-target(显示窗口的设定)

说明：强制页面在当前窗口以独立页面显示。

用法：
```html
<meta http-equiv="window-target" content="_top"> 
```
注意：用来防止别人在框架里调用自己的页面。

### 6. content-Type(显示字符集的设定)

说明：设定页面使用的字符集。

用法：
```html
<meta http-equiv="content-Type" content="text/html;charset=gb2312"> 
```
charset具体如下：

UTF-8：世界通用的语言编码；

GB2312：简体中文；

BIG5：繁体中文；

iso-2022-jp：日文；

ks_c_5601：韩文；

ISO-8859-1：英文；


### 7. content-Language（显示语言的设定）

用法：
```html
<meta http-equiv="Content-Language" content="zh-cn"/> 
```
### 8. _[Cache-Control](https://baike.baidu.com/item/Cache-control/1885913?fr=aladdin "百度百科")指定请求和响应遵循的缓存机制。_ Important.
Cache-Control是HTTP协议的一部分，是在请求和响应中必须服从的指令，通常用于提高页面加载，阻止页面缓存对请求和响应造成不利的干扰。

**[常用的Cache-Control指令](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control "MDN")**
| 指令 | 说明 |
| ------ | ------ |
| public | 所有内容都将被缓存(客户端和代理服务器都可缓存) |
| private | 内容只缓存到私有缓存中(仅客户端可以缓存，代理服务器不可缓存) |
| no-cache | 虽然有缓存数据，但是要先去跟服务器验证有没有更新，如果没有更新，则使用缓存数据。 |
| no-store | 所有内容都不会被缓存到缓存或 Internet 临时文件中 |
| must-revalidation/proxy-revalidation | 如果缓存的内容失效，请求必须发送到服务器/代理以进行重新验证 |
| max-age=xxx (xxx is numeric) | 缓存的内容将在 xxx 秒后失效, 这个选项只在HTTP 1.1可用, 并如果和Last-Modified一起使用时, 优先级较高 |
**浏览器对 cache-directive 值的响应**
| Cache-directive | 打开一个新的浏览器窗口 | 在原窗口中单击 Enter 按钮 | 刷新 | 单击 Back 按钮 |
| ------ | ------ | ------ | ------ | ------ |
| public | 浏览器呈现来自缓存的页面 | 浏览器呈现来自缓存的页面 | 浏览器重新发送请求到服务器 | 浏览器呈现来自缓存的页面 |
| private | 浏览器重新发送请求到服务器 | 第一次，浏览器重新发送请求到服务器；此后，浏览器呈现来自缓存的页面 | 浏览器重新发送请求到服务器 | 浏览器呈现来自缓存的页面 |
| no-cache/no-store | 浏览器重新发送请求到服务器 | 浏览器重新发送请求到服务器 | 浏览器重新发送请求到服务器 | 浏览器重新发送请求到服务器 |
| must-revalidation/proxy-revalidation | 浏览器重新发送请求到服务器 | 第一次，浏览器重新发送请求到服务器；此后，浏览器呈现来自缓存的页面 | 浏览器重新发送请求到服务器 | 浏览器呈现来自缓存的页面 |
| max-age=xxx (xxx is numeric) | 在 xxx 秒后，浏览器重新发送请求到服务器 | 在 xxx 秒后，浏览器重新发送请求到服务器 | 浏览器重新发送请求到服务器 | 在 xxx 秒后，浏览器重新发送请求到服务器 |
**禁止缓存**
```html
<meta http-equiv='Cache-Control' content='no-cache,no-store,must-revalidate'>
```
**缓存静态资源**

对于应用程序中不会改变的文件，你通常可以在发送响应头前添加积极缓存。这包括例如由应用程序提供的静态文件，例如图像，CSS文件和JavaScript文件。
```html
<meta http-equiv='Cache-Control' content='public,max-age=31536000'>
```

*Cache-Control是关于浏览器缓存的最重要的设置*，因为它覆盖其他设置，比如 Expires 和 Last-Modified。另外，由于浏览器的行为基本相同，这个属性是*处理跨浏览器缓存问题的最有效的方法*。

Expires 头部字段提供一个日期和时间，响应在该日期和时间后被认为失效。失效的缓存条目通常不会被缓存（无论是代理缓存还是用户代理缓存）返回，除非首先通过原始服务器（或者拥有该实体的最新副本的中介缓存）验证。（注意：*cache-control max-age 和 s-maxage 将覆盖 Expires 头部。*）

### 9. imagetoolbar
```html
<meta http-equiv="imagetoolbar" content="false"/> 
```
指定是否显示图片工具栏，当为false代表不显示，当为true代表显示。

### 10. Content-Script-Type
```html
<meta http-equiv="Content-Script-Type" content="text/javascript"> 
```
W3C网页规范，指明页面中脚本的类型。
## 六、base 标签
为页面上所有链接指定默认打开方式：
例如：
```html
<base target="_self">
```
指定页面中所有标签都是本页打开！