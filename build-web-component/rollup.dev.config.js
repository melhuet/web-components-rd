import config from './rollup.config';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

// Override prod config
config.output.sourcemap = true;
config.plugins.push(
  serve({
    contentBase: '',
    host: 'localhost',
    port: 10001
  }),
  livereload('dist')
);

export default config;
