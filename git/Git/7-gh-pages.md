# 在Github部署静态网页

如果你的项目只是一个静态网站，就没有必要再去整什么服务器，github pages 提供了搭建静态网站的功能；

### Github-Pages

github Pages可以被认为是用户编写的、托管在github上的静态网页。
也就是项目的gh-pages分支。

### Git 本地工作流

#### 首先给主分支做版本

```
git commit -a -m 'branch'
```

**注意**：在进行分支操作前，首先做下版本，否则会出错

#### 查看当前分支

```
git branch -a
```

#### 创建`gh-pages`分支

```
git branch gh-pages
```

#### 切换到`gh-pages`分支

```
git checkout gh-pages
```

### 上传到Github

#### 首先将需要部署到`gh-pages`分支的网页放在主项目文件夹里

因为只能部署静态网页，所以如果用框架需要打包成静态网页

#### 修改配置文件`.gitignore`

```
vi .gitignore
```

#### 添加需要上传到`gh-pages`分支上的文件

```
git add .
```

#### 然后做版本，最后上传到分支

```
git commit -m '首次上传'
git push -u origin gh-pages
```

### 快捷的部署到 gh-pages

这一步，可以手动做：
 - 第一步：运行：`npm run build`，把md文件转化为html放到gh-pages文件夹
 - 第二步：拷贝gh-pages中的所有文件，到gh-pages分支，然后上传
 - 第三步：以后每次修改完都拷贝到gh-pages分支，很麻烦

所以，我们采用一个 npm 包，来帮助我们完成上面的操作

#### 装包：

```
npm i gh-pages -D
```

#### 然后创建配置文件`cnode/scripts/deploy-gh-pages.js`

将下面代码拷贝进去
```js
'use strict';

var ghpages = require('gh-pages');

main();

function main() {
        ghpages.publish('./dist', console.error.bind(console));
        //打包文件
}
```

#### 调整`package.json`的`scripts`命令

```
"scripts": {
 "start": "./node_modules/.bin/webpack-dev-server --config webpack.dev.config.js",
 //启动本地服务器
 "build": "./node_modules/.bin/webpack --config webpack.prod.config.js",
 //打包成静态网页
 "deploy": "node ./scripts/deploy-gh-pages.js",
 //上传到gh-pages分支
 "publish": "npm run build && npm run deploy",
 //优化操作
 "port": "lsof -i :35729"
 //端口占用提示
},
```

#### 本地启动查看网页

这样，每次有了修改，运行

```
npm run publish
```

#### 网页会部署到

``` 
http://l552177239.github.io/[仓库名]
```
