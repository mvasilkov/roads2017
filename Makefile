.PHONY: build
build:
	./build.sh

.PHONY: clean
clean:
	rm -f build/{index.html,roads.{css,js},manifest.json}
