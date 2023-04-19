<template>
  <el-form ref="formRef" :model="metaTableId" label-width="auto">
    <el-form-item>
      <el-button @click="dialogVisible.autoImportDialogVisible=true">
        自动导入
      </el-button>
      <el-button @click="dialogVisible.tableImportDrawerVisible=true">
        表导入
      </el-button>
      <el-button @click="dialogVisible.configImportDialogVisible=true">
        配置导入
      </el-button>
      <el-button @click="dialogVisible.sqlImportDialogVisible=true">
        SQL导入
      </el-button>
      <el-button @click="dialogVisible.excelImportDialogVisible=true">
        Excel导入
      </el-button>
    </el-form-item>
    <el-form-item label="库名：" prop="dbName">
      <el-input clearable v-model="metaTableId.dbName"/>
    </el-form-item>
    <el-form-item label="表名：" prop="tableName" :rules="rules.tableName">
      <el-input clearable v-model="metaTableId.tableName"/>
    </el-form-item>
    <el-form-item label="表注释：" prop="tableComment">
      <el-input clearable v-model="metaTableId.tableComment"/>
    </el-form-item>
    <el-form-item label="生成条数：" prop="mockNum" :rules="rules.mockNum">
      <el-input-number clearable v-model="metaTableId.mockNum" :min="1" :step="1" :step-strictly="true"/>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {useImportDialogVisibleStore, useMetaTableStore} from "../../store/index";
import {reactive, ref} from "vue";
import {FormInstance} from "element-plus";

const formRef = ref<FormInstance>()

const rules = reactive({
  tableName: [
    {required: true, message: '表名不得为空', trigger: 'blur'},
  ],
  mockNum: [
    {required: true, message: '模拟条数不得为空', trigger: 'blur'},
  ],
})

let metaTableId=useMetaTableStore().metaTableId

const dialogVisible = useImportDialogVisibleStore()

const validTable=async ()=>{
  let result
  await formRef.value?.validate((isValid, invalidFields)=>{
    result=invalidFields;
  })
  return result
}

defineExpose({
  validTable
})
</script>

<style scoped>
</style>