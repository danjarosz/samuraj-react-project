const { merge } = require('webpack-merge');

const commonConfiguration = require('./webpack/common');

module.exports = (_env, { mode }) => {
  const properConfig = require(`./webpack/${mode}`);
  const mergedConfig = merge(commonConfiguration, properConfig);

  return mergedConfig;
}