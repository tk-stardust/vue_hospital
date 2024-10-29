import { defineStore } from "pinia";
import { reactive, ref } from "vue";


export const useMenuStore = defineStore('menu',()=>{
    const isCollapse = ref(false)
    const selectMenu = reactive([])
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



    return {isCollapse,selectMenu,collapseMenu,addMenu,closeMenu}
})