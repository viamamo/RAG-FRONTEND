<template>
  <el-row justify="space-around">
    <el-col :span="11">
      <PublicDict ref="publicDict"></PublicDict>
    </el-col>
    <el-col :span="11">
      <MyDict @refresh="refresh"></MyDict>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import PublicDict from "../../components/dict/PublicDict.vue";
import MyDict from "../../components/dict/MyDict.vue";
import {ref} from "vue";

const publicDict=ref()

function refresh(){
  publicDict.value.refreshPage()
}

</script>

<style scoped>

</style>