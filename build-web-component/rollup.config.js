import babel from 'rollup-plugin-babel';
// Rollup plugin to minify generated bundle.
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { version } from './package.json';

let folder = process.env.folder;
let prodConfig = {
  input: `elements/${folder}/index.js`,
  output: {
    file: `dist/${folder}.` + version + '.min.js',
    format: 'iife'
  },
  plugins: [
    postcss({
      plugins: []
    }),
    terser({
      // mandatory as we are minifying ES Modules here
      module: true,
      compress: {
        // compress twice for further compressed code
        passes: 2
      }
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      runtimeHelpers: true
    })
  ]
};

export default prodConfig;
