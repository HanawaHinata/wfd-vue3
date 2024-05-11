const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  css: {extract: false},
  devServer: {
    port: 8000,
    hot: true,
    open: '/'
  }
})
