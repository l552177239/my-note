# 基本概念

#### 构造器

每个 Vue.js 应用都是通过构造函数 Vue 创建一个 Vue 的 **根实例** 启动的：

```
var vm = new Vue({
  // 选项
})
```

#### 属性与方法

**el**

提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例（类似于React里的render
）。

**data**

每个 Vue 实例都会 **代理** 其 data 对象里所有的属性（类似于React里的state）：
```
<p>{{num}}</p>
```

```
var vm = new Vue({
	el:'#app',
	data:{
		num:'8'
	}
})
```

### 声明式渲染

Vue.js 的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进 DOM：
```
<div id="app">
  {{ message }}
</div>
```

```
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

### 指令

带有 v- 前缀的特殊属性。指令属性的值预期是单一 JavaScript 表达式（除了 v-for，之后再讨论）。指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上

**v-text**
```html
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```

**v-if**，
**v-else**，
**v-else-if**

根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 <template> ，将提出它的内容作为条件块。

```html
<template>
<!--包裹判断的元素，判断元素相邻不用包裹-->
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
</template>
```

```JS
var vm = new Vue({
	el:'#app',
	data:{
		type:'A'
	}
})
```

**v-show**

**v-for**

基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 alias in expression ，为当前遍历的元素提供别名：

```
<li v-for='(item,i) in todos'>
	index:{{i}}----{{item.text}}
</li>
```
```
data:{
	todos: [
		{id:1,text:'do what'},
		{id:2,text:'do why'},
		{id:3,text:'do when'}
	]
}
```

**v-for** 对象的遍历

```js
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }} : {{ value }}
</div>
```

```js
data:{
	object: {
		FirstName: 'John',
		LastName: 'Doe',
		Age: 30
	}
}
```

**v-bind**

动态地绑定一个或多个特性，或一个组件 prop 到表达式。

在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。

在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。

没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。
```
<div v-bind:id='id' v-bind:class='"main"'></div>
```

行内样式的写法

```
:style="{color:'teal',fontSize:'20px'}"
```

对象写法

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象

```
div v-bind:style="styleObject"></div>
```
```
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

**v-model**

表单控件绑定

```html
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me">
```
多个勾选框，绑定到同一个数组：
```
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
```
```
new Vue({
  el: '...',
  data: {
    checkedNames: ['John']
  }
})
```

**修饰符**

.lazy

在默认情况下， v-model 在 input 事件中同步输入框的值与数据 (除了 上述 IME 部分)，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：
```html
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >
```

.number

如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：
```
<input v-model.number="age" type="number">
```

.trim

如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入：
```
<input v-model.trim="msg">
```

###计算属性

```
data:{
	books:[
		{name:'Nodejs',price:5,num:3},
		{name:'Vue',price:10,num:2},
		{name:'React',price:50,num:10},
	],
	computend:{
		totalMoney:function(){
			let todal = 0
			this.books.forEach(item => total+=item.price*item.num)
			return todal
		}
	}
}
```

**v-on**

可以用 v-on 指令监听 DOM 事件来触发一些 JavaScript 代码。
```
<div id="example-1">
  <button v-on:click="counter += 1">增加 1</button>
  <p>这个按钮被点击了 {{ counter }} 次。</p>
</div>
```
```
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```
```
<h1 v-show='show'>Hello Word</h1>
<button v-on:click='change("hello",$event)'>切换<button>
```
```
data:{
	show:true
}
methods:{
	change(text,event){
		console.log(text,event)
		this.show = !this.show
	}
}
```

挂载
```
<!--<my-chile></my-chile>-->
```

### 过滤器

Vue.js 允许你自定义过滤器，可被用作一些常见的文本格式化。过滤器可以用在两个地方：mustache 插值和 v-bind 表达式。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示：
```
<!-- in mustaches -->
{{ message | capitalize }}
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

过滤器函数总接受表达式的值作为第一个参数。
```
new Vue({
  // ...
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
```

可以同时写2个过滤器
```
{{ message | filterA | filterB }}
```

过滤器是 JavaScript 函数，因此可以接受参数：
```
{{ message | filterA('arg1', arg2) }}
```
这里，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数。

### Props

组件实例的作用域是孤立的。这意味着不能(也不应该)在子组件的模板内直接引用父组件的数据。要让子组件使用父组件的数据，我们需要通过子组件的props选项。
子组件要显式地用 props 选项声明它期待获得的数据：
```
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ message }}</span>'
})
```

注意：在声明props和插入节点的时候用驼峰命名，在HTML内用`-`连接
