# 上传文件

初始化项目 upload-test

### 选择文件

利用`input`的 file 类型进行文件的选择

```js
handleChange = () => {
  console.log(1)
}

<input type='file' className='file-input' onChange={this.handleChange} />
```

如果选择成功，控制台输出`1`

### 拿到文件路径

利用`event.target.files[0]`拿到文件的路径，文件名等数据

```js
handleChange = (e) => {
  const file = e.target.files[0]
  console.log(file)
}
```

选择成功后，控制台输出文件地址，文件名等信息

### 拿到文件数据

利用 HTML5 定义的读取文件 API 的`FileReader`方法

```js
handleChange = (e) => {
  const file = e.target.files[0]
  let reader = new FileReader()
  //声明一个 FileReader 对象
  reader.onload = (event) => {
  //当资源及其依赖资源完成加载时，触发 FileReader.onload 属性
    console.log(event.target.result)
  }
  reader.readAsDataURL(file)
  //将读取到的文件编码成Data URL，并触发 onload
}
```

如果加载成功，控制台会输出编码为`base-64`的文件

### 将数据转换为可传输数据

通过FormData对象可以组装一组用 XMLHttpRequest发送请求的键/值对。它可以更灵活方便的发送表单数据，因为可以独立于表单使用。如果你把表单的编码类型设置为multipart/form-data ，就可以进行文件的传输

因为 axios 不能进行文件的直接进行请求发送，这样我们需要利用 form 来进行数据传输

为了更灵活的发送表单数据（当然也可以用`<form>`标签进行包裹）我们需要声明一个新的 FormData对象

```js
let formData = new FormData()
```

调用 formData 的 append() 方法进行添加文件

```js
formData.append('avatar', file)
//调用 formData 的 append() 方法添加文件
```

这样保证表单的编码类型为 multipart/form-data

### 将数据上传

利用 axios 将文件上传发送到服务器

```js
axios.post(` http://yummy.haoduoshipin.com/avatar`, formData)
  .then(res=>{res=>console.log(res.data)})
  .catch(err => console.log(err))
```

### 参考

  - 查看在线代码：[点击查看](https://github.com/l552177239/file-upload)
