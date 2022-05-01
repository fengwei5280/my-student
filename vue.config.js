// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7000',
                changeOrigin: true,
                secure: true
                // rewrite:path => path.replace(/^\/api/,'')
            }
        }
    },
    transpileDependencies:['@dcloudio/uni-ui']
}