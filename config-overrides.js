const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        // 'process/browser': require.resolve('process/browser')
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    return config;
}
