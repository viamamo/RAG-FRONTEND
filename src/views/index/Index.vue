<template>
  <el-row justify="space-around">
    <el-col :span="11">
      <IndexInputCard></IndexInputCard>
    </el-col>
    <el-col :span="11">
      <IndexResultCard></IndexResultCard>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import IndexInputCard from "./IndexInputCard.vue";
import IndexResultCard from "./IndexResultCard.vue";
</script>

<style scoped>
</style>