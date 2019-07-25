// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊

//  var lanHost = '192.168.31.224' //局域网ip Yu notebook
//  var lanPort = 8080

//  var apiTarget = 'http://sxl.weiren.me' // api地址

module.exports = {
    publicPath:'',
    // publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/': '/',
    devServer: {
        port:8080,
        disableHostCheck: true, //是否要关闭host检查
        
        proxy: {
          
        }
    },
    css: {
      loaderOptions: {
        css: {
          // 这里的选项会传递给 css-loader
          
        },
        sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.scss` 这个文件
          // data: `
          //       @import "@/assets/scss/compop/popSp.scss";
                
          // `
          
        },
        
      }
    }
    
}