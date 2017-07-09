## localStorage

### H5 Web存储（在客户端存储数据）


HTML5 提供了两种在客户端存储数据的新方法：
 - `localStorage` - 没有时间限制的数据存储
 - `sessionStorage` - 针对一个`session`的数据存储

之前，这些都是由`cookie`完成的。但是`cookie`不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得`cookie`速度很慢而且效率也不高。

在 HTML5 中，数据不是由每个服务器请求传递的，而是只有在请求时使用数据。它使在不影响网站性能的情况下存储大量数据成为可能。

对于不同的网站，数据存储于不同的区域，并且一个网站只能访问其自身的数据。

HTML5 使用 JavaScript 来存储和访问数据。

### 什么是`localStorage`、`sessionStorage`

在HTML5中，新加入了一个`localStorage`特性，这个特性主要是用来作为本地存储来使用的，解决了`cookie`存储空间不足的问题（`cookie`中每条`cookie`的存储空间为4k），``localStorage`中一般浏览器支持的是5M大小，这个在不同的浏览器中`localStorage`会有所不同。

### `localStorage`自带方法

名称									|	作用
--------------------- | -----------------------------------------
clear									| 清空localStorage上存储的数据
getItem								| 读取数据
hasOwnProperty				| 检查localStorage上是否保存了变量x，需要传入x
key										| 读取第i个数据的名字或称为键值(从0开始计数)
length								| localStorage存储变量的个数
propertyIsEnumerable	| 用来检测属性是否属于某个对象的
removeItem						| 删除某个具体变量
setItem								| 存储数据
toLocaleString				| 将（数组）转为本地字符串
valueOf								| 获取所有存储的数据

**例**：如何创建和访问`localStorage`

```
<script type="text/javascript">
localStorage.lastname="Smith"//创建一个名为lastname的变量
document.write(localStorage.lastname)
</script>
```

**例**：对用户访问页面的次数进行计数

```
<script type="text/javascript">
if (localStorage.pagecount)
  {
  localStorage.pagecount=Number(localStorage.pagecount) +1;
  }
else
  {
  localStorage.pagecount=1;
  }
document.write("Visits "+ localStorage.pagecount + " time(s).");
</script>
```

### `localStorage`的常用写法

```
localStorage.a = 3;//设置a为"3"  
localStorage["a"] = "sfsf";//设置a为"sfsf"，覆盖上面的值  
localStorage.setItem("b","isaac");//设置b为"isaac"  
var a1 = localStorage["a"];//获取a的值  
var a2 = localStorage.a;//获取a的值  
var b = localStorage.getItem("b");//获取b的值  
localStorage.removeItem("c");//清除c的值  
```
