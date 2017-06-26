---
title: GITBOOK
---

## 使用 Gitbook 来做笔记

装包：
```
npm install gitbook-cli -g
```
创建笔记文件夹note并进入
```
mkdir note && cd note
```
初始化gitbook
```
gitbook init
```
这样，会生成2个文件

	 - README.md 封面
	 - SUMMARY.md 目录

启动项目：
```
gitbook serve
```
这样，可以启动一个服务器，然后到 localhost:4000 端口，就可以看到这本书了。

在浏览器打开：
```
localhost:4000
```

调整结构：新建content文件夹将README.md,SUMMARY.md文件放在里面

创建 git 文件夹，然后里面就可以写笔记了。其实 gitbook 本身的使用技巧基本就是这些了。

### 托管gitbook

在github上创建node仓库

然后，把项目变成一个**nodejs**的项目：
```
npm init -y
```
然后，在package.json 中添加这些代码：
```json
"scripts": {
 "start": "gitbook serve ./content ./gh-pages",
 "build": "gitbook build ./content ./gh-pages",
 "deploy": "node ./scripts/deploy-gh-pages.js",
 "publish": "npm run build && npm run deploy",
 "port": "lsof -i :35729"
},
```
运行本地gitbook
```
npm start
```
删除_book文件夹
```
rm -r _book
```
在note文件夹里创建一个.gitignore文件将不上传的文件添加
```
# dependencies
/node_modules

/scripts
/gh-pages
```
github备份（上传）操作
```
git init
git add -A
git commit -a -m 'new'
git remote add origin https://github.com/l552177239/note.git
git push -u origin master
```
### 部署书籍到 gh-pages

这一步，可以手动做：
 - 第一步：运行：npm run build，把md文件转化为html放到gh-pages文件夹
 - 第二步：拷贝gh-pages中的所有文件，到gh-pages分支，然后上传
 - 第三步：以后每次修改完都拷贝到gh-pages分支，很麻烦

所以，我们采用一个 npm 包，来帮助我们完成上面的操作

装包：
```
npm i gh-pages --save
```
然后创建 note/scripts/deploy-gh-pages.js

将下面代码拷贝进去
```js
'use strict';

var ghpages = require('gh-pages');

main();

function main() {
    ghpages.publish('./gh-pages', console.error.bind(console));
}
```
这样，每次书稿有了修改，运行
```
npm run publish
```
就可以把书稿部署到 http://l552177239.github.io/note

### 编辑书籍
可以修改 SUMMARY.md 来添加书籍目录
```markdown
# Summary

* [Introduction](README.md)
* 第一章
  - [第一小节：学习 Github](./git/1-github.md)
  - [第二小节：学习 Gitbook](./git/2-gitbook.md)
  - [第三小节：Github 基本操作](./git/3-github.md)
```