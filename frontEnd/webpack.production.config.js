const path = require('path')
const fs = require('fs')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin')
// const AssetsRelacePlugin = require('assets-replace-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pages = []

// 遍历读取html文件
fs.readdirSync('./').forEach((filename) => {
  const extname = path.extname(filename)// 后缀
  const basename = path.basename(filename, extname) // 文件名
  if (extname === '.html') {
    pages.push(basename)
  }
})

const webpackConfig = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'app/main.js')
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    chunkFilename: '[name].[chunkhash:5].js',
    filename: '[name].[chunkhash:5].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        // 'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            config: { path: path.resolve(__dirname, 'postcss.config.js') }
          }
        }
      ],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: 'file-loader?name=[name].[ext]&outputPath=./image/',
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    }
    ]
  },
  node: { Buffer: false },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false
          },
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          compress: {
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          }
        }
      })
    ],
    runtimeChunk: { name: () => { return 'manifest' } },
    splitChunks: {
      cacheGroups: {
        globals: {
          minChunks: 2,
          name: 'globals',
          priority: -20,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin('build'),
    new MiniCssExtractPlugin({
      filename: '[name].css'
      // chunkFilename: '[id].css'
    })
    // new AssetsRelacePlugin([
    //   path.resolve(__dirname, 'withdraw.html'),
    //   path.resolve(__dirname, 'auth.html')
    // ])
  ]
}

pages.map((page) => {
  const plugin = new HtmlWebpackPlugin({
    filename: `${page}.html`,
    template: `${page}.html`,
    inject: true,
    chunks: ['manifest', 'globals', page]
  })
  webpackConfig.plugins.push(
    plugin
  )
})
// webpackConfig.plugins.push(new InlineChunkManifestHtmlWebpackPlugin({ inlineChunks: ['manifest'] }))

module.exports = webpackConfig
