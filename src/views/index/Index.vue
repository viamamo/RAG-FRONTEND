<template>
  <el-row justify="space-around">
    <el-col :span="11">
      <IndexInputCard/>
    </el-col>
    <el-col :span="11">
      <IndexResultCard/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import IndexInputCard from "../../components/index/IndexInputCard.vue";
import IndexResultCard from "../../components/index/IndexResultCard.vue";
</script>

<style scoped>
</style>