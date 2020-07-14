const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const devWebpackConfig = require("./webpack.config.dev");

const { HOST = "127.0.0.1", PORT = "5000" } = process.env;

const compiler = webpack(devWebpackConfig);

const server = new WebpackDevServer(compiler, {
   ...devWebpackConfig.devServer 
});

server.listen(PORT, HOST, err => {
  if (err) throw err;
});
