/* eslint-disable node/no-unpublished-require */

const p = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

module.exports = {
  name: 'ehr',
  entry: {
    'ehr': './src/index.js'
  },
  output: {
    path: p.resolve(__dirname, 'public/assets'),
    filename: 'script.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(\/node_modules\/|\/src\/components\/)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 'modules': false }],
              '@babel/preset-stage-0'
            ],
          }
        }
      }, {
        test: /\.js$/,
        include: /\/src\/components\//,
        exclude: /\/node_modules\//,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { 'modules': false }],
              '@babel/preset-stage-0'
            ]
          }
        }
      }, {
        // локально, sourceMap, включая postcss, без url
        test: /\.css$/,
        exclude: /(\/node_modules\/|\.global\.)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]&url=false&sourceMap', {
            loader: 'postcss-loader', options: { sourceMap: true }
          }]
        })
      }, {
        test: /\.css$/,
        include: /\.global\./,
        exclude: /\/node_modules\//,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[local]&url=false&sourceMap', {
            loader: 'postcss-loader', options: { sourceMap: true }
          }]
        })
      }, {
        test: /\.css$/,
        include: /\/node_modules\//,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[local]&url=false']
        })
      }, {
        test: /\.scss$/,
        exclude: /(\/node_modules\/|\.global\.)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]&url=false&sourceMap', {
            loader: 'postcss-loader', options: { sourceMap: true }
          }, {
            loader: 'sass-loader', options: { sourceMap: true }
          }]
        })
      }, {
        test: /\.scss$/,
        include: /(\/node_modules\/|\.global\.)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[local]&url=false&sourceMap=true', {
            loader: 'postcss-loader', options: { sourceMap: true }
          }, {
            loader: 'sass-loader', options: { sourceMap: true}
          }]
        })
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new WebpackBuildNotifierPlugin({
      title: 'ehr Webpack Build'
    }),
  ],
  stats: { children: false }, // extract-text-webpack-plugin - disable logs
  devtool: 'source-map',
  devServer: {
    contentBase: p.join(__dirname, 'public'),
    port: 3000,
  },
  resolve: {
    alias: {
      'ehrSrc': p.resolve(__dirname, 'src'),
    },
  },
}
