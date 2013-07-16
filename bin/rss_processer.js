'use strict';

// 引入必要模块
var fs = require('fs');
var moment = require('moment');
var marked = require('marked');

exports.generateRss = function (siteRoot, globalConfig, articlesConfig) {
    // 检测并读取模板文件
    if (fs.existsSync(siteRoot + '/rss.template')) {
        var template = fs.readFileSync('../skeleton/rss.template', 'utf8');
        var templateStat = fs.statSync('../skeleton/rss.template');
        console.log('[INFO]Read rss template completed.');
    } else {
        console.log('[ERROR]Rss template missing.');
        process.exit(1);
    }

    console.log('[INFO]Generate rss.');
    // 根据配置生成rss feed
    var t = template;
    t = t.replace(/{%= TITLE %}/g, globalConfig.rss.title);
    t = t.replace(/{%= LINK %}/g, globalConfig.link);
    t = t.replace(/{%= DESC %}/g, globalConfig.rss.desc);
    t = t.replace(/{%= LAST_BUILD_DATE %}/g, moment().format('ddd, DD MMM YYYY HH:mm:ss') + ' +0800');
    t = t.replace(/{%= LANG %}/g, globalConfig.rss.lang);

    var items = '';
    articlesConfig.articles.slice(0, globalConfig.rss.max).forEach(function (article) {
        items += '<item>\n';
        items += '<title>' + article.title + '</title>\n';
        items += '<link>' + globalConfig.link + '/articles/' + article.id + '.html?utm_source=rss&amp;utm_medium=rss</link>\n';
        items += '<guid>' + globalConfig.link + '/articles/' + article.id + '.html</guid>\n';
        items += '<author>' + globalConfig.master.email + ' ' + globalConfig.master.name + '</author>\n';
        items += '<pubDate>' + moment(article.postedOn).format('ddd, DD MMM YYYY HH:mm:ss') + ' +0800</pubDate>\n';

        var content = '';
        if (fs.existsSync(siteRoot + '/articles/' + article.id + '.html.text')) {
            content = fs.readFileSync(siteRoot + '/articles/' + article.id + '.html.text', 'utf8');
        } else if (fs.existsSync(siteRoot + '/articles/' + article.id + '.markdown.text')) {
            content = fs.readFileSync(siteRoot + '/articles/' + article.id + '.markdown.text', 'utf8');
            content = marked(content);
        }

        content = content.replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\/uploads\/pictures\//g, globalConfig.link + '/uploads/pictures/');

        items += '<description>' + content + '</description>\n';
        items += '</item>\n';
    });
    t = t.replace(/{%= ITEMS %}/g, items);

    fs.writeFileSync(siteRoot + '/rss.xml', t);

    console.log('[INOF]Done!');
};
