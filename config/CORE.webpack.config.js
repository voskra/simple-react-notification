'use strict';

const path = require('path');
const paths = require('./paths');
const publicPath = '/';
require('./env');

module.exports = {
    entry: [paths.appIndexJs],
    output: {
        publicPath: publicPath,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
        },
        runtimeChunk: true,
    },
    resolve: {
        modules: ['node_modules'].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),
        extensions: paths.moduleFileExtensions
            .map(ext => `.${ext}`),
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                test: /\.(js|mjs|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),

                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: paths.appSrc,
            },
        ]
    }
};
