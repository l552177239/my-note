# HTML

超文本标记语言（HyperText Markup Language）是一种用于创建网页的标准标记语言，
您可以使用 HTML 来建立自己的 WEB 站点，HTML 运行在浏览器上，由浏览器来解析

### 什么是 HTML？

> HTML 是用来描述网页的一种语言

 - HTML 指的是超文本标记语言 (Hyper Text Markup Language)
 - HTML 是用来描述网页的一种语言
 - HTML 不是一种编程语言，而是一种标记语言 (markup language)
 - 标记语言是一套标记标签 (markup tag)
 - HTML 使用标记标签来描述网页

### HTML 文件

  - HTML 文档描述网页
  - HTML 文档包含 HTML 标签和纯文本
  - HTML 文档也被称为网页

 HTML 文件一般以`.htm`或`.html`作为后缀，可以用 Web 浏览器打开。
 Web 浏览器的作用是读取 HTML 文档，并以网页的形式显示出它们。浏览器会将 HTML 标签解释为网页

### HTML 网页结构

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    
  </body>
</html>
```

### `<!DOCTYPE>`声明

1. `<!DOCTYPE>` 声明位于文档中的最前面的位置，处于`<html>`标签之前
2. <!DOCTYPE> 声明不是一个 HTML 标签；它是用来告知 Web 浏览器页面使用了哪种 HTML 版本
3.  `<!DOCTYPE>`声明有助于浏览器中正确显示网页,网络上有很多不同的文件，如果能够正确声明HTML的版本，浏览器就能正确显示网页内容
4.  使用`HTML`元素前，先参阅[`HTML`元素与合法的`Doctype`](http://www.runoob.com/tags/html-elementsdoctypes.html)，看看每一个`HTML`元素都出现在哪一种`Doctype`中
5. 在`HTML 4.01`中，`<!DOCTYPE>`声明需引用`DTD`（文档类型声明），因为`HTML 4.01`是基于`SGML`（Standard Generalized Markup Language 标准通用标记语言）`DTD`指定了标记语言的规则，确保了浏览器能够正确的渲染内容。HTML5 不是基于`SGML`，因此不要求引用`DTD`。

#### HTML 5

```
<!DOCTYPE html>
```

#### HTML 4.01 Strict

这个 DTD 包含所有 HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

#### HTML 4.01 Transitional

这个 DTD 包含所有 HTML 元素和属性，包括表象或过时的元素（如 font ）。框架集是不允许的

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

#### HTML 4.01 Frameset

这个 DTD 与 HTML 4.01 Transitional 相同，但是允许使用框架集内容

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

#### XHTML 1.0 Strict

这个 DTD 包含所有 HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的。结构必须按标准格式的 XML 进行书写

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

#### XHTML 1.0 Transitional

这个 DTD 包含所有 HTML 元素和属性，包括表象或过时的元素（如 font ）。框架集是不允许的。结构必须按标准格式的 XML 进行书写

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

#### XHTML 1.0 Frameset

这个 DTD 与 XHTML 1.0 Transitional 相同，但是允许使用框架集内容

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

#### XHTML 1.1

这个 DTD 与 XHTML 1.0 Strict 相同，但是允许您添加模块（例如为东亚语言提供 ruby 支持）

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

**小贴士**：

1. DOCTYPE 声明不区分大小写
2. `<!DOCTYPE>`标签没有结束标签
3. 使用 [W3C 的验证](http://validator.w3.org/) 检查您是否编写了一个带有正确 DTD 的合法的`HTML/XHTML`文档

### 参考

 - 菜鸟教程：[点击进入](http://www.runoob.com/)

 - W3 school：[点击进入](http://www.w3school.com.cn/)

 - MDN HTML文档：[点击进入](https://developer.mozilla.org/zh-CN/docs/Web/HTML)

 - 梦之都教程：[点击进入](http://www.dreamdu.com/xhtml/)
