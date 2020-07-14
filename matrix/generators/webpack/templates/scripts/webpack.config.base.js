const path = require("path");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const getResolvedPath = src => path.resolve(__dirname, '../', src);

module.exports = {
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      include: ['src', 'examples'].map(p => getResolvedPath(p)),
      exclude: /node_modules/
    },
    {
      test: /\.(svg|png|jpe?g|gif)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 4096,
            name: "static/img/[name].[hash:8].[ext]"
          }
        }
      ]
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: "url-loader",
      options: {
        limit: 4096,
        name: "static/media/[name].[hash:8].[ext]"
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
      options: {
        limit: 4096,
        name: "static/fonts/[name].[hash:8].[ext]"
      }
    }]
  },
  plugins: [
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ],
  },
};
