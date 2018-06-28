module.exports = {
  baseUrl: './',
  configureWebpack: {
    resolve: {
      alias: {
        '@': '../src/components',
        'assets': './src/assets'
      }
    }
  },
}