### Context

`context`是在 **react @ 0.14** 版本以后发布的一个高级且实验性的功能，有可能在未来做出更改。不推荐使用!

#### 使用 Context 的原因

实现 **越级**传递`props`

#### 例

祖父组件
```
import React, { Component } from 'react'
import propTypes from 'prop-types'

import Father from './Father'

class GrandFather extends Component {
  getChildContext(){
    return {
      hello:"son"
    }
  }
  render(){
    return (
      <div className="grandFather">
        <h1>GrandFather</h1>
        <Father />
      </div>
    )
  }
}
GrandFather.childContextTypes = {
  hello:propTypes.string
}

export default GrandFather
```

父组件

```
import React, { Component } from 'react'
import Son from './Son'

class Father extends Component {
  render() {
    return (
      <div className="father">
        <h1>Father</h1>
        <Son />
      </div>
    )
  }
}

export default Father
```

子组件

```
import React, { Component } from 'react'
import propTypes from 'prop-types'

class Son extends Component {
  render() {
    console.log(this.context)
    return (
      <div className="son">
        <h1>Son</h1>
        <h1>{this.context.hello}</h1>
      </div>
    )
  }
}

Son.contextTypes = {
  hello:propTypes.string
}
export default Son
```
