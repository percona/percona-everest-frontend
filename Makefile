init:
	pnpm install

test:
	pnpm test

build:
	pnpm build

lint:
	pnpm lint

format:
	pnpm format

run-everest:
	pnpm --filter "@percona/everest" dev