<template>
    <template v-for="(item, index) in props.menuData">
        <el-menu-item 
        @click="menuClick(item,menuIndex(item))"
        v-if="!item.children || item.children.length == 0"
        :index="menuIndex(item)"
        :key="menuIndex(item)">
        <el-icon size="20">
            <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{item.meta.name}}</span>
        </el-menu-item>

        <el-sub-menu v-else :index="menuIndex(item)">
            <template #title>
                <el-icon size="20">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{item.meta.name}}</span>
            </template>
            <TreeMenu :index="menuIndex(item)" :menuData="item.children"/>
        </el-sub-menu>

    </template>

    
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useMenuStore } from '../stores/menu';
const props=defineProps(['menuData',"index"])
// 创建router实例
const router = useRouter()
const menuIndex = computed(()=>(item)=> `${props.index}-${item.meta.id}`
)
const menuStore = useMenuStore()
const {addMenu} = menuStore
// 点击菜单
const menuClick = (item,active) => {
    addMenu(item.meta)
    router.push(item.meta.path)
}
</script>

<style></style>