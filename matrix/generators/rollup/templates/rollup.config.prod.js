import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import sass from 'rollup-plugin-sass';
// import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
    {
      file: pkg.browser,
      name: pkg.exportName,
      format: 'umd',
    },
  ],
  external: [],
  plugins: [
    postcss({
      extract: false,
      namedExports: true,
      minimize: true,
      extensions: ['.scss', '.sass','.css'],
      preprocessor: (content, id) => new Promise((resolve, reject) => {
        const result = sass.renderSync({ file: id })
        resolve({ code: result.css.toString() })
      }),
      plugins: [
        autoprefixer(),
      ],
    }),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      // babelHelpers: 'runtime',
      include: [/matrix/],
      presets: [['@babel/preset-env', {
        modules: false,
      }]],
      // plugins: [
      //   "@babel/plugin-transform-runtime",
      // ],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // terser(),
  ],
  external: [],
};
