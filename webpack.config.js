const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const extractTextPlugin = new ExtractTextPlugin({
  filename: 'style.css',
  disable: isDevelopment,
});

function filterByEnv(arr) {
  return arr.reduce((acc, value) => {
    if (!Array.isArray(value)) {
      return [...acc, value];
    }

    const [condition, conditionalValue] = value;
    if (!condition) {
      return acc;
    }

    return [...acc, conditionalValue];
  }, []);
}

module.exports = {
  entry: filterByEnv([
    [isDevelopment, 'webpack-hot-middleware/client'],
    './src/index.js',
  ]),

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'build.js',
  },

  module: {
    rules: [      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react','stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties','transform-decorators-legacy']
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: filterByEnv([
    // SHARED
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    extractTextPlugin,
    new webpack.DefinePlugin({
      __PRODUCTION__: isProduction,
      __DEVELOPMENT__: isDevelopment,
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      },
    }),

    // DEV
    [isDevelopment, new webpack.HotModuleReplacementPlugin()],
    [isDevelopment, new webpack.NoEmitOnErrorsPlugin()],

    // PROD
    [isProduction, new CleanWebpackPlugin(['dist'])],
    [
      isProduction,
      // minify with dead-code elimination
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        sourceMap: true,
      }),
    ],
    [isProduction, new webpack.LoaderOptionsPlugin({ minimize: true })],
  ]),  

  devtool: isProduction ? '#source-map' : '#eval-source-map',
};
