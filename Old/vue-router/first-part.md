---
tags: ['vue-router', '源码']
---
# Vue-router源码分析，第一部分
::: tip 提示
`Vue.use(Router)` —— vue-router 的install过程
:::
```javascript
import View from './components/view'
import Link from './components/link'

// 因为在其他文件中会用到，所以在install的时候保存Vue构造函数，然后导出供使用
export let _Vue

export function install (Vue) {
  // 1. 阻止重复 Vue.use(Route)

  if (install.installed && _Vue === Vue) return
  install.installed = true
  //-
  _Vue = Vue
  //-
  const isDef = v => v !== undefined

  /* ------注册-----  */

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  // 2. 把路由初始化的过程混入vue实例的`beforeCreate`生命周期函数中
  
  Vue.mixin({
    beforeCreate () {
      // this 指的是vue 组件实例
      
      /*
      *在new Vue时, 代码如下:
      *new Vue({
      *   ...,
      *   router
      *})
      *因此, this.$options.router 已定义
      *
      **/
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        
        // !!! 初始化router, 具体过程看第三章
        this._router.init(this)
        // !!! 通过Vue的 Vue.util.defineReactive 在_route发生变化时,拦截变化, 触发更新, 具体过程看Vue源码 QAQ
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } 
      // 在其他vue component 实例中执行下面过程
      else {

        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this

      }

      registerInstance(this, this)
    },

    destroyed () {
      registerInstance(this)
    }
  })

  //3. 可以在vue实例中通过 this.$router this.$route 访问路由实例
  // 且阻止更改 this.$router 的指向
  Object.defineProperty(Vue.prototype, '$router', {
    // this._routerRoute 指 new Vue实例
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  //4. 将 View Link注册为 vue 组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
  //5. 
  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}

```