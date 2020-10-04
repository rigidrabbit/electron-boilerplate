import webpack from 'webpack'
import merge from 'webpack-merge'
import TerserPlugin from 'terser-webpack-plugin'

const production = process.env.NODE_ENV === 'production'
process.env.BABEL_ENV = production ? 'production' : 'development'
const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    BABEL_ENV: JSON.stringify(process.env.BABEL_ENV),
  },
})

/* eslint-disable */
const appConfig = process.env.APPCONF && require(process.env.APPCONF) || {}
/* eslint-enable */

const config = {
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(pcss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  plugins: [definePlugin],
}

let extraConfig
if (production) {
  extraConfig = {
    cache: false,
    output: {
      pathinfo: false,
    },
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  }
} else {
  extraConfig = {
    cache: true,
    output: {
      pathinfo: true,
    },
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
  }
}

const all = merge({}, config, extraConfig, appConfig)
export default all
