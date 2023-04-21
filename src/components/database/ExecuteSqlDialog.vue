<template>
  <el-dialog v-model="executeDialogVisible.executeSqlDialogVisible" width="600">
    <template #header>
      <h2 class="dialog-header">
        创建数据库
      </h2>
    </template>
    <DataBaseCard url="/db_info/list/page" :execute="false"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearDialog">取消</el-button>
        <el-button type="primary" @click="submitAdd">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import DataBaseCard from "./DatabaseCard.vue";
import {useExecuteDialogVisibleStore} from "../../store/index";
import {requestPost} from "../../api/util/commons";
import {ElMessage} from "element-plus";
import {ref} from "vue";

const emits=defineEmits<{
  (e:'refresh'):void
}>()

let inputContent=ref()

const executeDialogVisible=useExecuteDialogVisibleStore()

function clearDialog() {
  executeDialogVisible.executeSqlDialogVisible = false
}

function submitAdd() {
  requestPost('/db_info/add', inputContent.value).then((data) => {
    if (data.code !== 20000) {
      ElMessage.error("添加失败：" + data.message)
    } else {
      emits('refresh')
      clearDialog()
    }
  })
}
</script>

<style scoped>

</style>