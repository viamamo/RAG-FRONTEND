<template>
  <el-row justify="space-around">
    <el-col :span="11">
      <IndexInputCard @generated="displayGeneration"></IndexInputCard>
    </el-col>
    <el-col :span="11">
      <IndexResultCard></IndexResultCard>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import IndexInputCard from "./IndexInputCard.vue";
import IndexResultCard from "./IndexResultCard.vue";

function displayGeneration(generationVO:GenerationVO){
  console.log(generationVO)
}

</script>

<style scoped>
</style>