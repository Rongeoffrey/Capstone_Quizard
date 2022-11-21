const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry:{ 
    'bundle' : path.resolve(__dirname, './src/index.js'),
    'authStatusBundle' : path.resolve(__dirname, './src/authStatus.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer:{
    static: './dist/',
    hot: true,
    devMiddleware: {
        publicPath: '/dist/',
        writeToDisk: true,
     },   
},
  watch: true
}