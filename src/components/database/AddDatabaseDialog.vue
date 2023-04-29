<template>
  <el-dialog v-model="addDialogVisible.addDatabaseDialogVisible" width="600">
    <template #header>
      <h2 class="dialog-header">
        创建数据库
      </h2>
    </template>
    <el-form v-model="inputContent" label-width="auto">
      <el-form-item prop="name" label="名称:" required>
        <el-input v-model="inputContent.name"/>
      </el-form-item>
      <el-form-item prop="dbName" label="数据库名:" required>
        <el-input v-model="inputContent.dbName"/>
      </el-form-item>
      <el-form-item prop="dbType" label="数据库类型:" required>
        <el-select v-model="inputContent.dbType" @change="defaultAttr">
          <el-option v-for="databaseType in DATABASE_TYPES" :label="databaseType.name" :value="databaseType.value"/>
        </el-select>
      </el-form-item>
      <div style="display: flex">
        <el-form-item prop="host" label="主机:" required>
          <el-input v-model="inputContent.host"/>
        </el-form-item>
        <el-form-item prop="port" label="端口号:" required>
          <el-input v-model="inputContent.port"/>
        </el-form-item>
      </div>
      <el-form-item prop="username" label="用户名:" required>
        <el-input v-model="inputContent.username"/>
      </el-form-item>
      <el-form-item prop="password" label="密码:" required>
        <el-input v-model="inputContent.password"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearDialog">取消</el-button>
        <el-button type="primary" @click="submitAdd">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import {useAddDialogVisibleStore} from "../../store/index";
import {reactive} from "vue";
import {requestPost} from "../../function/util/commons";
import {ElMessage} from "element-plus";
import {DATABASE_TYPES} from "../../function/contants";

const emits = defineEmits<{
  (e: 'refresh'): void
}>()

let addDialogVisible = useAddDialogVisibleStore()

let inputContent = reactive({
  name: "",
  dbName: "",
  dbType: "",
  username: "",
  password: "",
  host: "",
  port: "",
})

function clearDialog() {
  addDialogVisible.addDatabaseDialogVisible = false
  inputContent.name = ""
  inputContent.dbName = ""
  inputContent.dbType = ""
  inputContent.username = ""
  inputContent.password = ""
  inputContent.host = ""
}

function submitAdd() {
  requestPost('/db_info/add', inputContent).then((data) => {
    if (data.code !== 20000) {
      ElMessage.error("添加失败：" + data.message)
    } else {
      emits('refresh')
      clearDialog()
    }
  })
}

function defaultAttr(databaseType: string) {
  let DBAttribute = DATABASE_TYPES.find((value, index, obj) => {
    if (value.value == databaseType) {
      return obj
    }
  })
  if(DBAttribute) {
    inputContent.port = DBAttribute.defaultPort.toString();
  }
}
</script>

<style scoped>

</style>