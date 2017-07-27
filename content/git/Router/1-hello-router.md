## React-Router

**react-router** 是官方指定和维护的 React 路由库，它通过管理 URL，实现组件间切换，和状态 (state) 的变化。

### 装包

```
npm i react-router-dom --save
```

### 使用

使用时，路由Router就是React的一个组件。需要引用

```js
import {
	BrowserRouter as Router,
	//as就是把前面的作为后面的使用
	Route,
	Link
} from 'react-router-dom'
```

Router组件本身只是一个容器，真正的路由要通过Route组件定义。

#### 创建一个router组件

```js
import React from 'react'
import {BrowserRouter,Route,Link} from 'react-router-dom'

let Home = () => <h2>Home</h2>
let User = () => <h2>User</h2>
//几个简单的子组件

class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<div className='app'>
					<div className='header'>
						<h1>App</h1>
					</div>
					<div className='main'>
						<Route exact path='/home' component={Home}></Route>
						<Route path='/user' component={User}></Route>
						//path属性指定路由的匹配规则（地址）
						//component属性指定加载的组件
					</div>
					<div className='footer'>
						<Link to='/home'>Home</Link>
						//to跳转到对应路径的组件
						<Link to='/user'>User</Link>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}
export default App
```
### 参考

 - 官网地址：[点击进入](https://reacttraining.com/react-router/web/guides/philosophy)

 - 中文文档地址：[点击进入](http://www.uprogrammer.cn/react-router-cn/)

 - 阮一峰日志：[点击进入](http://www.ruanyifeng.com/blog/2016/05/react_router.html)
