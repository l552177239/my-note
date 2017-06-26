---
title: Hello React
---

### Hello React

#### 初始化一个项目react-hello

```
create-react-app react-hello
```

**注意**：不要出现项目套项目，仓库套仓库。项目名称不要取包名（react...）。

#### 启动项目

```
npm start
```
成功启动说明项目成功初始化

#### 退出项目

```
ctrl + C
```

#### 修改项目

删除src文件夹重新创建一个src
```
rm -rf src && mkdir src
```

在src下新建一个index.js并返回项目文件夹
```
cd src && touch index.js && cd ..
```

**注意**：命令行下的位置

小贴士：**console.dir()** 详细信息 

在index.js中写入下面代码
```
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<h1>Hello React</h1>,document.getElementById('root'))
```

启动项目
```
npm start
```
