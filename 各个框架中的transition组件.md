---
tags: ['前端', '功能实现思路']
createTime: '2018-11-10'
---
# 框架中的`Transition`组件的实现
无论是React还是Vue中都有对应的`Transition`组件供我们使用。因为我最初掌握的是Vue，所以在我还不知道React中有类似的组件的时候，我试着自己写一个基于React的Transition组件，这里记录一下思路与实现方式。

首先去Vue官网看了一下Vue Transition组件的使用方法：

> 1. v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
> 2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
> 3. v-enter-to: 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
> 4. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
> 5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
> 6. v-leave-to: 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

就把这些当做我们的需求，然后开始开发。

## 大致思路

 1 . 判断元素准备显示还是隐藏，对应的给元素添加`xx-enter v-enter-active`或`xx-leave v-leave-active`类名
  
 2 . 在完成第 1 步的下一帧，将元素的`xx-enter`或`xx-leave`类名替换成`xx-enter-to`或`xx-leave-to`类名
 
 3 . 在完成第 2 步之后，在元素过渡效果完成后，将所有类名移除

下面就开始具体实现。

## 判断元素的显示与隐藏
过渡效果通常会在以下这两种场景下使用：

显示：元素的首次渲染或者 display样式从`none`变成其他

隐藏：元素display样式从其他变成`none`或者被移除DOM树

考虑到`Transition`组件在React中的使用方式，通常我们使用如下两种方式来控制元素是否显示隐藏（不考虑通过类名控制显示隐藏，可以考虑，但没必要）：

```jsx
<Transition name='zoom'>
  { isShow && <div>xxx</div>}
</Transition>
// or
<Transition name='fade'>
  <div style={isShow ? null : {display: 'none'}}>xxx</div>
</Transition>
```
对于第一种，只要判断`this.props.children`存不存在即可。对于第二种，判断`this.props.children.props.style.display === 'none'`即可。然后根据判断结果给`children`添加上对应的类名：
```jsx
toggleClass() {
  // 
  const name = this.props.name
  this.setState({
    className: `${name}-enter ${name}-enter-active `
  })
}
render() {
  const children = this.props.children
  return React.cloneElement(children, Object.assign({},children.props, {
     // 添加归添加， 你不能去掉人家本身的类名， 所以给加上
    className: this.state.className + children.props.className 
  }))
}

```

## 在下一帧替换类名

先了解一下过渡效果生效原理。
创建一个类名为`block`的元素：
```javascript
const block = document.createElement('div')
div.setAttribute('class', 'block')
```
```css
.block{
  height: 300px;
  width: 300px;
  background:#ccc;
  opacity: 0;
  transition: all ease .3s;
}
```
如果我们想让元素在添加进DOM后过渡到`opacity: 1`，不能在元素被添加进DOM后，立马更换样式，而是需要在元素添加进DOM后的下一帧更换样式。否则，过渡将不会生效。
```css
.fade-enter-to{
  opacity: 1;
}
```
```javascript
document.body.appendChild(block)
block.className += ' fade-enter-to' // 无效

requestAnimationFrame(()=> {       // 有效
  block.className += ' fade-enter-to' 
})
```

通常可以使用`requestAnimationFrame`或`setTimeout`这两种异步方法在下一帧替换类名。需要注意的是，这两种`异步方法产生的延迟时间是不固定的`。在`Firefox`中，如果`requestAnimationFrame`或`setTimeout`产生的延迟时间小于2ms时（大致是，但小于1ms一定会），动画将不会生效。
```javascript
console.time('frame')
requestAnimationFrame(() => {
  console.timeEnd('frame')  // 低于2ms 过渡将不会生效
  block.className += ' fade-enter-to' 
})
// or
console.time('timeout')
setTimeout(() => {
  console.timeEnd('timeout')  // 低于2ms 过渡将不会生效
  block.className += ' fade-enter-to' 
}, 0)
```
因此可能需要做一个判断，如果延迟时间小于2ms，则再执行一次延迟。或者，直接用两次异步。
```javascript
const timestemp = +new Date
setTimeout(() => {
  if(+new Date - timestemp <= 2) {
    setTimeout(() => {
      block.className += ' fade-enter-to' 
    })
    return
  }

  block.className += ' fade-enter-to' 
})

// or

setTimeout(() => {
  setTimeout(() => {
    block.className += ' fade-enter-to' 
  }) 
})
```

## 过渡完成后，清除类名
想要在过渡完成后清除类名，最重要的是获得过渡的时间：
```javascript
const cssStyle = block.currentStyle? block.currentStyle : window.getComputedStyle(block, null)
const transitionDuration = cssStyle.transitionDuration   // 过渡时间
const animationDuration = cssStyle.animationDuration     // 动画时间

```
之后使用`setTimeout`在延迟之后清除类名就可以了

## 其他
在元素隐藏时（`display:none`或移除DOM），需要控制下元素让其显示，等到过渡效果结束再将其隐藏。

## 完整代码
```javascript
import React, { Component } from 'react';
/**
 * 初次渲染, 如果需要显示(1.有children 2. children的display 不为none)
 * 更新, 有无children切换 || children 的 display属性切换
 * 
 * 
 */


function isChildrenShow(children) {
  if (!children) return false
  const style = children.props.style
  if (style && style.display === 'none') return false

  return true
}
function isReactElement(children) {
  if (!children) return false
  if (typeof children !== 'object') return false
  return children.hasOwnProperty('$$typeof')
}

class transition extends Component {
  constructor(props) {
    super(props)
    const children = props.children
    this.isExist = !!children
    this.isShow = isChildrenShow(children)
    this.isReactElement = isReactElement(children)

    this.state = {
      children: children,
      className: this.isShow ? this.fixedClass('enter-active', 'enter') : ''
    }

    this.el = { current: null }
  }
  componentDidMount() {
    if (!this.isExist) return
    this.after()
  }
  UNSAFE_componentWillReceiveProps(nextP) {
    const currentChildren = this.props.children
    const nextChildren = nextP.children
    if (currentChildren === nextChildren) return
    this.isExist = !!nextChildren
    const isShow = this.isShow = isChildrenShow(nextChildren);
    this.isReactElement = isReactElement(nextChildren)

    let newState = null


    if (isShow) {
      newState = {
        className: this.fixedClass('enter', 'enter-active'),
        children: nextChildren,
        style: Object.assign({}, nextChildren.props.style)
      }
    } else {

      newState = {
        className: this.fixedClass('leave', 'leave-active'),
        children: nextChildren
      }
      if (!nextChildren) {
        newState.children = currentChildren
      } else {
        const style = Object.assign({}, nextChildren.props.style)
        delete style.display
        newState.style = style
      }
    }
    this.setState(newState, this.after)
  }
  after() {
    setTimeout(() => {

      requestAnimationFrame(() => {

        clearTimeout(this.hideTimer)
        clearTimeout(this.showTimer)
        if (this.isShow) {

          this.setState({
            className: this.fixedClass('enter-active', 'enter-to')
          })

          this.showTimer = setTimeout(() => {
            this.setState({
              className: ''
            })
          }, this.getDuration())

        }
        // 隐藏
        else {
          this.setState({
            className: this.fixedClass('leave-active', 'leave-to')
          })

          this.hideTimer = setTimeout(() => {
            const newState = {
              className: ''
            }
            if (!this.isExist) {
              newState.children = null
            } else {
              // newState.children = this.props.children
              newState.style = Object.assign({}, this.state.style, { display: 'none' })
            }

            this.setState(newState)
          }, this.getDuration() - 17)
        }
      })
    })

  }
  fixedClass(one, two) {
    const pre = this.props.name
    return ` ${pre}-${one}${two ? ` ${pre}-${two}` : ''}`
  }
  getDuration() {
    // if(!this.el.current) return 300
    const style = window.getComputedStyle(this.el.current, null)
    const tD = this.sToMs(style.transitionDuration)
    const aD = this.sToMs(style.animationDuration)
    return tD || aD

  }
  /**
   * @function - 将秒转成毫秒
   * 
   * @param {number} s 秒数
   */
  sToMs(s) {
    if (!s) return null
    const index = s.indexOf('ms')
    if (index > 0) {
      return s.slice(0, index)
    }
    return Number(s.slice(0, -1)) * 1000
  }
  toggleElement() {

  }
  render() {
    const children = this.state.children
    // console.log(children, this.isReactElement)
    if (!children) return null
    const className = children.props.className
    return React.cloneElement(children, Object.assign({}, children.props, {
      className: className + this.state.className,
      ref: this.el,
      style: this.state.style
    }))
  }
}

export default transition;
```

