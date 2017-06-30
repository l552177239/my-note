### Git安装及设置  

第一步 安装git

	在 linux 下直接使用命令：sudo apt-get install git  

	windows 下百度 gitbash ，下载安装即可  

	在mac 下：brew install git

第二步 基本操作

	查看已有的配置信息：git config --list  

	创建 demo 文件夹：mkdir demo  

	初始化：git init 

	将 github 上的仓库克隆到本地：git clone [仓库地址]  

	查看做了哪些修改：git diff（按 q 退出）

	创建a.html：touch a.html  

	进入编辑.gitignore：vim .gitignore

	添加：/[文件夹名]

	将文件添加到缓存获得 Git 的跟踪：git add（. -A *）

	查看当前版本库各个文件的状态：git status

	将缓存区内容添加到仓库中：git commit 

	'版本留言，尽量写的语义话'：git commit -m 
	
	查看提交记录：git log

	取消已经缓存的内容：git reset

	也可以通过版本号回滚：git reset --hard [版本号]

 	把一个文件删除，并把它从git的仓库中移除：git rm [文件名]

	取消对某个文件的修改：git checkout [文件名]

	忽略上传的文件：vi.gitignore

	创建新分支：git branch [yourbranch]

	切换分支：git checkout [yourbranch]

	或者直接创建一个分支，并且切换过去：
	git checkout -b [yourbranch]

	删除分支：git branch -d [yourbranch]

	推送分支：git push origin [yourbranch]

第三步 推送代码
	
	首次推送：git push -u origin master  

	之后可以省略参数：git push	

	如果没有通过 clone 现有仓库，而是直接在本地 git init 的仓库的话，需要先添加远程仓库地址。

	为这个仓库添加一个远程地址：git remote add origin [你的github上的仓库地址]

	设置 public key
		首先需要在本地机器上生成 key：ssh-keygen  

		这时，会在 ~/.ssh/ 文件夹之下生成一对 ssh key ，包括一个 public key 和一个 private key 。（如果是windows用户，这个文件一般会在这里：C:\Users\Administrator.ssh）

		复制 public key：cat ~/.ssh/id_rsa.pub  

		将拷贝的 public key 添加在github账户上：

		右上角点击头像-> 点击settings-> 点击SSH KEYS-> 点击ADD SSH KEYS-> 将获取的public key粘贴于此

### Node安装及设置  

第一步 安装nvm

	linux：curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash  

	windows：node官网下载相应版本安装

	安装node  

		查看有哪些版本可以安装：nvm ls-remote  

		安装版本 v5.10.1：nvm install v5.10.1

第二步 设置nodo

	查看版本：node -v

	使用淘宝定制的 cnpm：npm install -g cnpm --registry=https://registry.npm.taobao.org

	检查淘宝定制：cnpm install gulp  

	npm 命令：

		查看全局插件命令：npm list -g --depth

		删除全局环境下yarn包：npm uninstall yarn -g

### 配置React环境  
	
第一步 安装React  

	安装 create-react-app：npm install -g create-react-app  

	安装淘宝的npm源：npm config set registry https://registry.npm.taobao.org  

第二步 配置  

	构建一个 react 的前端工程：create-react-app [工程名]  

	启动工程：npm start 

### 运行React 

	在项目文件夹下src文件夹中的index.js中写代码

### 用Yarn装包  

	1.安装yarn：npm install yarn -g  

	2.测试能否运行：yarn --version  

	3.初始化： yarn init  

	4.用yarn安装react：yarn add react  

	5.用yarn安装webpack在工具中：yarn add -D webpack  

	6.删除一个依赖包：yarn remove [package]  

	7.安装所有的依赖包：yarn或yarn install  
  
	8.运行package.json中的脚本：yarn run build  

	9.卸载包：yarn remove jquery 


关于yarn与npm更多：[脚本之家文章](http://www.jb51.net/article/95199.htm)

配置package.json文件

scriptes脚本中写入run命令
```
"scripts": {
    "build": "rimraf dist && ./node_modules/.bin/webpack --config webpack.prod.config.js",
    "dev": "./node_modules/.bin/webpack-dev-server --config webpack.dev.config.js"
  },
```
在命令行输入**npm run dev**会执行"./node_modules/.bin/webpack-dev-server --config webpack.dev.config.js"

创建隐藏配置文件

```
vi .npmrc
```

找到**.npmrc.swp**

输入**i**进入插入模式，将下面文字放入

```
loglevel=http
```

点击**Esc**点击**shift+ZZ**保存退出

###安装React出错（环境配置出错），在命令行执行下面命令

```
npm config set cache C:\[用户名]\nodejs\npm-cache --global
```