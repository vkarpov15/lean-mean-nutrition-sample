NODE = node
NPM = npm
MOCHA = node_modules/mocha/bin/mocha
BROWSERIFY = node_modules/browserify/bin/cmd.js

build_client:
	node $(BROWSERIFY) -o ./public/javascripts/all.js ./client/*

test_client:
	$(MOCHA) ./tests/mocha/client/* -R nyan

test:
	$(MOCHA) ./tests/mocha/client/* ./tests/mocha/server/* -R nyan

test_watch:
	$(MOCHA) ./tests/mocha/client/* ./tests/mocha/server/* -R nyan -w
