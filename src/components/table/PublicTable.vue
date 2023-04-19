<template>
  <el-card>
    <template #header>
      <div>
        <div class="card-header">
          <el-text size="large">公开表</el-text>
        </div>
      </div>
    </template>
    <TableDisplay ref="tableDisplay" url="/table_info/list/page" :configurable="false"/>
  </el-card>
</template>

<script setup lang="ts">
import TableDisplay from "./TableDisplay.vue";
import {ref} from "vue";

const tableDisplay=ref()

const refreshPage=()=>{
  tableDisplay.value.refreshPage()
}

defineExpose({
  refreshPage
})
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
}
</style>