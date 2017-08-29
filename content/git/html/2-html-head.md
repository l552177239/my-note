# HTML `<head>`

1. `<head>`元素包含了所有的头部标签元素
2. 在 <head>元素中你可以插入脚本（scripts）、样式文件（CSS）、及各种`meta`信息
3. 可以添加在头部区域的元素标签为: `<title>`、`<style>`、`<meta>`、`<link>`、`<script>`、`<noscript>`、`<base>`


### `<title>`元素

1. `<title>`标签定义文档的标题
2. title 元素在所有 HTML/XHTML 文档中都是必需的
3. title 元素能够：
  - 定义浏览器工具栏中的标题
  - 提供页面被添加到收藏夹时显示的标题
  - 显示在搜索引擎结果中的页面标题

```html
<title>Document</title>
```

### `<style>`元素

1. `<style>`标签定义了 HTML文档的样式文件引用地址.
2. 在`<style>`元素中你也可以直接添加样式来渲染 HTML 文档:

```html
<style type="text/css">
body {background-color:yellow}
p {color:blue}
</style>
```

### `<link>`元素

1. `<link>`标签定义了文档与外部资源之间的关系
2. `<link>`标签通常用于链接样式表、在线CDN等

```html
<link rel="stylesheet" type="text/css" href="mystyle.css">
```

### `<script>`元素

1. `<script>`标签用于加载脚本文件，如： JavaScript
2. `<script>`元素既可包含脚本语句，也可以通过 "src" 属性指向外部脚本文件

```html
<script>
document.write("Hello World!")
</script>
```

属性       |  值        | 描述
---------- | ---------- | -------------------------------------------
asyncNew   | async      | 规定异步执行脚本(仅适用于外部脚本)
charset    | charset    | 规定在脚本中使用的字符编码(仅适用于外部脚本)
defer      | defer      | 规定当页面已完成解析后,执行脚本(仅适用于外部脚本)
src        | URL        | 规定外部脚本的 URL
type       | MIME-type  | 规定脚本的 MIME 类型
xml:space  | preserve   | HTML5 不支持,规定是否保留代码中的空白

**小贴士**：

1. 如果使用 "src" 属性，则`<script>`元素必须是空的
2. 有多种执行外部脚本的方法：
  - 如果`async="async"`：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
  - 如果不使用 async 且 `defer="defer"`：脚本将在页面完成解析时执行
  - 如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本

###  `<noscript>`元素

1. noscript 元素用来定义在脚本未被执行时的替代内容（文本）
2. 此标签可被用于可识别`<noscript>`标签但无法支持其中的脚本的浏览器
3. 如果浏览器支持脚本，那么它不会显示出 noscript 元素中的文本

```html
<noscript>抱歉，你的浏览器不支持 JavaScript!</noscript>
```

#### 使用技巧

无法识别`<script>`标签的浏览器会把标签的内容显示到页面上。为了避免浏览器这样做，您应当在注释标签中隐藏脚本。老式的（无法识别`<script>`标签的）浏览器会忽略注释，这样就不会把标签的内容写到页面上，而新式的浏览器则懂得执行这些脚本，即使它们被包围在注释标签中！

```
<script>
<!--
function displayMsg()
{
alert("Hello World!")
}
//-->
</script>
<noscript>抱歉，你的浏览器不支持 JavaScript!</noscript>
```

### `<base>`元素

1. `<base>`标签描述了基本的链接地址`/`
2. 为页面中所有的链接指定默认地址

```html
<base href="http://www.w3school.com.cn/i/" target="_self" />
<!-- _self：指定页面中所有标签都是本页打开 -->
```

#### 举个例子

```html
<head>
    <base href="http://www.w3school.com.cn/i/" />
    <base target="_blank" />
</head>

<body>
    <img src="eg_smile.gif" />
    <a href="http://www.w3school.com.cn">W3School</a>
</body>
```

###  `<meta>`元素

1. meta是 html语言 `<head>`的一个辅助性标签
2. meta标签描述了一些基本的元数据。
3. `<meta>`标签提供了元数据.元数据也不显示在页面上，但会被浏览器解析

####  `<meta>`元素的作用有：

1. 搜索引擎优化（SEO）
2. 定义页面使用语言
3. 自动刷新并指向新的页面
4. 实现网页转换时的动态效果
5. 控制页面缓冲
6. 网页定级评价
7. 控制网页显示的窗口等

####  `<meta>`的使用

meta标签的组成：meta标签共有两个属性，它们分别是http-equiv属性和name属性，不同的属性又有不同的参数值，这些不同的参数值就实现了不同的网页功能。

#### name 属性

name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的

##### name属性语法格式是：

```html
<meta name="参数" content="具体的参数值">
```

##### name属性主要有以下几种参数：　

 - Keywords(关键字)　

> 说明：keywords用来告诉搜索引擎你网页的关键字是什么

举例：

```html
<meta name="keywords" content="meta总结,html meta,meta属性,meta跳转">
```

 - description(网站内容描述)

> 说明：description用来告诉搜索引擎你的网站主要内容

举例：

```html
<meta name="description" content="haorooms博客,html的meta总结，meta是html语言head区的一个辅助性标签"> 
```

 - robots(机器人向导)
 
> 说明：robots用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引

content的参数有all、none、index、noindex、follow、nofollow(默认：all)

具体参数如下：

信息参数为all：文件将被检索，且页面上的链接可以被查询；

信息参数为none：文件将不被检索，且页面上的链接不可以被查询；

信息参数为index：文件将被检索；

信息参数为follow：页面上的链接可以被查询；

信息参数为noindex：文件将不被检索，但页面上的链接可以被查询；

信息参数为nofollow：文件将被检索，但页面上的链接不可以被查询；

举例：

```html
<meta name="robots" content="none"> 
```

 - author(作者)

> 说明：标注网页的作者

举例：

```html
<meta name="author" content="root,root@xxxx.com">
```

 - generator

> meta标签的generator的信息参数，代表说明网站的采用的什么软件制作

```html
<meta name="generator" content="信息参数"/>
```

 - COPYRIGHT

> meta标签的COPYRIGHT的信息参数，代表说明网站版权信息

```html
<META NAME="COPYRIGHT" CONTENT="信息参数"> 
```

 - revisit-after

> revisit-after代表网站重访,7days代表7天，依此类推

```html
<META name="revisit-after" CONTENT="7days"> 
```


##### http-equiv属性

http-equiv顾名思义，相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容，与之对应的属性值为content，content中的内容其实就是各个参数的变量值。

##### http-equiv属性语法格式是：

```html
<meta http-equiv="参数" content="参数变量值">
```

##### http-equiv属性主要有以下几种参数：

 - Expires(期限)

> 说明：可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输

用法：

```html
<meta http-equiv="expires" content="Fri,12Jan200118:18:18GMT">
```

**注意**：必须使用GMT的时间格式

 - Pragma(cache模式)

> 说明：禁止浏览器从本地计算机的缓存中访问页面内容。

用法：

```html
<meta http-equiv="Pragma" content="no-cache">
```

**注意**：这样设定，访问者将无法脱机浏览。

 - Refresh(刷新)

> 说明：自动刷新并指向新页面。

用法：

```html
<meta http-equiv="Refresh" content="2;URL=http://www.haorooms.com">
<!-- (注意后面的引号，分别在秒数的前面和网址的后面) -->
```

**注意**：其中的2是指停留2秒钟后自动刷新到URL网址。

 - Set-Cookie(cookie设定)

> 说明：如果网页过期，那么存盘的cookie将被删除。

用法：

```html
<meta http-equiv="Set-Cookie" content="cookie value=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/"> 
```

**注意**：必须使用GMT的时间格式。

 - Window-target(显示窗口的设定)

> 说明：强制页面在当前窗口以独立页面显示。

用法：

```html
<meta http-equiv="Window-target" content="_top"> 
```

**注意**：用来防止别人在框架里调用自己的页面。

 - content-Type(显示字符集的设定)

> 说明：设定页面使用的字符集。

用法：

```html
<meta http-equiv="content-Type" content="text/html;charset=gb2312">
```

具体如下：

meta标签的 charset的信息参数如GB2312时，代表说明网站是采用的编码是简体中文；

meta标签的 charset的信息参数如BIG5时，代表说明网站是采用的编码是繁体中文；

meta标签的 charset的信息参数如iso-2022-jp时，代表说明网站是采用的编码是日文；

meta标签的 charset的信息参数如ks_c_5601时，代表说明网站是采用的编码是韩文；

meta标签的 charset的信息参数如ISO-8859-1时，代表说明网站是采用的编码是英文；

meta标签的 charset的信息参数如UTF-8时，代表世界通用的语言编码；

 - content-Language（显示语言的设定）

用法：

```html
<meta http-equiv="Content-Language" content="zh-cn"/>
```

 - Cache-Control指定请求和响应遵循的缓存机制

Cache-Control指定请求和响应遵循的缓存机制。在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。请求时的缓存指令包括no-cache、no-store、max-age、max-stale、min-fresh、on

ly-if-cached，响应消息中的指令包括public、private、no-cache、no-store、no-transform、must-revalidate、proxy-revalidate、max-age。各个消息中的指令含义如下

Public指示响应可被任何缓存区缓存

Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效

no-cache指示请求或响应消息不能缓存

no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。

max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应

min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应

max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

 - http-equiv="imagetoolbar"

> 指定是否显示图片工具栏，当为false代表不显示，当为true代表显示

用法：

```html
<meta http-equiv="imagetoolbar" content="false"/>
```

 - Content-Script-Type

> W3C网页规范，指明页面中脚本的类型

用法：

```html
<Meta http-equiv="Content-Script-Type" Content="text/javascript">
```

 - 页面跳转，只用于IE

具体请看 http://www.haorooms.com/post/liulanq_think_ie

### 参考

 - 菜鸟教程：[点击查看](http://www.runoob.com/html/html-head.html)

 - W3school：[点击查看](http://www.w3school.com.cn/html/html_head.asp)

 - FEX：[点击查看](http://fex.baidu.com/blog/2014/10/html-head-tags/)