<template>
  <el-row justify="space-around">
    <el-col :span="22">
      <DataBaseCard url="/db_info/list/page"/>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">

import DataBaseCard from "../../components/database/DatabaseCard.vue";
</script>

<style scoped>

</style>