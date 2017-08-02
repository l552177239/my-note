# FileReader

FileReader 用来把文件读入内存，并且读取文件中的数据。FileReader对象 提供了一个异步API，使用该 API 可以在浏览器主线程中异步访问文件系统，读取文件中的数据

其中 File对象 可以是来自用户在一个`<input>`元素上选择文件后返回的 FileList对象，也可以来自拖放操作生成的 DataTransfer对象,还可以是来自在一个 HTMLCanvasElement 上执行 mozGetAsFile() 方法后返回结果。

### 构造函数

声明并返回一个新构造的 FileReader对象

```
let reader = new FileReader()
```

### 属性

属性名         |	类型	          | 描述
------------- |	-------------- | ------------------------------------------------------
error         |	DOMError	     | 在读取文件时发生的错误. 只读.
readyState	  |	unsigned short | 表明FileReader对象的当前状态. 值为State constants中的一个. 只读
result	      |	jsval          | 读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的. 只读.

### 方法

FileReader接口的方法

方法名               |         参数         | 描述
------------------- | ------------------- | -----------------------------
abort	              | (none)	            | 终止读取操作
readAsBinaryString	| file              	| 将文件读取为二进制编码
readAsText          | file,[encoding]	    | 将文件读取为文本
readAsDataURL     	| file	              | 将文件读取为DataURL


FileReader接口有4个方法，其中3个用来读取文件，另一个用来中断读取。无论读取成功或失败，方法并不会返回读取结果，这一结果存储在result属性中。

### 事件

FileReader 接口包含了一套完整的事件模型，用于捕获读取文件时的状态


事件           | 描述
------------- | --------------------------------------------------------------------
onabort	      | 当读取操作被中止时调用
onerror       |	当读取操作发生错误时调用
onloadstart	  | 当读取操作将要开始之前调用
onprogress	  | 在读取数据过程中周期性调用
onload	      | 当读取操作成功完成时调用
onloadend	    | 当读取操作完成时调用,不管是成功还是失败.该处理程序在onload或者onerror之后调用

### 使用

一般通过 DOM节点 拿到文件读取的结果

```
// 一个文件上传的回调 <input type="file" onchange="onChange(event)">
function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    // 文件里的文本会在这里被打印出来
    console.log(event.target.result)
  };

  reader.readAsDataURL(file);
}
```
