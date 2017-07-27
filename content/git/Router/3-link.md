## Link

Link组件用于取代`<a>`元素，生成一个链接，允许用户点击后跳转到另一个路由。
它基本上就是`<a>`元素的React 版本，可以接收Router的状态。

### 使用时需要先引用组件

```js
import { Link } from 'react-router-dom'
```

### 写入跳转地址

```js
<Link exact to="/about">About</Link>
//to：（string）链接到的路径名或位置
//exact 严格匹配
```


### 可以`to`一个`location`对象

```js
<Link to={ {
  pathname: '/courses',
  //URL的路径
  search: '?sort=name',
  //URL查询字符串
  hash: '#the-hash',
  //URL哈希片段
  state: { fromDashboard: true }
  // state使用时作为一个对象，可以设置位置特定的状态
  //对象内可以自己写内容。
} }/>
```

### NavLink

> `<NavLink>`是可以添加样式的 Link

##### `<NavLink>`直接添加样式，给名为`active`的`class`添加样式

##### 可以给NavLink添加className

```js
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```

##### 可以给NavLink添加activeStyle: object

```js
<NavLink
  to="/faq"
  activeStyle={ {
    fontWeight: 'bold',
    color: 'red'
   } }
>FAQs</NavLink>
```

### Redirect

`Redirect`（重定向）：<Redirect> 渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址。

```js
<Switch>
  <Redirect from='/old-path' to='/new-path'/>
  //from 原来的地址
  //to 需要跳转的地址
  <Route path='/new-path' component={Place}/>
</Switch>
```
