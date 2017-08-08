# Data

### data

> 每个 Vue 实例都会代理其 data 对象里所有的属性，相当于 React 中的 State

```js
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
// ... 反之亦然
data.a = 3
vm.a // -> 3
```

注意只有这些被代理的属性是响应的，也就是说值的任何改变都是触发视图的重新渲染。如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。我们将在后面详细讨论响应系统。

除了 data 属性，Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 `$`，以便与代理的 data 属性区分。例如：

```js
var data = { a: 1 }Properties and Methods
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})
```

**注意**：不要在实例属性或者回调函数中使用箭头函数，因为箭头函数绑定父级上下文，所以 this 不会像预想的一样指向 Vue 实例

```js
vm.$watch('a', newVal => this.myMethod())
// this.myMethod 会是一个 undefined
```

#### 选项/数据

- 类型： Object | Function

- 限制: 组件的定义只接受 function。

- 详细:

 - Vue的实例的数据对象 data 我们已经用了很多了，数据绑定离不开 data 里面的数据,也是Vue的核心属性

 - 它是Vue绑定数据到HTML标签的数据源泉，另外Vue框架会自动监视data里面的数据变化，自动更新数据到HTML标签上去

**注意**：因为箭头函数绑定了父级作用域的上下文，所以 this 指向不会指向 vue 实例

```js
data: () => { return { a: this.myProp }}
// this.myProp 将会是 undefined
```

#### 使用

data 数据写在 vue 实例里面，类型是一个 Function

```js
<script>
  export default {
    name: 'comment-box',
    data: () => ({
      comments: [
        { text: 'hello git' },
        { text: 'hello vuejs' }
      ]
    })
  }
</script>
```

### 声明式渲染

> Vue.js 的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进 DOM

数据绑定最常见的形式就是使用 “Mustache” 语法（双大括号）的文本插值：

```html
<template>
  <div class="comment-box">
      {{ comment.text }}
  </div>
</template>
```

Mustache 标签将会被替代为对应数据对象上 comment.text 属性的值。无论何时，绑定的数据对象上 comment.text 属性发生了改变，插值处的内容都会更新
