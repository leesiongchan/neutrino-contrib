const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');

module.exports = (neutrino, options = {}) => {
  neutrino.config
    .plugin('optimize-css-assets')
      .use(OptimizeCssAssets, [options]);
};
