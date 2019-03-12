'use strict';

const path = require('path');
const fs = require('fs-extra');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const moduleFileExtensions = [
    'js',
    'json',
    'jsx',
    'css',
    'min.css',
    'ttf'
];

const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

const getPublicUrl = appPackageJson =>
    envPublicUrl || require(appPackageJson).homepage;

module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('public'),
    appHtml: resolveApp('app/index.html'),
    appIndexJs: resolveModule(resolveApp, 'app/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('app'),
    appNodeModules: resolveApp('node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json'))
};

module.exports.moduleFileExtensions = moduleFileExtensions;
