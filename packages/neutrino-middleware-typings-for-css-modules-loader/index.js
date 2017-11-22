const loaderMerge = require('neutrino-middleware-merge-loader');
const { WatchIgnorePlugin } = require('webpack');

/*
  defaultOptions = {
    ruleId: 'style',
    useId: 'css',
  };
*/
module.exports = (neutrino, options = {}) => {
  neutrino.config
    .plugin('watch-ignore')
      .use(WatchIgnorePlugin, [[ /css\.d\.ts$/ ]])
      .end()
    .module
      .rule(options.ruleId || 'style')
        .use(options.useId || 'css')
          .loader(require.resolve('typings-for-css-modules-loader'));

  neutrino.use(loaderMerge(options.ruleId || 'style', options.useId || 'css'), {
    camelCase: true,
    modules: true,
    namedExport: true,
  });
};
