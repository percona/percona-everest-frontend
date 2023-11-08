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

# This might change in the future if we have more apps, but for now keep it simple
dev:
	pnpm --filter "@percona/everest" dev