const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

module.exports = {
	entry:{
		app:"./src/index"
	},
	output:{
		filename:'js/[name].js',
		path:path.join(__dirname,'./disk')
	},
	devtool:'inline-source-map',
	devServer:{
		contentBase:path.resolve(__dirname,'./disk'),
		port:9000,
		hot:true
	},
	module:{
		loaders:[
			{		
				test:/\.(js|jsx)$/,
				loader:'babel-loader',
				exclude:/node_modules/
			}
		]
	},
	plugins:[
		new HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title:'Redux-real',
			template:path.resolve(__dirname,'./public/index.html'),
			inject:'body'
		})
	]
};