const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log(__dirname);
module.exports = {
    mode: 'production',
  //   watch: true,
  // mode: "development",
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new MiniCssExtractPlugin()
   ],
  entry: './_dev/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './assets/js'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
         'style-loader',
          {
            loader:'css-loader',
            options:{
              sourceMap: true, 
              importLoaders: 1
            }
          },
         {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  "autoprefixer",
                  {
                    overrideBrowserslist: ['last 3 versions', 'ie>9']
                  },
                ],
              ],
            },
          },
          }
        ],
       },
      // {
      //     test: /\.css$/i,
      //     exclude: /(node_modules|bower_components)/,
      //     use: ["style-loader", "css-loader"],
      // },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },

    ]
  }
};
