/* eslint-disable global-require, import/no-extraneous-dependencies */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const server = require('../src/server');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const app = express();

server(app);

if (isDevelopment) {
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/',
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(webpackConfig.output.publicPath, express.static(path.join(__dirname, '../dist')));
}

const port = 8080;
app.listen(port, () => {
  console.log('> Listening on port %s', port);
});
