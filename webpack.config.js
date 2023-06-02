const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const path = require('path');

const PORT = 8080;

module.exports = (env) => ({
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    chunkFilename: '[contenthash].js',
    path: path.resolve(
      __dirname, 'dist',
    ),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    historyApiFallback: true,
    open: false,
    port: PORT,
    hot: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.(css|s[ac]ss)$/i,
      //   use: ['style-loader', 'css-loader', 'postcss-loader'],
      // },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              // esModule: false,
              // modules: false,
              sourceMap: true,
              // importLoaders: 2,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true, // To turn on CSS optimizer in dev
    minimizer: [
      '...',
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        minify: TerserPlugin.uglifyJsMinify,
        parallel: true,
      }),
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname, 'public', 'index.html',
      ),
      favicon: './public/assets/favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new webpack.DefinePlugin({
    	USE_MOCK_DATA: JSON.stringify(env.USE_MOCK_DATA === 'true'),
    }),
    // new CopyWebpackPlugin({
    // 	patterns: [{
    // 		from: 'public/assets',
    // 		to: 'assets',
    // 	}],
    // }),
  ],
});
