const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkgInfo = require('./package.json')

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  devServer: { 
    contentBase: './dist',
    publicPath: "/assets/",
    hot: true
  },
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    publicPath: "/assets/",
    chunkFilename: '[chunkhash].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,     
        exclude: /node_modules/,
        use: [
        	{
		        loader: "babel-loader",
		        options: {
		          presets: ['@babel/preset-env']
		        }
		      },
        	// 'eslint-loader'
        ]
      },{
        test: /\.html$/,
        use: [{ 
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
          }
        }]
      },{
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: true },
          },
          // 'style-loader',
          {
            loader: 'css-loader', 
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: { 
              plugins: [
                require('autoprefixer')({
                  "overrideBrowserslist": [
                    "defaults",
                    "not ie < 11",
                    "last 2 versions",
                    "> 1%",
                    "iOS 7",
                    "last 3 iOS versions"
                  ]
                })
              ]
            }
          }
        ]
      },{
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './favicon.ico'
    }),
    new webpack.DefinePlugin({
      PUBLICPATH: JSON.stringify("/assets/"),
      VERSION: JSON.stringify(pkgInfo.version),
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
      chunkFilename: "[contenthash].css"
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true,
  },

  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  }
}

