const loaderMerge = require('neutrino-middleware-merge-loader');

/*
  defaultOptions = {
    cssUseId: 'css',
    postcss: {},
    ruleId: 'style',
    useId: 'postcss',
  };
*/
module.exports = (neutrino, options = {}) => {
  neutrino.config
    .module
      .rule(options.ruleId || 'style')
        .use(options.useId || 'postcss')
          .loader(require.resolve('postcss-loader'))
          .when(options.postcss, use => use.options(options.postcss));

  neutrino.use(loaderMerge(options.ruleId || 'style', options.cssUseId || 'css'), {
    importLoaders: 1,
  });
};
