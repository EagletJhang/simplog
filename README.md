simplog是一个非常简单的博客搭建工具，与wordpress等动态博客系统不同，simplog不使用数据库，也不会部署任何动态脚本，而是通过元配置文件（json格式），元文本（html或markdown格式）以及模板文件生成一个全静态站点。用户可以通过自己方便的方式（例如git）将生成好的静态站点部署到相应位置。

例子见：[http://blog.codinglabs.org](http://blog.codinglabs.org)

## 快速入门
1. 将网站骨架目录skeleton拷贝到任意位置，如需要可重命名此目录。这里假设拷贝到siteroot目录。

2. 重命名siteroot/site.json.example为siteroot/site.json，这个是站点元配置文件。

3. 重命名siteroot/articles/articles.json.example为siteroot/articles/articles.json，这个是文章元配置文件。

4. 建立siteroot/articles/helloworld.markdown.txt文件，并在其中输入任意内容。

5. 打开siteroot/articles/articles.json，删除其中内容，修改为：
```javascript
    {
        "articles": [
            {
                "id": "helloworld",
                "title": "Hello World",
                "postedOn": "2013-01-01",
                "author": "My Name",
                "tags": ["hello", "world"],
                "category": "",
                "abstract": "This is my first article!"
            }
        ]
    }
```

6. 进入simplog/bin/目录，将其中的Makefile.example重命名为Makefile。

7. 打开Makefile，将第一行
```bash
	ROOT=/path/to/your/website/root
```
改为指向siteroot目录。

8. 运行如下命令
```bash
	make
```
即可在siteroot下生成整个网站。

9. 将siteroot部署到web服务器上即可访问。

## 配置说明
### 网站元配置
网站元配置文件为siteroot/site.json，网站标题等全局配置在这个文件中修改。

### 文章元配置
文章源配置文件为siteroot/articles/articles.json，其中主要配置项为数组“articles”，这个数组的每一个元素对应一篇文章。各配置项如下：

```bash
id - 文章唯一标识，只能是字母、数字或“-”，全站不可重复
title - 文章标题
postedOn - 文章发表时间
author - 作者
tags - 标签数组
category - 文章分类
abstract - 文章摘要
```

### 元文本
原文本是文章的主体，可以是html或markdown格式，统一放在siteroot/articles/下。

文件命名必须与文章元配置中的id匹配。假设文章id为“my-first-article”，html文件命名为“my-first-article.html.text”，markdown文件命名为“my-first-article.markdown.text”。注意html文件只需包含文章主体的html标签，不需包含head、body等标签内容。

## 网站结构
+ 首页
```bash
    http(s)://yourdomain/
```
首页显示文章列表。每篇文章只显示摘要部分。同时首页还包含常用标签索引。

+ 标签页
```bash
    http(s)://yourdomain/tag.html
```
标签页面显示所有标签索引以及分标签文章列表（只显示标题）。

+ 文章页
```bash
    http(s)://yourdomain/articles/[id].html
```
文章页面显示文章主要内容。

+ RSS订阅
```bash
    http(s)://yourdomain/rss.xml
```
可以通过这个url订阅你的博客。

## 命令列表
```bash
# 生成整个网站
make
# 只生成首页
make index
# 只生成文章（默认只重新生成有改动的文章）
make articles
# 只生成tag页
make tag
# 只生成rss
make rss
# 清除所有生成的内容（不会清除配置和元文本）
make clean
```
