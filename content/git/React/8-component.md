## 组件的组合、嵌套和组件树

### 组建的创建

第一种组件的创建方式 **function**

```
import React from 'react'
import ReactDom from 'react-dom'

function Hello(){
    return (
        <div>
            <h1>我是第一种组件的创建方式</h1>
        </div>
    )
}
ReactDom.render(<Hello />,document.querySelector('#root'))
```

**注意**：

 1. 自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头。
 2. 必须有返回值,而且返回值必须是JSX elements

第二种组件的创建方式 **ES6类**

```
import React from 'react'

class App extends React.Component{
  render(){
    return (
      <div>
        App
      </div>    
    )
  }
}
export default App
```

组件内参数的传递

```
import React from 'react'
import ReactDom from 'react-dom'

function Word(props){
    return (
    <p>My name is {props.name}</p>
    )
}

function Hello(){
    return (
        <div>
            <Word name='Liu' />
        </div>
    )
}

ReactDom.render(<Word />,document.querySelector('#root'))
```

### 导入CSS

```
//插入css外部样式：
import './App.css'

//行内样式
<h1 style={}>我是H1</h1>
//行内样式的时候，样式写成对象的模式，对象是js语言所以用大括号包裹
//1.{ backgroundColor:'teal', fontSize:'20px' }
//2.写成一个方法，返回一个对象
//3.声明一个对象
//4.只要样式写为对象的方式
styles(){
  return({
    box:{
      background:'green'
    };
  })
}
<h1 style={this.styles.box}>我是H1</h1>
let styles={
  h1:{
    color:'#CCC',
    backgroundColor:'teal'
  },
  div:{
    width:'100vw',
    height:'200px'
  }
}

<h1 style={styles.h1}>我也是H1</h1>
```

### 导入图片

当作变量导入

```
//先导入：
import img from './xxx.jpg'  

//引用本地：
"<img src={img} alt='' />"  

//网上图片直接引用：
"<img src='[地址]' alt='' />"  
```

### 组件的嵌套

子组件

```
import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

class App extends React.Component{
  render(){
    return(
      <div className='App'>
        <Header />
        <Main />
        <Footer />
        </div>    
    )
  }
}
export default App
```

父组件

```
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

ReactDom.render(<App />,document.querySelector('#root'))
```

### 组件树

```
import React from 'react';
import ReactDOM from 'react-dom';

class Title extends React.Component {
  render(){
    return (
      <h1>React</h1>
    )
  }
}

class Header extends Component {
  render () {
    return (
      <div>
        <Title />
        <h2>This is Header</h2>
      </div>
    )
  }
}

class Main extends Component {
  render () {
    return (
      <div>
        <h2>This is main content</h2>
      </div>
    )
  }
}

class Footer extends Component {
  render () {
    return (
      <div>
        <h2>This is footer</h2>
      </div>
    )
  }
}

class Index extends Component {
  render () {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<Index />,document.getElementById('root'))
```

组件可以和组件组合在一起，组件内部可以使用别的组件。就像普通的 HTML 标签一样使用就可以。这样的组合嵌套，最后构成一个所谓的组件树。

<img src='http://huzidaha.github.io/static/assets/img/posts/19BBE4E2-A12E-4657-BA6A-61484F67FA60.png' alt='组件树' />
