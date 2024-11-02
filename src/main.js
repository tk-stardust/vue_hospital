import { createApp } from 'vue'
// 状态管理库pinia
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

// 路由守卫
router.beforeEach((to,from)=>{
  const token=localStorage.getItem('pz_token')
  // 非登录页面token不存在
  if(!token && to.path !== '/login') {
    return '/login'
  }else if(token && to.path === '/login'){
    return '/'
  }else{
    return true
  }
})


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
