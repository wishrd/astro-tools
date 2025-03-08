import { defineConfig } from 'tsup';

export default defineConfig(() => {
	return {
		entry: ["src/**/*"],
		format: ["esm"],
		target: "node20",
		bundle: false,
		dts: true,
		sourcemap: false,
		clean: true,
		splitting: false,
		minify: false,
		tsconfig: "tsconfig.json"
	};
});
