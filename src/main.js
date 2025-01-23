import { createApp } from 'vue'
import App from './App.vue'
// 引入gin-vue-admin前端初始化相关内容
import registerElements from '@/core/element_lazy' // 按需加载element
import uploader from 'vue-simple-uploader'
// time line css
import '../node_modules/timeline-vuejs/dist/timeline-vuejs.css'
import bus from '@/utils/bus'
// 加载网站配置文件夹
import config from '@/core/config'

// 引入封装的router
import router from '@/router/index'
import '@/permission'
import { store } from '@/store'

import { auth } from '@/directive/auth'

const app = createApp(App)
app.use(router)
app.use(bus)
app.use(uploader)
app.use(store)
// 注册element组件、指令和全局方法
registerElements(app)
// 设置全局属性
app.config.globalProperties.$CFG = config // 在 Vue 3 中使用 app.config.globalProperties

app.mount('#app')
// 按钮权限指令
auth(app)

export default app