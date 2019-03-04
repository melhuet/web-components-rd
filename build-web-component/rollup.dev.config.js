import babel from 'rollup-plugin-babel';

let devConfig = {
	input: 'counter/index.js',
	output: {
		name: 'Counter',
		file: 'dist/dev.counter.min.js',
		format: 'iife'
	},
	plugins: [
		babel({
			exclude: ['node_modules/**']
		})
	]
};

export default devConfig;
