const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊

//  var lanHost = '192.168.31.224' //局域网ip Yu notebook
//  var lanPort = 8080

//  var apiTarget = 'http://sxl.weiren.me' // api地址


module.exports = {

  // publicPath: '/js',
  // publicPath:'./',
  productionSourceMap:false,
  publicPath: process.env.NODE_ENV === 'production' ? './': '/js/',
  devServer: {
    port: 80,
    // port:8080,
    disableHostCheck: true, //是否要关闭host检查

    // proxy: {

    //   '/Api/': {
    //     target: 'http://sxl.weiren.me',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //         '^/Api': '/Api', // rewrite path
    //     },
    //   },
    // }
    proxy: {
      '/api': {
        target: 'http://117.48.207.24:8000',
        // target:'http://192.168.31.89:8000/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '', // rewrite path
        },
      }
    },

  },
  css: {
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader

      },
      sass: {
        data: `
            @import "@/assets/scss/compop/popSp.scss";
            @import "@/assets/scss/_public.scss";
            @import "@/assets/scss/_icon.scss";
            @import "@/assets/scss/compop/_components.scss";
            @import "@/assets/scss/compop/_insidePage_gs.scss";
            @import "@/assets/scss/compop/_resetUi.scss";
            @import "@/assets/scss/compop/compop.scss";
            @import "@/assets/scss/views/ShangLian/ShangLian.scss";
            @import "@/assets/scss/views/LianQuan/LianQuan.scss";
          `
      },
    }
  },

  // configureWebpack: {
  //   optimization: {
  //     minimizer: [
  //       new TerserPlugin({
  //         terserOptions: {
  //           compress: {
  //             drop_console: false // 清除console
  //           }
  //         }
  //       })
  //     ]
  //   }
  // },

}