<template>
  <el-drawer
    v-model="importDialogVisible.tableImportDrawerVisible"
    direction="rtl">
    <PublicTable style="height: 90%;"/>
  </el-drawer>
</template>

<script setup lang="ts">
import {useImportDialogVisibleStore} from "../../../store/index";
import PublicTable from "../../table/PublicTable.vue";

const importDialogVisible=useImportDialogVisibleStore()

</script>

<style scoped>

</style>