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

### 安装webpack：

```
npm install webpack --save-dev
```

### 检测是否安装成功：

```
./node_modules/.bin/webpack --help
```

### 安装代码分离包：

```
npm install --save-dev css-loader style-loader
```

### css单独打包：

```
npm install --save-dev extract-text-webpack-plugin
```

### 兼容css包：

```
npm install autoprefixer --save-dev
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

### 创建.babelrc并配置：

```js
//自动加载的配置文件
{
  "presets": ["env","react"]
  //presets（需要启动什么样的预设转码）：react
  //env：可以对BABEL_ENV或者NODE_ENV指定的不同的环境变量，进行不同的编译操作
}
```

### 创建webpack.config.js并配置：

```js
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.[hash:5].js",
    publicPath: 'build/'
  },
  // watch: true,
  // devtool: "source-map",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
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