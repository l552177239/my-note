---
title: Sublime 编辑器
---

### 简介

Sublime Text 是一个代码编辑器（Sublime Text 3是收费软件，但可以无限期试用）

Sublime 支持多种编程语言的语法高亮、拥有优秀的代码自动完成功能，还拥有代码片段（Snippet
）的功能，可以将常用的代码片段保存起来，在需要时随时调用

### 安装

window下百度搜索 `sublime` 进行下载安装

### 插件

#### 安装 `Package Control`

按 **Ctrl+`** 调出console

粘贴下面安装代码到底部命令行并回车：

> import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

重启Sublime Text 3。

如果在Perferences->package settings中看到package control这一项，则安装成功。

可以到 [官网链接](https://packagecontrol.io/) 复制代码或下载
`Package Control.sublime-package`
放到 `sublime` 安装目录里的 `data` 里 `installed package` 文件夹（这个文件夹位置可能会不一样）

#### 用Package Control安装其他插件

**第一种方法**：按下Ctrl+Shift+P调出命令面板，输入install 点击 Install Package 选项，然后在列表中搜索并选中要安装的插件

**第二种方法**：点击工具栏`Preferences`下的`Package Control`然后搜索并选中要安装的插件

#### 常用插件

**Package Control**（插件包控制插件）

安装SublimeText后必须安装的东西，插件包控制插件。
可以控制插件的查看已安装差价、安装、升级、删除等操作

**ChineseLocalization** （汉化插件）

工具栏 Help 下的 Language 选项选择语言

**Emmet** （自动补齐插件）

输入简写，按Tab键可触发效果

**Babel**（React JSX）

具有React JSX扩展名的ES6 JavaScript的语法定义（语法高亮）

**Agila**（主题）

一款受欢迎的sublime Theme

### 快捷键

#### 配置代码片段

首先点击`Tools` -> `New Snippet`

显示代码如下：

```html
<snippet>
     <content><![CDATA[
Hello, ${1:this} is a ${2:snippet}.
]]></content>
     <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
     <!-- <tabTrigger>hello</tabTrigger> -->
     <!-- Optional: Set a scope to limit where the snippet will trigger -->
     <!-- <scope>source.python</scope> -->
</snippet>
```

##### 模板说明

```html
<snippet>
  <content><![CDATA[
    你需要插入的代码片段${1:name}
    ]]></content>
  <!-- 可选：快捷键，利用Tab自动补全代码的功能 -->
  <tabTrigger>xyzzy</tabTrigger>
  <!-- 可选：使用范围，不填写代表对所有文件有效。附：source.css和test.html分别对应不同文件。 -->
  <scope>source.python</scope>
  <!-- 可选：在snippet菜单中的显示说明（支持中文）。如果不定义，菜单则显示当前文件的文件名。 -->
  <description>My Fancy Snippet</description>
</snippet>
```

**小贴士**：

1. 用TAB键调用代码片段
2. 你发的这个代码片段要打上`xyzzy`按下TAB键就可以了
3. 一些文件中（如HTML格式文件）是不显示“代码片段的说明”的。直接按TAB键就可以
4. `${1:name}`表示代码插入后，光标所停留的位置，可同时插入多个。其中:name为自定义参数（可选）
5. `${2}`表示代码插入后，按Tab键，光标会根据顺序跳转到相应位置（以此类推）

##### 举个例子：

```html
<snippet>
  <content>
  <![CDATA[
  import React from 'react'

  class ${1} extends React.Component{
  render(){
    return (
      <div className='${2}'>
        ${1}
      </div>    
    )
  }
  }
  export default ${1}
  ]]>
  </content>
  <tabTrigger>recl</tabTrigger>
  <description>React</description>
  <scope>source.js</scope>
</snippet>
```

创建完毕以后，保存在`\Packages\User`目录下，文件命名为`react-code`，后缀名`.sublime-snippet`

#### 内置快捷键

快捷键                   | 作用
----------------------- | ----------------------------------
Ctrl+L                  | 选择整行（按住-继续选择下行）
Ctrl+KK                 | 从光标处删除至行尾
Ctrl+K                  | Backspace 从光标处删除至行首
Ctrl+J                  | 合并行（已选择需要合并的多行时）
Ctrl+KU                 | 改为大写
Ctrl+KL                 | 改为小写
Ctrl+D                  | 选择字符串 （按住-继续选择下个相同的字符串）
Ctrl+M                  | 光标移动至括号内开始或结束的位置
Ctrl+/                  | 注释整行（如已选择内容，同“Ctrl+Shift+/”效果）
Ctrl+Shift+c            | 转换为utf8
Ctrl+R                  | 搜索指定文件的函数标签
Ctrl+G                  | 跳转到指定行
Ctrl+KT                 | 折叠属性
Ctrl+K0                 | 展开所有
Ctrl+U                  | 软撤销
Ctrl+T                  | 词互换
Tab                     | 缩进 自动完成
Shift+Tab               | 去除缩进
Ctrl+F2                 | 设置书签.
F2                      | 下一个书签
Shift+F2                | 上一个书签
Alt+F3                  | 选中文本按下快捷键，即可一次性选择全部的相同文本进行同时编辑
Alt+.                   | 闭合当前标签
F6                      | 检测语法错误
F9                      | 行排序(按a-z)
F11                     | 全屏模式
Ctrl+Enter              | 光标后插入行
Ctrl+Shift+Enter        | 光标前插入行
Ctrl+Shift+[            | 折叠代码
Ctrl+Shift+]            | 展开代码
Ctrl+Shift+↑            | 与上行互换
Ctrl+Shift+↓            | 与下行互换
Ctrl+Shift+A            | 选择光标位置父标签对儿
Ctrl+Shift+D            | 复制光标所在整行，插入在该行之前
ctrl+shift+F            | 在文件夹内查找，与普通编辑器不同的地方是sublime允许添加多个文件夹进行查找
Ctrl+Shift+K            | 删除整行
Ctrl+Shift+L            | 鼠标选中多行（按下快捷键），即可同时编辑这些行
Ctrl+Shift+M            | 选择括号内的内容（按住-继续选择父括号）
Ctrl+Shift+P            | 打开命令面板
Ctrl+Shift+/            | 注释已选择内容
Ctrl+PageDown(PageUp)   | 文件按开启的前后顺序切换
Shift+Tab               | 去除缩进
Alt+Shift+1~9（非小键盘） | 屏幕显示相等数字的小窗口
Ctrl+鼠标左键            | 可以同时选择要编辑的多处文本
shift+鼠标右键           | 列选择
Shift+鼠标右键（鼠标中键） | 可以用鼠标进行竖向多行选择

### 参考

 - 官网：[点击进入](http://www.sublimetext.com/)

 - Package Control：[点击进入](https://packagecontrol.io/installation)

 - CSDN：[点击进入](http://blog.csdn.net/Oops_Qu/article/details/72811128?locationNum=4&fps=1)
