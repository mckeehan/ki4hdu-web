
all: build

build:
	gatsby build --verbose
	touch build

develop: clean
	gatsby develop --host=0.0.0.0 

clean:
	gatsby clean
	rm -f build

publish: build
	rsync -av --delete public/ /Library/WebServer/ki4hdu.com

#593  gatsby clean && gatsby build

kill:
	ps -ef | grep gatsby | grep node | grep -v /bin/sh | awk '{ print $$2 }' | xargs kill -9
