var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin'); //清理插件
var HtmlWebpackPlugin = require('html-webpack-plugin'); //html

module.exports = {
  entry: {
    index: ['./src/index.jsx', 'lrz/dist/lrz.all.bundle.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    // publicPath: 'lib',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    },{
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10&minetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10&minetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10&minetype=image/svg+xml'
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname, // An absolute path for the root.
      verbose: true, // Write logs to console.
      dry: false // Do not delete anything, good for testing.
    }),
    new HtmlWebpackPlugin({
      title: '社区报修系统',
      filename: 'index.html',
      template: './src/index.ejs',
      // chunks: [chunk],
      inject: true,
      hash: false
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom',
      '_': 'lodash'
      // 'fetch': 'whatwg-fetch'
    })
  ]
};
