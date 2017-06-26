## React获取DOM节点

### 原生方法

利用原生方法中抓取DOM节点的方法，例如`getElementById`，`querySelector`等

```
import React from 'react'

class RefDemo extends React.Component{
  handleClick(){
    document.getElementsByTagName('p')[0].style.color = 'red'
  }
  render(){
    return(
      <div>
        <p>哈哈哈</p>
        <input type='button' value='点击' onClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}
export default RefDemo
```

### Jquery方法

安装`jquery`包，使用jq选择器抓取DOM节点，可以用jq方法进行操作

```
import React from 'react'
import $ from 'jquery'

class RefDemo extends React.Component{
  handleClick(){
    $('p').toggle('slow')
    //有就隐藏，没有就显示
    }
  render(){
    return(
      <div>
        <p>哈哈哈</p>
        <input type='button' value='点击' onClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}
export default RefDemo
```

### 通过React的`ref`来获取DOM节点

```
import React from 'react'

class Ref extends React.Component{
  constructor(){
    super()
    this.state = {
      title:''
    }
  }
  handleClick(){
    this.setState({
      title:this.value.value
    })
  }
  render(){
    return(
      <div>
        <p>123{this.state.title}</p>
        <input ref={ value => this.value = value } onChange={this.handleClick.bind(this)} />
        <input type='button' value='点击' onClick={this.handleClick.bind(this)} />
      </div>
      )
  }
}
export default Ref
```

不仅可以获取DOM节点，还可以获取子组件的节点

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
