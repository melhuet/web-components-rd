import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

let devConfig = {
  input: 'counter/index.js',
  output: {
    name: 'Counter',
    file: 'dist/counter.min.js',
    format: 'iife'
  },
  plugins: [
    terser({
      // mandatory as we are minifying ES Modules here
      module: true,
      compress: {
        // compress twice for further compressed code
        passes: 2
      }
    }),
    babel(),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    serve({
      contentBase: '',
      open: true,
      host: 'localhost',
      port: 10001
    }),
    livereload('dist')
  ]
};

export default devConfig;
