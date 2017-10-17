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
        .use(options.useId || 'bs')
          .loader(require.resolve('bs-loader'))
          .options(options || {});
};
