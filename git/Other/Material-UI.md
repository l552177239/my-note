## Material-UI

Material-UI采用 Material Design风格的React UI组件。

### 配置环境

#### 首先需要React环境

#### 然后用`npm-package`安装material-ui的包

```
npm i material-ui --save
```

#### 安装依赖的包`react-tap-event-plugin`

`Material-UI`使用`react-tap-event-plugin`来监听`touch/tap/click`事件，使之得到快速的响应，这个插件是临时的，一旦React的官方发布相应的插件，我们将马上去掉。但是， 在那之前，你一定要在你的应用注入这个插件。
```
npm i react-tap-event-plugin@^2.0.1 --save
```

#### 安装`Roboto`的字体

Material-UI 采用 google Roboto 字体，所以请确保在项目中引入字体。
```
npm i typeface-roboto --save
```

### 引用

```
import 'typeface-roboto'
//导入`roboto`字体
import injectTapEventPlugin from 'react-tap-event-plugin'
//导入依赖
injectTapEventPlugin()
//启动时注入（执行）
```

```
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//导入主题
import RaisedButton from 'material-ui/RaisedButton'
//导入需要使用的组件（这里我们使用一个按钮）
```

使用字体图标时需要引用`Material-Design-icon`

### 使用

这里就是简单引用一下，直接到官网去学习。
```
import React from   'react'
import { BrowserRouter,Route,Link } from 'react-router-dom'
import Btn from './Btn'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'

class App extends React.Component{
  render(){
    return(
      <div>   
        <BrowserRouter>
        <MuiThemeProvider>
        <div className="app">
            <Link to='/btn'>进入Btn</Link>
            <Route path='/btn' component={Btn}/>
            <RaisedButton label="Default" />
            <AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more"></AppBar>
        </div>
        </MuiThemeProvider>
        </BrowserRouter>
      </div>
    )
  }
}
export default App
```

### 参考

 - Material-UI官网：[点击进入](http://www.material-ui.com)
 - Material-UI中文网：[点击进入](http://design.1sters.com)
 - 极客学院：[点击进入](http://wiki.jikexueyuan.com/project/material-design/layout/adaptive-ui.html)
