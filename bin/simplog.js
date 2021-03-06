'use strict';

var fs = require('fs');

var artPsr= require('./articles_processer');
var idxPsr= require('./index_processer');
var pagPsr= require('./pages_processer');
var rssPsr= require('./rss_processer');
var tagPsr= require('./tag_processer');

var cmd = process.argv[2];

var siteRoot = process.argv[3];
if (fs.existsSync(siteRoot + '/site.json') && 
        fs.existsSync(siteRoot + '/articles/articles.json') &&
        fs.existsSync(siteRoot + '/pages/pages.json')) { 

    var globalConfig = require(siteRoot + '/site.json');
    var articlesConfig = require(siteRoot + '/articles/articles.json');
    var pagesConfig = require(siteRoot + '/pages/pages.json');
} else {
    console.log('[ERROR]Config files missing.');
    process.exit(1);
} 

switch (cmd) {
    case 'articles':
        artPsr.generateArticles(siteRoot, globalConfig, articlesConfig);
        break;
    case 'index':
        idxPsr.generateIndex(siteRoot, globalConfig, articlesConfig);
        break;
    case 'pages':
        pagPsr.generatePages(siteRoot, globalConfig, pagesConfig);
        break;
    case 'rss':
        rssPsr.generateRss(siteRoot, globalConfig, articlesConfig);
        break;
    case 'tag':
        tagPsr.generateTag(siteRoot, globalConfig, articlesConfig);
        break;
    default:
}
