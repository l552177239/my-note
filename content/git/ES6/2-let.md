---
title: let
---

## Let 语句

**let**（声明变量）声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。

let允许你声明一个作用域被限制在块级中的变量、语句或者表达式。与var关键字不同的是，var声明的变量只能是全局或者整个函数块的。

### 块级作用域

let实际上为 JavaScript 新增了块级作用域。
（let被限制在大括号里{}）

```
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

let声明的变量只在它所在的代码块有效

```es6
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

ES6 允许块级作用域的任意嵌套且外层作用域无法读取内层作用域的变量

```
{
   {
    {let insane = 'Hello World'}
    console.log(insane); // 报错
   }
};
```

内层作用域可以定义外层作用域的同名变量

```
{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
};
```

### 不存在变量提升

```
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

### 暂时性死区

```
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

### 不允许重复声明

let不允许在相同作用域内，重复声明同一个变量。

```
function () {
  let a = 10;
  var a = 1;
}
// 报错

function () {
  let a = 10;
  let a = 1;
}
// 报错
```

因此，不能在函数内部重新声明参数。

```
function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```
