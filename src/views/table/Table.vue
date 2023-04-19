<template>
  <el-row justify="space-around">
    <el-col :span="11">
      <PublicTable ref="publicTable"></PublicTable>
    </el-col>
    <el-col :span="11">
      <MyTable @refresh="refresh"></MyTable>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

import PublicTable from "../../components/table/PublicTable.vue";
import MyTable from "../../components/table/MyTable.vue";
import {ref} from "vue";

const publicTable=ref()

function refresh(){
  publicTable.value.refreshPage()
}
</script>

<style scoped>

</style>