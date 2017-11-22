const HardSource = require('hard-source-webpack-plugin');

module.exports = (neutrino, options = {}) => {
  neutrino.config
    .plugin('hard-source')
      .use(HardSource, [options]);
};
