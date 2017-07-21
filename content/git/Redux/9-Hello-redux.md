# Redux在React中快速应用

## 第一步 装包

在项目文件夹下，用`npm`安装 redux和react-redux插件

```npm
npm i redux react-redux -S
```

## 第二步 Redux的使用

### Reducer

**第一步** 创建 reducers 文件夹

> 在数据比较复杂的情况下将 Reducer 拆分为独立的函数或文件

因为我们需要两个数据所以这里我们 将Reducer拆分。

首先在项目文件夹的`src`中创建`reducers`文件夹

```
[项目文件夹] -> src -> reducers
```
**第二步** 在`reducers`写入 comment 的`State`和`Action`

在 reducer 文件夹内创建 comment.js文件

```
reducers -> comment.js
```

在comment.js内写入 state 数据

```js
let  comments = [
    {
      content: '多好的一呀',
      postId: '1'
    },
    {
      content: '真是不错',
      postId: '1'
    },
    {
      content: '多好的二呀',
      postId: '2'
    }
  ]
```

再写入 Reducer 函数

```js
export default function commentReducer(state = comments, action) {
  //将state指向comment
  switch (action.type) {
    case 'ADD_COMMENT':
    //action函数的type
      return [...state ,{ postId: action.postId, content: action.comment }]
      //返回一个新的 state 数组
    default:
      return state;
      //如果出错返回 旧的 state
  }
}
```

**第三步** 创建 post 的 Reducer 函数

创建 `post.js` 文件，写入 Reducer 函数

```js
let posts = [
  {
    postId: '1',
    likes: 1,
    title: 'Git 技巧'
  },
  {
    postId: '2',
    likes: 2,
    title: '学习 Redux'
  }
]

export default function postReducer(state = posts, action) {
  switch (action.type) {
    case 'INCREMENT_LIKE':
      let stateCopy = state.slice()
      //拷贝 state 数据
      stateCopy.map(item => {
        if(item.postId === action.postId){
          item.likes++
          return item
        }
        return item
      })
      //实现liskes的 ++
      return stateCopy
      //返回新的 state
    default:
      return state
  }
}
```

**第四步** 将独立的 Reducer 合成

在 Reducers 文件夹下 创建 index.js 文件

```
reducers -> index.js
```

利用 combineReducers 函数将单个的 Reducer 合成到  rootReducer 里

```js
import { combineReducers } from 'redux'
//导入 redux 的 combineReducers 函数
import commentReducer from './comment'
//导入 commentReducer
import postReducer from './post'
//导入 commentReducer
const rootReducer = combineReducers({
  comments: commentReducer,
  posts: postReducer
})
//利用 combineReducers 合成 Reducer 到 rootReducer 中
export default rootReducer
//默认导出 rootReducer
```

**第五步** 创建  Redux store

在 src 文件夹下创建 store.js 文件

```
[项目文件夹] -> src -> store.js
```

创建 store 状态树

```js
import { createStore } from 'redux';
//导入 redux 的 createStore 函数
import rootReducer from './reducers/'
//导入 reducer
//利用 createStore 函数创建 Redux store
let store = createStore(rootReducer)
//给 createStore 传入 reducer 参数
export default store
//默认导出 store
```

**第六步** 给组件注入 store 中的 state 数据

在入口文件中利用 react-redux 的`<Provider>`组件导入 store

```js
import React, { Component } from 'react'
import store from './store'
//导入store
import { Provider } from 'react-redux'
//导入 react-redux 的 Provider 组件
import HomePage from './HomePage'
import PostPage from './PostPage'
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

const Header = () => (
  <Link to="/" className="back-home">首页</Link>
)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      //将组件用Provider插件包裹 将 store 传入
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/post/:id" component={PostPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
```

### 拿取到 store 中的数据

利用 React-Redux 的 connect 拿到 store 中数据

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
//导入 connect 组件

class PostBody extends Component {
  render() {
    return (
      <div>
          {this.props.comments.length}
          //通过 this.props 拿到需要的数据
      </div>
    )
  }
}

//声明一个 mapStateToProps 函数拿到需要的数据
const mapStateToProps = (state) => ({
  comments: state.comments
  //名称：拿到 state.comments 数据
})
//将 mapStateToProps 作为 connect 的一个参数传入
export default connect(mapStateToProps)(PostBody)

//用connect导出 PostBody组件
```

### 操作 state 数据

> store 中的数据不能直接修改，需要拷贝一个新数据进行修改

这里我们使用`dispatch()`调用 Action 来进行对数据的操作

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from './store'
import {
  Link
} from 'react-router-dom'

class PostBody extends Component {

  like = () => {
    store.dispatch({ type: 'INCREMENT_LIKE', postId: this.props.postId })
    //通过type来确定action调用的方法
    //通过postId来进行修改数据
  }

  render() {
    let { postId, posts } = this.props
    let currentPost = posts.filter(value => value.postId === postId )[0]
    return (
      <div className="post-body">
        <Link to={`/post/${postId}`} className="title">
          {currentPost.title}
        </Link>
        <div onClick={this.like} className="likes-num num">
          {currentPost.likes} 赞
        </div>
        <div className="comment-num num">
          {this.props.comments.length} 评论
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments,
  posts: state.posts
})

export default connect(mapStateToProps)(PostBody)
```

这样一个完整的利用 React+Redux 的项目就成功创建

### 参考

 - 项目地址：[点击进入](https://l552177239.github.io/react-redux)

 - Github：[点击进入](https://github.com/l552177239/react-redux)
