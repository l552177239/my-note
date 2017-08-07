# VUE 安装

### 直接 `<script>` 引入

直接下载并用 `<script>` 标签引入，Vue 会被注册为一个全局变量。

**官网提示**：在开发时请用开发版本，遇到常见错误它会给出友好的警告。

#### 下载

使用独立版本安装

  - 开发版本：[点击下载](https://vuejs.org/js/vue.js)

  - 生产版本：[点击下载](https://vuejs.org/js/vue.min.js)

#### 引入

将下载的 vue 项目，下载放入项目内，在页面中用`<script>`标签引入

```
<script src="./vue.js"></script>
```

### CDN

推荐：https://unpkg.com/vue, 会保持和 npm 发布的最新的版本一致。
可以在 https://unpkg.com/vue/ 浏览 npm 包资源。

也可以从 jsDelivr，BootCDN 或 cdnjs 获取，不过这两个服务版本更新可能略滞后。

#### 使用

使用时直接引用网上的 CDN 资源

```
<script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
```

### NPM

在用 Vue.js 构建大型应用时推荐使用 NPM 安装， NPM 能很好地和诸如 Webpack 或 Browserify 模块打包器配合使用。
Vue.js 也提供配套工具来开发单文件组件。

#### 装包

安装最新稳定版的 vue

```
npm install vue
```

### 使用 vue-cli

vue-cli 其中 cli ，cli 的意思是命令行。vue-cli 的作用就是搭建开发基础环境的。相当于 react 的，create-react-app 。

参考： https://github.com/vuejs/vue-cli

> Simple CLI for scaffolding Vue.js projects

简单的命令行，用来生成 Vuejs 项目脚手架

#### 装包

全局安装 vue-cli

```
npm install --global vue-cli
```


##### 创建一个基于 webpack 模板的新项目

Vue-cli 对比于 create-react-app ，有一个优势，就是可以生成多种脚手架（通过替换模板 template 来实现）

```
vue init <template-name> <project-name>
```

我们选择最专业的模板，也就是 webpack 模板

```
vue init webpack vuex-demo
```

创建项目时会出现一些配置选项，下面是一些配置说明

```
liuenqing@liuenqing-PC:~/Documents$ vue init webpack vuex-demo

? Project name vuex-demo   //项目名默认就是x-caht
? Project description A Vue.js project // 文档描述，会在README.md文件上生成输入的内容，默认 A Vue.js project
? Author l552177239 <552177239@qq.com> // 作者，如果有git，就是读取git的User信息
? Vue build standalone // 有两个选项，第一个选项写着recommended for most users果断选了（至于干什么用到并不知道）
? Use ESLint to lint your code? Yes// 是否使用ESlint 默认是
? Pick an ESLint preset Standard // 选这个一个ESlint类型
? Setup unit tests with Karma + Mocha? Yes //使用单元测试工具karma和mocha 默认是
? Setup e2e tests with Nightwatch? Yes // 使用e2e测试框架 NightWatch 默认是
```

**小贴士**：选项中，比较重要的就是选择使用 ESlint

1. Standard ： JS ”标准“ 代码风格：[点击查看](https://standardjs.com/)

2. Airbnb : Airbnb 公司的代码风格：[点击查看](https://github.com/airbnb/javascript)

两种标准的风格很多地方都不同，比如写不写分号，选择 Standard 不用写分号

##### 安装依赖

进入项目文件夹下，安装依赖包

```
cd my-project && npm install
```

##### 打开项目

```
npm run dev
```

### 参考

  - BootCDN的VUE：[点击进入](http://www.bootcdn.cn/vue/)

  - VUE项目排行：[点击进入](https://github.com/vuejs)

  - vue-cli 的 Github：[点击进入](https://github.com/vuejs/vue-cli)
