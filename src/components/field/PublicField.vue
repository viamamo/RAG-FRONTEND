<template>
  <el-card>
    <template #header>
      <div>
        <div class="card-header">
          <el-text size="large">公开字段</el-text>
        </div>
      </div>
    </template>
    <FieldDisplay ref="fieldDisplay" url="/field_info/list/page" :configurable="false"/>
  </el-card>
</template>

<script setup lang="ts">
import FieldDisplay from "./FieldDisplay.vue";
import {ref} from "vue";

const fieldDisplay=ref()

const refreshPage=()=>{
  fieldDisplay.value.refreshPage()
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