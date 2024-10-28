import { createApp } from 'vue'
// 状态管理库pinia
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
// icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const pinia = createPinia()
const app = createApp(App)
// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// 路由挂载
app.use(router)
// pinia挂载
app.use(pinia)
app.mount('#app')
