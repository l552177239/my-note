# Action

reducer的Action（对象）参数，类似于一个接口，它主要是和reducer联动的，它默认必须返回一个type，用这个type的值来判断reducer中做哪一步操作

### 创建Action

利用 Action 创建函数来创建 Action

```
const action = {
  type: 'ADD_TODO',
  //type属性是必须的，表示 Action 的名称，值是一个字符串
  payload: 'Learn Redux'
  //payload ，也就是这个 action 携带的数据,可以自由设置
}
```

例子：Reducer实现加一

```
//export default 默认输出
export default function likeReducer(state = 0, action) {
  //likeReducer函数有两个参数state 和 action
  switch (action.type) {
    //传入action的type参数作为switch的参数
    case 'INCREMENT_NUM':
    //找到需要执行的action操作
      console.log('state', state)
      return state + 1
      //返回的新的state
    default:
      return state;
      //如果找不到或执行错误，默认返回旧的state
  }
}
```

### 调用

1. 直接调用`dispatch`

```
//创建一个 被绑定的 action 创建函数 来自动 dispatch
const boundAddnum = (num) => dispatch(addnum(num))
```

2. 通过`store.dispatch()`调用

```
//在组件内调用dispatch，触发 state 变化。重新渲染
store.dispatch({type:'INCREMENT_NUM'})
```
