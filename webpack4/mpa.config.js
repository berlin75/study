/*
├── dist
├── package.json
├── node_modules
├── src
│   ├── components
│   ├── shared
|   ├── favicon.png
│   └── pages                 页面放这里
|       ├── foo               编译后生成 http://localhost:8080/foo.html
|       |    ├── index.html
|       |    ├── index.js
|       |    ├── style.css
|       |    └── pic.png
|       └── bar                        http://localhost:8080/bar.html
|           ├── index.html
|           ├── index.js
|           ├── style.css
|           └── baz                    http://localhost:8080/bar/baz.html
|               ├── index.html
|               ├── index.js
|               └── style.css
└── webpack.config.js
*/

const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkgInfo = require('./package.json')
const glob = require('glob')

const entries = glob.sync('./src/pages/**/index.js');
const entry = {}
const htmlPlugins = []
for (const path of entries) { 
  const template = path.replace('index.js', 'index.html')
  const chunkName = path.slice('./src/pages/'.length, -'/index.js'.length)
  entry[chunkName] = [path, template]
  htmlPlugins.push(new HtmlWebpackPlugin({
    template,
    favicon: './favicon.ico',
    filename: chunkName + '.html',
    chunksSortMode: 'none',
    chunks: [chunkName]
  }))
}

// console.log(entry)
/*
{ 
  'bar/baz': [ './src/pages/bar/baz/index.js', './src/pages/bar/baz/index.html' ],
  bar: [ './src/pages/bar/index.js', './src/pages/bar/index.html' ],
  foo: [ './src/pages/foo/index.js', './src/pages/foo/index.html' ] 
}
*/

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: { 
    contentBase: './dist',
    openPage: 'foo.html',
    hot: true,
    open: true
  },
  entry,
  output: {
    filename: '[name].js', 
    path: resolve(__dirname, 'dist'),
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
    ...htmlPlugins,
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
