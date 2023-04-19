<template>
  <el-card>
    <template #header>
      <div>
        <div class="card-header">
          <el-text size="large">个人词库</el-text>
        </div>
        <el-button v-if="userInformation.logged" class="card-header-right" @click="addDialogVisible.addDictDialogVisible=true;">
          创建词库
        </el-button>
      </div>
    </template>
    <DictDisplay @refresh="refresh" ref="dictDisplay" url="/dict_info/my/list/page" :configurable="true"/>
    <AddDictDialog @refresh="refresh"/>
  </el-card>
</template>

<script setup lang="ts">
import DictDisplay from "./DictDisplay.vue";
import {useAddDialogVisibleStore, useUserInformationStore} from "../../store/index";
import AddDictDialog from "./AddDictDialog.vue";
import {ref, watch} from "vue";

const emits=defineEmits<{
  (e:'refresh'):void
}>()

let dictDisplay=ref()

let addDialogVisible=useAddDialogVisibleStore()
let userInformation=useUserInformationStore()
watch(userInformation.$state,()=>{
  dictDisplay.value.refreshPage()
})

function refresh(){
  dictDisplay.value.refreshPage()
  emits('refresh')
}

</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
}

.card-header-right {
  float: right;
  margin-top: -28px;
}
</style>