<template>
  <el-drawer
    v-model="importDialogVisible.tableImportDrawerVisible"
    direction="rtl"
    @open="refresh"
  >
    <template #header="{titleId,titleClass}">
      <h2 :id="titleId" :class="titleClass">
        表定义导入
      </h2>
    </template>
    <el-scrollbar>
      <TableDisplay ref="tableDisplay" url="/table_info/list/page" :configurable="false"/>
    </el-scrollbar>
  </el-drawer>
</template>

<script setup lang="ts">
import {useImportDialogVisibleStore} from "../../../store/index";
import {ref} from "vue";
import TableDisplay from "../../table/TableDisplay.vue";

const importDialogVisible=useImportDialogVisibleStore()

const tableDisplay=ref()

function refresh(){
  tableDisplay.value.refreshPage()
}
</script>

<style scoped>

</style>