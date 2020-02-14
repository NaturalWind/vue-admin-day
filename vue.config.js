/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */

const path = require('path')
const url = 'http://localhost:1122'

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    // 自动化导入文件
    const types = ['vue']
    types.forEach(type => {
      config.module.rule('scss').oneOf(type)
      .use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/styles/variables.scss'),
          path.resolve(__dirname, './src/styles/mixin.scss')
        ]
      })
    })
    // 忽略的打包文件
    // config.externals({
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'axios': 'axios',
    //   'element-ui': 'ELEMENT'
    // })
    // const entry = config.entry('app')
    // entry
    //   .add('babel-polyfill')
    //   .end()
    // entry
    //   .add('classlist-polyfill')
    //   .end()
  },
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
