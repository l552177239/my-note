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

```css
*{
	margin: 0;
	padding: 0;
	font-family: 'sans-serif';
}
.header{
	width: 100vw;
	height: 60px;
	overflow: auto;
	background: teal;
	line-height: 60px;
}
h1{
	color: white;
	line-height: 60px;
	text-align: center;
}
.main{
	text-align: center;
}
.footer{
	position: fixed;
	width: 100vw;
	height: 50px;
	bottom: 0;
	line-height: 50px;
	background: teal;
}
.footer a{
	color: white;
	width: 25%;
	font-size: 16px;
	display: inline-block;
	text-align: center;
	text-decoration: none;
}
.footer a:hover{
	color:#CCC;
	opacity:0.8;
	background: teal;
}
```

```
import React from 'react'
import {BrowserRouter,Route,Link} from 'react-router-dom'
import './App.css'
import About from './About'
import Work from './Work'

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
						<Route exact path='/' component={Home}></Route>
						<Route path='/work/:id' component={Work}></Route>
						<Route path='/about' component={About}></Route>
						<Route path='/user' component={User}></Route>
						//path属性指定路由的匹配规则（地址）
						//component属性指定加载的组件
					</div>
					<div className='footer'>
						<Link to='/'>Home</Link>
						//to跳转到对应路径的组件
						<Link to='/work'>Work</Link>
						<Link to='/about'>About</Link>
						<Link to='/user'>User</Link>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}
export default App
```

`Link`组件用于取代`<a>`元素，生成一个链接，允许用户点击后跳转到另一个路由。它基本上就是`<a>`元素的React版本，可以接收Router的状态。

**通配符**：匹配URL的一个部分，直到遇到下一个`/`、`?`、`#`为止

`exact`是Route下的一条属性，一般而言，React路由会匹配所有匹配到的路由组价，
`exact`使得路由的匹配更严格一些。

BrowserRouter放在最高的级别，把你需要的组件放在里面才会有`props`里的一些属性

App的子组件About

```
import React from 'react'
import {Route,Link} from 'react-router-dom'

const Dijia = () => <h2>我是第嘉的介绍</h2>
const Niu = () => <h2>我是钮老师的介绍</h2>
const Zhang = () => <div><h2>我是张老师的介绍</h2>魔镜魔镜告诉我，我是天底下最帅的男人吗？</div>

class About extends React.Component{
	render(){
		let {match} = this.props
		//通过`this.props`可以拿到父组件传过来的`match`属性
		return(
			<div className='about'>
				<div className='header'>
					<h2>About</h2>
				</div>						
				<Link to={`${match.url}/dijia`} >第嘉</Link>&nbsp;&nbsp;
				//match.url表示跳转的地址
				<Link to={`${match.url}/niu`}>钮老师</Link>&nbsp;&nbsp;
				<Link to={`${match.url}/zhang`}>张老师</Link>
				<div className='main'>
					<Route path={`${match.url}/dijia`} component={Dijia}></Route>
					<Route path={`${match.url}/niu`} component={Niu}></Route>
					<Route path={`${match.url}/zhang`} component={Zhang}></Route>
				</div>
			</div>
			)
	}
}
export default About
```

`Link`

```
<Link to={{
				  pathname: '/work',
				  search: '?sort=name',
				  hash: '#the-hash',
				  state: { from: '/' }}}>Work</Link>
// state内可以自己写内容
```

`this.props.history`

```
拿到之前页面link里自己设置的to里state地址
this.props.history.push(this.props.location.state.from)
//往history里push地址就可以跳转
//push的第二个参数也是一个state
//this.props.history.goBack()
```

`history`的方法

 - go():前进，后退一步
 - go Back()：返回刚才的页面
 - go Forward()：前进一步

`<NavLink>`
可以添加样式，给class为active添加样式

可以给NavLink添加className
```
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```

可以给NavLink添加activeStyle: object

```
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
```

`withRouter`

如果想用router的方法，而组件没有在路由上，所以用`withRouter`去包装

```

```
