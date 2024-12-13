<template>
    <panelHead :route/>
    <div class="btns">
      <el-button :icon="Plus" type="primary" size="small" @click="open(null)">新增</el-button>
      <el-popconfirm
        confirm-button-text="是"
        cancel-button-text="否"
        width="220"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="是否确认删除?"
        @confirm="confirmEvent"
        @cancel="cancelEvent"
      >
        <template #reference>
          <el-button :icon="Delete" type="danger" size="small">删除</el-button>
        </template>

      </el-popconfirm>
    </div>
    <el-table :data="tableDate.list" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id"/>
        <el-table-column prop="name" label="呢称"/>
        <el-table-column label="头像">
            <template #default="scope">
                <el-image 
                  style="width: 50px;height: 50px;"
                  :src="scope.row.avatar"
                />
            </template>
        </el-table-column>
        <el-table-column prop="name" label="性别">
          <template #default="scope">
                {{ scope.row.sex === '1' ? '男' : '女'}}
            </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号"/>
        <el-table-column prop="active" label="状态">
            <template #default="scope">
                <el-tag :type="scope.row.active ? 'success':'danger'">{{ scope.row.active ? '正常':'失效' }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="创建时间">
            <template #default="scope">
                <div class="flex-box">
                    <el-icon><Clock /></el-icon>
                    <span style="margin-left: 10px;">{{ scope.row.create_time }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
            <el-button type="primary" @click="open(scope.row)">
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
        title="陪护师添加"
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
                  <el-input v-model="form.id"/>
              </el-form-item>
              <el-form-item label="呢称" prop="name">
                  <el-input v-model="form.name" placeholder="请输入呢称"/>
              </el-form-item>
              <el-form-item label="头像" prop="avatar">
                  <el-button v-if="!form.avatar" type="primary" @click="dialogImgVisable=true">点击上传</el-button>
                  <el-image 
                    v-else
                    :src="form.avatar"
                    style="width: 100px;height: 100px;"
                  />
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                  <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input-number v-model="form.age" :min="18" :max="50"/>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="form.mobile" placeholder="请输入手机号"/>
              </el-form-item>
              <el-form-item label="是否生效" prop="active">
                <el-radio-group v-model="form.active">
                  <el-radio :value="0">失效</el-radio>
                  <el-radio :value="1">生效</el-radio>
                </el-radio-group>
              </el-form-item>
          </el-form>
          <template #footer>
              <div class="dialog-footer">
                  <el-button type="primary" @click="confirm(formRef)">确认</el-button>
              </div>
          </template>
    </el-dialog>
    <el-dialog
        v-model="dialogImgVisable"
        :before-close="beforeImgClose"
        title="选择图片"
        width="680"
    >
        <div class="image-list">
            <div v-for="(item,index) in fileList" :key="item.name" class="img-box" @click="selectIndex = index">
              <div v-if="selectIndex === index" class="select">
                <el-icon color="#fff"><Check /></el-icon>
              </div>  
              <el-image
                  style="width: 148px;height: 148px;"
                  :src="item.url"
                />
            </div>
        </div>
        <template #footer>
              <div class="dialog-footer">
                  <el-button @click="dialogImgVisable = false">取消</el-button>
                  <el-button type="primary" @click="confirmImg">确认</el-button>
              </div>
          </template>
    </el-dialog>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { Plus ,InfoFilled, Delete} from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { companion, companionList, deleteCompanion, photoList } from '../../../api';
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';

onMounted(() => {
  photoList().then(({data}) => {
    fileList.value = data.data
  })
  getListData()
})

const paginationData =reactive({
    pageNum:1,
    pageSize:10
})
// 列表数据
const tableDate = reactive({
    list:[],
    total:0
})

// 请求列表
const getListData = () =>{
    companionList(paginationData).then(({data})=>{
        const {list,total} = data.data
        list.forEach(item => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
        })
        tableDate.list = list
        tableDate.total = total
    })
}

const route = useRoute()
const dialogFormVisable = ref(false)
const beforeClose = ()=>{
  dialogFormVisable.value = false
  // 重置表单
  formRef.value.resetFields()
}
const formRef = ref()
const form = reactive({
    id:'',
    mobile:'',
    active:1,
    age:28,
    avatar:'',
    name:'',
    sex:''
})

const rules=reactive({
  name: [{required:true, message: '请输入呢称', trigger:'blur'}],
  avatar: [{required:true, message: '请选择头像'}],
  sex: [{required:true, message: '请选择性别', trigger:'change'}],
  mobile: [{required:true, message: '请输入手机号', trigger:'blur'}],


})

const confirm = async(formEl) => {
    if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                companion(form).then(({data}) => {
                  if(data.code === 10000){
                    ElMessage.success('创建成功')
                    beforeClose()
                    getListData()
                  }else{
                    ElMessage.error(data.message)
                  }
                })
           
            } else {
                console.log('error submit!', fields)
            }
        })
}

const open = (rowData = {}) => {
    dialogFormVisable.value = true
    nextTick(()=>{
      // 如果是编辑
        if(rowData){
            Object.assign(form,rowData)
        }
    })

}

// 头像弹窗
const dialogImgVisable = ref(false)
const fileList = ref([])
const selectIndex = ref(0)
const confirmImg = () => {
  form.avatar = fileList.value[selectIndex.value].url
  dialogImgVisable.value = false
}
const beforeImgClose = ()=>{
  dialogImgVisable.value = false
}

const handleSizeChange = (val) => {
    paginationData.pageSize = val
    getListData()
}

const handleCurrentChange = (val) => {
    paginationData.pageSize = val
    getListData()
}

const selectTableData = ref([])

const handleSelectionChange = (val) => {
    selectTableData.value = val.map(item => ({id : item.id}))
}

// 删除
const confirmEvent = () => {
    // 没有选择数据
    if(!selectTableData.value.length){
      return ElMessage.warning('请选择至少一项数据')
    }
    deleteCompanion({ id : selectTableData.value}).then(({data}) => {
        if(data.code === 10000){
            getListData()
        }
    })
}
const cancelEvent = () => {

}


</script>

<style lang="less" scoped>
.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
}
.image-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .img-box {
    position: relative;
    .select {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 24px;
      height: 24px;
      background-color: #67c23a;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-image {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>