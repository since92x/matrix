const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

const getResolvedPath = src => path.resolve(__dirname, '../', src);

const envs = {
    PUBLIC_PATH: '/',
    MODE: "prod",
};

const webpackConfig = merge(baseWebpackConfig, {
	entry: [
		getResolvedPath("src/index.js"),
	],
    output: {
        publicPath: envs.PUBLIC_PATH,
        path: getResolvedPath("lib"),
        libraryTarget: "commonjs2",
        filename: "index.cjs.js"
    },
    externals: {
        'axios': {
            commonjs2: 'axios'
        },
    },
	module: {
		rules: [{
			test: /\.s[ac]ss$/,
			use: [
				MiniCssExtractPlugin.loader,
				"css-loader",
				"postcss-loader",
				"sass-loader"
			],
			include: ['src', 'examples'].map(p => getResolvedPath(p)),
			exclude: /node_modules/
		}]
	},
	plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.EnvironmentPlugin(envs),
        new webpack.DefinePlugin(
          Object.entries(envs).reduce((acc, [key, value]) => {
            acc[key] = JSON.stringify(value);
            return acc;
          }, {})
        )
    ],
	devtool: false,
	mode: "production"
});

module.exports = webpackConfig;
