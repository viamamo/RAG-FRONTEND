<template>
  <el-drawer
    v-model="importDialogVisible.fieldImportDrawerVisible"
    direction="rtl">
    <PublicField style="height: 90%;"/>
  </el-drawer>
</template>

<script setup lang="ts">

import {useImportDialogVisibleStore} from "../../store/index";
import PublicField from "../field/PublicField.vue";

const importDialogVisible=useImportDialogVisibleStore()

</script>

<style scoped>

</style>