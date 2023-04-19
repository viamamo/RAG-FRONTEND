<template>
  <el-drawer
    v-model="visibleStore.tableImportDrawerVisible"
    direction="rtl">
    <MyTable style="height: 90%;"/>
  </el-drawer>
</template>

<script setup lang="ts">
import {useImportDialogVisibleStore} from "../../store/index";
import MyTable from "../table/MyTable.vue";

const visibleStore=useImportDialogVisibleStore()

</script>

<style scoped>

</style>