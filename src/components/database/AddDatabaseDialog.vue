<template>
  <el-dialog v-model="addDialogVisible.addDatabaseDialogVisible" width="600">
    <template #header>
      <h2 class="dialog-header">
        引入数据库
      </h2>
    </template>
    <el-form :model="inputContent" label-width="auto">
      <el-form-item prop="name" label="名称:" :rules="rules.name">
        <el-input v-model="inputContent.name"/>
      </el-form-item>
      <el-form-item prop="dbName" label="数据库名:" :rules="rules.dbName">
        <el-input v-model="inputContent.dbName"/>
      </el-form-item>
      <el-form-item prop="dbType" label="数据库类型:" :rules="rules.dbType">
        <el-select v-model="inputContent.dbType" @change="defaultAttr">
          <el-option v-for="databaseType in useBasicInfoStore().DATABASE_TYPES" :label="databaseType.name" :value="databaseType.key"/>
        </el-select>
      </el-form-item>
      <div style="display: flex">
        <el-form-item prop="host" label="主机:" :rules="rules.host">
          <el-input v-model="inputContent.host"/>
        </el-form-item>
        <el-form-item prop="port" label="端口号:" :rules="rules.port">
          <el-input v-model="inputContent.port"/>
        </el-form-item>
      </div>
      <el-form-item prop="username" label="连接参数:">
        <el-input v-model="inputContent.property"/>
      </el-form-item>
      <el-form-item prop="username" label="用户名:" :rules="rules.username">
        <el-input v-model="inputContent.username"/>
      </el-form-item>
      <el-form-item prop="password" label="密码:">
        <el-input v-model="inputContent.password"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearDialog">取消</el-button>
        <el-button type="primary" @click="submitAdd">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import {useAddDialogVisibleStore, useBasicInfoStore} from "../../store/index";
import {reactive} from "vue";
import {requestPost} from "../../function/util/commons";
import {ElMessage} from "element-plus";

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
  property:"",
  host: "",
  port: "",
})

const rules = reactive({
  name: [
    {required: true, message: '名称不得为空', trigger: 'blur'},
  ],
  dbName: [
    {required: true, message: '数据库名不得为空', trigger: 'blur'},
  ],
  dbType: [
    {required: true, message: '数据库类型不得为空', trigger: 'blur'},
  ],
  username: [
    {required: true, message: '用户名不得为空', trigger: 'blur'},
  ],
  host: [
    {required: true, message: '主机不得为空', trigger: 'blur'},
  ],
  port: [
    {required: true, message: '端口不得为空', trigger: 'blur'},
  ]
})

function clearDialog() {
  addDialogVisible.addDatabaseDialogVisible = false
  inputContent.name = ""
  inputContent.dbName = ""
  inputContent.dbType = ""
  inputContent.username = ""
  inputContent.password = ""
  inputContent.property = ""
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

function defaultAttr(key: string) {
  let databaseType=useBasicInfoStore().getDatabaseType(key)
  if(databaseType==undefined){
    inputContent.port=""
  }
  else{
    inputContent.port=databaseType.defaultPort.toString()
  }
}
</script>

<style scoped>

</style>