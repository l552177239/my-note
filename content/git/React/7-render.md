### 创建一个组件

```jsx
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
```

我们在文件头部从 react 的包当中引入了 React ，和 React.js 的组件父类 Component 只要你要写React.js组件，那么就必须要引入这两个东西。

`react-dom`可以帮助我们把这个用来描述 UI 信息的 JavaScript 对象（React 组件）变成 DOM 元素，并且渲染到页面上去。

所以可以总结一下从 JSX 到页面到底经过了什么样的过程  

<img src='http://huzidaha.github.io/static/assets/img/posts/44B5EC06-EAEB-4BA2-B3DC-325703E4BA45.png' alt="ReactDOM">  

创建一个组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<div/>,document.querySelector('#root'))
//querySelector()：JS原生选择器,类似jq中的$()选择器,功能强大;
```

`ReactDOM.render`功能就是把组件渲染并且构造 DOM 树，然后插入到页面上某个特定的元素上。

**总结**：
 - JSX语法需要bable进行编译，转为这个方法`React.createElement()`
 - 标签区分大小写
 - 标签必须闭合
 - 相邻的JSX元素必须包裹在一个闭合标签内
 - class写为className,for写为htmlfor
 - 使用驼峰命名
 - 声明式渲染：可以嵌入变量，变量用 **{}** 包裹
 - 在JSX语法中可以嵌入变量和表达式,可以写js语法,但不能用js语句