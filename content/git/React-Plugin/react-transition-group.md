# React-transition-group

> React 过渡动画插件

react-transition-group 插件是 React 的 Animation Add-Ons（ReactTransitionGroup 和 ReactCSSTransitionGroup）拆分出来的插件，是 React 动画库的重要组成部分

### 装包

```
npm install react-transition-group --save
```

### 使用

> 根据组件内部 state 的改变来触发组件的动画处理

```html
<CSSTransitionGroup
  transitionName="example"
  transitionEnterTimeout={500}
  transitionLeaveTimeout={300}>
  {items}
</CSSTransitionGroup>
```


### 参考

 - 文档说明：[点击查看](https://reactcommunity.org/react-transition-group/)
 - React官网：[点击查看](https://facebook.github.io/react/docs/animation.html)
 - Github项目：[点击查看](https://github.com/liangklfangl/react-animation-demo)
