<template>
  <el-drawer
    v-model="importDialogVisible.fieldImportDrawerVisible"
    direction="rtl">
    <MyField style="height: 90%;"/>
  </el-drawer>
</template>

<script setup lang="ts">

import MyField from "../field/MyField.vue";
import {useImportDialogVisibleStore} from "../../store/index";

const importDialogVisible=useImportDialogVisibleStore()

</script>

<style scoped>

</style>