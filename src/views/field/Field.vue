<template>
  <el-row justify="space-around">
    <el-col :span="11">
      <PublicField ref="publicField"></PublicField>
    </el-col>
    <el-col :span="11">
      <MyField @refresh="refresh"></MyField>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

import PublicField from "../../components/field/PublicField.vue";
import MyField from "../../components/field/MyField.vue";
import {ref} from "vue";

const publicField=ref()

function refresh(){
  publicField.value.refreshPage()
}
</script>

<style scoped>

</style>