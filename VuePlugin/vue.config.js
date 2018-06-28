module.exports = {
  assetsDir: './',
  baseUrl: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  configureWebpack: {
    entry: './src/example/main.js'
  }
}