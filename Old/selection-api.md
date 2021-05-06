---
tags: ['前端','选区','光标']
---

# 鼠标选区 -> Selection

## 一、Selection的一些主要方法
1. #### `selectObj.collapse(parentNode, offset)`
   调用此方法，光标会落在`parentNode`中， 落在节点的偏移量为`offset`
    1. 不需要元素先聚焦。
    2. 不可以通过监听`parentNode`的`focus`事件来触发。不过在监听`focus`后， 使用`setTimeout`可以生效

2. #### `selectObj.extend(node, offset)`
    该方法移动选中区的焦点到指定的点。选中区的锚点不会移动。选中区将从锚点开始到新的焦点，不管方向。==*可以通过此方法设置新的选区*==
    1. 需要元素先聚焦
    2. 搭配`selectObj.collapse()`可以自由设置选区。先用`selectObj.collapse()`设置光标位置，在使用`selectObj.extend()`移动焦点位置，形成新的选区
3. #### `selectObj.modify(alter, direction, granularity)`
    该方法可以通过简单的文本命令来改变当前选区或光标位置。
    1. alter.
    改变类型. 传入"move"来移动光标位置，或者"extend"来扩展当前选区。
    2. direction.
    调整选区的方向。你可以传入"forward"或"backward"来根据选区内容的语言书写方向来调整。或者使用"left"或"right"来指明一个明确的调整方向。
    3. ranularity.
    调整的距离颗粒度。可选值有"character"、"word"、"sentence"、"line"、"paragraph"、"lineboundary"、"sentenceboundary"、"paragraphboundary"、"documentboundary"。
4. #### `selectObj.collapseToStart`
5. #### `selectObj.collapseToEnd`
6. #### `selectObj.selectAllChildren`
7. #### `selectObj.addRange`
8. #### `selectObj.removeRange`
9. #### `selectObj.removeAllRanges`
10. #### `selectObj.containsNode`
11. #### `selectObj.toString`
12. #### `selectObj.getRangeAt`

## 二、Range的一些主要方法