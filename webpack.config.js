const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      context: path.resolve(__dirname, './src/components/context/'),
      views: path.resolve(__dirname, './src/components/views/'),
      common: path.resolve(__dirname, './src/components/common/'),
      requests: path.resolve(__dirname, './src/components/requests/'),
      helper: path.resolve(__dirname, './src/components/helper/'),
      styles: path.resolve(__dirname, './src/styles/')
    }
  },
  output: { publicPath: '/', path: path.join(__dirname, '/dist'), filename: 'index_bundle.js' },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    inline: true,
    contentBase: './src',
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      filename: 'index.html',
      template: './src/public/index.html'
    }),
    new ExtractTextPlugin({ filename: 'css/style.css' })
  ]
};
