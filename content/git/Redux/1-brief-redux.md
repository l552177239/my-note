# Redux

### 什么是`Redxu`

Redux作为一个`React`的组件，Redux 是`JavaScript`状态容器，提供可预测化的状态管理。
Redux在React中主要负责组件间数据传递，是一个数据流管理工具。

Redux作者`Dan`有一句名言

>一个 React 的 props 还用不好的开发者，是不应该去学 Redux

### Redux 的工作原理

Redux 是 Facebook 的 Flux 架构的一种简化实现。
（Redux 既是一个表示 “已返回” 的英文单词，也是 reducer + flux 的混合词。）
Flux 在本质上采用了模型-视图-控制器 (MVC) 的结构，但引入了很高的复杂性。
Redux 从 Elm 借用了缩减程序 (reducer) 的概念来降低了这一复杂性，
Elm 是一个基于不可变数据结构和纯函数的强大的反应式函数编程语言。
纯函数是没有副作用的函数，Redux 缩减程序是计算应用程序状态的纯函数。

### Redux 有 3 条原则：

 - 应用中所有的`state`都以一个对象树的形式储存在一个单一的`store`中。
 - 惟一改变`state`的办法是触发`action`，一个描述发生什么的对象。
 - 为了描述`action`如何改变`state`树，你需要编写`reducers`。