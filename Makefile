install-bit:
	npm i -g @teambit/bvm
	bvm install 0.2.3

init:
	bit install --recurring-install

test:
	bit test

lint:
	bit lint --fix

format:
	bit format

# Note: this will build every component. If you want to just build an app, cd into it and run the proper make build command
build:
	bit build