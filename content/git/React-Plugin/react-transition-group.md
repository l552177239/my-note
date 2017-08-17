# React-transition-group

> React 过渡动画插件

react-transition-group 插件是 React 的 Animation Add-Ons（ReactTransitionGroup 和 ReactCSSTransitionGroup）拆分出来的插件，是 React 动画库的重要组成部分

### 装包

```
npm install react-transition-group --save
```

### 使用

> 根据组件内部 state 的改变来触发组件的动画处理

#### 导入

首先导入使用的 Components ，这里我们使用 CSSTransitionGroup

```js
import { CSSTransitionGroup } from 'react-transition-group'
```

#### 创建 state

创建一个空的 item 状态来添加出现的动画组件

```js
constructor(){
  super()
  this.state = {
    item: [{name:'yu'}]
  }
}
```
#### 添加 CSS

```css
/* react-transition-group custom */
.example-enter {
  opacity: 0.01;
}

.example-enter.example-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}

.example-leave {
  opacity: 1;
}

.example-leave.example-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}
```

#### 添加动画需要的组件

给需要触发动画的 Dom 添加并监听事件，添加动画组件`<CSSTransitionGroup>`，使其点击`<button>`按钮添加 `items` 插件

```js
import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

class Comcard extends React.Component {
  constructor(){
    super()
    this.state = {
      item: [{name:'yu'}]
    }
  }
  handleClick = () => {
    let newItems = this.state.item.slice()
    newItems.push({
      name: 'liu'
    })
    this.setState({
      item: newItems
    })
  }
  render(){
    const items = this.state.item.map( (item,i) => (
      <div key={i}>{item.name}</div>
    ))
    return(
      <div className="comcard">
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </CSSTransitionGroup>
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }
}

export default Comcard
```

 - 参考代码：[Github仓库](https://github.com/l552177239/react-recharts)

### 参考

 - 文档说明：[点击查看](https://reactcommunity.org/react-transition-group/)
 - React官网：[点击查看](https://facebook.github.io/react/docs/animation.html)
 - Github项目：[点击查看](https://github.com/liangklfangl/react-animation-demo)
