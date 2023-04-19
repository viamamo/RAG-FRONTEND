<template>
  <el-drawer
    v-model="visibleStore.fieldImportDrawerVisible"
    direction="rtl">
    <MyField style="height: 90%;"/>
  </el-drawer>
</template>

<script setup lang="ts">

import MyField from "../field/MyField.vue";
import {useImportDialogVisibleStore} from "../../store/index";

const visibleStore=useImportDialogVisibleStore()

</script>

<style scoped>

</style>