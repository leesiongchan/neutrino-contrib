# Neutrino React CSS Modules Middleware
[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads]][npm-url]

`neutrino-middleware-react-css-modules` is Neutrino middleware for loading and importing stylesheets using css-modules.

## Requirements

- Node.js v6.10+
- Yarn or npm client
- Neutrino v7

## Installation

`neutrino-middleware-react-css-modules` can be installed via the Yarn or npm clients.

#### Yarn

```bash
❯ yarn add @leesiongchan/neutrino-middleware-react-css-modules
```

#### npm

```bash
❯ npm install --save @leesiongchan/neutrino-middleware-react-css-modules
```

## Usage

`neutrino-middleware-react-css-modules` can be consumed from the Neutrino API, middleware, or presets. Require this package
and plug it into Neutrino:

```js
// Using function middleware format
const reactCssModules = require('@leesiongchan/neutrino-middleware-react-css-modules');

// Use with default options
neutrino.use(reactCssModules);

// Usage showing default options
neutrino.use(reactCssModules, {
  generateScopedName: '[path]_[local]_[hash:base64:5]',
  webpackHotModuleReloading: true,
});
```

```js
// Using object or array middleware format

// Use with default options
module.exports = {
  use: ['@leesiongchan/neutrino-middleware-react-css-modules'],
};

// Usage showing default options
module.exports = {
  use: [
    ['@leesiongchan/neutrino-middleware-react-css-modules', {
      generateScopedName: '[path]_[local]_[hash:base64:5]',
      webpackHotModuleReloading: true,
    }],
  ],
};
```

[npm-image]: https://img.shields.io/npm/v/@leesiongchan/neutrino-middleware-react-css-modules.svg
[npm-downloads]: https://img.shields.io/npm/dt/@leesiongchan/neutrino-middleware-react-css-modules.svg
[npm-url]: https://npmjs.org/package/@leesiongchan/neutrino-middleware-react-css-modules
