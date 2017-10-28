const merge = require('deepmerge');

/*
  defaultOptions = {
    css: {},
    ruleId: 'style',
    useId: 'css',
  };
*/
module.exports = (neutrino, options = {}) => {
  neutrino.config
    .module
      .rule(options.ruleId || 'style')
        .use(options.useId || 'css')
          .loader(require.resolve('typings-for-css-modules-loader'))
          .tap(opts => merge(opts, options.css, {
            modules: 1,
          }));
};
