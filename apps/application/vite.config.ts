import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
	plugins: [sveltekit()],
	envPrefix: "PUBLIC_",
	envDir: resolve("../../infra/"),
});
