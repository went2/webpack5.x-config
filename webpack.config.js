const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js', // 打包的入口文件，可多个
  output: { // 打包后的输出配置
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true
  },
  devServer: {
    static: './dist', // 告诉 webpack-dev-server 观察哪个文件夹
  },
  module: { // loader 配置写到 rules 字段内
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: { // 配置输出文件
          filename: 'imgs/[name].[hash:6][ext]'
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: 'index.ejs', // 自定义html模板文件，使用ejs文件，避免与html-loader冲突
      title: 'Cook it!',
      favicon: 'favicon.png',
      hash: true
    }),
    new MiniCssExtractPlugin(),
  ]
}