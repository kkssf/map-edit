const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {

  chainWebpack: config => {
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
  },
  publicPath: './'
};
