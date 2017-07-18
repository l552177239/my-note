# 组件间数据传递

复习一下React的知识

React核心思想就是数据和程序分离，用state进行状态的控制，用props进行数据间传递。

### 利用`state`和`props`进行组件间数据传递

#### 核心思想

>通过子组件，修改父组件的 state ，然后把父组件的 state 作为所有子组件的 props 值传入各个子组件

#### 创建父组件

1. 创建组件`App`
2. 将我们需要的数据放在`state`里
3. 写一个`handleClick`方法进行修改数据
4. 将`handleClick`方法传入`CommentBox`组件中
5. `handleClick`方法的参数为子组件获取的值

```
import React, { Component } from 'react'
import CommentBox from './CommentBox'

class App extends Component {
  state = {
    data: ''
  }
  handleClick(data){
    this.setState({data:data})
  }
  render() {
    console.log('App:',this.state.data)
    return (
      <div className="App">
        <CommentBox handleClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}

export default App
```

#### 子组件`CommentBox`

1. 创建组件`CommentBox`
2. 通过`this.props.handleClick`拿到父组件传过来的`handleClick`方法
3. 通过子组建的`handleClick`方法来获取`input`内输入的`value`传给父组件

```
import React from 'react'

class CommentBox extends React.Component{
  handleClick(){
    this.props.handleClick(this.comment.value)
  }
  render(){
    return(
      <div>
          <input className='input' type='text' ref={value=>this.comment=value} />
          <input type='button' value='传给父组件' onClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}

export default CommentBox
```

