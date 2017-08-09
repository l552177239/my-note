# Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式，类似 React 中的 Redux

### 装包

```
npm install vuex --save
```

### 注入 store

导入 store

```js
import store from './store'
```

将 store 注入到组件中

```js
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
```

### 创建 store

我们这里根据官网给出的例子，创建 store

数据结构为：

![数据结构](../img/store.png)

其中`index.js` 在 store 中创建 store 并将数据组合的作用，类似 Redux 中的 combineReducers

```js
import Vue from 'vue'
import Vuex from 'vuex'
//引用 vuex
import comment from './modules/comment'
// 导入 comment 数据
Vue.use(Vuex)
// 安装使用 vuex 插件
export default new Vuex.Store({
  // 创建 store 并导出
  modules: {
    comment
  }
})
```

Vuex 通过 Vue.use(Vuex) 提供了一种机制将状态从根组件『注入』到每一个子组件中 store 选项，在组件需要 store 时，用 （`this.$store.state`）调用

```js
const state = {
  all: [
    { text: 'haha' },
    { text: 'gege' }
  ]
}

export default {
  state
}
```

在 modules 文件夹中写入数据并导出

**参考**：https://vuex.vuejs.org/zh-cn/state.html

### 读取数据

Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：

```js
<script>
export default {
  name: 'comment-box',
  computed: {
  // 计算属性 computed 中  
    comments: function () {
    //comments 方法
      return this.$store.state.comment.all
      //返回 store 中的数据
    }
  }
}
</script>
```

通过 Mustache 进行渲染

```html
<template>
  <li v-for="comment in reversedMessage">
    {{ comment.text }}
  </li>
</template>
```
###  对 store 中的数据进行修改

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数

```js
const mutations = {
    [函数名] (state) {
      // 变更状态
      state.count++
    }
  }
})
```

### 提交载荷（Payload）

> Payload 就是接受的数据

你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：

```js
const mutations = {
  [increment] (state, n) {
  //n 为组件传过来的数据
    state.count += n
  }
}
```

#### 使用常量替代 Mutation 事件类型

在 store 文件夹下创建 `mutation-types.js`文件，将 Mutation 事件类型写在里面

```js
export const SOME_MUTATION = 'SOME_MUTATION'
//声明 一个常量作为函数名
```

#### Mutaion 函数

```js
import * as types from '../mutation-types'
//导入 事件类型
const state = {
  all: [
    { text: 'fooo' },
    { text: 'barr' }
  ]
}
//数据 state
const mutations = {
//创建一个 mutations
  [types.ADD_COMMENT] (state, { text }) {
    state.all.push({ text })
  }
}

export default {
  state,
  mutations
}
//导出 state mutations
```

### 在组件中提交 Mutations

你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）

```js
<script>
  import * as types from '../store/mutation-types'
  //导入 mutation 函数类型
  export default {
    name: 'comment-box',
    computed: {
      reversedMessage: function () {
        return this.comments.slice().reverse()
      },
      comments: function () {
        return this.$store.state.comment.all
      }
    },
    methods: {
      addComment: function () {
        const input = document.getElementById('commentForm')
        this.$store.commit(types.ADD_COMMENT, { text: input.value })
        input.value = ''
      }
    }
  }
</script>
```

```html
<template>
  <div class="comment-box">
    <div class="form">
     <input type="text" id="commentForm" />
     <button type="submit" v-on:click="addComment">发布</button>
   </div>
   <ul>
    <li v-for="comment in reversedMessage">
      {{ comment.text }}
    </li>
   </ul>
  </div>
</template>
```

在`<template>`中，利用 声明式渲染直接将`comment.text`渲染在页面上

**参考**：https://vuex.vuejs.org/zh-cn/mutations.html

### 参考

 - Vuex文档：[点击进入](https://vuex.vuejs.org/zh-cn/)

 - Vuex官网例子：[点击进入](https://github.com/vuejs/vuex/tree/dev/examples)
