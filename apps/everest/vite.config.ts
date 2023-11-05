import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

const envDir = process.env.EVEREST_OUT_DIR;
const outDir = path.join(process.cwd(),`${envDir ? '../..' : '.'}`, envDir ?? './dist');

console.log(`Outputting Everest files to: ${outDir}`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths({ root: '.' }), react()],
  server: {
    watch: {
      ignored: path.resolve(__dirname, '.e2e/**/*.*'),
    },
    proxy: {
      '/v1': `http://localhost:${process.env.API_PORT || '8080'}`,
    }
  },
  build: {
    assetsDir: 'static',
    outDir
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
  },
  // During prod the libs will be built, so no need to point to src
  ...(process.env.NODE_ENV === 'development' && {
    resolve: {
      alias: {
        "@percona/ui-lib": path.resolve(__dirname, '../../packages/ui-lib/src'),
        "@percona/design": path.resolve(__dirname, '../../packages/design/src'),
        "@percona/utils": path.resolve(__dirname, '../../packages/utils/src'),
        "@percona/types": path.resolve(__dirname, '../../packages/types/src'),
      }
    }
  }),
})
