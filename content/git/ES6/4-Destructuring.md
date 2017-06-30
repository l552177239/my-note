---
title: 变量的解构赋值
---

### 数组的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

```
let [a, b, c] = [1, 2, 3]
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

**注意**，let数组里的值，可以是数字、变量、对象、函数等、但无法拿到空格占位。

```js
let [a,b,c,d,,] = [1,"aaa",{name:'sayname'},function(){}];
console.log(a,b,c,d);
```
**Rest**参数

 - rest参数只包括那些没有给出名称的参数，arguments包含所有参数；
 - arguments对象不是真正的array，而rest参数是Array的实例，可以直接应用sort, map, forEach, pop等方法；
 - arguments对象拥有一些自己额外的功能。

Rest参数接收函数的多余参数，组成一个数组，放在形参的最后，形式如下：
```
function func(a, b, ...theArgs) {
    // ...
}
```

例：剩余参数数组里值的和

```
var sum = (a,...rest) => {
let rests = 0
for(let i=0;i<rest.length;i++){
    if( isNaN(Number(rest[i])) ){continue}
        rests += Number(rest[i]) ;        
}
//continue（继续）
return rests
}
console.log(`输出：${rests}`)
```

数组的扩展用 **...** 展开

例子：连接两个数组

```
let arr1 = [1,2,3,4]
let arr2 = [5,6,7,8]
//ES5写法：var arr = arr1.concat(arr2,[9])
var arr = [...arr1,...arr2,9]
console.log(arr)
```

**注意**，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。

### 对象的解构赋值

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。如果变量名与属性名不一致，必须写成下面这样。

```
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

例子：利用对象解构赋值变量取属性同名的值
```
//父组件
<Modal title='标题' cancelText='取消' okText='确定' show={this.state.show} onShow={this.handleClick}  >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
子组件想拿到父组件里的同名属性
let {title,children,cancelText,okText} = this.props
//等同于声明一个变量等于this.props下的同名属性
//let title = this.props.title等等
//下面使用时不用再写this.props.title可以代替直接用title代替
```

```
let hello = ({name,age}) => (
	console.log(`my name:${name},age:${age}`)
)
hello({name:'Liu',age:'24'})
```

对象的解构赋值是下面形式的简写

```
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
//简写形式：let{foo,bar}={foo: "aaa", bar: "bbb"}
```

将obj中的对象foo赋值给一个变量。

```
let obj = {bar:'bbb',foo:'aaa',name:'sayname'};
let {foo} = obj;
console.log(foo);
var foo = obj.foo;
```

### 字符串的解构赋值

按字符串下标赋值。

```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

```
let {length : len} = 'hello';
len // 5
```

### 对象的结构赋值：	


```js
let name = 'liuenqing';
let age = 22;
let say = function(){
	console.log(1)
}
let obj = {
	name,
	age,
	say,
	run(){
		console.log('run')
	}
}
console.log(obj)
```

对象的扩展（合并）

```
let obj1 = {name:'Liu'}
let obj2 = {age:'24',Gender:'man'}
Object.Assign({},obj1,obj2)
//必须都为对象
//obj.name会对name的值进行字符串解构
```

更为强大的 **...** 

```
let obj1 = {name:'Liu'}
let obj2 = {age:'24',Gender:'man'}
var obj = {...obj1,...obj2,say(){}}
console.log(obj)
```
