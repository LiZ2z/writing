# 为什么网站的性能很重要

### **网站性能指的是什么**

不同于 APP 的本地安装，在用户使用时，网页需要先下载自身的代码并解析执行才能给用户呈现一个具有高可交互性的，具有足够的信息的页面。**因此，网页资源的下载及解析速度很大程度上影响了网页的显示速度，也意味着用户体验的好坏。另外，及时的交互响应，流畅的过渡效果都意味着更好的网站性能。** 具体参考：[通过 RAIL 模型来衡量性能](https://web.dev/rail/)

### **为什么网站性能很重要**

在这个时间碎片化时代，大部分人都不会愿意花费大量时间去等待长时间的页面加载或白屏，更多的选择是退出当前网页，去浏览其他网页。

- 网页显示速度快意味着更多的流量，更少的用户流失。

  > Pinterest reduced perceived wait times by 40% and this increased search engine traffic and sign-ups by 15%.

  > 超过 10000 毫秒(10 秒)，用户会感到沮丧，可能会放弃任务。他们可能会回来，也可能不会回来。

- 性能好将会提高企业效益。

  > When AutoAnything reduced page load time by half, they saw a boost of 12% to 13% in sales.

- 高性能带来更好的用户体验。[一项消费者研究表明][a]，对移动设备速度延迟的压力反应类似于看恐怖电影或解决数学问题，比在零售店排队结账要大。

### **如何做性能优化**

web 性能优化所要涉及的知识点非常多，**因为从 URL 输入开始到首次页面渲染的过程中，其中所经过的每一个步骤，所关联的每个点都可以是优化点**，这就需要我们仔细研究这背后的每个步骤及其背后的实现，从中发现可以优化的点并实践。

Web 性能包含了服务器请求和响应、下载、执行脚本、渲染、布局和绘制每个像素到屏幕上。

参考：

- [Why does speed matter?](https://web.dev/why-speed-matters/)

- [Measure performance with the RAIL model](https://web.dev/rail/)

- [Streaming delays mentally taxing for smartphone users: Ericsson Mobility Report][a]

- [Driving user growth with performance improvements](https://medium.com/pinterest-engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7)

[a]: https://www.ericsson.com/en/press-releases/2016/2/streaming-delays-mentally-taxing-for-smartphone-users-ericsson-mobility-report
