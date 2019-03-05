import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

let devConfig = {
	input: 'counter/index.js',
	output: {
		name: 'Counter',
		file: 'dist/counter.min.js',
		format: 'iife'
	},
	plugins: [
		babel({
			exclude: ['node_modules/**']
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
