## Router

### histroy 属性

Router组件的history属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 React Router 匹配。

history属性，一共可以设置三种值
 - BrowserRouter
 - hashHistory  路由将通过URL的hash部分（#）切换。
 - createMemoryHistory  主要用于服务器渲染。它创建一个内存中的history对象，不与浏览器URL互动。

### BrowserRouter

浏览器的路由就不再通过`Hash`完成了，而显示正常的路径`example.com/some/path`，背后调用的是浏览器的History API。

`BrowserRouter`放在最高的级别，把你需要的组件放在里面才会有`props`里的一些属性

```
import React from   'react'
import { BrowserRouter,Route,Link } from 'react-router-dom'
import Btn from './Btn'

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
            <div className="app">
                <Link to='/btn'>进入Btn</Link>
                <Route path='/btn' component={Btn}/>
            </div>
            </BrowserRouter>
        )
    }
}
export default App
```

子组件
```
import React from   'react'

class Btn extends React.Component{
    render(){
        console.log(this.props)
        return(
            <div className="btn">
                <input type="button" value='点击添加' />
            </div>
        )
    }
}
export default Btn
```

在子组件的`this.props`里输出三个对象`history`，`location`，`match`

#### history（历史记录）

**history** 它提供了多种不同的方法来管理各种环境中的JavaScript中的会话历史，通过被包裹的子组件的`this.props.history`来显示。

**history** 对象通常具有以下属性和方法：

 - length - （number）历史堆栈中的条目数
 - action- （字符串）当前动作（PUSH，REPLACE，或POP）
 - location - （对象）当前位置。可能具有以下属性：
    - pathname - （string）URL的路径
    - search - （string）URL查询字符串
    - hash - （string）URL哈希片段
    - state- （字符串）位置特定的状态，例如push(path, state)当该位置被推送到堆栈时。仅在浏览器和内存历史记录中可用。
 - push(path, [state]) - （function）将新条目推入历史堆栈
 - replace(path, [state]) - （function）替换历史堆栈上的当前条目
 - go(n)- （function）通过n条目移动历史堆栈中的指针
 - goBack() - （功能）相当于 go(-1)    返回刚才的界面
 - goForward() - （功能）相当于 go(1)  前进一步
 - block(prompt)- （功能）防止导航（请参阅历史文档）

#### location（位置）

`location`对象代表了应用程序现在的位置。

**location的属性和方法**

 - hash（哈希值）
 - key（key值）
 - pathname（地址）
 - search（查询地址）
 - state（state是一个对象通过里面的from来写入一个地址）

#### match（路由匹配）

一个`match`对象包含有关如何信息<Route path>相匹配的URL。

**match对象的属性**

 - params（对象）从与路径的动态段相对应的URL分析密钥/值对
 - isExact（布尔值）true如果整个URL匹配（没有尾随字符）
 - path（string）用于匹配的路径模式。有用建设嵌套<Route>小号
 - url（string）URL的匹配部分。有用建设嵌套<Link>小号

### withRouter

如果想用`router`的方法，而组件没有在路由上，所以用`withRouter`去包装

```
import React from 'react'
import {withRouter} from 'react-router-dom'

class Son extends React.Component{
    render(){
        console.log(this.props)
        return(
            <div className='son'>
                Son
            </div>
        )
    }
}
export default withRouter(Son)
```

父组件里直接使用`<Son />`导入，就可使用`router`的方法

### Switch

Switch，路由跳转时只渲染出第一个与当前访问地址匹配的`Route`或`Redirect`

```
<Switch>  // 监听空路由，
 <Route path="/" exact component={Home}/>
 <Redirect from="/old-match" to="/will-match"/>
 <Route path="/will-match" component={WillMatch}/>
 <Route component={NoMatch}/>  // 空路由，
</Switch>
```
