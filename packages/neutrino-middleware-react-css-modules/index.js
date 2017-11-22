const babelMerge = require('babel-merge');
const loaderMerge = require('neutrino-middleware-merge-loader');

const GENERATE_SCOPED_NAME = '[path]_[local]_[hash:base64:5]';

/*
  defaultOptions = {
    generateScopedName: GENERATE_SCOPED_NAME,
    webpackHotModuleReloading: false,
  };
*/
module.exports = (neutrino, options = {}) => {
  neutrino.config.module
    .rule('compile')
      .use('babel')
        .tap(opts => babelMerge(opts, {
          plugins: [
            [require.resolve('babel-plugin-react-css-modules'), {
              generateScopedName: opts.generateScopedName || GENERATE_SCOPED_NAME,
              webpackHotModuleReloading: opts.webpackHotModuleReloading,
            }],
          ],
        }));

  neutrino.use(loaderMerge('style', 'css'), {
    localIdentName: opts.generateScopedName || GENERATE_SCOPED_NAME,
    modules: 1,
  });
};
