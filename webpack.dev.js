const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        client: {
            logging: 'info',
            overlay: true,
        },
        compress: true,
        open: true,
        port: "8000",
        static: ["./public"],
        historyApiFallback: true,
        hot: true,
        liveReload: true,
    },
    stats: {
        errorDetails: true,
    },
});