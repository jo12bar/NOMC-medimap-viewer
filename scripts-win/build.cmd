@ECHO OFF

cross-env BABEL_ENV=production webpack --progress --config webpack.config.production.js
