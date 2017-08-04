# MpngoDB

> 基于分布式文件存储的数据库

### 简介

 - MongoDB：是一个数据库软件，有时候我们简称它叫一个数据库，但是其实一个 MongoDB 运行起来，可以里面同时运行多个数据库

 - Database: 数据库。一般做法是，一个项目对应一个数据库

 - Collection: 集合。类似于关系型数据库下的表的概念，例如全班同学信息

 - Document：文档。一个集合中会包含多个文档（一个文档中存储一个同学的信息）。文档对应关系型数据库中的 记录 这个概念

#### 举个例子

一个项目叫 facebook ，那么我们就建立一个 database 来存储这个项目的所有数据。
一个数据库中，可以创建多个集合，比如 users 。
一个 users 集合中，可以包含多个文档，每个文档中存储一个 user 的信息（信息可以有多项：email, name, brithday ...）。

### 安装

#### 苹果系统上，用 HomeBrew 安装

```
brew install mongodb
```

### Window 系统上安装

1. 下载 MongoDB：[点击下载](https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.4.4-signed.msi/download)

2. 创建环境变量：

> 控制面板→系统→高级系统设置→环境变量→用户变量→path→编辑→新建→路径→完成

选择`path`，点击编辑，点击新建，将下面代码放入

```
C:\Program Files\MongoDB\Server\3.4\bin
```

#### 在 Linux 安装

##### 第一步：导入 MongoDB 公共 GPG Key

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```

##### 第二步：创建列表文件

```
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```

创建一个适合你的 Ubuntu 版本列表文件

##### 第三步：重新加载本地包数据库

```
sudo apt-get update
```

安装（升级）本地包数据库

##### 第四步：安装 MongoDB

```
sudo apt-get install -y mongodb-org
```

安装最新的稳定版本的 MongoDB

#### 在 Linux 下安装的方法二

第一步：下载 MongoDB

```
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-3.4.6.tgz
```

第二步：解压

```
tar -zxvf mongodb-linux-x86_64-amazon-3.4.6.tgz
```

第三步：将解压包拷贝到指定目录

```
mv  mongodb-linux-x86_64-amazon-3.4.6 / /usr/local/mongodb
```

### 使用

首先创建一个文件来存储数据

```
mkdir data/db
```

启动mongodb

```
mongod --dbpath=./data/db
```

### 参考

 - MongoDB 的官网: [点击进入](https://www.mongodb.com/)

 - MongoDB 中文网: [点击进入](http://www.mongodb.org.cn/)

 - MongoDB 中文社区: [点击进入](http://mongoing.com/)
