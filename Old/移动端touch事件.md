---
tags: ['前端', '移动端', '事件']
createTime: '2018-11-20'
---

# 移动端Touch事件

`touch`事件跟其他事件一样必须在绑定的元素上才能触发, 但是有一些不那么正常的特性。`touch`事件有`e.touches`及`e.changedTouches`属性。

- `e.touches`：包含的是所有当前屏幕上的触点。
- `e.changedTouches`：包含着所有在绑定元素上触发事件的触点。

先看如下代码： 
```html
<div class='block'></div>
```
```javascript
const block = document.querySelector('.block')
block.ontouchstart = function(e) {
  console.log(e.touches.length, e.changedTouches.length, 'start')
}
block.ontouchmove = function(e) {
  console.log(e.touches.length, e.changedTouches.length, 'move')
}
block.ontouchend = function(e) {
  console.log(e.touches.length, e.changedTouches.length, 'end')
}
```

## 特性一
只要触点在绑定元素（上面代码的`.block`元素）上触发了`touchstart`事件，即使触点移出该元素，也会持续触发绑定的`touchmove`事件，同时，即使改触点离开时不在`.block`元素上，也会同样触发`touchend`事件。

## 特性二
如果绑定事件的元素内有子元素：
```html
<div class='block'>
  <div class='box'></div>
</div>
```
我们在`block`元素上监听事件，即使触点落在`.box`元素上，也会触发`block`上的事件。但`touchend`事件有点奇怪的特点：如果在触发`touchend`时，有的触点在`box`元素上，有的触点直接在`block`元素上，会导致`touchend`事件的`e.changedTouches`属性莫名奇妙的丢失几个触点的记录（即不准确）。

