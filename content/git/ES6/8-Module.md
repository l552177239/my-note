---
title: 模块的语法
---

## 模块(Module)

### 导出：export

命名导出
```
var a = 1
var b = 2
var person = () => console.log('a')
export { a,b,person }
```

默认导出

```
export default App
```

### 导入：**import**

命名导入

**as**
```
import {a as c,b,person} from './app'
console.log(c,b,person)
```
a作为c导入，a可以再次使用，并不会被覆盖

全部导入（*）

```
import * as c from './app'
console.log(c)
```

直接导入

```
import './app'
```
会把导入的代码整体粘贴过来
