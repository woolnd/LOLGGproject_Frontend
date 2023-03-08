const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app){
    app.use(
        '/back',
        createProxyMiddleware({
            target: 'http://34.64.50.137:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/back': '',
            },
        }))
    app.use(
        '/riot',
        createProxyMiddleware({
            target: 'https://kr.api.riotgames.com',
            changeOrigin: true,
            pathRewrite: {
                '^/riot': '',
            },
        }))
    app.use(
        '/info',
        createProxyMiddleware({
            target: 'http://ddragon.leagueoflegends.com',
            changeOrigin: true,
            pathRewrite: {
                '^/info': '',
            },
        }))

    app.use(
        '/rank',
        createProxyMiddleware({
            target: 'https://opgg-static.akamaized.net',
            changeOrigin: true,
            pathRewrite: {
                '^/rank': '',
            },
        }))
    app.use(
        '/game',
        createProxyMiddleware({
            target: 'https://asia.api.riotgames.com',
            changeOrigin: true,
            pathRewrite: {
                '^/game': '',
            },
        }))
}