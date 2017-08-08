# Constructor

### 构造器

利用 Vue 构造函数 ，可以创建一个 VUE ‘应用’

```
var vm = new Vue({
  // 选项
})
```

在实例化 Vue 时，需要传入一个选项对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项

#### 选项/DOM

在用 vue-cli 创建的 vue 项目中有下面选项

```js
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

```

##### el

> 类似于React里的render

 - 类型： string | HTMLElement（CSS 选择器 | HTMLElement 实例）

 - 限制： 只在由 new 创建的实例中遵守

 - 详细： 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标

##### template

 - 类型： string

 - 详细：添加使用的模板，模板将会 替换 挂载的元素，挂载元素的内容都将被忽略，除非模板的内容有分发 slot

##### router

如果使用 vue-router 时，需要添加路由

##### components

- 类型： Object

- 详细： 包含 Vue 实例可用组件的哈希表

### 组件构造器

可以扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器：

```
var MyComponent = Vue.extend({
  // 扩展选项
})

// 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```

尽管可以命令式地创建扩展实例，不过在多数情况下建议将组件构造器注册为一个自定义元素，然后声明式地用在模板中。我们将在后面详细说明组件系统。现在你只需知道所有的 Vue.js 组件其实都是被扩展的 Vue 实例。

参考：https://cn.vuejs.org/v2/guide/components.html
