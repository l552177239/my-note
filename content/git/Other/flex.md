## 弹性布局（Flex）

Flex（Flexible Box）作为display的一个属性使用，用于设置或检索弹性盒模型对象的子元素如何分配空间。

### Flex 布局的使用

任何一个容器都可以指定为 Flex 布局。

```
.box{
  display: flex;
  //flex作为display的一个属性使用
}
```

行内元素也可以使用 Flex 布局。

```
.box{
  display: inline-flex;
}
```

Webkit 内核的浏览器，必须加上-webkit前缀。

```
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

**注意**：设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

### 基本概念

采用`Flex`布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png" alt="弹性盒子" />

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。

主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；

交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，
占据的交叉轴空间叫做cross size。

### 容器的属性

>**`flex-direction`属性**：决定主轴的方向（即项目的排列方向）

 - row（默认值）：主轴为水平方向，起点在左端
 - row-reverse：主轴为水平方向，起点在右端
 - column：主轴为垂直方向，起点在上沿
 - column-reverse：主轴为垂直方向，起点在下沿

>**`flex-wrap`属性**：如何换行

 - nowrap（默认）：不换行
 - wrap：换行，第一行在上方
 - wrap-reverse：换行，第一行在下方

>**`justify-content`属性**：项目在主轴上的对齐方式

 - flex-start（默认值）：左对齐
 - flex-end：右对齐
 - center： 居中
 - space-between：两端对齐，项目之间的间隔都相等
 - space-around：每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍

>**` align-items`属性**：项目在交叉轴（横轴）上如何对齐

 - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度
 - baseline: 项目的第一行文字的基线对齐
 - flex-start：交叉轴的起点对齐
 - flex-end：交叉轴的终点对齐
 - center：交叉轴的中点对齐

>**`align-content`属性**：多根轴线的对齐方式

 - stretch（默认值）：轴线占满整个交叉轴
 - flex-start：与交叉轴的起点对齐
 - flex-end：与交叉轴的终点对齐
 - center：与交叉轴的中点对齐
 - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
 - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍

**注意**：如果项目只有一根轴线，该属性不起作用

### 项目的属性

>**`order`属性**：项目在交叉轴的排列顺序。数值越小，排列越靠前。

 - 0（默认值）从小到大排列
 - -1从大到小排列

>**`flex-grow`属性**：项目在主轴上的放大比例

 - 0（默认值），如果存在剩余空间，也不放大
 - 如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

>**`flex-shrink`属性**：项目在主轴上的缩小比例

 - 1（默认值），如果所有项目值都为1，当空间不足时，都将等比例缩小
 - 0，如果一个项目的属性为0，其他项目都为1，则空间不足时，前者不缩小

**注意**：负值对该属性无效

>**`flex-basis`属性**：项目占据的主轴空间（main size）

 - auto（默认值），即项目的本来大小
 - css样式给的大小，项目将占据固定空间

>**`align-self`属性**：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。

 - auto（默认值），表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
 - align-items的其他值
 - 
### 参考

 - W3Cflex：[点击进入](http://www.w3school.com.cn/cssref/pr_box-flex.asp)
 - MDN官网Flex：[点击进入](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
 - 阮一峰Flex日志：[点击进入](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)


