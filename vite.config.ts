import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({

	build: {

		lib: {

			entry: resolve(dirname('src/index.ts')),
			name: 'build-context-menu',
			fileName: (format) => `build-context-menu.${format}.js`

		},

		rollupOptions: {

			external: [],
			output: {

				globals: {}
				
			}

		},
	},

 	plugins: [
	
		cssInjectedByJsPlugin({ useStrictCSP: true, relativeCSSInjection: false }),

	],

});