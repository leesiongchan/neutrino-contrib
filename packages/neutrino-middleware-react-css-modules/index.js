const babelMerge = require('babel-merge');
const loaderMerge = require('neutrino-middleware-loader-merge');

const GENERATE_SCOPED_NAME = '[path]_[local]_[hash:base64:5]';

module.exports = (neutrino, opts = {}) => {
  neutrino.config.when(neutrino.config.module.rules.has('compile'), () => {
    neutrino.config.module
      .rule('compile')
        .use('babel')
          .tap(options => babelMerge(options, {
            plugins: [
              [require.resolve('babel-plugin-react-css-modules'), {
                generateScopedName: opts.generateScopedName || GENERATE_SCOPED_NAME,
                webpackHotModuleReloading: opts.webpackHotModuleReloading,
              }],
            ],
          }));
  });

  neutrino.config.when(neutrino.config.module.rules.has('style'), () => {
    neutrino.use(loaderMerge('style', 'css'), {
      localIdentName: opts.generateScopedName || GENERATE_SCOPED_NAME,
      modules: 1,
    });
  });
};
