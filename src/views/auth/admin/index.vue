<template>
  
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { authAdmin } from '../../../api';

const paginationData =reactive({
    pageNum:1,
    pageSize:10
})
onMounted(()=>{
    authAdmin(paginationData).then(({data})=>{
        
    })
})



</script>

<style>

</style>