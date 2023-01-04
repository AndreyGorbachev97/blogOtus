const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env) => ({
  entry: { index: './src/index.js' },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  devtool: env.production ? 'source-map' : 'eval-source-map',
  mode: env.production ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(jpg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'order.html',
      template: 'src/pages/order.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'feedback.html',
      template: 'src/pages/feedback.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'items.html',
      template: 'src/pages/items.html',
    }),
    new MiniCssExtractPlugin()
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  devServer: {
    compress: true,
    port: 9001,
    watchFiles: ['*.html'],
  },

});