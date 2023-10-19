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

By default, apps run on localhost:3000.
If you're using a different host for some reason, change `HOSTNAME` accordingly,
as it might be needed (e.g. OIDC `redirect_uri`, etc.).

```bash
# DEFAULTS
# APP=everest -> Bit app name
# HOSTNAME=http://localhost -> Your hostname
# BIT_RUN_PORT=3000 -> Port where to run the app
# API_URL=http://localhost:8080 -> Port where the API is running

make run APP=<app-name> HOST=<host> BIT_RUN_PORT=<bit-port> API_URL=<api-url>
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
