## Webpack环境配置  

### 创建并进入一个文件夹wepback:

```
mkdir webpack && cd webpack
```

### 初始化项目：

npm init这会提示你关于项目的更多细节，并创建一个 package.json 文件。

使用 -y 标记表示你能接受 package.json 文件的一堆：

```
npm init -y
```

**注意**：项目名不要和包名相同，否则可能会出错误。

### 修改Webpack -> package.json项目名

因为项目名与包名相同，所以修改项目名
```
"name": "webpack-demo",
```

### 安装serve：

一个开发服务器，方便我们进行测试

```
npm i serve -g
```

创建一个`index.html`，将下面代码放入

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
  <script src='dist/bundle.js'></script>
</body>
</html>
```

需要启动服务器时，`serve`会自动寻找`index.html`，如果文件名为其他需输入文件名

```
serve [文件名]
```

### 安装webpack：

```
npm install webpack --save-dev
```

### 检测是否安装成功：

```
./node_modules/.bin/webpack --help
```

### 创建webpack.config.js

webpack的配置文件

```
const path = require('path');
//path是nodejs核心文件，用来解析路径
//require会把入口文件相关的所有文件都打包
module.exports = {
   entry: './src/index.js',
   //入口文件（打包相关文件）
   output: {
    //出口文件（打包到哪里）
    path: path.resolve(__dirname, "build"),
     //path：放在哪个文件夹
     //path.resolve：进行拼接
     //__dirname：命令行位置
    filename: "bundle.js",
    //文件名
  }
}
```

### 安装 babel 核心包，在webpack中装载的包

#### 装包

```
npm install babel-loader babel-core --save-dev
```

#### 在webpack.config.js配置文件中添加ES6语法转换规则

添加在`module`（模块）的`rules`规则内

```
module: {
  //模块
  rules: [
  //规则
    { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }
    //test测试
    //正则匹配js结尾的文件
    //use使用babel-loader将es6处理成为es5语法
  ]
}
```

### 安装ES6 语法编译为 ES5 的包

#### 装包

```
npm install babel-preset-env --save-dev
```

#### 安装语法加强包

```
npm install --save-dev babel-preset-stage-0
```

#### 创建.babelrc并配置：

```js
//自动加载的配置文件
{
  "presets": ["env","stage-0"]
  //presets：需要启动什么样的预设转码
  //env：可以对BABEL_ENV或者NODE_ENV指定的不同的环境变量，进行不同的编译操作
  //stage-0：将ES7，ES6转换为ES5
}
```

#### 检查是否安装正确

修改src -> index.js
```
let obj = {
  name:'Liu',
  age:24
}
let {age} = obj

alert(age)
```

运行
```
npm run build
```

在webpack下运行
```
serve .
```

打开本地服务器
```
localhost:50000
```

弹出对话框`24`说明安装成功

### 安装react包

```
npm i react-dom --save
npm i react --save
```

### 安装编译JSX语法包

```
npm i babel-preset-react -D
```

#### 配置.babelrc

```
{
  "presets": ["env","stage-0","react"]
  //presets：需要启动什么样的预设转码
  //env：可以对BABEL_ENV或者NODE_ENV指定的不同的环境变量，进行不同的编译操作
  //stage-0：将ES7，ES6转换为ES5
  //react：编译JSX语法
}
```

#### 检查是否能启动React项目

修改src -> index.js
```
import React from 'react'
import ReactDOM from 'react-dom'

let obj = {
  name:'Liu',
  age:24
}
let {age} = obj

alert(age)

ReactDOM.render(<h1>{age}</h1>,document.getElementById('root'))
```

运行
```
npm run build
```

在webpack下运行
```
serve .
```

打开本地服务器
```
localhost:50000
```

弹出对话框`24`说明安装成功

###安装CSS包

```
npm install --save-dev css-loader style-loader
```

#### 在webpack.config.js配置文件中添加CSS语法转换测试（test）

```
{
  test: /\.css$/,
  //test测试
  use: ["style-loader","css-loader"]
    //use使用style-loader和css-loader编译css
    //先使用后面的css-loader再使用前面的style-loader进行编译
  })
}
```

#### 检查是否能启动React项目

修改src -> index.js
```
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

ReactDOM.render(<h1>我是H1</h1>,document.getElementById('root'))
```

创建`index.css`文件将下面代码放入

```
*{
  margin: 0;
  padding: 0;
  background: teal;
}
```

运行
```
npm run build
```

在webpack下运行
```
serve .
```

打开本地服务器
```
localhost:50000
```

弹出对话框`24`说明安装成功

### 安装CSS处理插件

#### 装包

```
npm i postcss-loader -D
```

#### 在webpack.config.js配置文件中添加postcss测试（rest）

```
{
  test: /\.css$/,
  use: ["style-loader","css-loader","postcss-loader"]
  //添加上postcss
}
```

#### CSS兼容

装包
```
npm i -D autoprefixer cssnano
//autoprefixer：兼容css包
//cssnano：压缩css包
```

创建`postcss`的配置文件`postcss.config.js`

```
module.exports = {
  plugins: [
    require("autoprefixer"),
    //兼容css，less编译成css自动加前缀
    require("cssnano")
    //压缩css
  ]
}
```

### 后缀补齐功能

放在`webpack.config.js`的Module（模块）内

```
resolve:{
  extensions:[".js",".json",".jsx",".css"]
},
```

### 自动调试功能

错误直接指向自己写的代码

放在`webpack.config.js`的Module（模块）内

```
devtool:"source-map",
```

### 导入文件

#### 装包

```
npm install --save-dev file-loader
```

#### 配置webpack.config.js文件

放在`webpack.config.js`的Module（模块）规则（rules）内

```
{ test: /\.(jpe?g|png)$/, use: 'file-loader' },
//对导入图片后缀的配置
```

在`output`（出口文件）加一个公共的路径

```
publicPath:"dist/"
```

#### 检测一下

在`index.js`中导入一张图片

```
npm run build
```

### css单独打包：

```
npm install --save-dev extract-text-webpack-plugin
```

### 监视文件更改包：

```
webpack --progress --watch
```

### 实时重载：

```
npm install --save-dev webpack-dev-server
```

### 安装打包工具：

```
npm install --save lodash
```

### 创建webpack.config.js

webpack的配置文件

```js

const path = require('path');
//path是nodejs核心文件，用来解析路径
//require会把入口文件相关的所有文件都打包
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  
  entry: './src/index.js',
  //入口文件（打包相关文件）
  output: {
    //出口文件（打包到哪里）
    path: path.resolve(__dirname, "build"),
     //path：放在哪个文件夹
     //path.resolve：进行拼接
     //__dirname：命令行位置
    filename: "bundle.[hash:5].js",
    //文件名
    publicPath: 'build/'
  },
  // watch: true,
  // devtool: "source-map",
  module: {
    //模块
    rules: [
    //规则
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      //test测试
      //正则匹配js结尾的文件
      //use使用babel-loader处理成为es5
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "postcss-loader"
        })
      },
      { test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["postcss-loader", 'less-loader']
        })
      },
      { test: /\.(jpe?g|png)$/, use: 'file-loader' },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':  '"production"'
    }),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      template: 'templete/index.html',
      filename: path.resolve(__dirname,'index.html'),
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
```

### 创建.babelrc并配置：

```js
//自动加载的配置文件
{
  "presets": ["env","react"]
  //presets（需要启动什么样的预设转码）：react
  //env：可以对BABEL_ENV或者NODE_ENV指定的不同的环境变量，进行不同的编译操作
}
```

### 创建webpack.dev.config.js并配置

```js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, "build"),
    filename: "bundle.[hash:5].js",
    publicPath: '/'
  },
  devServer: {
    // contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    hot: true
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ['style-loader', 'postcss-loader'] },
      { test: /\.less$/, use: ['style-loader', 'postcss-loader', 'less-loader'] },
      { test: /\.(jpe?g|png)$/, use: 'file-loader' },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'templete/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000'
    })
  ]
}
```

### 创建postcss.config.js并配置

```js
module.exports = {
//模块出口：
  plugins: [
  //插件：兼容css，less编译成css
    require('autoprefixer'),
    require('cssnano')
  ]
}
```

### 参考

 - Webpack官网：[点击进入](https://doc.webpack-china.org/)