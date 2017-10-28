const merge = require('deepmerge');

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
          .when(options.postcss, use => use.options(options.postcss))
          .end()
        .use(options.cssUseId || 'css')
          .tap(opts => merge(opts, {
            importLoaders: 1,
          }));
};
