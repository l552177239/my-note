---
title: Atom 编辑器
---

# Atom 编辑器

在 Web 开发领域，最受高手追捧的是三款编辑器：vim ，sublime ，atom 。Atom 的使用跟 sublime 类似，但是功能更强，所以主力编辑器选择 atom 。vim 太难学，不推荐作为主力编辑器，但是后面涉及服务器管理的时候，还是需要用到 vim 。

### 安装

1. 深度系统上，到 atom.io 网站，下载 .deb 的包，进行安装。
2. 或者到深度商店搜索 atom 进行下载

### 打开一个项目

```
cd project/
atom .
```

### 创建文件

默认就是用 Ctrl-n ，保存用 Ctrl-s 。

使用一个插件来进行文件创建操作，叫做 [Advanced New File](https://atom.io/packages/advanced-open-file) 。

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

### Web好用的插件

 - `file-icons`，显示文件类型对应的图标

 - `emmet`，代码补齐

 - `language-babel`，JSX语法

 - `linter`，代码检查

 - `linter-jshint`，JS代码查错（必须安装`linter`后才能使用）

 - `highlight-selected`，高亮当前所选文字

 - `git-control`，支持git插件

 - `atom-beautify`，一键代码美化

 - `simplified-chinese-menu`，简体中文汉化

 - `atom-material-ui`，好看到爆

 - `atom-material-syntax`，美化

 - `atom-ternjs`，js代码提示很强大，高度定制化

 - `docblockr`，jsdoc 给js添加注释

 - `autoclose-html`，闭合html标签

 - `color-picker`，取色器（必备插件）

 - `pigments`，颜色显示插件 （必装）

 - `terminal-panel`，直接在atom里面写命令了

 - `svg-preview`，svg预览

 - `markdown-preview-enhanced`，Markdown展示插件（[参考地址](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/)）

### Atom 快捷键

#### 文件切换

 - `ctrl-shift-s` 保存所有打开的文件

 - `ctrl-shift-o` 打开目录

 - `ctrl-\` 显示或隐藏目录树

 - `ctrl-0` 焦点移到目录树

 - 目录树下，使用`a`，`m`，`delete`来增加，修改和删除

 - `ctrl-t或ctrl-p` 查找文件

 - `ctrl-b` 在打开的文件之间切换

 - `ctrl-shift-b` 只搜索从上次git commit后修改或者新增的文件


### 选取

> 大部分和导航一致，只不过加上shift

 - `ctrl-shift-P` 选取至上一行

 - `ctrl-shift-N` 选取至下一样

 - `ctrl-shift-B` 选取至前一个字符

 - `ctrl-shift-F` 选取至后一个字符

 - `alt-shift-B`, `alt-shift-left` 选取至字符开始

 - `alt-shift-F`, `alt-shift-right` 选取至字符结束

 - `ctrl-shift-E` - , `cmd-shift-right` 选取至本行结束

 - `ctrl-shift-A`, `cmd-shift-left` 选取至本行开始

 - `cmd-shift-up` 选取至文件开始

 - `cmd-shift-down` 选取至文件结尾

 - `cmd-A` 全选

 - `cmd-L` 选取一行，继续按回选取下一行

 - `ctrl-shift-W` 选取当前单词

#### 编辑和删除文本

> 基本操作

 - `ctrl-T` 使光标前后字符交换

 - `cmd-J` 将下一行与当前行合并

 - `ctrl-cmd-up`, `ctrl-cmd-down` 使当前行向上或者向下移动

 - `cmd-shift-D` 复制当前行到下一行

 - `cmd-K`, `cmd-U` 使当前字符大写

 - `cmd-K`, `cmd-L` 使当前字符小写

> 删除和剪切

 - `ctrl-shift-K `删除当前行

 - `cmd-backspace` 删除到当前行开始

 - `cmd-fn-backspace` 删除到当前行结束

 - `ctrl-K` 剪切到当前行结束

 - `alt-backspace` 或 `alt-H` 删除到当前单词开始

 - `alt-delete` 或 `alt-D` 删除到当前单词结束

> 多光标和多处选取

 - `cmd-click` 增加新光标

 - `cmd-shift-L` 将多行选取改为多行光标

 - `ctrl-shift-up`, `ctrl-shift-down` 增加上（下）一行光标

 - `cmd-D` 选取文档中和当前单词相同的下一处

 - `ctrl-cmd-G` 选取文档中所有和当前光标单词相同的位置

> 括号跳转

 - `ctrl-m` 相应括号之间，html tag之间等跳转

 - `ctrl-cmd-m` 括号(tag)之间文本选取

 - `alt-cmd-.` 关闭当前XML/HTML tag

> 编码方式

 - `ctrl-shift-U` 调出切换编码选项

> 查找和替换

 - `cmd-F` 在buffer中查找

 - `cmd-shift-f` 在整个工程中查找

> 代码片段

 - `alt-shift-S` 查看当前可用代码片段

 - 在~/.atom目录下snippets.cson文件中存放了你定制的snippets


> 自动补全

 - `ctrl-space` 提示补全信息

> 折叠

 - `alt-cmd-[` 折叠

 - `alt-cmd-]` 展开

 - `alt-cmd-shift-{` 折叠全部

 - `alt-cmd-shift-}` 展开全部

 - `cmd-k` `cmd-N` 指定折叠层级 N为层级数

> 文件语法高亮

 - `ctrl-shift-L` 选择文本类型

> 使用Atom进行写作Markdown

 - `ctrl-shift-M` Markdown预览

 - 可用代码片段 b, legal, img, l, i, code, t, table

### 参考

 - atom官网：[点击进入](https://atom.io/)

 - atom中文社区：[点击进入](https://atom-china.org/)
