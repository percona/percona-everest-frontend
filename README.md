# Pre-Requisites

Make sure PNPM is installed: https://pnpm.io/installation

# Install dependencies

```bash
pnpm install
```

# Run everest in development mode
```bash
pnpm --filter "@percona/everest" dev
```

This will trigger the `dev` script from the `@percona/everest` workspace.
More about PNPM filtering here: https://pnpm.io/filtering

# Build packages
```bash
pnpm build
```

By default, Everest dist folder will be placed within `apps/everest`. This can be changed using the `EVEREST_OUT_DIR` env var, for example:

```bash
EVEREST_OUT_DIR=my-dist pnpm build
```

The path for this env var is relative to the repo root, so here `my-dist` would be placed at root level.

We use Turborepo (https://turbo.build/repo) for orchestratrion and caching across different packages.