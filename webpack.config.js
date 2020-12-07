const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  target: 'web',
  devtool: 'inline-source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          }
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'src/assets/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    isDevelopment && new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: false,
    }),
    isDevelopment && new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: './src/index.html',
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  optimization: {

  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true,
  },
}
