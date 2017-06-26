### 数据类型检测

**prop-types**包（React组件属性类型校验）

装包：

```
npm i prop-types --save
```

引用

```
import PropTypes from 'prop-types'
//利用包的PropTypes.number检测tal是否为数字
Btn.propTypes = {
  tal:PropTypes.number
}
```