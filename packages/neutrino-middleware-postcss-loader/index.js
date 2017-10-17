const merge = require('deepmerge');

module.exports = (neutrino, options = {}) => {
  const styleRule = neutrino.config.module.rule(options.ruleId);
  const useKeys = Array.from(styleRule.uses.store.keys());
  const cssUseId = useKeys.find(key => key.includes('css'));

  neutrino.config
    .module
      .rule(options.ruleId || 'style')
        .use(options.useId || 'postcss')
          .loader(require.resolve('postcss-loader'))
          .when(options.postcss, use => use.options(options.postcss))
          .end()
        .use(cssUseId || 'css')
          .tap(opts => merge(opts, {
            importLoaders: 1,
          }, options.css));
};
