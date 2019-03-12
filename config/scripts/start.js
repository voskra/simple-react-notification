'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const paths = require('../paths');
process.env.PROXY = require(paths.appPackageJson).proxy;

const config = require('../webpack.config.dev');

process.on('unhandledRejection', err => {
    throw err;
});

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const {
    choosePort,
    createCompiler,
    prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const createDevServerConfig = require('../webpackDevServer.config');
const isInteractive = process.stdout.isTTY;

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 7779;
const HOST = process.env.HOST || '0.0.0.0';

const { checkBrowsers } = require('react-dev-utils/browsersHelper');

checkBrowsers(paths.appPath, isInteractive)
    .then(() => {
        return choosePort(HOST, DEFAULT_PORT);
    })
    .then(port => {
        if (port == null) {
            return;
        }
        const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
        const appName = require(paths.appPackageJson).name;
        const urls = prepareUrls(protocol, HOST, port);
        const compiler = createCompiler(webpack, config, appName, urls, false);
        const serverConfig = createDevServerConfig(process.env.PROXY, urls.lanUrlForConfig);
        const devServer = new WebpackDevServer(compiler, serverConfig);

        devServer.listen(port, HOST, err => {
            if (err) {
                return console.log(err);
            }
            if (isInteractive) {
                clearConsole();
            }
            console.log('Starting the development server...\n');
            openBrowser(urls.localUrlForBrowser);
        });

        ['SIGINT', 'SIGTERM'].forEach(function(sig) {
            process.on(sig, function() {
                devServer.close();
                process.exit();
            });
        });

    })
    .catch(err => {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });
