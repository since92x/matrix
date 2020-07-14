const webpack = require("webpack");
const prodWebpackConfig = require("./webpack.config.prod");

const compiler = webpack(prodWebpackConfig);

compiler.run((err, stats) => {
  if (err) throw err;
  console.log(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    })
  );
});
