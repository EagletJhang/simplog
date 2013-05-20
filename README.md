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
