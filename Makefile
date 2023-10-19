# No port here, it will be appended afterwards
HOSTNAME=http://localhost
BIT_RUN_PORT=3000
APP=everest
API_URL=http://localhost:8080

install-bit:
	npm i -g @teambit/bvm
	bvm install 1.0.0

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

run:
	HOSTNAME=$(HOSTNAME)
	BIT_RUN_PORT=$(BIT_RUN_PORT) \
	API_URL=$(API_URL) \
	bit run $(APP) -p $(BIT_RUN_PORT)
