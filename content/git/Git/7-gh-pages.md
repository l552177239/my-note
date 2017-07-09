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

#### 网页会部署到

``` 
http://l552177239.github.io/[仓库名]
```
