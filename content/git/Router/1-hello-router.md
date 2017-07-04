## React-Router

**react-router** 是官方指定和维护的 React 路由库，它通过管理 URL，实现组件间切换，和状态 (state) 的变化。

官网地址：[点击跳转官网](https://reacttraining.com/react-router/web/guides/philosophy)

### 装包

```
npm i react-router-dom --save
```

使用时，路由器Router就是React的一个组件。需要引用

```
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
//as就是把前面的作为后面的使用
```

Router组件本身只是一个容器，真正的路由要通过Route组件定义。

### 创建一个router组件

```
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
