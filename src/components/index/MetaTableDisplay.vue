<template>
  <el-form ref="formRef" :model="metaTableId" label-width="auto">
    <el-form-item>
      <el-button @click="importDialogVisible.autoImportDialogVisible=true">
        自动导入
      </el-button>
      <el-button @click="importDialogVisible.tableImportDrawerVisible=true">
        表导入
      </el-button>
      <el-button @click="importDialogVisible.configImportDialogVisible=true">
        配置导入
      </el-button>
      <el-button @click="importDialogVisible.sqlImportDialogVisible=true">
        SQL导入
      </el-button>
      <el-button @click="importDialogVisible.excelImportDialogVisible=true">
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
    <el-form-item label="数据库类型" prop="dbType" :rules="rules.dbType">
      <el-select v-model="metaTableId.dbType">
        <el-option v-for="database in useBasicInfoStore().DATABASE_TYPES" :label="database.name" :value="database.key"/>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {useBasicInfoStore, useImportDialogVisibleStore, useMetaTableStore} from "../../store/index";
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
  dbType: [
    {required: true, message: '数据库类型不得为空', trigger: 'blur'},
  ],
})

let metaTableId=useMetaTableStore().metaTableId

const importDialogVisible = useImportDialogVisibleStore()

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