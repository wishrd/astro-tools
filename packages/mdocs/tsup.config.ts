import { defineConfig } from 'tsup';

export default defineConfig((options) => {
	const dev = !!options.watch;
	return {
		entry: ["src/**/cli.ts", "src/**/template.ts"],
		format: ["esm"],
		target: "node20",
		bundle: true,
		dts: true,
		sourcemap: true,
		clean: true,
		splitting: true,
		minify: !dev,
		tsconfig: "tsconfig.json"
	};
});
