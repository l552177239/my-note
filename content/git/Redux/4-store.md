# Store

> Redux 应用只有一个单一的`store`

### 概念

1. `Store`就是一个维护应用程序状态的对象

2. 提供提供`getState()`方法获取`state`

```
store.getState(): 获取最近的内部状态对象

 - 返回应用当前的 state 树
 - 它与 store 的最后一个 reducer 返回值相同
```

3. 提供`dispatch(action)`方法更新`state`

```
store.dispatch(action): 将一个`action`对象发送给 reducer

 - 分发 action 这是触发 state 变化的惟一途径。
 - 会使当前getState的结果和传入的action以同步方式调用reduce函数
 - 返回值会被作为下一个state
 - 从现在开始，这就成为了 getState() 的返回值
 - 同时变化监听器(change listener)会被触发
```

4. 通过`subscribe(listener)`注册监听器

5. 通过`subscribe(listener)`返回的函数注销监听器

### 创建`store`

1. 创建`src`下的`store.js`文件

```
[项目文件夹] -> src -> store.js
```

2. 导入 Redux 的`createStore`函数

```js
import { createStore } from 'redux'
```

3. 通过 `Reducer` 函数，构造 Store 对象，导入`reducers`

```js
import rootReducer from './reducers/'
```

4. 导出 Store 对象

```js
let store = createStore(rootReducer)

export default store
```

5. 在父组件内引用

`<Provider store>`使组件层级中的`connect()`方法都能够获得 Redux store

 - 正常情况下，你的根组件应该嵌套在`<Provider>`中才能使用`connect()`方法

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

 - 如果你真的不想把根组件嵌套在 `<Provider>` 中，你可以把 store 作为 props 传递到每一个被 connet() 包装的组件，
但是我们只推荐您在单元测试中对 store 进行伪造 (stub) 或者在非完全基于 React 的代码中才这样做。正常情况下，你应该使用 <Provider>。

属性

store (Redux Store): 应用程序中唯一的 Redux store 对象
children (ReactElement) 组件层级的根组件。
