'use strict';

var fs = require('fs');

var siteRoot = '../website';

var globalConfig = require(siteRoot + '/site.json');
var articlesConfig = require(siteRoot + '/articles/articles.json');

if (fs.existsSync(siteRoot + '/articles/articles.template')) {
    var template = fs.readFileSync(siteRoot + '/articles/articles.template', 'utf8');
} else {
    console.log('ERROR: Article template missing.');
    process.exit(1);
}

articlesConfig.articles.forEach(function(article) {
    if (fs.existsSync(siteRoot + '/articles/' + article.id + '.html.meta')) {
        var meta = fs.readFileSync(siteRoot + '/articles/' + article.id + '.html.meta');

        var t = template;
        t = t.replace(/{%= TITLE %}/g, globalConfig.title);
        t = t.replace(/{%= SUBTITLE %}/g, globalConfig.subtitle);
        t = t.replace(/{%= ARTICLE_TITLE %}/g, article.title);
        t = t.replace(/{%= ARTICLE_POSTED_ON %}/g, article.postedOn);
        t = t.replace(/{%= ARTICLE_LINK %}/g, '/articles/' + article.id + '.html');
        t = t.replace(/{%= ARTICLE_CONTENT %}/g, meta);
        t = t.replace(/{%= COPYRIGHT_BEGINYEAR %}/g, globalConfig.copyright.beginYear);
        t = t.replace(/{%= COPYRIGHT_ENDYEAR %}/g, globalConfig.copyright.endYear);
        t = t.replace(/{%= COPYRIGHT_OWNER %}/g, globalConfig.copyright.owner);
        t = t.replace(/{%= COPYRIGHT_ICP %}/g, globalConfig.copyright.ICP);

        fs.writeFileSync(siteRoot + '/articles/' + article.id + '.html', t);
    }
}); 
