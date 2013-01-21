ROOT=/Users/zhangyang/git/simplog/website

all: articles

articles:
	node process_articles.js $(ROOT)

clean:
	rm -f $(ROOT)/index.html
	rm -f $(ROOT)/articles/*.html
	rm -f $(ROOT)/pages/*.html
	rm -f $(ROOT)/categories/*.html
