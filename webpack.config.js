var glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  devtool: "source-map",
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/[name].css'
      // filename: ({ chunk }) => `${chunk.name.replace("/js/", "/css/")}.css`,
     }),
   ],
  mode: 'production',
  // entry: './_dev/index.js',
  // entry: {
  //   application: "./_dev/index.js",
  //   admin:       "./_dev/admin.js",
  //   css :       "./_dev/css/[name].css'}",
  // },
  entry: glob.sync('./_dev/**.js').reduce(function(obj, el){
    obj[path.parse(el).name] = el;
    return obj
    },{}),
  output: {
    filename: '[name].min.js',
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
        use: [MiniCssExtractPlugin.loader,
          'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          // "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.css','.scss', '.js']
  },
  optimization: {
    minimize: true,
    // minimizer: [
    //   new CssMinimizerPlugin({
    //   // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
    //   // `...`,
    //   // new CssMinimizerPlugin(),
    //   minify: CssMinimizerPlugin.cleanCssMinify,
    // }),
    // ],
    splitChunks: {
      cacheGroups: {
        cssStyles: {
          type: "css/mini-extract",
          name: "styles_css",
          chunks: (chunk) => {
            return chunk.name === "css";
          },
          enforce: true,
        },
      },
    },
  },
};