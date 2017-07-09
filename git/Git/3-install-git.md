## Git安装

### Linux

#### 在 Liunx 上安装 Git

首先，你可以试着输入`git`，看看系统有没有安装Git：

```
git
```

使用终端安装`git`

```
sudo apt-get update
sudo apt-get install git
```

**小贴士**：apt-get 是 ubuntu 系统（ deepin 其实就是 ubuntu 的一个变种）的安装软件的命令。装软件的过程其实非常复杂，涉及到软件包依赖关系管理，这个领域的深入知识，应该是系统管理员（ sys admin ）去掌握，我们开发者没必要学那么深。

验证有没有装好，就敲

```
git --version
```

如果可以正确输出版本号，证明 Git 已经装好了。

### Windows

在Windows安装 Git 直接进入Git官网下载，打开`git bash`使用

Git下载地址：[点击进入](https://git-for-windows.github.io/)

### 在Mac上安装Git

直接从AppStore安装Xcode，Xcode集成了Git，不过默认没有安装，你需要运行Xcode，选择菜单“Xcode” -> “Preferences”，在弹出窗口中找到“Downloads”，选择`Command Line Tools`，点`Install`b就可以完成安装了。




