---
title: 上传代码到 Github.com
---

前面学会了如何在本地用 git 创建项目版本，本节咱们看看咋把新版本上传到 github.com 之上。


### 准备工作：删除第一天创建的项目

如何删除一个 github.com 的仓库呢？

首先到仓库页面：https://github.com/l552177239/l552177239.github.io

点 Settings（设置）这一个标签。打开的页面底部有一个 “Delete this repository” 按钮，意思是”删除这个仓库“，点击按钮。打开的界面中，输入一下这个仓库的名字 l552177239.github.io 就可以把这个仓库删除了。

删除仓库之后，我们要做的事情是：

>如何把本地的已有仓库，上传到 github.com

### 第一步：创建本地项目

项目名称是任意的，但是我们这里想做的事情是上传比较，所以，本地这个仓库名，也必须是：

```
mkdir l552177239.github.io
```

本地项目名要和 github.com 我们一会儿要创建的仓库名保持一致。

然后，我们就可以把我们想要上传的内容拷贝到这个文件夹内，并制作本地版本。

拷贝进来的内容，要符合第一天我们介绍的 github pages 的格式规范（其实最重要的一点就是每个 .md 文件中都要有头部，参考第一天我们的文档中的介绍）。


### 第二步：创建 github.com 上的同名仓库

到 github.com 上点 `New repository` 按钮，新建一个项目，
项目名叫做 `l552177239.github.io` 。

> 注意，不要勾选任何选项，尤其是不能默认创建 README.md 文件。

创建完成之后，页面上有两个选择，其中第二个是

```
or push an existing repository from the command line
```

翻译：或者把一个已经存在的仓库从命令行推送上来

我们当前就属于这个情况。上传方式有两种 HTTPS 和 SSH ，我们推荐的方式是 SSH，点一下页面上 SSH 字样的按钮。

接下来就按照页面上显示的两步来走。

### 尝试推送 push

到本地命令行，进入我们的本地项目文件夹

```
cd l552177239.github.io
```

然后执行下面两步：

```
git remote add origin git@github.com:funnydeer/funnydeer.github.io.git
git push -u origin master
```

如上所示：

```
git@github.com:funnydeer/funnydeer.github.io.git
```
这个是远端仓库地址。第一个命令本身的意思是把远端仓库地址记录到本地仓库中。

下一步 `git push -u origin master` 就是真正进行上传代码的工作了。

但是执行结果是：

```
Please make sure you have the correct access rights
```

执行失败，解决方法就是添加 ssh 公钥到 github.com 。


### 第三步：添加 ssh key

现在需要达成开发机和 github.com 的互信。

因为开发过程中，我们需要用本地机器向 github.com 的仓库中
写东西（ git push ），同时我们又不想每次都输入密码，所以我们就用 ssh key 的形式来达成互信，过程如下：

- 在本地机器上生成一对 ssh key ，一个公钥，一个私钥
- 把公钥添加到 github.com

具体操作如下：

- 首先本地运行 `ssh-keygen` 命令，可以在 ~/.ssh 文件夹下生产 ssh key
- 到 `~/.ssh/id_rsa.pub` 也就是公钥文件中，拷贝公钥字符串
- 把字符串粘贴到 github.com -> setting -> ssh keys -> add

这样添加 ssh key 的工作就完成了，以后我们执行 git push 这样的命令就不会看到如下错误了：

```
...permission denied...
...make sure ... correct access right ...
```

大功告成。

### Github Pages 显示网站

上面的步骤操作完成，就可以在 l552177239.github.io 看到网站的首页了。
当然我们这里依然是使用 Github Pages 服务，所以是可以添加 md 文件的。

下面，我们涉及到如何把网站做的好看一些的问题。这个需要了解 github Pages 底层的机制。底层 Github Pages 采用了 Jekyll 框架。

### Jekyll 框架

要把 Github Pages 的网站做漂亮，必须了解 Jekyll 框架如何运行的。

首先，.md 文件，也就是 markdown 格式的支持，就是 Jekyll 提供给我们的。这个前面已经详细介绍过了。

现在，我们来添加**布局文件**

- 英文参考文档：[官网](https://jekyllrb.com/docs/frontmatter/)
- 中文参考文档（有可能过期）： [中文网](http://jekyll.com.cn/docs/frontmatter/)


### Jekyll: 添加布局文件

首先打开所有的 .md 中的头部改成这样

```
---
title: First Page
layout: default
---

```

然后来创建布局文件 default.html ，这个文件必须存放到 _layouts 文件夹之内，

_layouts/default.html 内容如下，可以参考我的其他项目中的写法。例如：

    anything anything
      content
    anything anything

注意，上面的 content 外面要套两个大括号。

`anything anything` 可以替换成任意字符端，当然也可以替换成 html 代码。所以就可以给 .md 文件引入 main.css 了。

### Jekyll: 引用 main.css


_layouts/default.html 中这样写

```html
<html>
  <head>
    <link rel="stylesheet" href="/css/main.css"
  </head>
  <body>
    content
  </body>
</html>
```

> 注意：上面的 content 外面要套两层大括号。另外，特别要注意的是 main.css 一定不能写到 _layouts 文件夹，或者任意的以 _ 打头的文件夹内。


当前，我们的 main.css 要放到项目顶级文件夹下的 css 文件夹之内

css/main.css

```css
body {
  background: #bada55;
}
```



### git clone 命令

要想把 github 上的一个项目代码下载到本地有两种方式，一种就是普通下载（ download ）。但是，开发者
基本上会选择另外一种方式，就是 clone 。

```
git clone <版本库的网址>
```

clone 的特点就是不仅仅可以得到最新代码，而且可以得到整个改版历史。而普通下载只能得到最新版本。


### git 各个命令的作用

- `git push` 把本地仓库中有，而远端对应仓库中没有的**版本**推送到远端
- `git pull` 把远端仓库中有，而本地对应仓库中没有的**版本**拉到本地
- `git clone` 把远端仓库，克隆到本地


### 学习 Github/Git 的学习目标

- 知道 git 是**版本控制**工具
- 每个同学要有一个 github 仓库
- 已经添加 ssh key 互信，也就是可以从本地仓库推送内容（ git push ）到 github 仓库
- 可以在本地仓库中任意添加，删除，修改文件，并作成版本

这样，github/git 的初级使用我们就有能力完成了。但是，作为成熟开发者，github 上面会发 push request ，本地 git 会开启新分支，都是必备知识。暂时我们先不涉及。

### 承前启后

程序员三大基本工具

- 编辑器 atom
- 命令行 Linux
- 版本控制 Git/Github

学习上面三大工具的目的，就是为了更加高效的**写代码** 。