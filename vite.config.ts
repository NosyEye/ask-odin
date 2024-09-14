import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// export default defineConfig({
// 	plugins: [sveltekit()],
// 	base: "/"
// 	// base: "/ask-odin/"
// });

export default defineConfig(({command, mode, isSSrBuild, isPreview}) => {

	if (command === 'serve') {
		return {
			plugins: [sveltekit()],
			base: "/"
		};
	} else {
		return {
			plugins: [sveltekit()],
			base: "/ask-odin/"
		};
	}
});
