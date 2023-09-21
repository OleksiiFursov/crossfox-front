import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
// import scss from 'rollup-plugin-scss'



export default {
	input: "src/lib/index.ts",
	external: ['preact'],
	output: [
		{
			file: 'dist/index2.js',
			format: "cjs",
			exports: "named",
			sourcemap: true
		},
		{
			file: 'dist/index3.js',
			format: "es",
			exports: "named",
			sourcemap: true
		}
	],
	plugins: [
		external(),
		resolve(),
		typescript({
			tsconfig: "tsconfig.lib.json",
			rollupCommonJSResolveHack: true,
			exclude: "**/__tests__/**",
			clean: true
		}),
		commonjs()
	]
};
