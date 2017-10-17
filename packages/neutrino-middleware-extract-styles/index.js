const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('deepmerge');

module.exports = (neutrino, options = {}) => {
  const { loader = {}, plugin = {}, ruleId } = options;

  const styleRule = neutrino.config.module.rule(ruleId);
  const styleRuleUseKeys = Array.from(neutrino.config.module.rule(ruleId).uses.store.keys());
  const styleUseId = styleRuleUseKeys.find(key => key.includes('style'));
  const styleFallback = {
    loader: styleRule.use(styleUseId).get('loader'),
    options: styleRule.use(styleUseId).get('options'),
  };
  const styleLoaders = styleRuleUseKeys
    .filter(key => key !== styleUseId)
    .map(key => styleRule.use(key))
    .map(use => ({
      loader: use.get('loader'),
      options: use.get('options'),
    }));

  const loaders = ExtractTextPlugin.extract(merge({
    fallback: styleFallback || require.resolve('style-loader'),
    use: styleLoaders || require.resolve('css-loader'),
  }, loader));

  styleRule.uses.clear();

  loaders.forEach(({ loader, options }) => {
    styleRule
      .use(loader)
        .loader(loader)
        .when(options, use => use.options(options));
  });

  neutrino.config
    .plugin('extract-styles')
      .use(ExtractTextPlugin, [merge({
        filename: '[name].[hash].css',
      }, plugin)]);
};
