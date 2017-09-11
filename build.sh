#!/bin/bash

# Requirements:
# npm i -g clean-css-cli uglify-js html-minifier

cleancss --output build/roads.css -- roads.css

uglifyjs --enclose --compress --mangle --lint --output build/roads.js -- \
	music/sonant.js music/song.js polyfill.js aaudio.js initialize.js \
	sprites.js game.js vec2.js pointer.js columns.js player.js paint.js \
	danger.js mainloop.js run.js

html-minifier --collapse-whitespace --remove-attribute-quotes \
	--output build/index.html -- index_build.html

uglifyjs --parse expression --output build/manifest.json -- manifest.json
