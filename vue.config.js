/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */

const url = 'http://localhost:1122'

module.exports = {
  productionSourceMap: false,
  // chainWebpack: config => {
  //   // 忽略的打包文件
  //   config.externals({
  //     'vue': 'Vue',
  //     'vue-router': 'VueRouter',
  //     'vuex': 'Vuex',
  //     'axios': 'axios',
  //     'element-ui': 'ELEMENT'
  //   })
  //   const entry = config.entry('app')
  //   entry
  //     .add('babel-polyfill')
  //     .end()
  //   entry
  //     .add('classlist-polyfill')
  //     .end()
  // },
  // 配置转发代理
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
