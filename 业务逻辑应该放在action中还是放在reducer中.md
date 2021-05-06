# 业务逻辑应该放在 action 中还是放在 reducer 中？

参考:

1. [Recommendations for best practices regarding action-creators, reducers, and selectors](https://github.com/reduxjs/redux/issues/1171#issue-123565061)

当使用 redux 来管理 app 中的数据状态时，到底应该在哪个地方写业务逻辑会更合理呢？

## 前言

redux 的三个核心概念：

1. 整个应用的数据只有一个源头
2. 数据是只读的单向流动的，如果想修改数据必须通过 Action。Action 是一个描述所发生事件的普通对象。
3. Action 描述事件的发生，reducer 用来响应事件。reducer 描述了如何响应 Action，更新 State。

从概念来看，Action 主要是用来描述发生事件的，且官方文档也提到，“尽量减少在 action 中传递的数据”。从这点上看，reducer 就像后台，action 就是一个 ajax 请求，前端通过请求（action）来告诉后台(reducer)想做什么，但是具体做什么由后台（reducer）决定。

## 更新数据的逻辑是应该放在 reducer 还是 action？

react 这一体系在写代码的时候有很大的灵活性，这对新手来说可能是个坏事，缺乏相应的约束的代码可能会越来越乱，最终难以维护。

拿 redux 来说，很多人并不清楚到底该在 action 中更新 state 数据还是在 reducer 中，这就导致可能会写出这种代码：

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case "a":
      return { ...state, a: action.payload };
    case "b":
      return { ...state, b: action.payload };
    case "c":
      return { ...state, c: action.payload };
    // ...
  }
};

dispatch({
  type: "a",
  payload: a.filter((item) => item.key !== id),
});
```

其实这种写法还不如直接写：

```javascript
const reducer = (state) => state;

dispatch({ ...state, a: a.filter((item) => item.key !== id) });
```

扯远了，拉回来 \_-\_zzz

要想搞清楚更新 state 的代码应该放在哪，需要弄清楚 reducer 与 action 各自的职责：

- action 是一个用于描述动作（action.type）的普通 JavaScript 对象，携带尽量少的数据给 reducer 使用。

- reducer 则是用来响应动作，并用来描述如何更新 state 的一个无副作用的函数。

如果这样讲还是抽象的话，我们可以把这些想象成后台与接口。reducer 就是后台，action 就是后台提供的接口。用户通过接口（action）请求后台（redcuer）更改数据，接口（action）只负责用于触发后台（reducer）响应，并携带必要参数传给后台。同时，我们必须在后台（reducer）代码中声明一个个路由（case 或其它）来响应接口，并更新数据库（state）。

在上面说的场景下，我们去思考一下，如果后台将更新数据库的权限放给接口会发生什么？用户可以通过接口随意修改数据，无论传递什么数据，后台都会照单接受并将其存入数据库。如果项目跑的正常，那没事。如果发生了错误，管理员需要排查错误，那就麻烦了。因为你会发现你不知道到底是哪个用户，通过哪些接口，以哪种方式，修改了哪些数据。相反，如果我们将更新数据库的权限留在后台，只允许用户通过接口来描述他们想要修改某个数据的意图，在接受到这个意图后，处不处理？怎么处理？都由后台决定。这样在数据库数据发生异常时，我们只需要找到负责处理更新这块数据的接口，或者通过这个接口去查看哪些用户调用了这个接口。

所以我们在用 redux 的时候，应该尽可能的详细（但不冗余）的列出可能的 action type，并在对应的 case 中进行数据更新（而不是 action），以便调试或其他人阅读代码。
