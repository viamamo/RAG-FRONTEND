<template>
  <el-row justify="space-around">
    <el-col :span="11">
      <DataBaseCard url="/db_info/list/page"/>
    </el-col>
    <el-col :span="11">
      <JobCard/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

import DataBaseCard from "../../components/database/DatabaseCard.vue";
import JobCard from "../../components/database/JobCard.vue";
</script>

<style scoped>

</style>