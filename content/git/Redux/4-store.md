# Store

> Redux 应用只有一个单一的`store`

### 概念

1. `Store`就是一个维护应用程序状态的对象

2. 提供提供`getState()`方法获取`state`（`store.getState()`: 获取最近的内部状态对象。）

3. 提供`dispatch(action)`方法更新`state`（`store.dispatch(action)`: 将一个`action`对象发送给 `reducer`）

4. 通过`subscribe(listener)`注册监听器

5. 通过`subscribe(listener)`返回的函数注销监听器

### 创建`store`

1. 创建`src`下的`store.js`文件

2. 导入 Redux 的`createStore`函数

3. 通过 `Reducer` 函数，构造 Store 对象

4. 导出 Store 对象

```
import { createStore } from 'redux';
import rootReducer from './reducers/'

let store = createStore(rootReducer)

export default store
```
