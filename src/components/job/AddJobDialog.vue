<template>
  <el-dialog
    v-model="executeDialogVisible.addJobDialogVisible"
    width="20%"
    close-on-click-modal
    draggable
    title="选择数据库"
  >
    <el-form>
      <el-form-item label="数据库：">
        <el-select v-model="inputContent.dbInfoId" filterable>
          <el-option v-for="dbInfo in dbInfoList" :label="dbInfo.name" :value="dbInfo.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="executeDialogVisible.addJobDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addJob">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {useExecuteDialogVisibleStore, useMetaTableStore} from "../../store/index";
import {onMounted, ref} from "vue";
import {MetaTableId2MetaTable, requestGet, requestPost} from "../../api/util/commons";
import {ElMessage} from "element-plus";

let metaTableId: MetaTableId = useMetaTableStore().metaTableId
let executeDialogVisible=useExecuteDialogVisibleStore()

let dbInfoList=ref<DbInfo[]>([])

let inputContent=ref({
  dbInfoId:undefined,
})

onMounted(()=>{
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

function addJob(){
  executeDialogVisible.addJobDialogVisible=false
  requestPost('/job_info/add',{
    dbInfoId:inputContent.value.dbInfoId,
    content:JSON.stringify(MetaTableId2MetaTable(metaTableId))
  }).then((data)=>{
    if(data.code!==20000){
      ElMessage.error(`添加错误：${data.message}`)
    }
    else {
      ElMessage.success("添加成功")
    }
  })
}
</script>

<style scoped>

</style>