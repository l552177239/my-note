---
title: Atom 编辑器
---

# Atom 编辑器

在 Web 开发领域，最受高手追捧的是三款编辑器：vim ，sublime ，atom 。Peter 用 vim 5年，sublime 3年，现在 Peter 用 atom 。Atom 的使用跟 sublime 类似，但是功能更强，所以课程中主力编辑器选择 atom 。vim 太难学，不推荐作为主力编辑器，但是后面涉及服务器管理的时候，还是需要用到 vim 。

### 安装

深度系统上，到 atom.io 网站，下载 .deb 的包，进行安装。

### 打开一个项目

```
cd project/
atom .
```

### 创建文件

默认就是用 Ctrl-n ，保存用 Ctrl-s 。

但是 Peter 平时使用一个插件来进行文件创建操作，叫做 [Advanced New File](https://atom.io/packages/advanced-open-file) 。

### 自动补齐

现在我想输入 `h1<tab>` 就自动补齐成

```
<h1></h1>
```

这个需要安装一个包叫做 emmet 。

### 装包

使用 Ctrl-Shift-P 打开命令面板，然后搜索

```
install packages
```

可以搜到 `Install Packages And Themes` ，选中，回车，就进入了装包界面。

搜索报名，例如 `pigments` ，搜到之后，点 install 就可以了。

查看 atom 中已经安装了哪些包，就用 Ctrl-Shift-P 打开命令面板，然后输入

```
Uninstall Packages
```

就可以看到所有已经安装的包了。