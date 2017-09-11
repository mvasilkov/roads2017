.PHONY: build
build:
	./build.sh

.PHONY: clean
clean:
	rm build/{index.html,roads.{css,js},manifest.json}
