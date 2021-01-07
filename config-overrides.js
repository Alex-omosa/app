const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const ASSET_PATH = 'http://localhost:3000/';
module.exports = function override(config, env) {
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ['javascript', 'css', 'html', 'typescript', 'json'],
    })
  );
  return config;
};
