const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/build/",
    filename: 'bundle.js'
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