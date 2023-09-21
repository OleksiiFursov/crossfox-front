import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	optimizeDeps: {
		exclude: [
			"react",
			"react-dom",
			"preact",
			"preact/compat",
			"preact/hooks",
			"@prefresh/core",
			"@prefresh/vite/runtime",
			"@prefresh/vite/utils",
		],
	},
});
