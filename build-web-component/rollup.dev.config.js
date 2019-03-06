import config from './rollup.config';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { version } from './package.json';

let folder = process.env.folder;
//let folder = process.env.NODE_ENV[0];
// Override prod config
config.output = {
  file: `dist/${folder}.min.js`,
  format: 'iife',
  sourcemap: true
};

config.plugins.push(
  serve({
    contentBase: '',
    openPage: `${folder}/index.html`,
    host: 'localhost',
    port: 10001
  }),
  livereload('dist')
);

export default config;
