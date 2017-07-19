# 温习Redux中相关的React知识点

## 组件间数据传递

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
6. 将`state`的值传入子组件

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
        <CommentBox data={this.state.data} handleClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}

export default App
```

#### 子组件`CommentBox`

1. 创建组件`CommentBox`
2. 通过`ref`抓取虚拟节点
3. 通过`this.props.handleClick`拿到父组件传过来的`handleClick`方法
4. 通过子组建的`handleClick`方法来获取`input`内输入的`value`传给父组件
5. 通过`props`拿到父组件传过来的值（根据对应的名称）

```
import React from 'react'

class CommentBox extends React.Component{
  state = {
    data: this.props.data
  }
  handleClick(){
    this.props.handleClick(this.comment.value)
    this.setState({data:this.props.data})
  }
  render(){
    let {data} = this.state
    //Es6对象的解构赋值
    return(
      <div>
        { data.map(item => <li>{item}</li>) }
        <input className='input' type='text' ref={value=>this.comment=value} />
        <input type='button' value='传给父组件' onClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}

export default CommentBox
```

## 关于触发`render`的条件

1. 组件的`state`发生改变

```
import React from 'react'

class App extends React.Component {
  state = {
    data:1
  }
  handleClick(){
    this.setState({data:0})
  }
  render(){
    console.log('render被触发')
    return(
      <div>
         <button onClick={this.handleClick.bind(this)}>点击</button>
      </div>
    )
  }
}

export default App;
```

2. 组件的`props`发生改变

```
//父组件
import React, { Component } from 'react';
import Son from './Son';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: 1
    }
  }
  handleClick(e){
    e.preventDefault();
    this.setState({
      data: this.state.data + 1
    })
  }
  render(){
    return(
      <div>
        <Son num={this.state.data} />
        <button onClick={this.handleClick.bind(this)}>Click</button>
      </div>
    )
  }
}

export default App;
```

```
//子组件
import React, { Component } from 'react';

class Son extends Component {
  render(){
    console.log('子组件的render被触发')
    return(
      <h1 >
          { this.props.num }
      </h1>
    )
  }
}

export default Son;
```

