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

###  <noscript>元素

1. noscript 元素用来定义在脚本未被执行时的替代内容（文本）
2. 此标签可被用于可识别`<noscript>`标签但无法支持其中的脚本的浏览器
3. 如果浏览器支持脚本，那么它不会显示出 noscript 元素中的文本

```html
<noscript>抱歉，你的浏览器不支持 JavaScript!</noscript>
```


### `<base>`元素

1. `<base>`标签描述了基本的链接地址`/`
2. 该标签作为HTML文档中所有的链接标签的默认链接

```html
<base href="http://www.w3school.com.cn/i/" target="_blank" />
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
