const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const merge = require('deepmerge');

/*
  defaultOptions = {
    compilerOptions: {},
    exclude: null,
    include: null,
    ruleId: 'typescript',
    test: /\.tsx?$/,
    useId: 'typescript',
  };
*/
module.exports = (neutrino, options = {}) => {
  neutrino.config
    .plugin('auto-dll')
      .use(ForkTsCheckerWebpackPlugin, [{ checkSyntacticErrors: true }])
      .end()
    .resolve
      .extensions
        .add('.ts')
        .add('.tsx')
        .end()
      .end()
    .module
      .rule(options.ruleId || 'typescript')
        .test(options.test || /\.tsx?$/)
        .when(options.include, rule => rule.include.merge(options.include))
        .when(options.exclude, rule => rule.exclude.merge(options.exclude))
        .use('cache')
          .loader(require.resolve('cache-loader'))
          .end()
        .use('thread')
          .loader(require.resolve('thread-loader'))
          .options({
            // There should be 1 CPU for the fork-ts-checker-webpack-plugin
            workers: require('os').cpus().length - 1,
          })
          .end()
        .use(options.useId || 'typescript')
          .loader(require.resolve('ts-loader'))
          .options(merge({
            // Use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            happyPackMode: true,
          }, options.compilerOptions || {}));
};
