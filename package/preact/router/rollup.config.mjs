
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';

export default {
	input: 'src/index.jsx',
	external: ['preact', 'preact-compat', 'preact-compat2'],
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
			exports: 'named',
			sourcemap: true,
			compact: true,
			generatedCode: {
				objectShorthand: true,
				reservedNamesAsProps: true,
			},
		},
		{
			file: 'dist/index.esm.js',
			format: 'esm',
			exports: 'named',
			sourcemap: true,
			compact: true,
			generatedCode: {
				objectShorthand: true,
				reservedNamesAsProps: true,
			},
		},
	],
	plugins: [
		nodeResolve({
			extensions: [".js"],
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify( 'development' ),
			preventAssignment: true
		}),
		babel({
			presets: ["@babel/preset-react"],
			plugins: ["@babel/plugin-transform-react-jsx"],
			babelHelpers: 'bundled'
		}),
		commonjs(),
		alias({
			entries: [
				{ find: 'react', replacement: 'preact/compat' },
				{ find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
				{ find: 'react-dom', replacement: 'preact/compat' },
				{ find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
			]
		})
	]
}
