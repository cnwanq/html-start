const path = require("path")
const webpack = require("webpack")
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index: './src/app/index.js',
    login: './src/app/login.js',
    admin: './src/app/admin.js',
  },
  output: {
    filename: 'assets/js/[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [{
        test: /\.less$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'less-loader'
        ]
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          "css-loader", // 将 CSS 转化成 CommonJS 模块
          "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        //use:['file-loader']
        use: [{
          loader: 'url-loader', //把图片转成base64
          options: {
            limit: 50 * 1024, //小于50k就会转成base64
            outputPath: 'images'
          }
        }]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { //env针对的是ES的版本，它会自动选择。react针对的就是react
            presets: ['env', 'react']
          }
        }],
        exclude: [
          path.resolve(__dirname, "/node_modules/")
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Html Starter',
      filename: 'index.html',
      template: 'ejs-compiled-loader!src/templates/index.tpl.html',
      chunks: ['index', 'vender']
    }),
    new HtmlWebpackPlugin({
      title: 'Html Login',
      filename: 'login.html',
      template: 'ejs-compiled-loader!src/templates/login.tpl.html',
      chunks: ['login', 'vender']
    }),
    new HtmlWebpackPlugin({
      title: 'Html Admin',
      filename: 'admin.html',
      template: 'ejs-compiled-loader!src/templates/admin.tpl.html',
      chunks: ['admin', 'vender']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css' //文件目录会放入output.path里
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/images',
      to: 'assets/images',
      toType: 'dir'
    }, ])
    // new webpack.ProvidePlugin({ //它是一个插件，所以需要按插件的用法new一个
    //   $: 'jquery', //接收名字:模块名
    //   _: 'underscore' //引入underscore库
    // }),
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 9000,
    open: true,
    hot: true,
  },
  performance: {
    // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
    hints: "warning",
    // 开发环境设置较大防止警告
    // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
    maxEntrypointSize: 5000000,
    // 最大单个资源体积，默认250000 (bytes)
    maxAssetSize: 3000000
  },
  optimization: { //优化
    splitChunks: {
      cacheGroups: { //缓存组，一个对象。它的作用在于，可以对不同的文件做不同的处理
        commonjs: {
          name: 'vender', //输出的名字（提出来的第三方库）
          test: /\.js/, //通过条件找到要提取的文件
          chunks: 'initial' //只对入口文件进行处理
        }
      }
    }
  }
}