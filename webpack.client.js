/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const config = require('./config');

const dev = process.env.NODE_ENV === 'development';

const clientConfig = {
  entry: ['babel-polyfill', './src/index.js'],
  mode: 'development',
  name: 'client',
  target: 'web',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(img|png|gif)$/,
        exclude: /node_modules/,
        use: 'file-loader',
      },
      {
        test: /\.(svg)$/,
        use: 'svg-url-loader',
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: dev ? './index.html' : './main.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: (module) => /node_modules/.test(module.resource),
          enforce: true,
        },
      },
    },
  },
};

module.exports = merge(config, clientConfig);
