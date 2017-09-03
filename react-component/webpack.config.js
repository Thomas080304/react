const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
module.exports = {
	entry:{
		app:"./src/index"
	},
	output:{
		filename:"js/[name].js",
		path:path.join(__dirname,"./disk")
	},
	devtool:"inline-source-map",
	devServer:{
		contentBase:path.join(__dirname,"./disk"),
		compress:true,
		port:9000,
		hot:true
	},
	module:{
		loaders:[
			{
				test:/\.(js|jsx)$/,
				loader:'babel-loader',
				exclude:/node_modules/
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.less/,
				loader:'style-loader!css-loader!less-loader'
			},
			{
				test:/\.(png|jpg|gif|woff|woff2)$/,
				loader:'url-loader?limit=1024$name=[name].[ext]'
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			title:"React Count",
			template:path.resolve(__dirname,'./index.html'),
			inject:"body"
		}),
		new HotModuleReplacementPlugin()
	]
};