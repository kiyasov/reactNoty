import path from "path";
import webpack from "webpack";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

import TerserPlugin from "terser-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";

const distPath = path.join(__dirname, "/public");

export default env => {
  return {
    entry: {
      main: __dirname + "/index.js"
    },
    output: {
      filename: "bundle.js",
      path: distPath
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: "url-loader?limit=100000"
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: "~",
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      minimizer: [
        new TerserPlugin(),
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: { discardComments: { removeAll: true } }
        })
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `app.css`
      }),
      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
    ],
    devServer: {
      contentBase: distPath,
      port: 5000,
      compress: true,
      open: true
    }
  };
};
