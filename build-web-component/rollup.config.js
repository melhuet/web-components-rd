import babel from 'rollup-plugin-babel';

let prodConfig = {
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

export default prodConfig;
