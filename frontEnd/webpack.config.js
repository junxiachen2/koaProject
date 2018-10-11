const path = require('path')
const fs = require('fs')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const childProcess = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Config = require('./config')

let cmd = null
const pages = []
switch (process.platform) {
  case 'wind32':
    cmd = 'start'
    break
  case 'linux':
    cmd = 'xdg-open'
    break
  case 'darwin':
    cmd = 'open'
    break
}
// 遍历读取html文件
fs.readdirSync('./').forEach((filename) => {
  const extname = path.extname(filename)// 后缀
  const basename = path.basename(filename, extname) // 文件名
  if (extname === '.html') {
    pages.push(basename)
  }
})

const webpackConfig = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'app/main.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.16.0.30:3000',
        secure: false
      }
    },
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: Config.port,
    host: Config.ip,
    historyApiFallback: true,
    after: function (app) {
      console.log('有这些页面:')
      pages.map(page => {
        console.log(`${page}.html`)
        childProcess.exec(`${cmd} http://${Config.ip}:${Config.port}/${page}.html`)
      })
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'app')],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [path.resolve(__dirname, 'app')],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        include: [path.resolve(__dirname, 'app')],
        exclude: [nodeModuleDir]
      }
    ]
  },
  plugins: []
}

pages.map((page) => {
  const plugin = new HtmlWebpackPlugin({
    filename: `${page}.html`,
    chunks: [page],
    template: `${page}.html`
  })
  webpackConfig.plugins.push(
    plugin
  )
})

module.exports = webpackConfig
