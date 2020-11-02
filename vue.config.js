const { getCreateConfig } = require('./config/config.file')
const fileName = require('./config/fileName')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

function getPages () {
  let obj = {}

  let { html: { filename: template }, js: { filename: entry } } = getCreateConfig(process.env.selfDirName)
  Object.entries(fileName).forEach(([k, v]) => {
    obj[k] = {
      entry: entry.replace(/\${filename}/g, k),
      template: template.replace(/\${filename}/g, k),
      filename: isProd ? `${k}.html` : `${process.env.selfDirName}/${k}.html`, 
      title: '',
      favicon: path.join(__dirname, './public/favicon.ico'),
      chunks: ['chunk-vendors', 'chunk-common', `${k}`]
      // multihtmlCache: true
    }
  })
  return obj
}
let pages = getPages()

module.exports = {
  lintOnSave: false,
  publicPath: isProd ? '' : '/', 
  outputDir: 'dist/' + process.env.selfDirName, 
  assetsDir: 'static', 
  pages:{[process.env.selfDirName]:pages[process.env.selfDirName]},
  devServer: {
    index: `${process.env.selfDirName}.html`,
    contentBase: path.join(__dirname, ''),
    port: process.env.port
  },
  css: {
    sourceMap: !isProd,
    loaderOptions: process.env.selfAdaption ? {
      postcss: {
        plugins: [
          // px转rem
          require('postcss-pxtorem')({
            rootValue: 37.5,
            unitPrecision: 5,
            propList: ['*', '!font-size', '!border'],
            replace: !!isProd,
            selectorBlackList: [],
            minPixelValue: 12
          })
        ]
      }
    } : {}
  },

  configureWebpack: config => {

    config.externals = {
      'jquery': 'window.jQuery',
      'echarts': 'window.echarts',
      'BMap': 'window.BMap'
    },
    Object.assign(config, { // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@api': path.resolve(__dirname, './src/common/interface/api'),
          '@c': path.resolve(__dirname, './src/components'),
          // 配置到最底层的目录，方便以后迁移
          '@utils': path.resolve(__dirname, './src/common/utils'),
          '@less': path.resolve(__dirname, './src/common/less'),
          '@constant': path.resolve(__dirname, './src/common/constant'),
          '@mixins': path.resolve(__dirname, './src/common/mixins'),
          'vue$': 'vue/dist/vue.esm.js'
        }
      }
    })
  },
  chainWebpack: config => {
    let staticPath = ''
    if (isProd) {
      config.devtool = 'eval-source-map'
      staticPath = path.resolve(__dirname, `./dist/` + `static`)
    } else {
      staticPath = 'static'
    }

    config
      .plugin('copy')
      .init((CopyWebpackPlugin) => new CopyWebpackPlugin([{
        from: path.resolve(__dirname, './static'),
        to: staticPath
      }])).end()
  }
}