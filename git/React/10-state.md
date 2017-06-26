### State(状态值)

`state`控制组件内部的状态，`state`改变，重新`render()`界面重新渲染

定义一个state值

```
import React from 'react'

class App extends React.Component{
  constructor(){
    super()
//state属性等于一个对象
//对象内可以是一个数、数组、对象、布尔值等等，用,隔开
    this.state = {
      num:0
    }
  }
  render(){
    return(
      <div>
        {this.state.num}
      </div>    
    )
  }
}
export default App
```

### setState(接受对象参数)

修改`setState`的方法可以触发`render`自动更新（界面重新渲染）

利用`setState`方法实现点击+1

```
import React from 'react'

class App extends React.Component{
  constructor(){
    super()
      this.state = {
         num:0
      }
  }
  handleClick(){
  this.setState({
    num: ++this.state.num
    })
  }
  render(){
    let styles={textAlign:'center'}
    return(
      <div>
        <span style={styles}>{this.state.num}</span><br />
        <input type='button' value='+1' onClick={this.handleClick.bind(this)} /><br />
      </div>    
    )
  }
}
export default App
```

利用`setState`方法切换状态值

```
import React from 'react'

class App extends React.Component{
  constructor(){
    super()
      this.state = {
          show:true
      }
  }
  handleClick(){
    this.setState({
      show:!this.state.show 
    })
  }
  render(){
    return(
      <div>
        <input type='button' value={this.state.show ? '显示' : '不显示'} onClick={this.handleClick.bind(this)} />
        <p>{this.state.show ? '哈哈' : ''}</p>
      </div>    
    )
  }
}
export default App
```

`setState`的应用

```
import React from 'react'

class App extends React.Component{
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      num:0,
      show:false
    }
  }
  handleInc(num){
    this.setState({
      num: (this.state.num + num)<0 ? 0 : this.state.num + num
    })
  }
  handleClick(){
    this.setState({
      show:!this.state.show 
    })
  }
  render(){
    let styles={textAlign:'center'}
    return(
      <div>
        <span style={styles}>{this.state.num}</span><br />
        <input type='button' value='+1' onClick={this.handleInc.bind(this,1)} />
        <input type='button' value='-1' onClick={this.handleInc.bind(this,-1)} /><br />
        <input type='button' value={this.state.show ? '显示' : '好人'} onClick={this.handleClick} />
          <p onClick={this.handleClick} >
          {this.state.show ? '出来混总是要还的' : '是你毁了一个我当好人的机会'}
          </p>
      </div>    
    )
  }
}
export default App
```
