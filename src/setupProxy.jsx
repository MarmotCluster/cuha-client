//setupProxy.js

const createProxyMiddleware = require('http-proxy-middleware');

// src/setupProxy.js
module.exports = function (app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://59.31.59.43:8080/login',
            changeOrigin: true,
        })
    );
};
