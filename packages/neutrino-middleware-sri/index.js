const merge = require('deepmerge');
const SriPlugin = require('webpack-subresource-integrity');

module.exports = (neutrino, options = {}) => {
  neutrino.config
    .output
      .set('crossOriginLoading', 'anonymous')
      .end()
    .plugin('sri')
      .use(SriPlugin, [merge({
        hashFuncNames: ['sha384'],
      }, options)]);
};
