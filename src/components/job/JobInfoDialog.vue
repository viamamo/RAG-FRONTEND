<template>
  <el-dialog
    v-model="dialogVisible"
    close-on-click-modal
    draggable
    title="作业详情"
  >
    <el-descriptions border style="max-width: 95%" contentStyle="max-width: 300px; word-break: break-all">
      <el-descriptions-item label="id">{{ jobInfo.id }}</el-descriptions-item>
      <el-descriptions-item label="dbName">{{ jobInfo.dbName }}</el-descriptions-item>
      <el-descriptions-item label="dbType">{{ jobInfo.dbType }}</el-descriptions-item>
      <el-descriptions-item label="host">{{ jobInfo.host }}</el-descriptions-item>
      <el-descriptions-item label="port">{{ jobInfo.port }}</el-descriptions-item>
      <el-descriptions-item label="tableName">{{ jobInfo.tableName }}</el-descriptions-item>
      <el-descriptions-item label="finishedNum">{{ jobInfo.finishedNum }}</el-descriptions-item>
      <el-descriptions-item label="mockNum">{{ jobInfo.mockNum }}</el-descriptions-item>
      <el-descriptions-item label="status">{{ jobInfo.status }}</el-descriptions-item>
      <el-descriptions-item v-if="jobInfo.status=='作业失败'" label="exception">
        <div style="text-overflow: ellipsis;overflow:hidden;word-break: break-all;">
          {{ jobInfo.exception }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="createTime">{{ jobInfo.createTime }}</el-descriptions-item>
    </el-descriptions>
    <el-divider/>
    <el-table :data="jobInfo.metaFields" border>
      <el-table-column label="字段名" prop="fieldName"/>
      <el-table-column label="字段类型" prop="fieldType"/>
      <el-table-column type="expand">
        <template #default="prop">
          <el-descriptions>
            <el-descriptions-item label="默认值">{{ prop.row.defaultValue }}</el-descriptions-item>
            <el-descriptions-item label="注释">{{ prop.row.comment }}</el-descriptions-item>
            <el-descriptions-item label="模拟类型">{{ prop.row.mockType }}</el-descriptions-item>
            <el-descriptions-item label="模拟参数">{{ prop.row.mockParams }}</el-descriptions-item>
            <el-descriptions-item label="主键">{{ prop.row.primaryKey }}</el-descriptions-item>
            <el-descriptions-item label="自增">{{ prop.row.autoIncrement }}</el-descriptions-item>
            <el-descriptions-item label="非空">{{ prop.row.notNull }}</el-descriptions-item>
          </el-descriptions>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";

let jobInfo = ref<JobVO>({
  id: 0,
  finishedNum: 0,
  mockNum: 0,
  status: "",
  dbName: "",
  dbType: "",
  host: "",
  port: 0,
  tableName: "",
  exception: "",
  metaFields: [],
  userId: 0,
  createTime: new Date(),
  updateTime: new Date(),
})
let dialogVisible = ref(false)

defineExpose({
  jobInfo,
  dialogVisible
})
</script>

<style scoped>
</style>