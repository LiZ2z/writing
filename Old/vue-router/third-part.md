---
tags: ['vue-router', '源码']
---
# Vue-router源码分析，第三部分
::: tip 概述
vue-router源码第三部分，该部分分析`router.init(this)`的执行过程。 this指的是new Vue的实例对象。
:::

## 1. router.init(this)
```javascript
init (app: any /* Vue component instance */) {

    // 1. 缓存所有app
    this.apps.push(app)

    // 2. 阻止重复执行 init
    //main app already initialized.
    if (this.app) {
      return
    }

    this.app = app
    // 3. 
    const history = this.history

    if (history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation())
    } else if (history instanceof HashHistory) {
      const setupHashListener = () => {
        history.setupListeners()
      }
      history.transitionTo(
        // 获取当前的url hash  
        history.getCurrentLocation(),
        setupHashListener,
        setupHashListener
      )
    }

    history.listen(route => {
      this.apps.forEach((app) => {
        app._route = route
      })
    })
  }
```
## 2. 执行`history.transitionTo`
```javascript
const setupHashListener = () => {
        history.setupListeners()
      }
 history.transitionTo(
        // 获取浏览器当前的url 的 hash  
        history.getCurrentLocation(),
        setupHashListener,
        setupHashListener
      )
```
`history.transitionTo`的代码如下：
```javascript
transitionTo (location, onComplete, onAbort) {
    // 1. 根据当前传入location, 找到pathMap 或 nameMap中的匹配项
    // 初始化时,
    // location {string} 
    //this.current ={
    //   name: null,
    //   meta: {},
    //   path: '/',
    //   hash: '',
    //   query: {},
    //   params: {},
    //   fullPath: '/',
    //   matched:  []
    // }
     /*
    *@function match 就是根据传入的url, 与当前currentRoute进行合并之类的处理得到处理后的{path,query,hash},
    *然后 将path跟pathMap中进行匹配, 找到匹配项, 生成一个Route对象并返回
    **/
    const route = this.router.match(location, this.current)
    // 2. 这里接着看第三步
    this.confirmTransition(route, () => {
      // 2.1
      this.updateRoute(route)
      onComplete && onComplete(route)
      this.ensureURL()

      // fire ready cbs once
      if (!this.ready) {
        this.ready = true
        this.readyCbs.forEach(cb => { cb(route) })
      }
    }, err => {
      if (onAbort) {
        onAbort(err)
      }
      if (err && !this.ready) {
        this.ready = true
        this.readyErrorCbs.forEach(cb => { cb(err) })
      }
    })
  }
```
## 3. `confirmTransition(route, onCompelete,onAbort)`
```javascript
confirmTransition (route: Route, onComplete: Function, onAbort?: Function) {
    const current = this.current
    // 再封装一下abort, 没啥看的
    const abort = err => {
      if (isError(err)) {
        if (this.errorCbs.length) {
          this.errorCbs.forEach(cb => { cb(err) })
        } else {
          warn(false, 'uncaught error during route navigation:')
          console.error(err)
        }
      }
      onAbort && onAbort(err)
    }
    // 1. 判断要跳转的路由是否跟当前内存中的一致, 如果一致,则同步浏览器路由跟内存中的路由数据,
    // 并执行abort
    if (
      isSameRoute(route, current) &&
      // in the case the route map has been dynamically appended to
      route.matched.length === current.matched.length
    ) {
      this.ensureURL()
      return abort()
    }
    // 2. 
    /*
    *2. 将当前状态route.matched 跟 即将跳转的 route.matched进行比对
    * 从底层开始找相同的项, 直到找到不同项,
    * 然后只需要从这个不同项开始渲染新的就好, 并把之前的视图卸载
    * 且更新相同项
    */
    const {
      updated,
      deactivated,
      activated
    } = resolveQueue(this.current.matched, route.matched)

    /** 3. 这里面看下去 很绕
    *总之,就是根据第 2 步的 三个数组, 再加上全局的路由钩子等
    *生成一个准备依次执行的 路由钩子数组, 具体如下:
    *
    *i. 路由跳转前当然要先执行要卸载的无效vue组件实例的beforeRouteLeave方法
    * extractLeaveGuards函数就是获取准备卸载的vue实例的 beforeRouteLeave方法
    * 并进行排序, 毕竟路由卸载要从子级路由向上级路由依次执行
    *
    *ii. 执行完组件的beforeRouteLeave, 然后开始执行全局的 beforeEnter钩子
    *
    *iii. 然后是其他vue实例的beforeRouteUpdate 方法列表
    *
    *iiii. 之后是根据新路由,即将渲染的新的vue实例组件的 beforeRouteEnter 列表
    *
    *iiiii. 最后是异步组件
    *
    */
    const queue: Array<?NavigationGuard> = [].concat(
      // in-component leave guards
      extractLeaveGuards(deactivated),
      // global before hooks
      this.router.beforeHooks,
      // in-component update hooks
      extractUpdateHooks(updated),
      // in-config enter guards
      activated.map(m => m.beforeEnter),
      // async components
      resolveAsyncComponents(activated)
    )
    // 4. 记录下当前正在跳转的路由
    this.pending = route

    // 第三步的数组中的每一项, 都会作为 iterator函数的hook参数, 依次执行
    // 先看下面第5步
    /**
     * 
     */
    const iterator = (hook, next) => {
      // 如果中途 this.pending 改变了, 则中断这次跳转
      if (this.pending !== route) {
        return abort()
      }
      try {
        // 执行路由钩子函数, 依次传入准备跳转的路由, 当前路由, 以及一个回调函数
        // 就是 next, 需要用户手动调用的next()
        hook(route, current, (to: any) => {
          // branch-1. 如果用户执行next时, 传入false, 即 next(false)
          // 则中断跳转
          if (to === false || isError(to)) {
            // next(false) -> abort navigation, ensure current URL
            //同步浏览器url与自当前内存中的route数据
            this.ensureURL(true)
            abort(to)
          } 
          // branch--2. 如果向next中传入 字符串 或 对象, 则中断此次跳转,进行重定向跳转
          else if (
            
            typeof to === 'string' ||
            (typeof to === 'object' && (
              typeof to.path === 'string' ||
              typeof to.name === 'string'
            ))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort()
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } 
          // branch--3. 将下一个路由钩子传入 iterator执行
          else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }
    // 5. runQueue 代码在下面 5.1, 可以先看下
    /**
     * 也就是将queue中的每一项, 依次传进 iterator函数中执行 iterator,
     * 然后执行iterator,
     */
    runQueue(queue, iterator, () => {
      const postEnterCbs = []
      const isValid = () => this.current === route
      // wait until async components are resolved before
      // extracting in-component enter guards
      const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)
      const queue = enterGuards.concat(this.router.resolveHooks)
      runQueue(queue, iterator, () => {
        if (this.pending !== route) {
          return abort()
        }
        this.pending = null
        onComplete(route)
        if (this.router.app) {
          this.router.app.$nextTick(() => {
            postEnterCbs.forEach(cb => { cb() })
          })
        }
      })
    })
    //5.1 总之就是根据queue 这个数组的顺序, 依次执行 fn(queue[index])
    // 但是下一次的执行, 需要上一次进行触发, 否则中断
    // 全部执行完毕后, 执行 cb
    function runQueue (queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
      const step = index => {
        if (index >= queue.length) {
          cb()
        } else {
          if (queue[index]) {
            // 需要在fn中, 执行回调函数, 才能执行下一项
            fn(queue[index], () => {
              step(index + 1)
            })
          } else {
            step(index + 1)
          }
        }
      }
      step(0)
    }

  }
```
## 4. `updateRoute`
通过更改this.current的值， 触发route-view组件更新渲染
```javascript
// 更新路由
  updateRoute (route: Route) {
    const prev = this.current
    /**
     * 因为在 Vue.use(Router)的时候使用Vue.util.defineReactive(this, '_route', *this._router.history.current)拦截了this.current.（这个函数就是vue的响应式的原理机制）
     * 所以当this.current的值改变时，会触发 router-view 组件的重新渲染
     */
    this.current = route
    // 更新所有vue 组件内 this._route的指向
    this.cb && this.cb(route)
    // 全局后置钩子
    this.router.afterHooks.forEach(hook => {
      hook && hook(route, prev)
    })
  }
```