## 常用的UI库

### Bootstrap

#### 简介

Bootstrap，来自 Twitter，是一个用于快速开发 Web 应用程序和网站的前端框架（UI库）。Bootstrap 是基于 HTML、CSS、JAVASCRIPT 的。

#### 引用

1. 直接在官网下载引用

```
http://getbootstrap.com/2.3.2/assets/bootstrap.zip
```

下载解压后引入需要的`css`,`js`等

2. 直接引用CDN

```
<link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
```

3. 通过`npm`装包

```
npm install bootstrap --save
```

#### BootStrap的使用

##### H5 文档类型

```
<!DOCTYPE html>
<html lang="zh-CN">
	...
</html>
```

##### 移动设备优先

```
//为了确保适当的绘制和触屏缩放，需要在 <head> 之中添加 viewport 元数据标签。
<meta name="viewport" content="width=device-width, initial-scale=1  user-scalable=no">
//通过为视口（viewport）设置 meta 属性为 user-scalable=no 可以禁用其缩放（zooming）功能
```

##### 布局容器（为页面内容和栅格系统包裹一个 .container）

.container 类用于固定宽度并支持响应式布局的容器。
```
<div class="container">
...
</div>
```

##### 栅格系统

 - `row`必须包含在`.container`或`.container-fluid`中。
 - 通过`row`在水平方向创建一组 列`column`，作为`row`的直接子元素。
 - 栅格系统中的列是通过指定1到12的值来表示其跨越的范围。
 - 如果一行中包含了的`column`大于12，多余的`column`另起一行排列。
 - 栅格类利用类前缀进行自适应布局。

**栅格的参数**

 - 超小屏幕 手机(<768px) **.col-xs-**
 - 中等屏幕 桌面显示器(≥992px) **.col-sm-**
 - 小屏幕 平板(≥768px) **.col-md-**
 - 大屏幕 大桌面显示器(≥1200px) **.col-lg-**

**列偏移**

使用`.col-md-offset-*`类可以将列向右侧偏移。这些类实际是通过使用`*`选择器为当前元素增加了左侧的边距（margin）

**例**：

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="./bootstrap.min.css">
	<style>
		div{
			border:1px solid blue;
		}
	</style>
</head>
<body>
	<div class="wrap">
		<div class="container-fluid">
			<h1 style='text-align:center;'>BootStrap</h1>
			<div class="row">
			  <div class="col-md-4 col-xs-6">.col-md-4</div>
			  <div class="col-md-4 col-md-offset-4 col-xs-2 col-xs-offset-4">.col-md-4 .col-md-offset-4</div>
			</div>
			<div class="row">
			  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
			  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
			</div>
			<div class="row">
			  <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
			</div>
		</div>	
	</div>
</body>
</html>
```

#### 其他功能应用

##### 文本
不同的类展示了不同的文本颜色。如果文本是个链接鼠标移动到文本上会变暗
```
.text-muted
.text-primary
.text-success
.text-info
.text-warning
.text-danger
```

##### 背景
不同的类展示了不同的背景颜色。 如果文本是个链接鼠标移动到文本上会变暗
```
.bg-primary
.bg-success
.bg-info
.bg-warning
.bg-dange
```

##### 其他
```
.pull-left //元素浮动到左边
.pull-right //元素浮动到右边
.center-block //设置元素为 display:block 并居中显示
.clearfix //清除浮动
.show //强制元素显示
.hidden //强制元素隐藏
.sr-only //除了屏幕阅读器外，其他设备上隐藏元素
.sr-only-focusable //与 .sr-only 类结合使用，在元素获取焦点时显示(如：键盘操作的用户)
.text-hide //将页面元素所包含的文本内容替换为背景图
.close //显示关闭按钮
.caret //显示下拉式功能
```

#### 插件的使用

**所有的插件依赖于 jQuery。所以必须在插件文件之前引用 jQuery**

**引入使用的插件或压缩的JS**

##### 静态实例

以下模态框包含了模态框的头、体和一组放置于底部的按钮。
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
    <h1 style='text-align:center'>BootStrap</h1>
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
    </button>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    <script>
        $('#myModal').on('shown.bs.modal', function () {
          $('#myInput').focus()
        })
    </script>       
</body>
</html>
```

#### 参考地址

Bootstrap官网首页：[点击进入](http://getbootstrap.com/)

Bootstrap中文网：[点击进入](http://www.bootcss.com/)

BootCDN官网首页：[点击进入](http://www.bootcdn.cn/)