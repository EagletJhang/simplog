SKEL_ROOT=/Users/zhangyang/git/simplog/skeleton
SITE_ROOT=/Users/zhangyang/git/blog.codinglabs.org

all: index articles

index:
	node process_index.js $(SKEL_ROOT) $(SITE_ROOT)

articles:
	node process_articles.js $(SKEL_ROOT) $(SITE_ROOT)

clean:
	rm -f $(SITE_ROOT)/index.html
	rm -f $(SITE_ROOT)/articles/*.html
	rm -f $(SITE_ROOT)/pages/*.html
	rm -f $(SITE_ROOT)/categories/*.html
