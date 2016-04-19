var path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: './src/index.ts',
	output: {
		path: __dirname,
		filename: 'tsfxr.js',
		library: 'tsfxr',
		libraryTarget: 'umd'
	},
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			loader: 'ts',
			include: path.join(__dirname, 'src')
		}]
	},
	ts: {
		compilerOptions: {
			noImplicitAny: true
		}
	}
};
