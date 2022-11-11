
all: build

build:
	gatsby build
	touch build

develop: clean
	gatsby develop --host=0.0.0.0 

clean:
	gatsby clean
	rm -f build

publish: build
	rsync -av public/ /Library/WebServer/ki4hdu.com

#593  gatsby clean && gatsby build
