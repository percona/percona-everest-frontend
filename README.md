# Install bit

```bash
make install-bit
```

# Install dependencies

```bash
make init
```

# Running Bit with compositions

```bash
bit start
```

# Running a particular app (e.g. Everest)

```bash
cd apps/<app-name>
make run
```

# Run unit tests for app
```bash
cd apps/<app-name>
make test
```

# Run E2E tests for app
```bash
cd apps/<app-name>
make test-ui
```

# Build app
```bash
cd apps/<app-name>
make build
```

# Env variables
Add a `.env.webpack` file to `apps/everest` to change these configurations:
```bash
# DEFAULTS TO http://localhost:8080
DEV_PROXY_URL=<PATH_TO_EVEREST_BACKEND>
```
Any change to these vars must be followed by `bit compile --delete-dist-dir` before `bit run`.