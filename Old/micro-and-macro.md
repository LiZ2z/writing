---
tags: ['javascript', '基础知识']
---
# js任务线程
js是单线程执行的，如果我们想异步执行一些代码的话，我们首先会想到setTimeout。但其实还有好几种，例子如下：
```javascript
    window.addEventListener('message', function () {
      console.log('message')
    })

    // postMessage 方法
    window.postMessage('', '*')
    // setImmediate 方法 (只在ie10中有效)
    setImmediate(function () {
        console.log('setImmediately')
    })
    // setTimeout 0 方法
    setTimeout(function () {
        console.log('setTimeout ')
    }, 0)
    // new Promise 方法
    new Promise(function(resolve) {
        resolve()
    }).then(function() {
        console.log('promise then')
    })
    // requsetAnimationFrame 方法
    requestAnimationFrame(function () {
        console.log('requestAnimationFrame')
    })
    console.log('normal')
```
#### 那么哪种执行更快呢？

首先如果在原生支持Promise的浏览器中，Promise执行最快。其他的方法在不同浏览器中表现则不一致，具体如下：
+ chrome： `promise` > `postMessage 或 requestAnimationFrame` > `setTimeout`
+ opera： 同chrome (应该是因为新版opera使用了chrome内核)
+ firefox： `promise` > `requestAnimationFrame 或 （postMessage > setTimeout）`
+ ie： `promise` > `requestAnimationFrame` > `setTimeout` > `setImmediate (ie10)` > `postMssage`
::: tip 注意
`requestAnimationFrame`：做动画循环的时候经常会用到这个方法，该方法只会在浏览器刷新ui的时候执行，刷新ui的频率一般为60Hz，所以requestAnimationFrame一般情况下应为16ms延迟，但实际测试快很多。现在很多显示器刷新率开始有144Hz，不知道会不会更快。
:::
