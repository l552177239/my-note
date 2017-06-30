---
title: 箭头函数
---

## 箭头函数

ES6允许使用“箭头”（=>）定义函数。

```
let [函数名] = (参数) => (
	返回值
)
```
等同于下面函数
```
function [函数名]([参数]){
	return (
	返回值
	)
}
```
**注意**：箭头函数的参数小括号，一位参数时可以省略小括号。

如果函数执行多条js语句，用**{}**包裹。
如果有返回值使用**return**返回
```
let [函数名] = (参数) => {
	js语句;
	return (
		返回值
	)
}
```

如果函数返回对象，用**({})**包裹

```
let [函数名] = (参数) => ({
	js语句;
	return (
		返回值
	)
})
```

匿名箭头函数

```
setTimeout(function(){
        console.log('a')
      } ,1000)
```
可以写为
```
setTimeout( () => 
	console.log('a')
,3000)
```
箭头函数的**this**指向


```
let sun = () => console.log(this);
sun()
```
指向定义时所在的对象，而不是使用时所在的对象。

普通函数指向window
```
function sun(){
	console.log(this)
};
sun()
//undefined
```
在严格模式下输出undefined


箭头函数指向的this在声明时就会绑定，以后所有的this都指向声明时的this。
```
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
```
箭头函数里的this指向本身，也就是foo，执行foo的时候指向foo的id替换为42