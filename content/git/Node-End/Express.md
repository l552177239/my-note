# Express

> Express 基于 Node.js 平台，快速、开放、极简的 web开发框架（后端）

官网首页上，我们一眼就能看到 API 这个关键字，那么 API 是用来做什么的呢？

### 什么是API

API （ Application Program Interface ）是应用开发接口，简称接口，
而 Express 就是用来制作后台 API 的。

### Express使用的语法

前端代码，因为有 Babel 的支持，可以全部采用 ES6来写。
后台代码，我们会让它直接运行在 Nodejs上 (eg. java运行在jvm上)

我们在 [Node.green](http://node.green/) 网站上，可以看到新版的 Nodejs (7.0 版本以上)对于 ES6 的支持已经到了99% 。所以，不用 Babel 我们也可以直接使用 ES6 语法，但是唯一要注意的就是不能用 import （ 也就是说 nodejs 是不支持 ES6 模块语法的），我们的后台代码暂时需要用 require 来替代 import 。require 用的是 commonjs 模块语法，这个是 Nodejs 原生支持的。

**总结**: 可以用 ES6，别用 import 就好了

**小贴士**：Node.green 是一个查看 Node 对 ES6 支持度的网站，网址为 http://node.green/

### 使用

现在我们用 express 实现 hello World 来进行对 Express 的学习

#### 初始化项目

首先我们新建文件夹，并进入

```
mkdir express-hello && cd express-hello
```

然后把这个文件夹初始化为一个 nodejs 项目

```
npm init -y
```

这样文件夹内就会生成一个 package.json 文件，有了这个文件，我们这个文件夹就是一个 Nodejs 项目了

#### 装包

```
npm install express --save
```

**小贴士**：如果包名和项目名相同会报错，解决方法就是修改 package.json 文件里的`name`与包名不同就可以了

#### 创建一个 Express 应用

在项目文件夹下，创建 index.js文件，将下面代码放入

```js
const express = require('express')
//导入 express
const app = express()
//创建一个名为 app 的应用

app.listen(5000,() => console.log('running on port 5000...'))
//在 5000 端口 监听 app 并在控制台输出 running on port 5000...
```

这样我们就自己动手实现了一个`服务器( server )` 。服务器（这里指的是软件）的作用是，始终监听客户端的请求，或者说前端不给服务器发信号，服务器 就什么都不做，但是也不死，只是去执行，或者就叫始终在监听（listen）。

上面的 5000 指的是 `5000端口 port` ，一个服务器好比一座大厦，有很多个门，5000 是其中一个门的门牌号。

这里使用了回调函数，方便我们看出输出。一般回调函数的使用场合就是，之前的一个操作耗时比较长（或者是一直监听事件，例如 onClick()）这样的情况下才使用回调函数。


#### 后台运行

我们写的是一个 nodejs 程序，这个执行过程跟浏览器已经没有关系了，所以必须用 node 命令去执行

##### 启动程序

```
node index.js
```

##### 判断是否运行成功

```
$ node index.js
running on port 5000...
```

如果运行后输出上面内容，现在我们的服务器已经运行起来了，它就一直监听端口，根据端口的请求来执行操作。这个请求是由客户端完成的。

**注意**：常见错误

如果出现下面错误，说明：本地已经有一个服务运行在5000端口了,地址冲突，

```
Error：listen EADDRINUSE :::5000
//EADDRINUSE:'地址已经被占用'
```

解决方法：可以修改端口或者停掉之前的服务

#### 客户端请求

现在我们需要的客户端请求是，一个

```
GET /
```

同时这个请求，必须来自5000端口。

可以发请求的方式不唯一，可以用浏览器地址栏，可以用页面的 form 发，也可以用 axios 发，后者使用专门的 API 调试工具 curl/postman来发。

现在，我们就用浏览器的地址栏来发请求。地址栏中输入

```
http://localhost:5000/
```

#### 添加 GET 接口

我们在上面的 index.js 中，app.listen 语句的上面，添加如下代码：

```js
app.get('/', () => {
  console.log('request come in...')
})
```

- get 是一个 http 请求的动词 ，类似的还有 post/delete/put

- / 是一个路径 ，英文 path

一个动词加一个路径，这样就组成一个 HTTP 请求 ，公式如下

```js
request = verb + path + data
```

这里的请求，是服务器端接收请求

请求之后，会发现浏览器里没有任何输出，这是因为，我们的 express 服务器根本就没有给前台返回任何字符串，回调函数中的 `console.log()` 只能把字符串打印到后台。

#### 反馈给前端

前面的回调函数中，console.log 打印字符串，只是出现在后端（服务器端）。前端得不到任何反馈。所以，我们可以把代码做如下修改

```js
app.get('/', function(req, res){
  res.send('Hello World');
})
```

 - `req` 是 request **请求** 的简写，` res`是 response **响应** 的简写

 - `res.send('Hello World')`的作用是从后端向前端浏览器返回字符串 `Hello World`

#### 启动项目

```
node index.js
```

启动后如果输出`running on port 5000...`，我们就可以在浏览器上发送请求了

```
http://localhost:5000/
```

在浏览器打开上面地址，如果显示`Hello World`，说明请求发送成功

### nodemon高效开发

每次修改代码我们都要重启一次`node index.js`，我们可以利用`nodemon`。对 node 应用目录中的各个文件进行监测，若文件改动，nodemon 会自动重启你的 node 应用，也可以提高我们的写代码效率。

#### 装包

首先我们利用 npm 进行装包

```
npm i nodemon -g
```

#### 启动项目

用 nodemon 启动项目

```
nodemon idnex.js
```

### 附: hello World 全部代码

#### 直接查看

 - [点击查看代码](https://github.com/l552177239/express-hello/blob/master/index.js)

#### 在本地运行代码

首先克隆项目到本地

```
git clone https://github.com/l552177239/express-hello.git
```

将上面两个文件都放在一个 express-hello 文件夹中，然后执行下面代码

```
cd express-hello
npm install
node index.js
```

代码就运行起来了

### 参考

 - Express官网：[点击进入](http://www.expressjs.com.cn/)

 - 阮一峰教程： [点击进入](http://javascript.ruanyifeng.com/nodejs/express.html)
