module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': '../src/components',
        'assets': './src/assets'
      }
    }
  },
}