<template>
  <el-dialog
    v-model="importDialogVisible.sqlImportDialogVisible"
    width="30%"
    close-on-click-modal
    draggable
    title="SQL导入"
  >
    <div>
      <div style="display:flex;">
        <el-text>
          请输入建表SQL：
        </el-text>
        <el-button @click="importExample">
          导入示例
        </el-button>
      </div>
      <br>
      <el-input v-model="inputContent.sql" type="textarea" :rows="10" :autosize="false"/>
      <br>
      <br>
      <div style="display:flex;align-items: center">
        数据库类型：
        <el-select v-model="inputContent.dbType">
          <el-option v-for="database in useBasicInfoStore().DATABASE_TYPES" :label="database.name" :value="database.key"/>
        </el-select>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="importDialogVisible.sqlImportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sqlImport">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {useBasicInfoStore, useImportDialogVisibleStore, useMetaTableStore} from "../../../store/index";
import {ref} from "vue";
import {MetaTable2MetaTableId, requestPost} from "../../../function/util/commons";
import {ElMessage} from "element-plus";

const importDialogVisible=useImportDialogVisibleStore()

let inputContent=ref({
  sql:"",
  dbType:""
})
function importExample(){
  //TODO sqlExample
  inputContent.value.sql="-- 自动生成的表\n" +
    "create table if not exists `my_table`\n" +
    "(\n" +
    "`id` bigint not null auto_increment comment '主键' primary key,\n" +
    "`username` varchar(255) null comment '用户名',\n" +
    "`create_time` timestamp default CURRENT_TIMESTAMP null comment '创建时间',\n" +
    "`update_time` timestamp default CURRENT_TIMESTAMP null comment '更新时间',\n" +
    "`is_deleted` boolean default false null comment '删除标记'\n" +
    ") comment '自动生成的表';"
  inputContent.value.dbType="MYSQL"
}

function sqlImport(){
  importDialogVisible.sqlImportDialogVisible = false
  requestPost('/sql/get/schema/sql',{
    content:inputContent.value.sql,
    dbType:inputContent.value.dbType
  }).then((data)=>{
    if(data.code!=20000){
      ElMessage.error(`自动导入失败：${data.message}`)
    }
    let metaTable=data.data as MetaTable
    useMetaTableStore().$patch({metaTableId: MetaTable2MetaTableId(metaTable)})
    ElMessage.success("自动导入成功")
  })
}
</script>

<style scoped>
</style>