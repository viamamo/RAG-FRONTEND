<template>
  <el-dialog
    v-model="importDialogVisible.sqlImportDialogVisible"
    width="30%"
    close-on-click-modal
    draggable
    title="SQL导入"
  >
    <div>
      <div style="display:flex;">
        <el-text>
          请输入建表SQL：
        </el-text>
        <el-button @click="importExample">
          导入示例
        </el-button>
      </div>
      <br>
      <el-input v-model="inputContent" type="textarea" :rows="10" :autosize="false"/>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="importDialogVisible.sqlImportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sqlImport">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {useImportDialogVisibleStore, useMetaTableStore} from "../../../store/index";
import {ref} from "vue";
import {MetaTable2MetaTableId, requestPost} from "../../../api/util/commons";
import {ElMessage} from "element-plus";

const importDialogVisible=useImportDialogVisibleStore()

let inputContent=ref("")
function importExample(){
  //TODO sqlExample
  inputContent.value=""
}

function sqlImport(){
  importDialogVisible.sqlImportDialogVisible = false
  requestPost('/sql/get/schema/sql',{
    content:inputContent.value
  }).then((data)=>{
    if(data.code!=20000){
      ElMessage.error(`自动导入失败：${data.message}`)
    }
    let metaTable=data.data as MetaTable
    useMetaTableStore().$patch({metaTableId: MetaTable2MetaTableId(metaTable)})
    ElMessage.success("自动导入成功")
  })
}
</script>

<style scoped>
</style>