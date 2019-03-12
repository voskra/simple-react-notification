'use strict';

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const config = require('./webpack.config.dev');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy, allowedHost) {
    return {
        disableHostCheck:
            !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        compress: true,
        clientLogLevel: 'none',
        watchContentBase: true,
        hot: true,
        publicPath: config.output.publicPath,
        quiet: true,
        watchOptions: {
            ignored: ignoredFiles(paths.appSrc),
        },
        https: protocol === 'https',
        host,
        overlay: false,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            // See https://github.com/facebook/create-react-app/issues/387.
            disableDotRule: true,
        },
        public: allowedHost,
        before(app, server) {
            app.use(evalSourceMapMiddleware(server));
            app.use(errorOverlayMiddleware());
            app.use(noopServiceWorkerMiddleware());
        },
    };
};
