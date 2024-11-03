<template>
    <panelHead/>
    <div class="btns">
        <el-button :icon="Plus" type="primary" size="small" @click="open(null)">新增</el-button>
    </div>
    <el-table :data="tableDate.list" style="width: 100%;">
        <el-table-column prop="id" label="id"/>
        <el-table-column prop="name" label="呢称"/>
        <el-table-column prop="permissionName" label="菜单权限" width="500px"/>
        <el-table-column label="操作">
            <template #default="scope">
            <el-button link type="primary" @click="open(scope.row)">
                编辑
            </el-button>
        </template>
        </el-table-column>

    </el-table>
    <div class="pagination-info">
        <el-pagination
        v-model:current-page="paginationData.pageNum"
        :page-size="paginationData.pageSize"
        size="small"
        :background="false"
        layout="total, prev, pager, next"
        :total="tableDate.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
    </div>
    <el-dialog
        v-model="dialogFormVisable"
        :before-close="beforeClose"
        title="添加权限"
        width="500"
    >
        <el-form
            ref="formRef"
            label-width="100px"
            label-position="left"
            :model="form"
            :rules="rules"
        >
            <el-form-item v-show="false" prop="id">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请填写权限名称"/>
            </el-form-item>
            <el-form-item label="权限" prop="permissions">
                <el-tree
                    ref="treeRef"
                    style="max-width:  600px;"
                    :data="permissionData"
                    node-key="id"
                    show-checkbox
                    :default-checked-keys="defaultKeys"
                    :default-expanded-keys="[2]"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="confirm(formRef)">确认</el-button>
            </div>
        </template>

    </el-dialog>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { menuList, userGetmenu, userSetmenu } from '../../../api';
import { Plus } from '@element-plus/icons-vue';


    onMounted(()=>{
        // 菜单数据
        userGetmenu().then(({data}) => {
            permissionData.value = data.data
        })

        getListData()
    })

    // 列表数据
    const tableDate = reactive({
        list:[],
        total:0
    })

    // 弹窗的显示隐藏
    const dialogFormVisable = ref(false)

    // 打开弹窗
    const open =(rowData = {})=>{
        dialogFormVisable.value = true
        // 弹窗打开form生成是异步的
        nextTick(()=>{
            if(rowData){
                Object.assign(form,{id:rowData.id,name:rowData.name})
                treeRef.value.setCheckedKeys(rowData.permission)
            }
        })
    }

    const paginationData =reactive({
        pageNum:1,
        pageSize:10
    })

    const handleSizeChange = (val) => {
        paginationData.pageSize = val
        getListData()
    }

    const handleCurrentChange = (val) => {
        paginationData.pageSize = val
        getListData()
    }

    // 请求列表数据
    const getListData = () =>{
        menuList(paginationData).then(({data})=>{
            const {list,total} =data.data
            tableDate.list = list
            tableDate.total = total
        })
    }

    const formRef = ref()

    // form的数据
    const form = reactive({
        id:'',
        name:'',
        permissions:'',
    })

    // 树形菜单权限数据
    const permissionData =ref([])

    

    // 关闭弹窗的回调
    const beforeClose = () =>{
        dialogFormVisable.value = false
        // 重置表单
        formRef.value.resetFields()
        // tree选择重置
        treeRef.value.setCheckedKeys(defaultKeys)

    }

    // 选中权限
    const defaultKeys = [4,5]
    const treeRef = ref()

    // 表单校验
    const rules = reactive({
        name: [{required:true, message: '请输入权限名称', trigger:'blur'}]
    })

    // 表单提交
    const confirm = async (formEl)=>{
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                // 获取到选择的checkbox数据
                const permissions = JSON.stringify(treeRef.value.getCheckedKeys())
                userSetmenu({name:form.name,permissions,id:form.id}).then(({data})=>{
                    console.log(data);
                    beforeClose()
                    getListData()
                })
           
            } else {
                console.log('error submit!', fields)
            }
        })
    }


</script>

<style lang="less" scoped>
.btns{
    padding: 10px 0 10px 10px;
    background-color: #fff;
}
</style>