# React组件：react-burger-menu

因为我们用 `create-react-app` 创建的 React 环境，
所以在这里我们使用 React 的组件形式。

### 装包

```
npm install react-burger-menu --save
```

### 使用

#### 首先导入组件

```js
import { slide as Menu } from 'react-burger-menu'
```

#### 将需要的侧边栏的项目，放在`<Menu>`内

```html
<Menu>
  <a href='' />
</Menu>
```

贴入 CSS 样式，将自己需要的样式，进行定制

```css
/* Position and sizing of burger button */
.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 36px;
  top: 36px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #373a47;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/* General sidebar styles */
.bm-menu {
  background: #373a47;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #373a47;
}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
```

**小贴士**：一般我们修改别人的样式或者插件的样式时，不是直接删除 重写 覆盖，而是在下面写一个自己定制的样式

```css
/* Liu custom */

/* Position and sizing of burger button */
.bm-burger-button {
  position: fixed;
  width: 18px;
  height: 12px;
  left: 20px;
  top: 46px;
}
```

### 怎么解决路由跳转时，侧边栏直接消失的问题

> 利用插件的`isOpen`使侧边栏先消失，再跳转。

在组件中创建一个`isOpen`状态值，写一个方法用来控制这个状态值，
最后用这个状态去控制插件的 isOpen

将这个方法绑定到需要跳转的路由上，就可以解决这个问题

```

<Menu isOpen={this.state.isOpen}>
```

### 参考

  - Github地址：[点击进入](https://github.com/negomi/react-burger-menu)

  - CTOLib社区：[点击进入](https://www.ctolib.com/react-burger-menu.html)
