# hello react-thunk

`thunk`：模式转换

### Action Creator

Action Creator 不是 thunk 的功能，是 redux 自带功能，但是 thunk 发挥作用，就是在 action creator 里面。所以介绍 thunk 之前先单纯用一下 Action Creator

Action creator 是 Flux 的产物，用来创建 Action，它是一个函数，返回值为 Action对象。所以它的唯一功能就是返回一个 Action 供 dispatch 进行调用

>functions that create actions

创建 Action 函数 (可以复用)

```js
let addTodo = (data='default data') => {
  return {
    type: ADD_TODO,
    data: data
  }
}
//触发action
store.dispatch(addTodo())
```

这样如果有多个行为触发同一个Action，只要调用一下函数 addTodo 就行，并将Action要携带的数据传递给该函数。类似 addTodo 这样的函数，称之为 `Action Creator`

这样的Action Creator 返回的Action 并不是一个标准的Action

改为:

```js
let addTodo = (data='default data') => {
    return {
        type: ADD_TODO,
        payload: {
            data
        }
    }
}
```
**小贴士**：payload 为一个对象

### 引入redux-thunk

有了 redux-thunk ，redux 的工作模式就会发生一定的“转换”[官网](https://github.com/gaearon/redux-thunk)是这样说的

>Redux Thunk middleware allows you to write action creators that return a function instead of an action.

**说明**：Redux-thunk 中间件允许我们的 action creator 不直接返回 action ，而是去返回一个函数

这样做的好处是：(后面会根据这两点使用 thunk)

- 可以直接在 Action Creator 里运行 dispath

- 最重要的是实现 **异步操作**

ok,大概了解了一下后，我们安装来使用一下，感受它的魅力。

### 安装

装包

```
npm i redux-thunk --save
```

在store.js中:

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
```

**小贴士**：applyMiddleware 使用中间件

### 什么是中间件

中间件就是一个函数，对`store.dispatch`方法进行了改造，在发出 `Action` 和执行 `Reducer` 这两步之间，添加了其他功能。

`applyMiddleware`会返回一个函数，该函数接收原来的 `creatStore `作为参数，返回一个应用了 applymiddlewares 的增强后的 creatStore。

```js
const store = createStore(rootReducer, applyMiddleware(thunk))
```

### 使用 dispatch

前面提过的第一个好处:直接在Action Creator里运行dispath。这样子组件`commentBox`就不需要导入 store ，也不用 store.dispatch 了。

在actions/commentActions.js 中，就可以使用下面的语法

```js
export function addComment() {
  return dispatch => {
    dispatch({type: 'ADD_COMMENT'})
  }
}
```

上面的 action creator 中，不仅仅有 action ，而且直接 dispatch 了这个 action

到 `commentBox` 组件中，我们直接导入 addComment 使用，Action Creator 中的 dispatch 语句是不会执行的

解决方法就是进行 connect ，把这个函数跟 redux 的 store 连接起来,这样就会被注入进props里

```js
`commentBox.js` 中
export default connect(mapStateToProps, {addComment})(CommentBox);
```
然后，后面使用 this.props.addComment() 来呼叫执行 Action Creator 。这样 dispatch 就工作了，action 就被发出了。

### 异步操作

Action Creator 中运行 dispatch ，目的主要就是服务异步操作。

注:实现异步操作的主要形式 ?主要形式是回调函数(call back) 更为流行的是promise(axios) .异步操作最大特点:非阻塞(no-blocking)

没有thunk，redux的默认工作机制是:一旦用户触发事件，action立即发出，reducer立即执行，store立即改变。这种机制在很多情况下是不能满足要求的，通常我们要在action中用axios请求数据时需要请求一定的时间，而不是立即发出action。有了 thunk 之后，即使要等很长时间也没有问题，因为 dispatch 操作可以**等待**网络请求结束之后再去执行。

#### 分析一下上面这种情况的流程:

先抛开 thunk ，只要我用 redux ，那么事情的起点就是：浏览器的一个事件。事件触发 dispatch(action) 。

用了 thunk 之后，思路也是相同的。就是在页面加载这个事件中触发 dispatch 操作。

具体来说：在 componentWillMount() 中，去呼叫 Action Creator ，然后，Action Creator 中首先发起网络请求，请求拿到数据之后，去 dispatch 。接下来触发 reducer ，修改 state ... 这些都和 redux 的普通思路相符了。

OK,流程搞清楚后，就很好实现了。

### 总结

首先说明一点:thunk不是必须的，没有它我们也同样可以实现你想完成的事情，如果你是一个小应用大可不必使用，如果大应用还是要使用thunk.因为redux-thunk 帮助你**统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决，对 component 没有影响。**

刚刚接触新的概念肯定会云里雾里，我通常就是结合上代码来反复体验一下流程，这样对理解这个API的机制，熟练的运用它是非常有帮助的。我开始写也总忘记这个代码的格式是怎么写的，先总结一下，以便来回查阅，理解。

代码书写总结:

在`store.js`中：(装包redux-thunk)

```js
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
```

在子组件`commentBox.js`中(在触发的事件中呼叫对应的Action Creator)

```js
import { connect } from 'react-redux'
import {fetchComments,addComment} from './actions/commentAction'
//导入要用到的action
...

//首次挂载组件呼叫fetchComments：

componentWillMount(){

    this.props.fetchComments()
  }

//点击提交按钮时呼叫addComment：

handleSubmit(e) {
  e.preventDefault()
  const content = this.textInput.value
  this.props.addComment(content,this.props.id)　
  //addComment是可以传值给action里的
  this.refs.commentForm.reset()
}

export default connect(mapStateToProps,{fetchComments,addComment})(CommentBox)
//connect后才会使props中有fetchComments和addComment
```

在`action.js`中：(Action Creator被呼叫后就会执行)

```js
const fetchComments = () =>(
    dispatch =>{
        axios.get('http://redux-hello.haoduoshipin.com/comments')
        .then( res => dispatch({type:'COMMENT',comments:res.data.comments}))
    }
)

//组件首次挂载时要渲染:get请求完拿到数据后，再dispatch

 const addComment = (comment,postId) =>(
     dispatch =>{
        const data={
            commentBody:comment,
            postId
        }
        axios.post('http://redux-hello.haoduoshipin.com/comments',data).then(
        dispatch({type:'ADD_COMMENT',comment,postId}))
    }
)

//点击提交按钮后给添加评论:先把添加的数据定义好，再post请求添加数据，请求后再dispatch

export {fetchComments,addComment}   //命名导出
```
### 参考

 - Github地址：[点击进入](https://github.com/gaearon/redux-thunk)

 - React笔记：[点击进入](http://www.8dou5che.com/2017/01/13/react/)

 - happypeter：[点击进入](https://happypeter.github.io/js-tiger/redux/14-hello-world.html)

 - 阮一峰教程：[点击进入](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
