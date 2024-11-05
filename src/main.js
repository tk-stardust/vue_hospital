import { createApp, toRaw } from 'vue'
// 状态管理库pinia
import { createPinia } from 'pinia'
import piniaPluginPeersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
import router from './router'
import panelHead from './components/panelHead.vue'

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
import { useMenuStore } from './stores/menu'

const pinia = createPinia()
pinia.use(piniaPluginPeersistedstate)
const app = createApp(App)
// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.component('panelHead',panelHead)

// pinia挂载
app.use(pinia)


 // 动态添加路由
 const menuStore = useMenuStore()
 const {dynamicMenu,routerList} = menuStore
 // 刷新后的动态路由添加
 const localData = localStorage.getItem('menu')
 if(localData){
   dynamicMenu(JSON.parse(localData).routerList)
   toRaw(routerList).forEach(item=>{
     router.addRoute('main',item)
 })
 }

// 路由挂载
app.use(router)

app.mount('#app')
