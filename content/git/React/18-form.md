## 表单

诸如`<input>`、`<textarea>`和`<option>`的表单组件与其它原生（native）组件不同，因为它们可以通过用户交互而被改变。这些组件提供的接口使得管理表单对用户交互的响应更加容易。

### 传统表单事件

**传统表单的提交**

```html
<form action='https://www.baidu.com' method='GET'>
//action表单提交的地址
//method表单提交的方式（GET比较小的数据提交，POST比较保密的提交）
	<input type="text" name="hello" placeholder="输入内容">
	<button>提交</button>
	//button作为提交按钮使用
</form>
```

**表单的事件**

 - `onSubimit`（表单提交）
 - `onChange`（域的内容改变）
 - `onInput`（输入框内容的改变）
 - `onBlur`（失去焦点）//焦点事件
 - `onFocus`（获得焦点）//焦点事件

**`input`的`type`属性**

值 					 | 描述
------------ | ----------------------------------------------------------
button			 | 定义可点击按钮（多数情况下，用于通过 JavaScript 启动脚本）。
checkbox 		 | 定义复选框。
file 				 | 定义输入字段和 "浏览"按钮，供文件上传。
hidden 			 | 定义隐藏的输入字段。
image 			 | 定义图像形式的提交按钮。
password 		 | 定义密码字段。该字段中的字符被掩码。
radio 			 | 定义单选按钮。
reset 			 | 定义重置按钮。重置按钮会清除表单中的所有数据。
submit 			 | 定义提交按钮。提交按钮会把表单数据发送到服务器。
text 				 | 定义单行的输入字段，用户可在其中输入文本。默认宽度为 20 个字符。
email 			 | 定义邮箱

**表单重置**

```
import React from 'react'

class App extends React.Component {
  handleSubmit(e){
    e.preventDefault()
    //preventDefault 阻止跳转方法
    document.getElementById('form').reset()
  }
  render() {
    return (
      <div className="app">
        <form action='https://www.baidu.com' method='GET' id='form' onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="hello" placeholder="输入内容" />
          <button>提交</button>
          <button type='reset'>重置</button>
          //重置按钮
        </form>
      </div>
    )
  }
}
export default App
```

**小贴士**：`reset()`方法可把表单中的元素重置为它们的默认值

### 受控组件

**非受控组件**

```
import React from 'react'

class App extends React.Component {
  render() {
    return (
      <div className="app">
          <input type="text" placeholder="输入内容" value='123' />
        </form>
      </div>
    )
  }
}
export default App
```

一个没有`value`属性的`<input>`就是一个非受控组件。通过渲染的元素，任意的用户输入都会被立即反映出来。非受控的`<input>`只能通过`OnChange`函数来向上层通知自己被用户输入的更改。

**注意**：使用`value`代替`defaultValue`，会发现输入框的值无法改变

**受控组件**

表单的`value`值收到`state`的控制

```
import React from 'react'

class App extends React.Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      input:''
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let {input} = this.state
  }
  handleChange(e){
    this.setState({
      input:e.target.value
      //触发事件目标对象的value
    })
  }
  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input value={this.state.input} onChange={this.handleChange} />
          <button>提交</button>
        </form>
      </div>
    )
  }
}
export default App
```

**表单的`select`，`textarea`输入**

```
import React from 'react'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      textarea:'',
      fruits:'banana'
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let {textarea,fruits} = this.state
    console.log(textarea,fruits)
  }
  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <textarea cols="30" rows="10" value={this.state.textarea} onChange={e => this.setState({textarea:e.target.value})}></textarea><br/>
          <select value={this.state.fruits} onChange={e => this.setState({fruits:e.target.value})}>
            <option value="apple">苹果</option>
            <option value="orange">橘子</option>
            <option value="banana">香蕉</option>
            //默认值通过state控制，使用selected会被警告
          </select><br/>
          <button type='submit'>提交</button>
        </form>
      </div>
    )
  }
}
export default App
```

**表单的`radio`输入**

```
import React from 'react'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
			sex:'male'
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let obj = this.state
    console.log(obj)
  }
  handleChange(e){
    this.setState({
      input:e.target.value
    })
  }
  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit.bind(this)}>
					男<input type="radio" name='sex' value='male' onChange={e => this.setState({sex:e.target.value})}/>
          女<input type="radio" name='sex' value='female' onChange={e => this.setState({sex:e.target.value})}/><br/>
          <button type='submit'>提交</button>
        </form>
      </div>
    )
  }
}
export default App
```

表单的`radio`通过受控组件来控制`checked`的状态改变来修改，这种方法比较麻烦，所以我们用 **非受控组件**来写表单的`radio`事件

```
import React from 'react'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
			sex:'male'
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let obj = this.state
    console.log(obj)
  }
  handleChange(e){
    this.setState({
      input:e.target.value
    })
  }
  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit.bind(this)}>
					男<input type="radio" name='sex' value='male' checked={this.state.sex === 'male' ? true : false} onChange={e => this.setState({sex:e.target.value})}/>
          女<input type="radio" name='sex' value='female' checked={this.state.sex === 'female' ? true : false} onChange={e => this.setState({sex:e.target.value})}/><br/>
          <button type='submit'>提交</button>
        </form>
      </div>
    )
  }
}
export default App
```

**表单的`checnkbox`输入**

```
import React from 'react'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
			agree:true
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let obj = this.state
    console.log(obj)
  }
  handleChange(e){
    this.setState({
      input:e.target.value
    })
  }
  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit.bind(this)}>
					我已阅读并同意<input type="checkbox" value='agree' onChange={e =>this.setState({agree:!this.state.agree})}/><br/>
          <button type='submit'>提交</button>
        </form>
      </div>
    )
  }
}
export default App
```

`checnkbox`的多选

```
import React from 'react'

class App extends React.Component {
  constructor(){
    super()
    this.handleCheck = this.handleCheck.bind(this)
    this.state = {
			hobby:[]
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let obj = this.state
    console.log(obj)
  }
  handleChange(e){
    this.setState({
      input:e.target.value
    })
  }
  handleCheck(e){
    let hobby = this.state.hobby
    let value = e.target.value
    let index = hobby.indexOf(value)
    console.log(index)
    if(index === -1){
      hobby.push(value)
    }else{
      hobby.splice(index,1)
    }
    this.setState({hobby})
  }
  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit.bind(this)}>
					兴趣爱好：<br/>
          篮球<input type="checkbox" value='basketball' onChange={this.handleCheck}/><br/>
          足球<input type="checkbox" value='football' onChange={this.handleCheck}/><br/>
          排球<input type="checkbox" value='paiqiu' onChange={this.handleCheck}/><br/>
          台球<input type="checkbox" value='taiqiu' onChange={this.handleCheck}/><br/>
          <button type='submit'>提交</button>
        </form>
      </div>
    )
  }
}
export default App
```

**表单的重置**：通过设置`state`为空来重置表单

```
import React from 'react'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      input:''
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let obj = this.state
    console.log(obj)
  }
  handleReset(){
    this.setState({
      input:''
    })
  }
  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
          <input type="text" value={this.state.input} onChange={e => this.setState({input:e.target.value})} />
          <button type='submit'>提交</button>
          <button type='reset'>重置</button>
        </form>
      </div>
    )
  }
}
export default App
```

**处理多个输入**

```
import React from 'react'

class Input extends React.Component {
  constructor(){
    super()
    this.state = {
      textarea:'',
      fruits:'banana'
    }
  }
  handleChange(type,e){
    this.setState({
      [type]:e.target.value
    })
  }
  render() {
    return (
      <div>
          <textarea
	          cols="30"
	          rows="10"
	          value={this.state.textarea}
	          onChange={this.handleChange.bind(this,'textarea')}>
	        </textarea><br/>
          <select value={this.state.fruits} onChange={this.handleChange.bind(this,'fruits')}>
            <option value="apple">苹果</option>
            <option value="orange">橘子</option>
            <option value="banana">香蕉</option>
          </select><br/>
          <button onClick={() => console.log(this.state)}>提交</button>
      </div>
    )
  }
}
export default Input
```

注意：传入的`type`参数与对应`state`的名字

### 混合组件的优点

1. 支持传入默认值；
2. 可控：组件外部修改`props`可改变`input`组件的真实值及显示值；
3. 非可控：输入框中输入值，可同时改变`input`组件的真实值及显示值。
