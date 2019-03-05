import babel from 'rollup-plugin-babel';
// Rollup plugin to minify generated bundle.
import { terser } from 'rollup-plugin-terser';

let prodConfig = {
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
    babel({
      exclude: ['node_modules/**']
    })
  ]
};

export default prodConfig;
