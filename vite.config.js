import { defineConfig } from 'vite';
import { Configs } from './src/configs.js';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [],
	base: Configs.router.baseUrl,
	server: {
		open: true
	}
});
