import { defineConfig } from 'vitest/config'
import * as path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
  },
  resolve: {
    alias: {
      "@percona/ui-lib": path.resolve(__dirname, '../../packages/ui-lib/src'),
      "@percona/design": path.resolve(__dirname, '../../packages/design/src'),
      "@percona/utils": path.resolve(__dirname, '../../packages/utils/src'),
      "@percona/types": path.resolve(__dirname, '../../packages/types/src'),
    }
  }
})