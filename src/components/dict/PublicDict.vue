<template>
  <el-card>
    <template #header>
      <div>
        <div class="card-header">
          <el-text size="large">公开词库</el-text>
        </div>
      </div>
    </template>
    <DictDisplay ref="dictDisplay" url="/dict_info/list/page" :configurable="false"/>
  </el-card>
</template>

<script setup lang="ts">
import DictDisplay from "./DictDisplay.vue";
import {ref} from "vue";

const dictDisplay=ref()

const refreshPage=()=>{
  dictDisplay.value.refreshPage()
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