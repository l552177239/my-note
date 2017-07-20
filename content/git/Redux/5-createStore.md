# createStore

> Redux的核心函数，通过这个函数创建一个 Redux store 来以存放应用中所有的 state

> 应用中应有且仅有一个 store。

### createStore(reducer, [preloadedState], [enhancer])

#### [preloadedState]

[preloadedState] (any): 初始时的 state。
在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，
或者从之前保存的用户会话中恢复一个传给它。
如果你使用 combineReducers 创建 reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。
否则，你可以自由传入任何 reducer 可理解的内容。

#### [enhancer]

使用redux-dev-tools

要使用redux的调试工具需要在store.js文件中的createStore()步骤中加入第三个参数，`enhancers`

```
import { createStore, compose} from 'redux';
//redux-dev-tools
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);
```

让改变reducer后能够即时刷新页面

webpack可以监听我们的组件变化并做出即时相应，但却无法监听reducers的改变，所以在store.js中增加一下代码

```
//此处accepts的参数是reducers的存放路径，require()内的路径为执行combineReducers()的文件
if(module.hot){
    module.hot.accept("./reducers/", () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}
```

#### reducer

`reducer`（函数）: 接收两个参数，分别是当前的`state`状态树和要处理的`action`，返回新的`state`状态树

### 返回值

`Store`: 保存了应用所有`state`（对象）的状态树。改变 state 的惟一方法是 dispatch action。你也可以 subscribe 监听 state 的变化，然后更新 UI。
