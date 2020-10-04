const path = require('path')

const config = {
  target: 'electron-main',
  entry: [
    path.resolve('src/js/main.jsx'),
  ],
  output: {
    path: path.resolve('./publish/'),
    publicPath: '/',
    filename: 'main.js',
  },
  externals: [
    (() => {
      const IGNORES = [
        'electron',
      ]
      return (context, request, callback) => {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, `require('${request}')`)
        }
        return callback()
      }
    })(),
  ],
  node: {
    __dirname: false,
  },
}

module.exports = config
