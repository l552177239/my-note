### JSX语法

JSX就是 React.js 描述页面 UI 的方式（JSX 其实就是 JavaScript 对象）

JSX语法需要bable进行编译，React.createElement()

```
import React from 'react'
import ReactDOM from 'react-dom'

const element = <h1>Hello world</h1>;

ReactDOM.render(element,document.querySelector('#root'))
```

JSX为我们提供了创建react元素方法（React.createElement(component, props, ...children)）的语法糖（syntactic sugar）。上面的代码实质上等价于：

```js
import React from 'react'
import ReactDOM from 'react-dom'

var element = React.createElement(
	"h1",
	null,
	"Hello, world!"
)

ReactDOM.render(element,document.getElementById('root'))
```

每个 DOM 元素的结构都可以用 JavaScript 的对象来表示。你会发现一个 DOM 元素包含的信息其实只有三个：标签名，属性，子元素。

```html
<div>
	<h1 className='title'>React</h1>
</div>
```

所以 HTML的所有的信息我们都可以用合法的 JavaScript 对象来表示的。

```jsx
React.createElement(
	"div",
	null,
	React.createElement(
		"h1",
		{ className: 'title' },
		"React"
	)
)
```

**嵌入变量**

用大括号包裹

```
let name = 'Liu'
let element = <p className = {name} />
```

大括号内可以写入变量，数字，求值表达式...

```
let name = 'LiuEnQing'
let male = true
let obj = {
	age:24,
	tal:13947368104
}
let ele = <p>
	{name}<br />
	{obj.age}<br />
	<span>{male ? '男' : '女'}</span>
</p>
```

注释

```
{/*[需要注释内容]*/}
```