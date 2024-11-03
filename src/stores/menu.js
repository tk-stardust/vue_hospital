import { defineStore } from "pinia";
import { reactive, ref } from "vue";


export const useMenuStore = defineStore('menu',()=>{
    const isCollapse = ref(false)
    const selectMenu = reactive([])
    const routerList = reactive([])
    // 菜单隐藏
    function collapseMenu(){
        console.log(isCollapse);
        isCollapse.value = !isCollapse.value
    }

    function addMenu(payload){
        if(selectMenu.findIndex(item => item.path === payload.path) === -1){
            selectMenu.push(payload)
        }
    }
    function closeMenu(payload){
        // 找到点击数据的索引
        const index = selectMenu.findIndex(val => val.name === payload.name)
        // 通过索引删除数组指定元素
        selectMenu.splice(index,1)

    }
    function dynamicMenu(payload){
        // 通过glob导入文件
        const modules = import.meta.glob('../views/**/**/*.vue')
        function routerSet(router){
            router.forEach(route => {
                // 判断没有子菜单,拼接路由数据
                if(!route.children){
                    const url = `../views${route.meta.path}/index.vue`
                    // 拿到获取的vue组件
                    route.component = modules[url]
                }else{
                    routerSet(route.children)
                }
            });   
        }
        routerSet(payload)
        // 拿到完整的路由数据
        Object.assign(routerList,payload)
    

    }



    return {isCollapse,selectMenu,routerList,collapseMenu,addMenu,closeMenu,dynamicMenu}
})