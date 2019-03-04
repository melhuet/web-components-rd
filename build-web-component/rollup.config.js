import babel from 'rollup-plugin-babel';

export default {
	input: 'counter/index.js',
	output: {
		name: 'Counter',
		file: 'dist/counter.min.js',
		format: 'iife'
	},
	plugins: [
		babel({
			exclude: ['node_modules/**']
		})
	]
};
