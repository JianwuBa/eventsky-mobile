module.exports = {
    devServer: {
        port: 8080, // 端口号
        // 配置代理跨域
        proxy: {
            // 指的是哪些请求会触发代理跨域，/指的是任意的请求都会触发
            '/': {
                // target指的是代理地址，需要代理请求的地址
                target: 'http://192.168.1.166:9090',
                // target: 'https://gw.eventsky.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/'
                }
            }
        }
    }
};