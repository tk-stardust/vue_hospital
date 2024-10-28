<template>
    
 <el-menu 
    :style="{width: !isCollapse ? '230px' :'64px'}"
    active-text-color="#ffd04b" 
    background-color="#545c64" 
    class="aside-container" 
    default-active="2"
    text-color="#fff" 
    @open="handleOpen" 
    @close="handleClose"
    :collapse="isCollapse"
    >
        <p class="logo-lg">{{ isCollapse ? "TK":"TK陪诊"}}</p>
        <TreeMenu :index="1" :menuData/>
    </el-menu>
</template>

<script setup>
import TreeMenu from "./treeMenu.vue"
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useMenuStore } from "../stores/menu";
import { storeToRefs } from "pinia";
const router = useRouter()
const menuData = reactive(router.options.routes[0].children)
// menu的store
const menuStore = useMenuStore()
const {isCollapse} = storeToRefs(menuStore)

const handleOpen = (key,keyPath)=>{
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) =>{
    console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
.aside-container{
    height: 100%;
    .logo-lg{
        font-size: 20px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
}

</style>