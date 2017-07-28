# Shell 基础

Shell 是 Linux 上的一个程序（用 C 语言编写），类似于 Window 上的 DOS，不过比 DOS 强大的多。Shell 既是一种命令语言，又是一种程序设计语言。

实际上Shell是一个命令解释器，它解释由用户输入的命令并且把它们送到内核。不仅如此，Shell有自己的编程语言用于对命令的编辑，它允许用户编写由shell命令组成的程序

### shell版本

每个Linux系统的用户可以拥有他自己的用户界面或Shell，想看看你的Shell是哪一种，执行下面的命令

```
echo $SHELL
```

### 运行 Shell scripts 有两种方法：

 - 作为可执行程序

将上面的代码保存为 test.sh，并 cd 到相应目录：

```
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```
注意，一定要写成 `./test.sh`，而不是 `test.sh`，运行其它二进制的程序也一样，直接写 `test.sh`，linux 系统会去 PATH 里寻找有没有叫 `test.sh` 的，而只有 `/bin`, `/sbin`, `/usr/bin`，`/usr/sbin` 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 `test.sh` 是会找不到命令的，要用 `./test.sh` 告诉系统说，就在当前目录找。

 - 作为解释器参数

这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：

```
/bin/sh test.sh
/bin/php test.php
```

这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用

### shell scripts 的使用

Shell Script是一种弱类型语言，就像是早期 DOS 年代的批次檔 (.bat)

#### 例子：一段简单的 Shell

我们创建一个简单的 Shell 程序，实现以下功能
 - 在用户主目录下创建一个 test 文件夹
 - 在用户主目录下创建 10 个规定命名格式的空文件

```shell
#!/bin/bash

cd ~
mkdir test

for ((i=0; i<10; i++))
do
  touch test_$i.txt
done
```

翻译上面代码

1. 指定脚本解释器，这里是用`/bin/bash`做解释器
2. 切换到用户主目录，也就是`/home/[用户名]`
3. 创建一个名为`test`的空目录
4. 写一个执行 10 次的 for 循环
5. 开始执行
6. 创建 10 个名称为test_0.txt, test_1.txt ...格式的空文件
7. 完成

**小贴士**:

cd、mkdir 和 touch 都是系统自带的程序，一般在`/bin`目录下；
而 for、do 和 done 都是 Shell 的关键字。
Shell 中使用`#`开头的行就是注释。

### 参考

 - Linux中国：[点击进入](https://linux.cn/)

 - Linux官网：[点击进入](https://www.linux.org/)

 - Linux公社：[点击进入](http://www.linuxidc.com/)

 - 鸟哥 Linux：[点击进入](http://linux.vbird.org/)

 - Linux命令大全：[点击进入](http://man.linuxde.net/)

 - Linux下载站：[点击进入](http://www.linuxdown.net/)

 - 菜鸟教程：[点击进入](http://www.runoob.com/linux/linux-shell.html)
