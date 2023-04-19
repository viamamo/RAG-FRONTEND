<template>
  <el-card>
    <template #header>
      <div>
        <div class="card-header">
          <el-text size="large">个人表</el-text>
        </div>
      </div>
    </template>
    <TableDisplay @refresh="refresh" ref="tableDisplay" url="/table_info/my/list/page" :configurable="true"/>
  </el-card>
</template>

<script setup lang="ts">
import TableDisplay from "./TableDisplay.vue";
import {useUserInformationStore} from "../../store/index";
import {ref, watch} from "vue";

const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const tableDisplay = ref()

let userInformation = useUserInformationStore()
watch(userInformation.$state, () => {
  tableDisplay.value.refreshPage()
})

function refresh() {
  tableDisplay.value.refreshPage()
  emits('refresh')
}
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
}
</style>