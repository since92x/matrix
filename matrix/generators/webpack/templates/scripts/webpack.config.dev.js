const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const baseWebpackConfig = require("./webpack.config.base");

const getResolvedPath = src => path.resolve(__dirname, '../', src);

const envs = {
    PUBLIC_PATH: '/',
    MODE: "dev"
};

const webpackConfig = merge(baseWebpackConfig, {
    entry: [
        getResolvedPath("examples/index.js")
    ],
	output: {
		publicPath: "/",
		filename: "bundle.js"
	},
    module: {
        rules: [{
            test: /\.s[ac]ss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
                "postcss-loader"
            ],
			include: ['src', 'examples'].map(p => path.resolve(p)),
            exclude: /node_modules/
        }]
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
			template: getResolvedPath("examples/index.html"),
            inject: true,
            compile: true,
            favicon: false,
            showErrors: true,
            chunksSortMode: 'auto',
        }),
        new webpack.EnvironmentPlugin(envs),
        new webpack.DefinePlugin(
            Object.entries(envs).reduce((acc, [key, value]) => {
                acc[key] = JSON.stringify(value);
                return acc;
            }, {})
        ),
	],
    devServer: {
        contentBase: ["examples", "src"].map(p => getResolvedPath(p)),
		inline: true,
        hot: true,
        open: true,
        quiet: false,
        noInfo: false,
        disableHostCheck: true,
        historyApiFallback: true,
        overlay: {
          errors: true
        },
        publicPath: envs.PUBLIC_PATH,
        clientLogLevel: "warning",
        stats: { colors: true, children: false },
        watchOptions: {
          ignored: /node_modules/,
          aggregateTimeout: 500, // 防止重复保存频繁重新编译,500毫米内重复保存不打包
          poll: 1000 // 每秒询问的文件变更的次数
        },
        before: app => {},
        proxy: {}
    },
    devtool: "cheap-source-map",
	mode: "development"
});

module.exports = webpackConfig;

