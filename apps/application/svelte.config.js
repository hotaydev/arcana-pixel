import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "index.html",
			precompress: false,
			strict: true,
		}),

		env: {
			dir: resolve("../../infra/"),
		},
	},
};

export default config;
