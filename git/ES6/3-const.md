---
title: const
---

## Const 语句

**const**声明一个只读的常量。一旦声明，常量的值就不能改变。常量是块级作用域。

```
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

const一旦声明变量，就必须立即初始化，不能留到以后赋值。只声明不赋值，就会报错。

```
const foo;
// SyntaxError: Missing initializer in const declaration
```

 1. const的作用域与let命令相同：只在声明所在的块级作用域内有效。
 2. const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
 3. 不可重复声明。

### 将一个对象声明为常量必须非常小心。

```
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

可以修改（追加）a下的属性，不容许修改他本身的值

### ES6声明变量的六种方法
ES5 只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有6种声明变量的方法。
