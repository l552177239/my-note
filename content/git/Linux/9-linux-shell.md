# 初识命令行界面

 Shell 是系统的用户界面，提供了用户与内核进行交互操作的一种接口。它接收用户输入的命令并把它送入内核去执行。

### shell 环境

Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。

Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

Ken Thompson 的 sh 是第一种 Unix Shell，Windows Explorer 是一个典型的图形界面 Shell。

### 怎么进入 shell

#### 方法一：图形界面中怎么进入 命令行界面

各种 Linux 版本开机就有好几个界面，一般有7个界面，其中 1 个是图形界面，6 个是控制台界面（输命令），编号为`tty1~tty7`。

界面之间切换快捷键：

```
Ctrl+Alt [f1~f7]
Ctrl+Alt+Fn [f1~f7]
Alt+Ctrl+shift+Fn [f1~f7]
//一般 f7 为图形界面
```

**注意**：每个控制台界面需要重新登录。因为只登录了图形界面。

#### 方法二：终端

当然有了图形界面，很多人会觉得再用完全控制台模式就很蛋疼。

在图形界面里可以找到系统工具，里面的终端，即可在图形界面中使用控制台 shell，就像在 windows 里使用 cmd 一样，符合使用 windows 的人的习惯。

打开终端快捷件

```
Ctrl+Alt+T
```

#### 方法三：开机进入命令行界面

有些人可能不想习惯图形模式，反而习惯dos的命令模式，怎么才能一开机就是控制台模式，而不要进入图形界面呢？

这是因为Linux操作系统有六种不同的运行级别(见 /etc/inittab 文件中描述)，在不同的运行级下，系统有着不同的状态，这六种运行级分别为:

```
Default runlevel. The runlevels used by RHS are:  
0 - halt (Do NOT set initdefault to this)  
1 - Single user mode  
2 - Multiuser, without NFS (The same as 3, if you do not have networking)  
3 - Full multiuser mode  
4 - unused  
5 - X11  
6 - reboot (Do NOT set initdefault to this)  
```

0：停机（记住不要把initdefault设置为0，因为这样会使Linux无法启动）
1：单用户模式，就像Win9X下的安全模式。
2：多用户，但是没有 NFS 。
3：完全多用户模式，标准的运行级。
4：一般不用，在一些特殊情况下可以用它来做一些事情。
5：X11，即进到 X-Window 系统。
6：重新启动（记住不要把initdefault设置为6，否则会使Linux不断地重新启动）

也就是说linux共6种启动方式，模式5是进入图形界面，而模式3是进入控制台界面。而现在的图形界面操作系统，默认为模式5启动。

#### 在老版本的 Linux 中

为了让Linux系统在启动后能直接进入到控制台字符操作模式，我们可以配置/etc/inittab文件。

```
vi /etc/inittab
```

找到`id:5: initdefault:`改为下面代码

```
id:3:initdefault:
```

然后后重新启动系统，就能实现启动时直接进入控制台字符操作界面。

#### 新版本中的方法

**推荐方法**

因为开机时可以选择进入命令行还是界面模式

```
sudo chmod +w /boot/grub/grub.cfg
//增加可写权限
```

```
sudo gedit /boot/grub/grub.cfg
//编辑配置文件
```

会找到小面这段文字：

```
menuentry 'Ubuntu，Linux 3.2.0-24-generic-pae' --class ubuntu --class gnu-linux --class gnu --class os {
    recordfail
    gfxmode $linux_gfx_mode
    insmod gzio
    insmod part_msdos
    insmod ext2
    set root='(hd0,msdos8)'
    search --no-floppy --fs-uuid --set=root 689a61a1-06fd-4ffe-95d7-8671e97bbe81
    linux    /boot/vmlinuz-3.2.0-24-generic-pae root=UUID=689a61a1-06fd-4ffe-95d7-8671e97bbe81 ro  quiet splash $vt_handoff
    initrd    /boot/initrd.img-3.2.0-24-generic-pae
}
```

复制上面的文字，并在后面粘贴下来。

修改一些设置。修改后如下

```
menuentry 'Ubuntu，Linux 3.2.0-24-generic-pae(command mode)' --class ubuntu --class gnu-linux --class gnu --class os {
    recordfail
    gfxmode $linux_gfx_mode
    insmod gzio
    insmod part_msdos
    insmod ext2
    set root='(hd0,msdos8)'
    search --no-floppy --fs-uuid --set=root 689a61a1-06fd-4ffe-95d7-8671e97bbe81
    linux    /boot/vmlinuz-3.2.0-24-generic-pae root=UUID=689a61a1-06fd-4ffe-95d7-8671e97bbe81 ro text
    initrd    /boot/initrd.img-3.2.0-24-generic-pae
}
```

这就可以了。我的是物理机直接安装的，在开机时就有菜单了，直接选择 Ubuntu，Linux 3.2.0-24-generic-pae(command mode) 这个选项即可

如果 **虚拟机安装** 的话，也许开机是没有选项的（我用的VM虚拟机安装默认的就没有选择菜单）解决方法如下：

开机启动时，grub菜单 系统默认是隐藏的，去掉隐藏需要做如下操作

你需要修改`/etc/default/grub`其中的某一行（自己找找，就在前面），

```
sudo gedit /etc/default/grub
```

```
GRUB_HIDDEN_TIMEOUT=0（默认是0，修要修改成大于0的值，比如10）
```

保存后退出！

再执行命令：

```
sudo update-grub
```

好了，设置完成


**方法二**

开机直接进入控制台界面

```
sudo gedit /etc/default/grub
```

找到这一行

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

改成

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash text"
```

在输入命令：

```
sudo update-grub
```

开机后就自动进入 tty1 了
