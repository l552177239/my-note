# 博客项目

### 环境配置

参考第二节：VUE 安装

```
vue init webpack vuex-demo
cd vuex-demo
npm install
npm run dev
```

### 结构调整

删除没用的代码

### 添加路由

利用 vue-router 添加路由 /post 及 post 下的 CommentBox 以及 PostBody

### 使用组件内部数据

在 CommentBox 组件中添加 data 数据 ，利用 {{ comment.text }} 拿到数据

```js
<template>
  <div class="comment-box">
    <ul>
      <li v-for="comment in comments">
        {{ comment.text }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'comment-box',
    data: () => ({
      comments: [
        {
          text: 'hello git'
        },
        {
          text: 'hello vuejs'
        }
      ]
    })
  }
</script>

<style scoped>
  .comment-box {
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .5);
    width: 80%;
    margin: 30px auto;
    padding: 20px;
    line-height: 1.8;
   }
</style>

```
