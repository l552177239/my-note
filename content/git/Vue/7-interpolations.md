# 模板语法

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上， Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，在应用状态改变时， Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。

### 指令

带有 v- 前缀的特殊属性。指令属性的值预期是`单一 JavaScript 表达式`（除了 v-for，之后再讨论）。指令的职责就是当其表达式的值改变时相应地将某些行为应用到 DOM 上

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

```html
<li v-for='(item,i) in todos'>
	index:{{i}}----{{item.text}}
</li>
```

```js
data:{
	todos: [
		{id:1,text:'do what'},
		{id:2,text:'do why'},
		{id:3,text:'do when'}
	]
}
```

**v-for**

对象的遍历

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

没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象

```html
<div v-bind:id='id' v-bind:class='"main"'></div>
```

行内样式的写法

```js
:style="{color:'teal',fontSize:'20px'}"
```

对象写法

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```

直接绑定到一个样式对象

```html
div v-bind:style="styleObject"></div>
```

```js
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

```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
```

```js
new Vue({
  el: '...',
  data: {
    checkedNames: ['John']
  }
})
```

#### 参考：

官网API：https://cn.vuejs.org/v2/api/#v-text

### 修饰符

修饰符（Modifiers）是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

#### `.prevent`

Prevent 修饰符告诉 v-on 指令对于触发的事件调用 `event.preventDefault()`：

```js
<form v-on:submit.prevent="onSubmit"></form>
```

#### `.lazy`

在默认情况下， v-model 在 input 事件中同步输入框的值与数据 (除了 上述 IME 部分)，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步：

```html
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >
```

#### `.number`

如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符 number 给 v-model 来处理输入值：

```html
<input v-model.number="age" type="number">
```

#### `.trim`

如果要自动过滤用户输入的首尾空格，可以添加 trim 修饰符到 v-model 上过滤输入：

```html
<input v-model.trim="msg">
```

### 计算属性

```js
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

可以用 v-on 指令监听 DOM 事件来触发一些 JavaScript 代码

```html
<div id="example-1">
  <button v-on:click="counter += 1">增加 1</button>
  <p>这个按钮被点击了 {{ counter }} 次。</p>
</div>
```

```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```

```html
<h1 v-show='show'>Hello Word</h1>
<button v-on:click='change("hello",$event)'>切换<button>
```

```js
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

```html
<!--<my-chile></my-chile>-->
```

### 过滤器

Vue.js 允许你自定义过滤器，可被用作一些常见的文本格式化。过滤器可以用在两个地方：mustache 插值和 v-bind 表达式。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示：

```html
<!-- in mustaches -->
{{ message | capitalize }}
<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

过滤器函数总接受表达式的值作为第一个参数

```js
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

```js
{{ message | filterA | filterB }}
```

过滤器是 JavaScript 函数，因此可以接受参数：

```js
{{ message | filterA('arg1', arg2) }}
```

这里，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数

### 缩写

v- 前缀在模板中是作为一个标示 Vue 特殊属性的明显标识。当你使用 `Vue.js` 为现有的标记添加动态行为时，它会很有用，但对于一些经常使用的指令来说有点繁琐。同时，当搭建` Vue.js` 管理所有模板的 SPA 时，v- 前缀也变得没那么重要了。因此，`Vue.js` 为两个最为常用的指令提供了特别的缩写：

#### v-bind 缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```

#### v-on 缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

它们看起来可能与普通的 HTML 略有不同，但 `:`与 `@`对于属性名来说都是合法字符，在所有支持 `Vue.js` 的浏览器都能被正确地解析。而且，它们不会出现在最终渲染的标记。

### 参考

	- vue文档：[点击进入](https://cn.vuejs.org/v2/guide/syntax.html)

	- API文档：[点击进入](https://cn.vuejs.org/v2/api/#指令)
