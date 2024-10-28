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



    return {isCollapse,selectMenu,collapseMenu,addMenu}
})