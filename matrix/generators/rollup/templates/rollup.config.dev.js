// import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import sass from 'rollup-plugin-sass';
import autoprefixer from 'autoprefixer';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload'
import pkg from './package.json';

// const resolveFile = (filePath) => path.join(__dirname, '..', filePath);

export default {
  input: 'src/index.js',
  output: [
    // {
    //   file: pkg.main,
    //   format: 'cjs',
    //   sourcemap: true,
    // },
    // {
    //   file: pkg.module,
    //   format: 'esm',
    //   sourcemap: true,
    // },
    {
      file: pkg.browser,
      name: pkg.exportName,
      sourcemap: true,
      format: 'umd',
    },
  ],
  plugins: [
    postcss({
      extract: false,
      namedExports: true,
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
    serve({
      open: true,
      contentBase: ['src', 'lib', 'types', 'examples'],
      historyApiFallback: true,
      host: 'localhost',
      port: 4000 
    }),
    livereload(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  external: [],
};
