## JSON

### 简介

 - JavaScript 对象表示法（JavaScript Object Notation）。
 - 存储和交换文本信息的语法。类似 XML。
 - 比 XML 更小、更快，更易解析。

### Json语法

```js
var jsonObject=
	{
		propertyName(属性名):value(值),
		//对象内的属性语法（属性名与属性值是成对出现的）
		functionName(函数名):fucntion(){.......}
		//对象内的函数语法（函数名与函数内容是成对出现的）
	}
```

 - 数据在名称/值对中 "":""
 - 数据由逗号分隔  "":"","":""
 - 花括号保存对象 {}
 - 方括号保存数组  [{},{}]

### Json 方法

`JSON.stringify`（把JS对象转化为JSON对象）

```js
let obj1 = {
	name:'qiu',
	age:24
}
let obj2 = [
	{name:'liu',age:24},
	{name:'zhang',age:55}
]

let obj = JSON.stringify(obj2)
console.log(typeof obj,obj)
//typeof 数据类型检测
```

**注意**：json是一个字符串

`JSON.parse`（把JSON字符串转换为对象）

```js
let jso = '{"employees": [{ "firstName":"Bill" , "lastName":"Gates" },{ "firstName":"George" , "lastName":"Bush" },{ "firstName":"Thomas" , "lastName":"Carter" }]}'

let json = JSON.parse(jso)
console.log(typeof json,json)
```
