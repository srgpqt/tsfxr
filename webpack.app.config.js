var path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: './app/app.ts',
	output: {
		path: path.join(__dirname, 'app'),
		filename: 'app.js'
	},
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			loader: 'ts',
			include: [path.join(__dirname, 'src'), path.join(__dirname, 'app')]
		}]
	},
	ts: {
		compilerOptions: {
			noImplicitAny: true
		}
	}
};
