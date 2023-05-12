<template>
  <el-card>
    <template #header>
      <div>
        <div class="card-header">
          <el-text size="large">个人字段</el-text>
        </div>
      </div>
    </template>
    <FieldDisplay @refresh="refresh" ref="fieldDisplay" url="/field_info/my/list/page" :configurable="true"/>
  </el-card>
</template>

<script setup lang="ts">
import FieldDisplay from "./FieldDisplay.vue";
import {useUserInformationStore} from "../../store/index";
import {ref, watch} from "vue";

const emits=defineEmits<{
  (e:'refresh'):void
}>()

const fieldDisplay=ref()

let userInformation=useUserInformationStore()
watch(userInformation.$state,()=>{
  fieldDisplay.value.refreshPage()
})
function refresh(){
  fieldDisplay.value.refreshPage()
  emits('refresh')
}
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
}
</style>