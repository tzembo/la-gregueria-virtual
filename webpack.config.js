const webpack = require('webpack');

const config = {
    entry:  __dirname + '/app/index.jsx',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
      rules: [
        {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,  
          use: [{
              loader: 'url-loader',
              options: { 
                  limit: 8000, // Convert images < 8kb to base64 strings
                  name: 'images/[hash]-[name].[ext]'
              } 
          }]
        }
      ]
  }
};
module.exports = config;