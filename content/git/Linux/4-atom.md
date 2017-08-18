---
title: Atom 编辑器
---

# Atom 编辑器

在 Web 开发领域，最受高手追捧的是三款编辑器：vim ，sublime ，atom 。Atom 的使用跟 sublime 类似，但是功能更强，所以主力编辑器选择 atom 。vim 太难学，不推荐作为主力编辑器，但是后面涉及服务器管理的时候，还是需要用到 vim 。

### 安装

1. 深度系统上，到 atom.io 网站，下载 .deb 的包，进行安装。
2. 或者到深度商店搜索 atom 进行下载

### 打开一个项目

在 Linux 上打开命令行命令

```
Ctrl+Alt+T
```

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

#### 配置自己的快捷键

打开搜索功能

```
ctrl+Shift+P
```

搜索`snippets`

选择下面那项，打开

```
Application: Open Your Snippets
```

打开`snippets.cson`后，将下面代码贴入

```json
# Your snippets
#
# Atom snippets allow you to enter a simple prefix in the editor and hit tab to
# expand the prefix into a larger code block with templated values.
#
# You can create a new snippet in this file by typing "snip" and then hitting
# tab.
#
# An example CoffeeScript snippet to expand log to console.log:
#
# '.source.coffee':
#   'Console log':
#     'prefix': 'log'
#     'body': 'console.log $1'
#
# Each scope (e.g. '.source.coffee' above) can only be declared once.
#
# This file uses CoffeeScript Object Notation (CSON).
# If you are unfamiliar with CSON, you can read more about it in the
# Atom Flight Manual:
# http://flight-manual.atom.io/using-atom/sections/basic-customization/#_cson

'.source.js':
  'Console log':
    'prefix': 'log'
    'body': "console.log('$1')"

'.source.js':
  'React Class':
    'prefix': 'recl'
    'body': """
      import React, { Component } from 'react'

      class $1 extends Component {
        render(){
          return(
            <div className="$2">
              $3
            </div>
          )
        }
      }

      export default $1

    """

'.source.js.jsx':
  'JSX div':
    'prefix': 'div'
    'body': """
      <div className="$1">
      </div>
    """
```

 - '.source.js': 添加源
 - 'Console log': 添加说明
 - 'prefix': 'log' 快捷前缀
 - 'body': "console.log('$1')" 输入前缀后出现的主体
 - $1 代表输入出现主体后出现光标的位置

#### 内置快捷键

##### File【文件】

 快捷键             | 英文名               |	中文名	        | 作用
 ----------------- | ------------------- | -------------- | -----------------------
 ctrl+shift+N      | New Window          | 新窗口	        | 新建一个atom编辑器视图窗
 ctrl+n            | New File            | 新文件	        | 新建一个普通文本文件
 ctrl+o            | Open File	         | 打开文件        | 从某个路径打开需要编辑的文件
 ctrl+shift+o      | Open Folder	       | 打开目录	       | 打开工作目录
 .ctrl+shift+t     | Reopen Closed File  | 打开关闭文件     |	最近关闭的文件，有历史记录
 ctrl+comma        | settings	           | 设置中心	       | comma就是逗号键
 ctrl+s            | Save	               | 保存	          | 保存当前编辑的文件
 ctrl+shift+s      | Sava As	           | 另存为         | 把编辑的文件保存到其他位置
 ctrl+w            | Close Tab	         | 关闭标签页      | 就是当前编辑的编辑窗口页面
 ctrl+shift+w      | Close Window	       | 退出编辑器      | 如中文所示，关闭Atom

##### Edit【编辑】

 快捷键              | 英文名                     |	中文名	        | 作用
 ------------------ | ------------------------- | ------------- | ------------------------------------
 ctrl+z             | Undo	                    | 撤销	         | 返回上一步
 ctrl+y	            | Redo	                    | 重做	         | 很少用
 ctrl+x	            | Cut	                      | 剪切	         | 如中文所示
 ctrl+c	            | Copy	                    | 复制	         | 如中文所示
 ctrl+shift+c	      | Copy Path	                | 复制文件路径    | 当前编辑文件的路径
 ctrl+v	            | Paste	                    | 粘贴	         | 如中文所示
 ctrl+a	            | Select All	              | 全选	         | 选择全文
 ctrl+/	            | Toggle Command	          | 注释	         | 如中文所示
 ctrl+]	            | Indent	                  | 缩进	         | 如中文所示
 ctrl+[	            | outdent	                  | 回退缩进	      | 有点类似撤销，与缩进相反
 alt+shift+left     | arrow	Move Selection Left | 移动选择到左边	  | 意思就是你选定部分内容到光标前一个位置
 alt+shift+right    | arrow	Move Selection Right| 移动选择到右边   |	一致
 ctrl+del[Delete]	  | Delete to End of Word	    | 删除当前光标处到词尾结束部分	| 就是删除范围在单词内
 ctrl+shift+k	      | Delete Line	              | 删除行          |	删除光标处的行
 ctrl+alt+]	        | Fold	                    | 展开段落	      | 展开代码块
 ctrl+alt+[	        | Unfold	                  | 折叠段落	      | 就是折叠代码块
 ctrl+alt+shift+]   | Unfold All	              | 展开所有折叠段落  |	展开所有折叠代码块
 ctrl+alt+shift+[	  | Fold All	                | 折叠所有段落	   | 折叠所有可折叠的代码块
 ctrl+alt+q	R       | eflow Selection	          | 浮动选择区域 | 意思就是你选择的区域会变成流动布局，一般是行内容追加在上一行后面
 ctrl+shift+u	      | Select Encoding	          | 选择文件编码	   | 如中文所示
 ctrl+g	            | Go to Line	              | 跳转到某行       | 跳转
 ctrl+shift+l	      | Select Grammar	          | 选择语法格式	   | 其实就是什么格式的文件
 ctrl+f2	          | View All	                | 查看所有书签【切换跳到书签位置】| 书签是个很实用的功能
 ctrl+alt+f2	      | Toggle Bookmark	          | 是否在光标处设置标签| 如中文所示
 f2	                | Jump to Next Bookmark	    | 跳到下一个标签位置	 | 如中文所示
 ctrl+f2	          | Jump to Previour Bookmark | 跳到上一个标签位置  | 如中文所示

 ##### View【视图】

 快捷键          | 英文名                    |	中文名	           | 作用
 -------------- | ------------------------ | ----------------- | -----------------------
 F11	          | Toggle Full Screen       | 切换全屏           | 如中文所示
 ctrl+alt+r	    | Reload Window	           | 重新加载窗口        |	跟重开编辑器差不多
 ctrl+alt+p	    | Run Package Specs	       | 让包执行特定模式	   | 具体不晓得
 ctrl+alt+i	    | Toggle Developer Tools	 | 打开开发者工具	    | 就是chrome的调试工具
 ctrl+shift+=	  | Increase Font Size	     | 加大编辑窗口字体字号 | 如中文所示
 ctrl+shift+-	  | Decrease Font Size	     | 减小编辑窗口字体字号	| 如中文所示
 ctrl+0	        | Resset Font Size	       | 重置字体字号	      | 恢复默认大小
 .ctrl+alt+O	  | Toggle Symbols-Tree-View | 文件索引	          | 这个是插件的
 ctrl+\	Toggle  | Tree View	               | 是否展开目录树	    | 执行这个默认会聚焦侧边栏
 ctrl+shift+p	  | Toggle Command Plaette	 | 打开全局命令片段	   | 最强大的功能

 ##### Selection【选择】

 快捷键             | 英文名                     |	中文名	            | 作用
 ----------------- | ------------------------- | ------------------ | -----------------------
 ctrl+alt+up       | arrow	Add Selection Above| 选择选区到上一行	     | 就是选定部分区域追加到上一行选定
 ctrl+alt+down     | arrow	Add Selection Below| 选择选区到下一行      | 一致
 Esc	             | Single Selection	         | 选择单行	            | 没试出来
 ctrl+shift+Home	 | Select to Top	           | 光标处到顶部	        | 全选功能的拆开，挺实用的
 ctrl+shift+End	   | Select to Bottom	         | 光标处到底部	        | 全选功能的拆开，挺实用的
 ctrl+l	           | Select Line	             | 光标处一行选定       | 如中文所示
 ctrl+shift+left   | arrow	Select to Begining of Word | 光标处到词头 | 也很实用
 ctrl+shift+right  | arrow	Select to End of Word | 光标处到词尾      | 也很使用
 shift+home	Select | to Character of Line	     | 光标处到行首	        | 如中文所示
 shift+end	Select | to End of Line	           | 光标处到行尾	        | 很实用
 ctrl+alt+m	Select | inside Brackets           | 选定括号内内容       | 就是括号，或者标签内的内容

 ##### Find【搜索】

 快捷键          | 英文名                 |	中文名	               | 作用
 -------------- | --------------------- | -------------------- | -----------------------
 ctrl+f	        | Find in Buffer	      | 从缓存中找	            | 换个理解就是编辑文件内查询
 ctrl+alt+f	    | Replace in Buffer	    | 从缓存中查询替换	      | 就是在文件内替换查找文本
 ctrl+d	        | Select Next	          | 查询及选定相同的内容	   | 神器！
 alt+F3	        | Select All	          | 全选文件内当前选定的内容  | 能匹配到的都选定，神器！
 ctrl+shift+f	  | Find in Project	      | 从工作目录查询	         | 可以理解为全局搜索
 f3	            | Find Next	            | 查询下一个	            | 就是当前文件内查找的内容，下一个匹配的
 shift+f3	      | Find Previous	        | 查询上一个	            | 一致
 ctrl+b	        | Find Buffer	          | 展开缓存	             | 就是当前打开的所有编辑文件
 ctrl+p	        | Find File	            | 查询且打开文件	         | 全局搜索文件名打开文件
 ctrl+shift+b	  | Find Modifiled File   | 查询编辑的文件	         | 没反应

 ##### core[内置快捷键]

 快捷键             | 英文名               |	中文名	        | 作用
 ----------------- | ------------------- | -------------- | -----------------------
 ctrl+r	           |Toggle File Symbols	 | 文件内符号索引	 |很方便跳转，试用


> 文件语法高亮

 - `ctrl-shift-L` 选择文本类型

> 使用Atom进行写作Markdown

 - `ctrl-shift-M` Markdown预览

 - 可用代码片段 b, legal, img, l, i, code, t, table

### 参考

 - atom官网：[点击进入](https://atom.io/)

 - atom中文社区：[点击进入](https://atom-china.org/)

 - CSDN博客：[点击进入](http://blog.csdn.net/bomess/article/category/3202419)
