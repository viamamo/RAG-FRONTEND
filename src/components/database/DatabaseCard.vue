<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-text size="large">数据库</el-text>
      </div>
    </template>
    <div>
      <el-input v-model="search" placeholder="Enter to search" @keydown.enter="refreshPage"/>
    </div>
    <div style="display: flex;justify-content: right;padding-top: 10px">
      <el-button @click="addDialogVisible.addDatabaseDialogVisible=true;">新增</el-button>
    </div>
    <el-table :data="dbInfoList" table-layout="auto" style="padding-top: 10px">
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="主机" prop="host"/>
      <el-table-column label="端口" prop="port"/>
      <el-table-column label="数据库名" prop="dbName"/>
      <el-table-column label="数据库类型" prop="dbType"/>
      <el-table-column label="连接参数" prop="property"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;padding-top: 10px">
      <el-pagination style="margin-left: auto;margin-right: auto" background layout="prev, pager, next" :total="total"
                     :current-page="current" :page-size="10" @current-change="refreshPage"/>
    </div>
    <AddDatabaseDialog @refresh="refreshPage"/>
  </el-card>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {requestPost, requestTableData} from "../../api/util/commons";
import {ElMessage, ElMessageBox} from "element-plus";
import AddDatabaseDialog from "./AddDatabaseDialog.vue";
import {useAddDialogVisibleStore} from "../../store/index";

const props = defineProps<{
  url: string,
}>()
const emits = defineEmits<{
  (e:'selected',dbInfo:DbInfo):void
}>()

const search = ref('')
let current = ref(1)
let total = ref(0)
let dbInfoList= ref<DbInfo[]>()

let addDialogVisible=useAddDialogVisibleStore()

const refreshPage=async (value?: number) => {
  if (typeof value==="number") {
    current.value = value
  }
  let params: GenericGetRequest = {
    sortOrder: "ASC",
    sortColumn: "id",
    paginationNum: current.value,
    paginationSize: 10,
    searchParam: search.value
  }
  await requestTableData<DbInfo>(props.url, params).then((data) => {
    if (data.code === 20000) {
      total.value = data.data.total
      dbInfoList.value = data.data.records
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
    }
  })
}

const handleDelete = (index: number, row: DbInfo) => {
  ElMessageBox.confirm(
      `确认要删除数据库:${row.name}吗?`,
      "",
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    .then(() => {
      requestPost('/db_info/delete',{
        id:row.id
      }).then((data)=>{
        if(data.code!==20000){
          ElMessage.error('删除失败:'+data.message)
        }
        else{
          ElMessage.success('删除成功')
          refreshPage()
        }
      })
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}

onMounted(() => {
  refreshPage()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>