<template>
  <el-form>
    <el-form-item>
      <MetaFieldList ref="metaFieldListRef"/>
    </el-form-item>
    <el-form-item>
      <el-button icon="Plus" @click="addEmptyMetaField">
        新增字段
      </el-button>
      <el-button icon="Plus" @click="importDialogVisible.fieldImportDrawerVisible=true">
        导入字段
      </el-button>
      <el-button icon="Plus" @click="addGenericMetaField">
        导入通用字段
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import MetaFieldList from "./MetaFieldList.vue";
import {nanoid} from "nanoid";
import {useImportDialogVisibleStore, useMetaTableStore} from "../../store/index";

let metaTableId=useMetaTableStore().metaTableId

let importDialogVisible=useImportDialogVisibleStore()

function addEmptyMetaField() {
  metaTableId.metaFieldList.push({
    id: nanoid(),
    fieldName: "",
    fieldType: "",
    defaultValue: "",
    notNull: false,
    comment: "",
    primaryKey: false,
    autoIncrement: false,
    mockType: "",
    mockParams: "",
  });
}

function addGenericMetaField() {
  genericMetaFieldList.forEach((metaFieldId)=>{
    metaTableId.metaFieldList.push(metaFieldId)
  })
}

let genericMetaFieldList=[
  {
    id:nanoid(),
    fieldName: "id",
    fieldType: "bigint",
    defaultValue: "",
    notNull: true,
    comment: "主键",
    primaryKey: true,
    autoIncrement: true,
    mockType: "NONE",
    mockParams: "0",
  },
  {
    id:nanoid(),
    fieldName: "create_time",
    fieldType: "datetime",
    defaultValue: "CURRENT_TIMESTAMP",
    notNull: true,
    comment: "创建时间",
    primaryKey: false,
    autoIncrement: false,
    mockType: "NONE",
    mockParams: "",
  },
  {
    id:nanoid(),
    fieldName: "update_time",
    fieldType: "datetime",
    defaultValue: "CURRENT_TIMESTAMP",
    notNull: true,
    comment: "更新时间",
    primaryKey: false,
    autoIncrement: false,
    mockType: "NONE",
    mockParams: "",
  },
  {
    id:nanoid(),
    fieldName: "is_deleted",
    fieldType: "tinyint",
    defaultValue: "0",
    notNull: false,
    comment: "删除标记",
    primaryKey: false,
    autoIncrement: false,
    mockType: "FIXED",
    mockParams: "0",
  }
]
</script>

<style scoped>

</style>