import del from 'rollup-plugin-delete'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss-modules'
import resolve from '@rollup/plugin-node-resolve'
import analyze from 'rollup-plugin-analyzer'
import svgr from '@svgr/rollup'
import { terser } from 'rollup-plugin-terser'
import preact from 'rollup-plugin-preact'

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
		del({ targets: 'dist/*' }),
		external(),
		preact({
			usePreactX: false, // usePreactX is auto resolvePreactCompat: true.
			noPropTypes: false,
			noReactIs: false,
			noEnv: false,
			resolvePreactCompat: false,
			aliasModules: {
				'react-css-styler': 'preact-css-styler',
			},
		}),
		postcss({
			extract: true,
			writeDefinitions: false,
		}),
		svgr(),
		resolve(),
		commonjs({ sourceMap: false }),
		analyze({
			summaryOnly: true,
		}),
		terser(),
	],
}
