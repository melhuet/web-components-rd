import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

let devConfig = {
  input: 'counter/index.js',
  output: {
    name: 'Counter',
    file: 'dist/counter.min.js',
    format: 'iife'
  },
  plugins: [
    babel(),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    serve({
      contentBase: '',
      open: true,
      host: '192.168.1.40',
      port: 10001
    }),
    livereload('dist')
  ]
};

export default devConfig;
