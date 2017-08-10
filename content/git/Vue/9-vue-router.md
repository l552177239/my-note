# Vue-Router

vue-router 是指定的路由库，它通过管理 URL，实现组件间切换，和状态 (state) 的变化。类似 React 中的 react-router

### 装包

```
npm install vue-router --save
```

### 注入 router

导入 router

```js
import router from './router'
```

将 router 注入到组件中

```js
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```

### 创建 Router

如果用 vue-cli 创建项目时添加了路由，会自动创建

**数据结构** 为：`src 文件夹` -> `router 文件夹` -> `index.js`

```js
import Vue from 'vue'
import Router from 'vue-router'
// 引用 vuex插件
import Home from '@/components/Home'
// 导入 Home 组件

Vue.use(Router)
// 安装使用 Router 插件

export default new Router({
// 构建一个新的 Router
  mode: 'history',
  //路由模式为 history
  routes: [
    //添加路由组件
    {
      path: '/',
      //跳转路径
      name: 'Home',
      //名称
      component: Home
      //跳转到组件
    }
  ]
})
```

### 使用

#### `<router-view>`

主要是构建 SPA (单页应用) 时，方便渲染你指定路由对应的组件。你可以 router-view 当做是一个容器，它渲染你使用 vue-router 指定的组件

在模板组件中用`<router-view>`进行包裹

```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```

#### `<router-link>`

`<router-link>`用于取代`<a>`元素，生成一个链接，允许用户点击后跳转到另一个路由。它基本上就是`<a>`元素的 Vue 版本，可以接收状态值，to 表示跳转链接

```html
<template>
  <div class="Home">
     <router-link to="/post">Post</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
```

### 动态路由匹配

在 Router配置文件`index.js`中，写路由路径`path`时使用『动态路径参数』

```js
routes: [
   // 动态路径参数 以冒号开头
   {
     path: '/user/:id',
     name: 'user',
     component: User
   }
 ]
```

一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。
于是，我们可以更新 User 的模板，输出当前用户的 ID：

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```
### 重定向

重定向也是通过 routes 配置来完成，下面例子是从 `/a` 重定向到 `/b`：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```
甚至是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

### 别名

『重定向』的意思是，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`，那么『别名』又是什么呢？

`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。

上面对应的路由配置为：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构

### 参考

  - 官方文档：[点击进入](https://router.vuejs.org/zh-cn/)

  - CSDN博客：[点击进入](http://blog.csdn.net/sinat_17775997/article/category/6457444)

  - CSDN博客：[点击进入]http://blog.csdn.net/column/details/16510.html)
