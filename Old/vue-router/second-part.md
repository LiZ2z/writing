---
tags: ['vue-router', '源码']
---
# Vue-router源码分析，第二部分
::: tip 概述
`new Router({options})` —— router实例创建时，代码执行过程
:::

## 一、`new Router({options})`
    
```javascript
    constructor (options: RouterOptions = {}) {
        this.app = null  //保存 new Vue的实例
        this.apps = []   // 保存所有vue组件实例
        this.options = options // 保存new Router()传入的options
        this.beforeHooks = []  // 保存所有的钩子订阅
        this.resolveHooks = []
        this.afterHooks = []
        // 1. 根据options.routers 创建Matcher,
        // this.matcher = {wacher: function, addRoutes: function}
        this.matcher = createMatcher(options.routes || [], this)
        //2.1 根据options.mode选择路由模式 默认 hash模式
        let mode = options.mode || 'hash'
        //2.2 不支持history 模式时会自动降级 为hash模式
        this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
        if (this.fallback) {
          mode = 'hash'
        }
        //2.3 非浏览器平台为 abstract模式
        if (!inBrowser) {
          mode = 'abstract'
        }
        // 
        this.mode = mode
        //3 根据不同的模式， 创建不同的history实例
        switch (mode) {
          case 'history':
            this.history = new HTML5History(this, options.base)
            break
          case 'hash':
            this.history = new HashHistory(this, options.base, this.fallback)
            break
          case 'abstract':
            this.history = new AbstractHistory(this, options.base)
            break
          default:
            if (process.env.NODE_ENV !== 'production') {
              assert(false, `invalid mode: ${mode}`)
            }
        }
    }

```

### 1. `createMatcher(options.routes || [], this)`
根据options.routers 创建router Matcher的过程如下:
```javascript
    export function createMatcher (
      routes: Array<RouteConfig>,
      router: VueRouter
    ): Matcher {
      // 1. 根据options.routers 创建router Map
      const { pathList, pathMap, nameMap } = createRouteMap(routes)
      
      // 2.1 提供两个函数供之后调用
      function addRoutes (routes) {
        createRouteMap(routes, pathList, pathMap, nameMap)
      }
      // 2.2 
      function match (
        raw: RawLocation,
        currentRoute?: Route,
        redirectedFrom?: Location
      ): Route {
        //。。。这里省略一堆， 暂时不看
      }
    
      //。。。这里省略一堆， 暂时不看
    
      return {
        match,
        addRoutes
      }
    }
```
    
#### 1. `createRouteMap(routes)`的作用是：根据用户配置的routeConfig，例如：
    
```javascript
    routes: [
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
          path: '/home/one',
          name: one,
          component: One,
      },
      {
        path: '/list',
        name: 'list',
        component: List,
      }
    ]
```
返回格式如下数据：
    
```javascript
    pathList = ['/home', '/home/one', '/list']
    pathMap = {'/home': RouteRecord, '/home/one': RouteRecord, '/list': RouteRecord}
    nameMap = {Home: RouteRecord, One: RouteRecord, List: RouteRecord}
```
RouteRecord的格式如下：
```javascript
    const record = {
        path: normalizedPath,
        regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
        /*  命名视图, 多个 router-view
        *   
        *  <router-view class="view one"></router-view>
        *  <router-view class="view two" name="a"></router-view>
        *  <router-view class="view three" name="b"></router-view>
        *  components: {
        *     default: Foo,
        *     a: Bar,
        *     b: Baz
        *  }
        */
    
        components: route.components || { default: route.component },
        instances: {},
        name,
        parent,
        matchAs,
        redirect: route.redirect,
        beforeEnter: route.beforeEnter,
        meta: route.meta || {},
        props: route.props == null
          ? {}
          : route.components
            ? route.props
            : { default: route.props }
      }
```
完整代码：
```javascript
    import Regexp from 'path-to-regexp'
    import { cleanPath } from './util/path'
    import { assert, warn } from './util/warn'

    /*
    *@functin 用于创建routeMap
    *
    *@param {arrray} routes 用户设置的routes
    *@param {array} oldPathList 非必需
    *@param {object　-> Dictionary<RouteRecord>} oldPathMap 非必需
    *@param {object　-> Dictionary<RouteRecord>} oldPathMap 非必需
    *
    *@return {
    *  pathList: Array<string>;
    *  pathMap: Dictionary<RouteRecord>;
    *  nameMap: Dictionary<RouteRecord>;
    *}
    */
    export function createRouteMap (routes,oldPathList,oldPathMap,oldNameMap){
      // 1. 创建 pathList 用于记录所有的path
      //    创建 pathMap 用于根据route.path记录所有的 路由record
      //    创建 nameMap 用于根据route.name 记录所有的  路由record
      // the path list is used to control path matching priority
      const pathList: Array<string> = oldPathList || []
      // $flow-disable-line
      const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
      // $flow-disable-line
      const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)
      // 2. 遍历routes, 生成record, 并记录在 pathList pathMap nameMap 中
      routes.forEach(route => {
        addRouteRecord(pathList, pathMap, nameMap, route)
      })
    
      // ensure wildcard routes are always at the end
      // 3. 确保通配符路由始终位于末尾。
      for (let i = 0, l = pathList.length; i < l; i++) {
        if (pathList[i] === '*') {
          pathList.push(pathList.splice(i, 1)[0])
          l--
          i--
        }
      }
    
      // pathList = ['/home', '/home/one', '/list']
      // pathMap = {'/home': RouteRecord, '/home/one': RouteRecord, '/list': RouteRecord}
      // nameMap = {Home: RouteRecord, One: RouteRecord, List: RouteRecord}
      return {
        pathList,
        pathMap,
        nameMap
      }
    }
    
    
    /*
    * @function 添加一个路由记录
    * @param {array} pathList
    * @param {object-> Dictionary<RouteRecord>} pathMap
    * @param {object-> Dictionary<RouteRecord>} nameMap
    * @param {object -> RouteConfig} route
    * @param {RouteRecord} parent 非必需
    * @param {string} matchAs 非必需
    */
    function addRouteRecord ( pathList, pathMap, nameMap, parent, matchAs) {
      // 1. 获取route配置中的 path name
      const { path, name } = route
    
      //  编译正则的选项
      const pathToRegexpOptions = route.pathToRegexpOptions || {}
      // 2. 标准化path
      const normalizedPath = normalizePath(
        path,
        parent,
        pathToRegexpOptions.strict
      )
      //匹配规则是否大小写敏感？(默认值：false)
      if (typeof route.caseSensitive === 'boolean') {
        pathToRegexpOptions.sensitive = route.caseSensitive
      }
      // 3. 生成一个路由配置记录 object
      const record: RouteRecord = {
        path: normalizedPath,
        regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
        /*  命名视图, 多个 router-view
        *   
        *  <router-view class="view one"></router-view>
        *  <router-view class="view two" name="a"></router-view>
        *  <router-view class="view three" name="b"></router-view>
        *  components: {
        *     default: Foo,
        *     a: Bar,
        *     b: Baz
        *  }
        */
    
        components: route.components || { default: route.component },
        instances: {},
        name,
        parent,
        matchAs,
        redirect: route.redirect,
        beforeEnter: route.beforeEnter,
        meta: route.meta || {},
        props: route.props == null
          ? {}
          : route.components
            ? route.props
            : { default: route.props }
      }
      // 4. 分析 route.children
      if (route.children) {
        // Warn if route is named, does not redirect and has a default child route.
        // If users navigate to this route by name, the default child will
        // not be rendered (GH Issue #629)
        if (process.env.NODE_ENV !== 'production') {
          if (route.name && !route.redirect && route.children.some(child => /^\/?$/.test(child.path))) {
            warn(
              false,
              `Named Route '${route.name}' has a default child route. ` +
              `When navigating to this named route (:to="{name: '${route.name}'"), ` +
              `the default child route will not be rendered. Remove the name from ` +
              `this route and use the name of the default child route for named ` +
              `links instead.`
            )
          }
        }
    
        route.children.forEach(child => {
          const childMatchAs = matchAs
            ? cleanPath(`${matchAs}/${child.path}`)
            : undefined
    
          addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
        })
      }
      // 5. alias
      if (route.alias !== undefined) {
        const aliases = Array.isArray(route.alias)
          ? route.alias
          : [route.alias]
    
        aliases.forEach(alias => {
          const aliasRoute = {
            path: alias,
            children: route.children
          }
          addRouteRecord(
            pathList,
            pathMap,
            nameMap,
            aliasRoute,
            parent,
            record.path || '/' // matchAs
          )
        })
      }
      // 6. 向pathList, pathMap 中存储当前record, path
      if (!pathMap[record.path]) {
        pathList.push(record.path)
        pathMap[record.path] = record
      }
      // 7. 如果配置了route.name ,则向 nameMap中存储 当前record,
      // 如果多个route使用相同的name, 报错, 
      if (name) {
        if (!nameMap[name]) {
          nameMap[name] = record
        } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
          warn(
            false,
            `Duplicate named routes definition: ` +
            `{ name: "${name}", path: "${record.path}" }`
          )
        }
      }
    }
    /*
    *@function 
    *
    *@param {string} path
    *@param {PathToRegexpOptions} PathToRegexpOptions
    *
    *@return RouteRegExp
    **/
    function compileRouteRegex (path, pathToRegexpOptions) {
      const regex = Regexp(path, [], pathToRegexpOptions)
      if (process.env.NODE_ENV !== 'production') {
        const keys: any = Object.create(null)
        regex.keys.forEach(key => {
          warn(!keys[key.name], `Duplicate param keys in route with path: "${path}"`)
          keys[key.name] = true
        })
      }
      return regex
    }
    /*
    *@function 用于标准化用户routeConfig中的path属性
    *
    *@param {string} path
    *@param {RouteRecord} parent 非必需
    *@param {boolean} strict 默认false 非必需
    *
    *@return {string}
    */
    function normalizePath (path, parent strict) {
      // 1. 如果不是严格模式, 则去掉 路由path 最后的 /
      if (!strict) path = path.replace(/\/$/, '')
      // 2. 如果第一个字符是 / 直接返回
      if (path[0] === '/') return path
      // 3. 如果没有 传入parent, 直接返回
      if (parent == null) return path
      // 4. 二级路由、三级路由 之类的, 跟父级路由的path拼接起来
      // cleanPath ->  path.replace(/\/\//g, '/')
      return cleanPath(`${parent.path}/${path}`)
    }
```
### 2. `new HashHistory()`
在 1 步骤中，`new HashHistory`（假定为hash模式）的执行如下：
```javascript
export class HashHistory extends History {
  constructor (router: Router, base: ?string, fallback: boolean) {
    // 1. 执行 new History(router, base)
    super(router, base)
    // 2. check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    // 3. 确保url hash 的第一字符 是 /
    //如果不是则 通过replaceState()补上 /
    ensureSlash()
  }
//...这里先忽略
}

```
#### 上面 3 步骤中 `super(router, base)`（即 `new History(router, base)`），执行如下:
```javascript
  constructor (router: Router, base: ?string) {
    this.router = router
    this.base = normalizeBase(base)
    // start with a route object that stands for "nowhere"
    //START={
    //   name: null,
    //   meta: {},
    //   path: '/',
    //   hash: '',
    //   query: {},
    //   params: {},
    //   fullPath: '/',
    //   matched:  []
    // }
    this.current = START
    this.pending = null
    this.ready = false
    this.readyCbs = []
    this.readyErrorCbs = []
    this.errorCbs = []
  }
```
### 3. `new Router()`执行完毕