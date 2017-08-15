# Recharts

Recharts是使用React和D3构建的重新定义的图表库，主要原则有

1. 声明式的标签，让写图表和写 HTML 一样简单

2. 贴近原生 SVG 的配置项，让配置项更加自然

3. 接口式的 API，解决各种个性化的需求

### 安装

因为在 React 中使用，所以在 R 中的安装就不提了

```
npm install recharts -S
```

### 使用

在 React 中引用，首先选择图表类型

```js
import { PieChart, Pie } from 'recharts'
//这里我们使用 饼状图。所以引用饼状图和其子组件
```

然后添加数据，一般为后台请求数据，这里我们使用假数据

```js
const data = [
  {name: '水分', value: 200},
  {name: '糖分', value: 100},
  {name: '脂肪', value: 130},
  {name: '蛋白质', value: 100}
]
```

最后添加需要的组件

```html
<PieChart width={300} height={300}>
  <Pie data={data} fill="#8884d8"></Pie>
</PieChart>
```

修改组件配置，以达到想要的效果

```js
const COLORS = ['#f4baba', '#e0cd84', '#91e1dd', '#a48ad4']
<PieChart width={220} height={220}>
  <Pie
    data={data}
    cx={110}
    cy={110}
    dataKey={'value'}
    outerRadius={80}
    innerRadius={40}
    fill="#8884d8"
  >
    {
      data.map((entry, index) =>
        <Cell key={index} fill={COLORS[index % COLORS.length]}/>
      )
    }
  </Pie>
</PieChart>
```

配置信息说明：
 - Pie：[点击查看](http://recharts.org/#/zh-CN/api/Pie)
 - Cell：[点击查看](http://recharts.org/#/zh-CN/api/Cell)
 - PieChart：[点击查看](http://recharts.org/#/zh-CN/api/PieChart)

### 动态效果

配合`react-transition-group`插件实现动态效果

#### 装包

```
npm i react-transition-group -S
```

#### 引用

```js
import { CSSTransitionGroup } from 'react-transition-group'
```
#### 使用

```html
<CSSTransitionGroup
  transitionName="example"
  transitionEnterTimeout={500}
  transitionLeaveTimeout={300}>
  {items}
</CSSTransitionGroup>
```

### 代码参考

 - Github 在线查看：[点击查看](https://github.com/l552177239/react-recharts)

#### 代码展示

```js
import React, { Component } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { CSSTransitionGroup } from 'react-transition-group'
import './pie-chart.css'

const COLORS = ['#f4baba', '#e0cd84', '#91e1dd', '#a48ad4']
const data = [
  {name: '水分', value: 300},
  {name: '糖分', value: 100},
  {name: '脂肪', value: 100},
  {name: '蛋白质', value: 500}
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      c: 'a'
    }
  }
  clickCell = (entry, index) => {
    let newItems = this.state.items.slice();
    newItems.push({
      name: entry.name,
      value: entry.value,
      color: COLORS[index % COLORS.length]
    })
    this.setState({
      items: newItems
    })
  }
  render() {
    let width = window.innerWidth - 40
    const items = this.state.items.map((item, i) => (
      <div key={item.color} className="legend">
        <div className="legend-name" style={{ 'background' : item.color}}>
          {item.name}
        </div>
        <div className="legend-value" style={{ 'border' : `3px solid ${item.color}`}}>
          {item.value} mg
        </div>
      </div>
    ))
    return (
      <div className="App">
        <PieChart width={width} height={220} onMouseEnter={this.onPieEnter}>
          <Pie
            data={data}
            cx={width/2}
            cy={110}
            dataKey={'value'}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
          >
            {
              data.map((entry, index) =>
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  onClick={() => this.clickCell(entry, index)}/>
              )
            }
          </Pie>
        </PieChart>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default App
```
### 参考

 - 官网：[点击进入](http://recharts.org/#/zh-CN/)
 - GitBook文档：[点击进入](https://recharts.cosx.org/)
 - 知乎专栏：[点击进入](https://zhuanlan.zhihu.com/p/20641029)
 - 官方文档：[点击进入](https://madlogos.github.io/recharts/index_cn.html#-en)
