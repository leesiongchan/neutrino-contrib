module.exports = (neutrino, options = {}) => {
  neutrino.config
    .resolve
      .extensions
        .add('.re')
        .add('.ml')
        .end()
      .end()
    .module
      .rule(options.ruleId || 'bs')
        .test(options.test || /\.(re|ml)$/)
        .when(options.include, rule => rule.include.merge(options.include))
        .when(options.exclude, rule => rule.exclude.merge(options.exclude))
        .use(options.useId || 'bs')
          .loader(require.resolve('bs-loader'))
          .options(options || {});
};
