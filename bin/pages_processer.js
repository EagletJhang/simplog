'use strict';

// 引入必要模块
var fs = require('fs');
var marked = require('marked');

exports.generatePages = function (siteRoot, globalConfig, pagesConfig) {
    // 检测并读取模板文件
    if (fs.existsSync(siteRoot + '/pages/pages.template')) {
        var template = fs.readFileSync(siteRoot + '/pages/pages.template', 'utf8');
        var templateStat = fs.statSync(siteRoot + '/pages/pages.template');
        console.log('[INFO]Read page template completed.');
    } else {
        console.log('[ERROR]Page template missing.');
        process.exit(1);
    }

    // 根据配置生成页面html
    pagesConfig.pages.forEach(function (page) {
        console.log('[INFO]Generate page: ' + page.content + '.');
        var ext = '';
        if (fs.existsSync(siteRoot + '/pages/' + page.content + '.markdown')) {
            ext = 'markdown';
        }
        if (ext !== '') {
            // 只生成text文件mtime或模板文件的mtime晚于html文件mtime的文章
            var text = fs.readFileSync(siteRoot + '/pages/' + page.content + '.' + ext, 'utf8');
            var textStat = fs.statSync(siteRoot + '/pages/' + page.content + '.' + ext);

            if (ext === 'markdown') {
                text = marked(text);
            }

            var skip = false;
            if (fs.existsSync(siteRoot + '/pages/' + page.content + '.html')) {
                var htmlStat = fs.statSync(siteRoot + '/pages/' + page.content + '.html');
                if (htmlStat.mtime.getTime() > templateStat.mtime.getTime() && 
                    htmlStat.mtime.getTime() > textStat.mtime.getTime()) {
                    skip = true;
                    console.log('[INFO]Not modified.');
                }
            }

            if (skip === false) {
                var t = template;
                t = t.replace(/{%= TITLE %}/g, globalConfig.title);
                t = t.replace(/{%= META_AUTHOR %}/g, globalConfig.meta.author);
                t = t.replace(/{%= META_KW %}/g, globalConfig.meta.keywords.join(','));
                t = t.replace(/{%= META_DESC %}/g, page.title);
                t = t.replace(/{%= SUBTITLE %}/g, globalConfig.subtitle);
                t = t.replace(/{%= PAGE_TITLE %}/g, page.title);
                t = t.replace(/{%= PAGE_CONTENT %}/g, text);
                t = t.replace(/{%= COPYRIGHT_BEGINYEAR %}/g, globalConfig.copyright.beginYear);
                t = t.replace(/{%= COPYRIGHT_ENDYEAR %}/g, globalConfig.copyright.endYear);
                t = t.replace(/{%= COPYRIGHT_OWNER %}/g, globalConfig.copyright.owner);
                t = t.replace(/{%= COPYRIGHT_ICP %}/g, globalConfig.copyright.ICP);

                fs.writeFileSync(siteRoot + '/pages/' + page.content + '.html', t);
                console.log('[INFO]Completed.');
            }
        } else {
            console.log('[INFO]No text file.');
        }
    }); 

    console.log('[INFO]Done!');
};
