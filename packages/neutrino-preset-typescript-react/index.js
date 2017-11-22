const merge = require('deepmerge');
const typeScriptLoader = require('@leesiongchan/neutrino-middleware-typescript-loader');
const web = require('neutrino-preset-web');
const { join } = require('path');

const MODULES = join(__dirname, 'node_modules');

/*
  defaultOptions = {
    hot: true,
    typescript: {},
  };
*/
module.exports = (neutrino, opts = {}) => {
  const staticDir = join(neutrino.options.source, 'static');

  const options = merge({
    hot: true,
    typescript: {
      compilerOptions: {
        jsx: 'react',
        module: 'commonjs',
        sourceMap: true,
        target: 'es5',
        typeRoots: ['types', 'node_modules/@types'],
      },
      exclude: [staticDir],
      include: [
        neutrino.options.source,
        neutrino.options.tests,
      ],
    },
  }, opts);

  neutrino.use(web, options);
  neutrino.use(typeScriptLoader, options.typescript);

  neutrino.config
    .resolve
      .modules
        .add(MODULES)
        .end()
      .extensions
        .add('.tsx')
        .end()
      .end()
    .resolveLoader
      .modules
        .add(MODULES)
        .end()
      .end()
    .when(
      process.env.NODE_ENV === 'development' && options.hot,
      config => config.entry('index').prepend(require.resolve('react-hot-loader/patch')),
    );
};
