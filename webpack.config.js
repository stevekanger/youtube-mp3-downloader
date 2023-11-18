const path = require('path')
const prod = process.env.NODE_ENV === 'production'

module.exports = [
  {
    name: 'client',
    mode: prod ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src', 'client', 'index.tsx'),
    output: {
      filename: 'app.bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      open: true,
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:5000',
        '/auth': 'http://localhost:5000',
      },
    },
  },
]
