## Ant Design

### 简介
Ant Design 是蚂蚁金服开发和正在使用的一套企业级的前端设计语言和基于 React 的前端框架实现。

### 安装

使用`npm-package`安装`ant-design`

```
npm install antd --save
```

### 引用

>使用`create-react-app`进行开发时，一般在`index.js`中引入`antd`的CSS

```
import 'antd/dist/antd.min.css'
```

>修改`import [需要的组件] from antd/lib/[需要的组件]`，引入需要的按钮组件

```
import Button from 'antd/lib/button'
```

>使用引入的组件时，直接写就可以了

```
<Button>点击</Button>
```

>通过官网给出的 API 来设置属性，按钮样式也会发生改变。
推荐顺序为：type -> shape -> size -> loading -> disabled

**例**：按钮的属性：[点击查看](https://ant.design/components/button-cn/)

```
<div>
	<Button type="primary" shape="circle" size='large'>P</Button>
  <Button loading={this.state.loading}>Default</Button>
  <Button type="danger" onClick={()=>this.setState({loading:!this.state.loading})}>Danger</Button>
</div>
```

### 栅格组件：[点击查看](https://ant.design/components/grid-cn/)

ANTD的24等分栅格系统，`flex`布局的栅格系统允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序

 - 通过row在水平方向建立一组column（简写col）
 - 你的内容应当放置于col内，并且，只有col可以作为row的直接元素
 - 栅格系统中的列是指1到24的值来表示其跨越的范围。例如，三个等宽的列`.col-8`
 - 如果一个row中的col总和超过 24，那么多余的col会作为一个整体另起一行排列

### 参考

 - Ant-Design官网地址：[点击进入](https://ant.design/index-cn)
