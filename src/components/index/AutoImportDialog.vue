<template>
  <el-dialog
    v-model="visibleStore.autoImportDialogVisible"
    width="30%"
    close-on-click-modal
    draggable
    title="自动导入"
  >
    <div>
      <div style="display:flex;">
        <el-text>
          请输入表的列名，多个列以【英文或中文逗号】分隔：
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
        <el-button @click="visibleStore.autoImportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="autoImport">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {useImportDialogVisibleStore, useMetaTableStore} from "../../store/index";
import {ref} from "vue";
import {MetaTable2MetaTableId, requestPost} from "../../api/util/commons";
import {ElMessage} from "element-plus";

const visibleStore=useImportDialogVisibleStore()

let inputContent=ref("")

function importExample(){
  inputContent.value="id，用户名，创建时间，更新时间，is_deleted"
}

function autoImport(){
  visibleStore.autoImportDialogVisible = false;
  requestPost('/sql/get/schema/auto',{
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