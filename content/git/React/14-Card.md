### 小案例（card）

```
import React from 'react'
import './App.css'
import Card from './Card'

class App extends React.Component{
    render(){
        console.log(this.props)
        return (
            <div className='app'>
                <Card title='Card title' more={<a href="http://baidu.com">More</a>} >
                    <p>每个人心中都有一团火， 路过的人只看到烟。</p>
                    <p style={{textAlign:'right'}}>——文森特·梵高</p>
                </Card>
                
            </div>
            )
    }
}
export default App
```

可复用子组件

```
import React from 'react'
import PropTypes from 'prop-types'

class Card extends React.Component{
    render(){
        return (
            <div className='card'>  
                <div className='header'>
                    <h4>{this.props.title}</h4>
                    <div className='more'>{this.props.more}</div>
                </div>
                <div className='main'>
                    {this.props.children}
                </div>
            </div>
            )
    }
}

Card.defaultProps = {
    title:'请输入标题',
    more:<a href="#">More</a>,
    children:'请传入内容'
}
Card.propTypes = {
    title:PropTypes.string,
    more:PropTypes.element,
    children:PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
      ])
}
export default Card
```