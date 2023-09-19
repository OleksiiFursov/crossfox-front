import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from 'rollup-plugin-postcss-modules'
import resolve from "@rollup/plugin-node-resolve";
import analyze from 'rollup-plugin-analyzer';
import svgr from "@svgr/rollup";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.tsx",
    output: [
        {
            file: 'dist/init.js',
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
        {
            file: 'dist/index.esm.js',
            format: "esm",
            exports: "named",
            sourcemap: true,
        }
    ],
    plugins: [
        external(),
        postcss({
            extract: true,
            writeDefinitions: false,
        }),
        svgr(),
        resolve(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
        commonjs({sourceMap: false}),
        analyze({
            summaryOnly: true
        }),
        terser()
    ],
};
