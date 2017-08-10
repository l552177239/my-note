# 制作带延迟的 API 数据

### 调整数据结构

一般在项目下 src 文件夹下，创建 api 文件夹，创建需要的文件来存放数据

结构如下：

![数据结构](../img/fileApi.png)

### 写入数据

将需要的数据，写入

```js
const _comments = [
  { text: '哈哈' },
  { text: '嘿嘿' },
  { text: '呵呵' }
]
```

数据部分就按照自己的要求写入

```js
export default {
  getComments (cd) {
    setTimeout(() => cd(_comments), 2000)
  }
}
```

导出一个对象，对象里有一个 getComments 方法，两秒后将数据导入 getComments 函数

### 读取数据

读取数据时，需要先导入

```js
import comment from '../api/comment'
```

直接调用 getComments 方法就可读取数据

```js
// created 生命周期函数
created () {
  //调用 api 的 getComments 方法
  comment.getComments(posts =>
    //通过 形参 posts 拿到数据
    console.log('created', posts)
  )
}
```

### 使用

在项目中我们一般将数据，通过异步的 action 将数据请求到本地中，在通过 mutation 将数据放入 state 中。
如果在组件中使用，需要发送一个 dispatch 进行触发 action 请求到数据

在 store 中，将数据从 api 请求到 state

```js
import comment from '../../api/comment'
import * as types from '../mutation-types'

let state = {
  all: [

  ]
}

const mutations = {
  [types.ADD_COMMENT] (state, { text }) {
    state.all.push({ text })
  },
  //将 数据 comments 赋给 state
  [types.LOAD_COMMENTS] (state, { comments }) {
    state.all = comments
  }
}

// 异步 action
const actions = {
  //getAllPosts 方法
  getAllPosts ({ commit }) {
    // 通过 commit 参数触发 mutations
    comment.getComments(comments => {
      // comment.getComments 进行数据请求
      // comments 导出数据
      commit(types.LOAD_COMMENTS, { comments })
      //触发 mutations 导入 comments 数据
    })
  }
}

export default {
  state,
  actions,
  mutations
}
```

在组件中，通过 dispatch 触发 action

```js
created () {
  this.$store.dispatch('getAllPosts')
  console.log('created',this.$store.state.comment.all)
    }
```

### 参考

 - Github：[点击进入](https://github.com/l552177239/vuex-demo/tree/master/src)

 - Vue文档：[点击进入](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期)

 - Vuex：[点击进入](https://vuex.vuejs.org/zh-cn/intro.html)
