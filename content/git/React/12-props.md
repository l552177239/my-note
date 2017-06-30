## 配置组件的 props (属性)

组件内部是通过 **this.props** 的方式获取到组件的参数的，如果`this.props`里面有需要的属性我们就采用相应的属性，没有的话就用默认的属性。

```
class App extends React.Component{
  render(){
    console.log(this.props)
    return (
      <div className='app'>   
        App
      </div>
    )
  }
} 
```

在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为`props`对象的键值：

```
import React from 'react'

class Btn extends React.Component{
  render(){
    console.log(this.props)
    return (
      <div className='btn'> 
        <input type='button' value={this.props.name||'点击'} style={{color:this.props.color}} />
      </div>
    )
  }
}

class App extends React.Component{
  render(){
    console.log(this.props)
    return (
      <div className='app'> 
        App <br />
        <Btn name='注册' color='teal' />
        <Btn name='登录' color='hotpink' />
      </div>
      )
  }
}
export default App
```

数字也当作变量用 **{}** 包起来

```
import React from 'react'

class Btn extends React.Component{
  render(){
    return (
      <div className='btn'> 
        age:{this.props.tal}
      </div>
      )
  }
}

class App extends React.Component{
  render(){
    return (
      <div className='app'>
        <Btn tal={12} />
      </div>
      )
  }
}
export default App
```

`props`的`children`属性

```
import React from 'react'

class Btn extends React.Component{
  render(){
    return (
      <div className='btn'>
        {this.props.children}
      </div>
      )
  }
}

class App extends React.Component{
  render(){
    console.log(this.props)
    return (
      <div className='app'> 
        App <br />
        <Btn>
          <span>span标签</span>
        </Btn>
      </div>
      )
  }
}
export default App
```

注意`children`的类型会根据标签里的内容改变

**function**也可以通过`props`传递

通过`ref`获取子组件节点，通过`props`传递过去的方法修改`state`达成改变父组件状态

```
import React from 'react'

class Test extends React.Component{
  constructor(){
    super()
    this.state = {
      show:true
    }
  }
  handleShow(){
    this.setState({
      show:!this.state.show
    })
  }
  render(){
    return(
      <div>
        <p style={{display:this.state.show ? 'block':'none'}}>杀人诛心</p>
        <input type='button' value='点击' onClick={this.handleShow.bind(this)} />
      </div>
    )
  }
}

class Ref extends React.Component{
  handleClick(){
    this.test.handleShow()
  }
  render(){
    return(
      <div>
        <Test ref={test => this.test = test} onClick={this.handleClick.bind(this)}/>
        <input type='button' value='点' onClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}
export default Ref
```

拓展应用

```
class Btn extends React.Component{
  render(){
    let styles = {
      height:'25px',
      padding:'0 20px',
      lineHeight:'25px',
      color:this.props.color,
      background:this.props.bg,
      border:'0'
    }
    return (
      <div className='btn'> 
        age:{this.props.tal}<br />
        <input type='button' value={this.props.name} style={styles} />
      </div>
      )
  }
}
Btn.defaultProps = {
  bg:'blue',
  color :'white',
  name:'点击',
  tal:20
}
```

默认的`props`用 **defaultProps** 的属性设置

```
class Btn extends React.Component{
  render(){
    return (
      <div className='btn'> 
        age:{this.props.tal}<br />
        <input type='button' value={this.props.name}/>
      </div>
      )
  }
}
Btn.defaultProps = {
  name:'点击',
  tal:20
}
```

