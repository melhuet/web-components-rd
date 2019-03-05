import babel from 'rollup-plugin-babel';
// Rollup plugin to minify generated bundle.
import { uglify } from 'rollup-plugin-uglify';

let prodConfig = {
  input: 'counter/index.js',
  output: {
    name: 'Counter',
    file: 'dist/counter.min.js',
    format: 'iife'
  },
  plugins: [
    uglify({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourcemap: false
    }),
    babel({
      exclude: ['node_modules/**']
    })
  ]
};

export default prodConfig;
