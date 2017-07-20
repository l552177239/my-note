# Reducer

1. Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer

```
const reducer = function (state, action) {
// ...
return new_state;
```

2. Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State

```
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_NUM':
    console.log('state', state)
      return state++
    default:
      return state;
  }
}
```

3. 上面代码中，reducer函数收到名为`INCREMENT_NUM`的 Action 以后，就返回一个新的 State，作为加法的计算结果。

4. 实际应用中，Reducer 函数不用像上面这样手动调用，`store.dispatch`方法会触发 Reducer 的自动执行。

5. 为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。

```
import { createStore } from 'redux';
const store = createStore(reducer);
```

6. 我们可能会分模块和功能写多个 reducer 文件，但最终，我们都需要把它合并到一个里面，这需要使用redex中的`combineReducers`

```
import { combineReducers } from "redux"
import * as reducers from "./reducers"
const rootReducer = combineReducers({
    ...reducers
})
export default rootReducer
```

### 注意：Reducer不能

1. 不要修改state（返回一个新的state）

2. 执行有副作用的操作，如 API 请求和路由跳转

3. 调用非纯函数，如 Date.now() 或 Math.random()
