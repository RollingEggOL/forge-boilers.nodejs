var clean = require('clean-webpack-plugin')
var html = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {

  entry: {
    bundle: [
      'babel-polyfill',
      './src/client/index.js'
      ]
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: "[name].min.js"
  },

  plugins: [

    new clean(['dist'], {
      root: __dirname + '/..',
      verbose: true,
      dry: false
    }),

    new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200
    }),

    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      },
      minimize: true,
      mangle: true
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),

    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      _ : 'lodash',
      $: 'jquery'
    }),

    new html({
      viewer3D: 'https://developer.api.autodesk.com/viewingservice/v1/viewers/viewer3D.min.js?v=2.13',
      threeJS:  'https://developer.api.autodesk.com/viewingservice/v1/viewers/three.min.js?v=2.13',
      style:    'https://developer.api.autodesk.com/viewingservice/v1/viewers/style.min.css?v=2.13',

      template: './layout/index.ejs',
      bundle: 'bundle.min.js',
      title: 'Autodesk Forge',
      filename: 'index.html',
      minify: {
        removeStyleLinkTypeAttributes: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true
      },
      inject: false
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: [
      path.resolve('./src/client/utils/Viewing.Extensions'),
      path.resolve('./src/client/components'),
      path.resolve('./src/client/services'),
      path.resolve('./src/client/styles'),
      path.resolve('./src/client/utils'),
      path.resolve('./src/client')
    ]
  },

  module: {

    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0']
        }
      },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  }
}
