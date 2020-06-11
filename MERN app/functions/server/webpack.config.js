
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports={
    mode:'production',
    entry:'./server.js',
    target:'node',
    externals: [nodeExternals()],
    output:{
       filename:'main.js',
       path: path.resolve(__dirname,'dist')
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }


}