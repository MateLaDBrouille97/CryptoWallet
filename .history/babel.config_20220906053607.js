const crypto = require.resolve('crypto-browserify');
const url = require.resolve('url/');

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "react-native-reanimated/plugin",
    ],
  };
};

