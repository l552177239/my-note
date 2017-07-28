# Connect

> React-Redux只在组件内使用，用来连接 `store` 和 React 组件

react 组件和 redux store 之间是没有任何关系的。这一节，我们就把他们二者 connect 起来。

连接二者，需要一个专门的库，叫做 react-redux，这个是 React 官方的 Redux 对 React 的绑定。

### 安装

```npm
npm i react-redux -S
```

### 使用

具体的使用的主要涉及两个接口`Provider`和`connect`

#### `connect`方法声明

connect作用：**连接** React组件 与 Redux store

```js
//模板函数
connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])
```

 - mapStateToProps：把 store 中的数据（一部分）映射为当前组件的 props
    - map 的意思是“映射”
    - State 指的是 store 状态树（ State Tree ），也就是 store 的实际数据
    - Porps 就是属性

Store 中数据很多，当前组件需要的只是一部分，那么选取工作是在 mapStateToProps 中完成的

```js
const mapStateToProps = (state) => ({
  comments: state.comments
  //拿到store中的comments
})
```

上面的 `(state)` 指的就是 Store 中的comments属性，也即是 store.getState() 可以读到的内容。

具体的选取工作是用 comments: state.comments 这样的语句的完成的。

connect 完毕之后，PostBody 之中就多了一个属性：`this.props.comments`

#### `<Provider>`组件

> `<Provider store>`使组件层级中的`connect()`方法都能够获得 Redux store

只有`connect`不能工作（因为找不着 store），因为`connect`的生效范围是由`<Provider>`组件决定的

只有被 Provider 包括起来的组件中才能找得着 store，也就是才能使用 `connect`

```js
import store from './store'
//导入 store
import { Provider } from 'react-redux'
//导入 Provider

Render(){
  <Provider store={store}>
  //将 store 传入
    <组件 />  
  </provider>
}
```

在有动态数据交互的组件内引用`connect`

```js
import store from './store'
import { connect } from 'react-redux'

//通过this.props.comments拿到数据
const mapStateToProps = (state) => ({
  comments: state.comments
})

```

**小贴士**：调用 connect() 方法的时候使用了两个括号。这个叫作局部调用，并且这允许开发者使用 ES7 提供的修饰语法：

```js
// 这是还不稳定的语法！这可能在实际的应用中被修改或摒弃。
@connect(mapStateToProps)
export default class CounterContainer { ... }
```

**小技巧**：发出 action 时，可以不用导入 store 而直接使用 this.props 代替

### 参考

 - 简书文章：[点击进入](http://www.jianshu.com/p/9873d4ccb891)

 - 中文官网：[点击进入](http://www.redux.org.cn/docs/react-redux/index.html)
