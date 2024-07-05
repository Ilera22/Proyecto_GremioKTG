const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false, // opcionalmente deshabilitar ESLint en guardado

  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  productionSourceMap: false,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  }
});