<template>
  <el-dialog
    v-model="executeDialogVisible.chooseDbDialogVisible"
    width="25%"
    close-on-click-modal
    draggable
    title="选择数据库"
  >
    <el-form>
      <el-form-item label="数据库">
        <el-select v-model="inputContent.dbInfoId" filterable>
          <el-option v-for="dbInfo in dbInfoList" :label="dbInfo.name" :value="dbInfo.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="executeDialogVisible.chooseDbDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="simpleExecuteSql">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import {useExecuteDialogVisibleStore} from "../../store/index";
import {requestGet, requestPost} from "../../api/util/commons";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

const props=defineProps<{
  sql:string
}>()

let executeDialogVisible=useExecuteDialogVisibleStore()

let dbInfoList=ref<DbInfo[]>([])

let inputContent=ref({
  dbInfoId:undefined,
  tableName:""
})

onMounted(()=>{
  console.log("choose")
  let params: GenericGetRequest = {
  }
  requestGet('/db_info/list',[]).then((data) => {
    if (data.code === 20000) {
      dbInfoList=data.data
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
    }
  })
})

function simpleExecuteSql(){
  executeDialogVisible.executeSqlDialogVisible=false
  requestPost('/job/execute/simple',{
    dbInfoId:inputContent.value.dbInfoId,
    sql:props.sql,
  }).then((data)=>{
    if(data.code!==20000){
      ElMessage.error(`执行错误：${data.message}`)
    }
    else {
      ElMessage.success("执行成功")
    }
  })
}
</script>

<style scoped>

</style>