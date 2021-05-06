
# label标签会触发两次onClick事件

直接看代码：
```html
<div class='block'>
<label>
  click here
  <input type='checkbox'/>
</label>
</div>
```
```javascript
const block = document.querySelector('.block')
block.onClick = function(e) {
  console.log(e)
}
```
当点击文本 'click here' 后，控制台会输出两次。

[stack overflow上的解释](https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element)是：

当点击`label`时，会直接触发点击事件的监听函数，控制台输出一次。

同时，因为点击了`label`，会自动发送一个点击事件给`label`内部的`input`元素，所以会被视为在`input`点击了一次。这个事件会冒泡到父元素（也就是`label`标签）然后触发父元素的点击事件，然后监听函数再次执行，控制台再输出一次。

所以解决方式是：
##### 1.  将`input`拿到`label`外面，然后用`for`属性将两个元素关联起来，这样`input`的事件冒泡就不会触发`label`的事件了。
```html
<label for='id'>
click here
</label>
<input type='input' id='id' />
```
##### 2.  阻止`input`点击事件的冒泡
```html
<label>
click here
<input type='input' id='input'/>
</label>
```
```javascript
const input = document.querySelector('.input')
input.onClick = function(e) {
  e.stopPropagation()
}

```
