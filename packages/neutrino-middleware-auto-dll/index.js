const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = (neutrino, options = {}) => {
  neutrino.config
    .plugin('auto-dll')
      .use(AutoDllPlugin, [options]);
};
