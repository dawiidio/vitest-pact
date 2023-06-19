/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line no-restricted-syntax
export default defineConfig({
    plugins: [
        tsconfigPaths()
    ],
    test: {
        exclude: [
            'node_modules',
        ],
        globals: true,
        reporters: 'dot',
        environment: 'node',
        coverage: {
            reporter: ['text', 'json', 'html', "cobertura"],
            reportsDirectory: 'coverage'
        },
        alias: {
            '~': resolve(__dirname, 'src'),
        },
    },
});
