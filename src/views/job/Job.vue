<template>
  <el-row justify="space-around">
    <el-col :span="22">
      <JobCard url="/job/list/page"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

import JobCard from "../../components/job/JobCard.vue";
</script>

<style scoped>

</style>