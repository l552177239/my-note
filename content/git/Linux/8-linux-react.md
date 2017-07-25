#在 Linux 上快速配置开发环境

作者本人用 ubuntu/deepin 系统，所以这里的教程都用
ubuntu/deepin 系统

### 先安装 curl

curl是利用URL语法在命令行方式下工作的开源文件传输工具

```
sudo apt-get update
sudo apt-get install curl
```

### 安装 nvm

 nvm 是 node 版本管理工具，管理 nodejs 版本和 npm 版本

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

#### 参考

 > github 地址：[点击进入](https://github.com/creationix/nvm)

 **注意**：安装成功之后，需要重新开启一个新的命令行窗口

### 安装 Nodejs

 Node.js 就是运行在服务端的 JavaScript，基于谷歌 V8 引擎

#### 查看可以选择安装的 node 版本

```
nvm ls-remote
```

#### 安装 Nodejs

```
nvm install v6.11.1
```

- 这里我们安装正式版本`6.11.1`的 nodejs（不会因为版本出一些错误）

#### 查看安装版本（检查是否安装成功）

```
node -v
npm -v
```

安装完 node 之后，npm 会一块跟着装好

**小贴士**：npm 就是随同 nodeJs 一起安装的包管理工具，npm管理对应 nodeJs 的第三方插件


#### 参考

> `Node.js`官网：[点击进入](https://nodejs.org/en/)

> `Node.js`中文网：[点击进入](http://nodejs.cn/)

> npm 官网：[点击进入](https://www.npmjs.com/)

#### 然后就可以用 npm 进行装包了

最基本的，快速创建 React 环境的包

```
npm i create-react-app -g
```
