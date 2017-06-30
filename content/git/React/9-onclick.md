### 事件监听

当你需要为某个元素监听某个事件的时候，只需要简单地给它加上`on*`就可以了。而且你不需要考虑不同浏览器兼容性的问题

React.js 会给每个事件监听传入一个`event`对象，这个对象提供的功能和浏览器提供的功能一致，而且它是兼容所有浏览器的。


例如我们现在要给`button`加上点击的事件监听：

```
class App extends React.Component{
  handleClick(){
    console.log('Click')
  }
  render(){
    return(
      <button onClick={this.handleClick.bind(this)}>点击</button>
    )
  }
}
```

只需要给 button 按钮加上 onClick 的事件，onClick 紧跟着是一个表达式插入，这个表达式返回一个 App 自己的一个实例方法。
当用户点击按钮的时候，React.js 就会调用这个方法，所以你在控制台就可以看到 Click 打印出来。


绑定的时候给事件监听函数传入一些参数:

```
class App extends React.Component{
  constructor(){
    super()
    this.state = {
      data:0
    };
  }
  handleNum(num){
    this.setState({
      data:this.state.data + num
    })
  }
  render(){
    return(
      <div>
        <span>{this.state.data}</span><br />
        <input type='button' value='+1' onClick={this.handleNum.bind(this,+1)} />
        <input type='button' value='-1' onClick={this.handleNum.bind(this,-1)} />
      </div>
    )
  }
}
```

新的可控组件方法：

```
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component{
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    console.log(this)
  }
  render(){
    return (
      <div>
        App
        <button onClick={this.handleClick}>click</button>
      </div>
    )
  }
}
ReactDOM.render(<App />,document.querySelect('#root'))
```

**注意**

 - 事件用驼峰命名法
 - 这些 on* 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上
 - 事件监听函数会被自动传入一个 event 对象
 - bind会把实例方法绑定到当前实例上，然后我们再把绑定后的函数传给React.js的       onClick事件监听
 - 可以在 bind 的时候给事件监听函数传入一些参数