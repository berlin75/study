const { resolve } = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const pkgInfo = require('./package.json')

const entry = {}
const htmlPlugins = []
glob.sync('./pages/**/app.js').forEach(filepath => {
  const template = filepath.replace('app.js', 'index.html')
  const name = filepath.slice('./pages/'.length, -'/app.js'.length)
  entry[name] = filepath
  htmlPlugins.push(new HtmlWebpackPlugin({
    template,
    favicon: './pages/favicon.ico',
    filename: name + '.html',
    chunks: [name]
  }))
})

console.log(entry)

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: { 
    contentBase: './dist',
    openPage: 'index.html',
    hot: true,
    open: true
  },

  entry,
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    chunkFilename: '[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true,
  },

  module: {
    rules: [
      { 
        test: /\.vue$/, 
        use: ['vue-loader'] 
      },{
        test: /\.js$/,     
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ['@babel/preset-env'] }
          },
          // 'eslint-loader'
        ]
      },{
        test: /\.html$/,
        use: [ 'html-loader' ]
      },{
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { hmr: true } },
          // 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: { 
              plugins: [
                require('autoprefixer')({
                  "overrideBrowserslist": ["defaults","not ie < 11","last 2 versions","> 1%","iOS 7","last 3 iOS versions"]
                })
              ]
            }
          }
        ]
      },{
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000 } }]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    ...htmlPlugins,
    new HtmlWebpackPlugin({
      template: './pages/index.html',
      favicon: './pages/favicon.ico',
      inject: false
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkgInfo.version),
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
      chunkFilename: "[contenthash].css"
    }),
  ],

  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  }
}

