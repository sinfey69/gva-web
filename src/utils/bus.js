import mitt from 'mitt'

const emitter = mitt()

export default {
  install(app) { // Vue 3 中通过 app.use() 使用插件时，会自动调用这个 install 方法
    app.config.globalProperties.$bus = emitter
  }
}