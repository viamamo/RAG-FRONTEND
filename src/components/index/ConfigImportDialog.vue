<template>
  <el-dialog
    v-model="visibleStore.configImportDialogVisible"
    width="30%"
    close-on-click-modal
    draggable
    title="配置导入"
  >
    <div>
      <div style="display:flex;">
        <el-text>
          请输入配置JSON：
        </el-text>
        <el-button @click="importExample">
          导入示例
        </el-button>
      </div>
      <br>
      <el-input v-model="inputContent" type="textarea" :rows="10" :autosize="false"/>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visibleStore.configImportDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="configImport">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {useImportDialogVisibleStore, useMetaTableStore} from "../../store/index";
import {ref} from "vue";
import {MetaTable2MetaTableId} from "../../api/util/commons";
import {ElMessage} from "element-plus";

const visibleStore = useImportDialogVisibleStore()

let inputContent = ref("")

function importExample() {
  inputContent.value = "{\"dbName\":null,\"tableName\":\"my_table\",\"tableComment\":\"自动生成的表\",\"mockNum\":null,\"metaFieldList\":[{\"fieldName\":\"id\",\"fieldType\":\"BIGINT\",\"defaultValue\":\"0\",\"notNull\":true,\"comment\":\"主键\",\"primaryKey\":true,\"autoIncrement\":true,\"mockType\":\"INCREASE\",\"mockParams\":\"0\"},{\"fieldName\":\"create_time\",\"fieldType\":\"DATETIME\",\"defaultValue\":\"CURRENT_TIMESTAMP\",\"notNull\":true,\"comment\":\"创建时间\",\"primaryKey\":false,\"autoIncrement\":false,\"mockType\":\"NONE\",\"mockParams\":\"\"},{\"fieldName\":\"update_time\",\"fieldType\":\"DATETIME\",\"defaultValue\":\"CURRENT_TIMESTAMP\",\"notNull\":true,\"comment\":\"更新时间\",\"primaryKey\":false,\"autoIncrement\":false,\"mockType\":\"NONE\",\"mockParams\":\"\"},{\"fieldName\":\"is_deleted\",\"fieldType\":\"TINYINT\",\"defaultValue\":\"0\",\"notNull\":false,\"comment\":\"删除标记\",\"primaryKey\":false,\"autoIncrement\":false,\"mockType\":\"FIXED\",\"mockParams\":\"0\"}]}"
}

function configImport() {
  try {
    visibleStore.configImportDialogVisible = false
    let metaTable = JSON.parse(inputContent.value) as MetaTable
    useMetaTableStore().$patch({metaTableId: MetaTable2MetaTableId(metaTable)})
    ElMessage.success("导入成功")
  } catch (e: any) {
    ElMessage.error(`导入失败：${e.toString()}`)
  }
}
</script>

<style scoped>
</style>