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
        .use(options.useId || 'typescript')
          .loader(require.resolve('awesome-typescript-loader'))
          .options(options.compilerOptions || {});
};
