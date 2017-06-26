---
title: Class的基础语法与继承
---

## Class 的基础语法与继承

### JS构造函数

```
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

 - 通过**class**关键字（语法糖），可以定义类。

 - class下只能写方法，方法之间不用符号隔开

 - constructor（构造器）class方法中的特殊方法，只要调用class就会自动执行，接受实例对象的参数

 - extends（继承）

 - super继承父类的属性

```
class Person {
	//私有方法
	constructor(name) {
		this.name = name;
	}
	say(){
	console.log(say)
	}
	//公有方法
}

class Women extends Person{
	constructor(tall,name){
		super(name)
		this.tall = tall
	}
	run(){
		console.log(run)
	}
}

var person = new Women()
console.log(person)
```