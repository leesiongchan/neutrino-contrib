const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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
    .plugin('fork-ts-checker')
      .use(ForkTsCheckerWebpackPlugin, [{ checkSyntacticErrors: true }])
      .end()
    .resolve
      .extensions
        .add('.ts')
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
          .options({
            compilerOptions: options.compilerOptions,
            // Use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
            happyPackMode: true,
          });
};
