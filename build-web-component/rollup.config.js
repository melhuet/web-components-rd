import babel from 'rollup-plugin-babel';
// Rollup plugin to minify generated bundle.
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { version } from './package.json';

let folder = process.env.folder;
// default config is for modern browsers (with ES6 support)
function defaultProdConfig(output, babelConfig) {
  return {
    input: `elements/${folder}/index.js`,
    output: output || {
      prefix: 'esm', //added just for rollup.dev.config.js
      file: `dist/${folder}.${version}.esm.min.js`,
      format: 'esm'
    },
    plugins: [
      postcss({
        plugins: []
      }),
      resolve(),
      commonjs({
        include: 'node_modules/**'
      }),
      babel(Object.assign({}, { runtimeHelpers: true }, babelConfig)), // use .babelrc or babelConfig if defined
      terser({
        // mandatory as we are minifying ES Modules here
        module: true,
        compress: {
          // compress twice for further compressed code
          passes: 2
        }
      })
    ]
  };
}

let esmProdConfig = defaultProdConfig();

let es5ProdConfig = defaultProdConfig(
  {
    prefix: 'es5',
    file: `dist/${folder}.${version}.es5.min.js`,
    format: 'iife'
  },
  {
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [
      [
        '@babel/env',
        {
          modules: 'false',
          useBuiltIns: 'usage',
          targets: {
            browsers: ['last 2 versions', 'not ie < 11']
          }
        }
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false
        }
      ]
    ]
  }
);

export default [esmProdConfig, es5ProdConfig];
