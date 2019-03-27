// vue.config.js
module.exports = {
  configureWebpack: {

    proxyTable: {
      '/api': {
        target: 'http://zs.pcm77.com/', // 要访问接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': ''//重写接口访问
        }
      }
    },
    // host: '',//本机Ip或localhost
  }
}