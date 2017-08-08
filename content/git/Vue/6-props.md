# Props

> 用 Props 进行组件间数据传递（类似于 React 中的 Props）

### 父组件向子组件传递数据

每个组件都有作用域的限制，所以不能在子组件内直接用父组件的数据

>要让子组件使用父组件的数据，我们需要通过子组件的props选项

#### 静态 Props

> 子组件要显式地用 props 选项声明它期待获得的数据：

在父组件中，将数据传入

```js
<child message="hello"></child>
```

在子组件中，通过声明 props 接受传入的数据

```js
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像“this.message”这样使用
  template: '<span>{{ message }}</span>'
})
```

**注意**：在声明 props 和插入节点的时候用驼峰命名，在HTML内用`-`连接

**小贴士**：

 - props 可以是数组或对象，用于接收来自父组件的数据
 - props 可以是简单的数组
 - props 可以使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值

#### 动态 Props

在 **父组件** 中，将数据通过 `v-bind:msg` 传入子组件

```js
<template>
  <div id="post">
      <post-body :msg="msg"></post-body>
      //v-bind:msg 简写形式，将 msg数据传入
  </div>
</template>

<script>
  import PostBody from './PostBody'
  export default {
    name: 'post',
    data: () => ({
      msg: '哈哈'
    }),
    components: { PostBody }
  }
</script>
```
在 props 中添加了元素之后，就不需要在 data 中再添加变量了

在 **子组件** 中，怎样拿到 传入的数据？

首先声明 Props，将得到的数据赋给 Props ，就可以直接渲染了

```js
<template>
  <div class="post-body">
    {{ msg }}
    //渲染到页面上
  </div>
</template>

<script>
  export default {
    name: 'post-body',
    props: ['msg']
    // 声明 props
  }
</script>
```

#### 子组件向父组件传递数据

> 子组件主要通过事件传递数据给父组件

##### 子组件

首先声明一个了方法 setnum，使用`$emit`来遍历父组件传过来的 addnum 事件，并返回字符串`数量：`

```
<script>
export default {
  name: 'post-body',
  methods: {
    setnum: function () {
      this.$emit('addnum', '数量：')
    }
  }
}
</script>
```

当<input>被点击时，触发`v-on:click`事件，调用绑定的 setnum 方法

```js
<template>
  <div class="post-body">
    <input type='button' value='+1' @click='setnum'/>
  </div>
</template>
```

当<input>的被点击时，将数据传递给父组件

##### 父组件

在父组件中，用 addnum 事件调用 getnum 方法，获取到从子组件传递过来的参数 string

```js
<template>
  <div id="post">
    <p>{{ str }}{{ num }}</p>
    <post-body @addnum='getnum'></post-body>
  </div>
</template>
```

getnum 方法中的参数 str 就是从子组件传递过来的参数 string

```js
<script>
  import PostBody from './PostBody'
  export default {
    name: 'post',
    data: () => ({
      num: 0,
      str:
    }),
    methods: {
      getnum: function (str) {
        this.str = str
        this.num ++
      }
    },
    components: { PostBody }
  }
</script>
```

这样点击子组件的`+1`按钮，父组件显示的值就会改变，并且完成一个 +1 的操作

#### 子组件向子组件传递数据

Vue 没有直接子对子传参的方法，建议将需要传递数据的子组件，都合并为一个组件。如果一定需要子对子传参，可以先从传到父组件，再传到子组件。

为了便于开发，Vue 推出了一个状态管理工具 Vuex，可以很方便实现组件之间的参数传递，我们将在下面的章节说到
