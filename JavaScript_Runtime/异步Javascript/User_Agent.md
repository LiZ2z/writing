# 用户代理(User Agent)

用户代理是代表人的计算机程序，例如，一个在 Web 上的 浏览器。

> 代表用户（人）向服务端发起请求的一个计算机程序。

除了浏览器之外，用户代理可以是抓取网页的机器人、下载管理器或可以访问 Web 的其他应用程序。随着向服务器发送的每个请求， 浏览器包含一个可表明身份的 User-AgentHTTP 的协议头，叫作用户代理（UA，User Agent）字符串。此字符串通常标识浏览器、及其版本号及其主机操作系统。

垃圾邮件机器人、下载管理器和一些浏览器通常会发送一个假 UA 字符串来宣称自己是不同的客户端。这被称为用户代理欺骗。

用户代理的字符串可以被 JavaScript 在客户端中使用 navigator.userAgent 获取。

典型的用户代理字符串如下所示： "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:35.0) Gecko/20100101 Firefox/35.0".

> A user agent is a computer program representing a person, for example, a browser in a Web context.
>
> Besides a browser, a user agent could be a bot scraping webpages, a download manager, or another app accessing the Web. Along with each request they make to the server, browsers include a self-identifying User-Agent HTTP header called a user agent (UA) string. This string often identifies the browser, its version number, and its host operating system.
>
> Spam bots, download managers, and some browsers often send a fake UA string to announce themselves as a different client. This is known as user agent spoofing.
>
> The user agent string can be accessed with JavaScript on the client side using the navigator.userAgent property.
>
> A typical user agent string looks like this: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:35.0) Gecko/20100101 Firefox/35.0".
