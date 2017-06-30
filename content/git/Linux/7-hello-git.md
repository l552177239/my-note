---
title: 你好 Git
---

Git 和 Github 是两个东西。Git 是一个软件，作者是 Linus ，安装到我们的笔记本上。Github 是一个网站，作者是 Tom ，浏览器中访问 github.com 可以使用。

### Github 的正确使用姿势

直接到 Github.com 上点 `New File` 按钮，**不是**正确的使用方法。要了解正确的 Github 使用方法，首先要知道什么是 Git 。

Git 是一个版本控制工具，通常我们都是通过本地 Git 和 Github 的互动来完成版本控制工作的。

通常我们的 Github 工作流是这样的：

- 第一步，在我们自己的笔记本上安装 Atom 和 Git
- 第二步，注册 Github 账号，并开启新仓库
- 第三步，在笔记本上做代码开发
- 第四步，通过 git push 命令来上传代码到 Github


OK，从上面流程可见，如果想要灵活运用 Github ，第一步先要学会 Git 的基本使用技巧。下面几个部分中，我们先来介绍 Git 的使用。

### 安装 Git

```
sudo apt-get update
sudo apt-get install git
```

注：apt-get 是 ubuntu 系统（ deepin 其实就是 ubuntu 的一个变种）的安装软件的命令。装软件的过程其实非常复杂，涉及到软件包依赖关系管理，这个原来 Peter 做过专职的一年的这个工作。这个领域的深入知识，应该是系统管理员（ sys admin ）去掌握，我们开发者没必要学那么深。

验证有没有装好，就敲

```
git --version
```

如果可以正确输出版本号，证明 Git 已经装好了。
