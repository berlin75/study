const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'js/bundle.[hash:8].js',
    path: path.join(__dirname, 'dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'images/[name]-webpack.[ext]',
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: { limit: 10000, name: '/YDW_res/media/[name].[ext]' }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: { limit: 10000, name: '/YDW_res/fonts/[name].[ext]' }
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src/assets/tmpl/index.tmpl.html'),
      favicon: 'favicon.ico',
      minify: {
        // removeAttributeQuotes: true,
        // collapseWhitespace: true
      }
    }),
  ]
}

if (isDev) {
  config.mode = 'development'
  config.module.rules.push(
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  },{
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { sourceMap: true }
      },
      'stylus-loader'
    ]
  })
  // 生成Source Maps,用于调试
  config.devtool = '#cheap-module-eval-source-map'
    // webpack-dev-server的配置
    // host设为0.0.0.0可以loclahost、127.0.0.1或者本机内网ip访问,或者手机连接电脑访问
    // overlay webpack编译时的错误都可以显示在网页上
  config.devServer = {
    port: 8888,
    host: '127.0.0.1',
    overlay: { errors: true },
    open: true,
    hot: true,
    historyApiFallback: true,
    noInfo: true,
  }
  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )
} else {
  config.mode = 'production'
  // 框架文件vue单独打包
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = 'js/[name].[chunkhash:8].js'
  // 开发环境单独分离css文件打包
  config.module.rules.push(
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      extractCSS: true
    }
  },{
    test: /\.styl$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          }
        },
        'stylus-loader'
      ]
    })
  })

  config.plugins.push(
    new CleanWebpackPlugin(['dist']),
    new webpack.BannerPlugin('imooc-todolist'),
    // new ExtractPlugin('styles.[contentHash:8].css'),
    new ExtractPlugin({
      filename: 'css/styles.[contentHash:8].css',
      allChunks: true,
      // publicPath:'../'
    }),
  )

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        // commons: {
        //       chunks: 'initial',
        //       minChunks: 2, 
        //       maxInitialRequests: 5,
        //       minSize: 0
        // },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: true
  }
}

module.exports = config