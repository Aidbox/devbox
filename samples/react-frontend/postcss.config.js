/* eslint-disable node/no-unpublished-require */

module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({browsers: ['> 1%', 'last 2 versions']}),
  ]
}
