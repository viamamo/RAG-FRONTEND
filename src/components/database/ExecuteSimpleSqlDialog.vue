<template>
  <el-dialog
    v-model="executeDialogVisible.executeSimpleSqlDialog"
    width="20%"
    close-on-click-modal
    draggable
    title="选择数据库"
  >
    <el-form :model="inputContent" ref="formRef">
      <el-form-item label="数据库：" prop="dbInfoId" :rules="rules.dbInfoId">
        <el-select v-model="inputContent.dbInfoId" filterable>
          <el-option v-for="dbInfo in dbInfoList" :label="dbInfo.name" :value="dbInfo.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="executeDialogVisible.executeSimpleSqlDialog = false">取消</el-button>
        <el-button type="primary" @click="simpleExecuteSql">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import {useExecuteDialogVisibleStore} from "../../store/index";
import {requestGet, requestPost} from "../../function/util/commons";
import {onMounted, reactive, ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";

const props=defineProps<{
  sql:string
}>()

let executeDialogVisible=useExecuteDialogVisibleStore()

let dbInfoList=ref<DbInfo[]>([])

let inputContent=ref({
  dbInfoId:undefined,
})

let rules=reactive({
  dbInfoId: [
    {required: true, message: '数据库不得为空', trigger: 'blur'},
  ],
})

const formRef=ref<FormInstance>()

onMounted(()=>{
  requestGet('/db_info/list',[]).then((data) => {
    if (data.code === 20000) {
      dbInfoList=data.data
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
    }
  })
})

function simpleExecuteSql(){
  formRef.value?.validate((valid) => {
    if (valid) {
      executeDialogVisible.executeSqlDialogVisible = false
      requestPost('/job/execute/simple', {
        dbInfoId: inputContent.value.dbInfoId,
        sql: props.sql,
      }).then((data) => {
        if (data.code !== 20000) {
          ElMessage.error(`执行错误：${data.message}`)
        } else {
          ElMessage.success("执行成功")
        }
      })
    }
  })
}
</script>

<style scoped>

</style>