<template>
  <el-drawer
    v-model="importDialogVisible.fieldImportDrawerVisible"
    direction="rtl"
    @open="refresh"
  >
    <template #header="{titleId,titleClass}">
      <h2 :id="titleId" :class="titleClass">
        字段定义导入
      </h2>
    </template>
    <el-scrollbar>
      <FieldDisplay ref="fieldDisplay" url="/field_info/list/page" :configurable="false"/>
    </el-scrollbar>
  </el-drawer>
</template>

<script setup lang="ts">

import {useImportDialogVisibleStore} from "../../../store/index";
import {ref} from "vue";
import FieldDisplay from "../../field/FieldDisplay.vue";

const importDialogVisible=useImportDialogVisibleStore()

const fieldDisplay=ref()

function refresh(){
  fieldDisplay.value.refreshPage()
}

</script>

<style scoped>

</style>