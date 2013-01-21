'use strict';

// 引入必要模块
var fs = require('fs');

// 读取配置信息
var siteRoot = process.argv[2];
if (fs.existsSync(siteRoot + '/site.json') && fs.existsSync(siteRoot + '/articles/articles.json')) {
    var globalConfig = require(siteRoot + '/site.json');
    var articlesConfig = require(siteRoot + '/articles/articles.json');
} else {
    console.log('[ERROR]Config files missing.');
    process.exit(1);
}

// 检测并读取模板文件
if (fs.existsSync(siteRoot + '/articles/articles.template')) {
    var template = fs.readFileSync(siteRoot + '/articles/articles.template', 'utf8');
    var templateStat = fs.statSync(siteRoot + '/articles/articles.template', 'utf8');
    console.log('[PROCESSING]Read article template completed.');
} else {
    console.log('[ERROR]Article template missing.');
    process.exit(1);
}

// 生成Last Update时间
var d = new Date;
var yyyy = d.getFullYear().toString();
var mm = (d.getMonth() + 1).toString();
if (mm.length === 1) {
    mm = '0' + mm;
}
var dd = d.getDate().toString();
if (dd.length === 1) {
    dd = '0' + dd;
}
var updatedOn = yyyy + '-' + mm + '-' + dd;

// 根据配置生成文章html页面
articlesConfig.articles.forEach(function (article) {
    console.log('[PROCESSING]Generate article: ' + article.id + '.');
    if (fs.existsSync(siteRoot + '/articles/' + article.id + '.html.text')) {
        // 只生成text文件mtime或模板文件的mtime晚于html文件mtime的文章
        var text = fs.readFileSync(siteRoot + '/articles/' + article.id + '.html.text');
        var textStat = fs.statSync(siteRoot + '/articles/' + article.id + '.html.text');
        var skip = false;
        if (fs.existsSync(siteRoot + '/articles/' + article.id + '.html')) {
            var htmlStat = fs.statSync(siteRoot + '/articles/' + article.id + '.html');
            if (htmlStat.mtime.getTime() > templateStat.mtime.getTime() && 
                htmlStat.mtime.getTime() > textStat.mtime.getTime()) {
                skip = true;
                console.log('[PROCESSING]Not modified.');
            }
        }

        if (skip === false) {
            var t = template;
            t = t.replace(/{%= TITLE %}/g, globalConfig.title);
            t = t.replace(/{%= SUBTITLE %}/g, globalConfig.subtitle);
            t = t.replace(/{%= ARTICLE_TITLE %}/g, article.title);
            t = t.replace(/{%= ARTICLE_AUTHOR %}/g, article.author);
            t = t.replace(/{%= ARTICLE_POSTED_ON %}/g, article.postedOn);
            t = t.replace(/{%= ARTICLE_UPDATED_ON %}/g, updatedOn);
            t = t.replace(/{%= ARTICLE_LINK %}/g, '/articles/' + article.id + '.html');
            t = t.replace(/{%= ARTICLE_CONTENT %}/g, text);
            t = t.replace(/{%= COPYRIGHT_BEGINYEAR %}/g, globalConfig.copyright.beginYear);
            t = t.replace(/{%= COPYRIGHT_ENDYEAR %}/g, globalConfig.copyright.endYear);
            t = t.replace(/{%= COPYRIGHT_OWNER %}/g, globalConfig.copyright.owner);
            t = t.replace(/{%= COPYRIGHT_ICP %}/g, globalConfig.copyright.ICP);

            fs.writeFileSync(siteRoot + '/articles/' + article.id + '.html', t);
            console.log('[PROCESSING]Completed.');
        }
    }
}); 

console.log('Done!');
