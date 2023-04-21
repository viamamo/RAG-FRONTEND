<template>
  <el-card style="align-items: stretch">
    <template #header>
      <div class="card-header">
        <el-text size="large">结果</el-text>
      </div>
    </template>
    <div v-if="empty">
      <el-empty description="请先输入配置并点击【一键生成】"/>
    </div>
    <div v-else>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="SQL" name="sql">
          <el-collapse>
            <el-collapse-item>
              <template #title>
                <div style="display: flex;width:100%;align-items: center;justify-content: space-between;" @change.stop>
                  <el-text truncated>建表SQL</el-text>
                  <div style="display:flex;padding-right:2px;">
                    <el-button @click.stop="executeSqlSimple(generationVO.createSql)">执行</el-button>
                    <el-button @click.stop="copy2ClipBoard(generationVO.createSql)">复制</el-button>
                  </div>
                </div>
              </template>
              <Codemirror v-model="generationVO.createSql"
                          :autofocus="true"
                          :indent-with-tab="true"
                          :tabSize="2"
                          :extensions="[StandardSQL,oneDark]"
                          style="height:auto;text-align: left;font-size: 16px;max-height:100vh"/>
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <div style="display: flex;width:100%;align-items: center;justify-content: space-between;" @change.stop>
                  <el-text truncated>插入SQL</el-text>
                  <div style="display:flex;padding-right:2px;">
                    <el-button @click.stop="executeSqlSimple(generationVO.insertSql)">执行</el-button>
                    <el-button @click.stop="copy2ClipBoard(generationVO.insertSql)">复制</el-button>
                  </div>
                </div>
              </template>
              <Codemirror v-model="generationVO.insertSql"
                          :autofocus="true"
                          :indent-with-tab="true"
                          :tabSize="2"
                          :extensions="[StandardSQL,oneDark]"
                          style="height:auto;text-align: left;font-size: 16px;max-height:100vh"/>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="原始数据" name="data">
          <el-table :data="tableData">
            <el-table-column v-for="(metaField,index) in generationVO.metaTable.metaFieldList" :key="index"
                             :label="metaField.fieldName" :prop="metaField.fieldName"/>
          </el-table>
          <br>
          <el-pagination style="margin-left: auto;margin-right: auto" background layout="prev, pager, next"
                         :total="generationVO.dataList.length"
                         :current-page="tablePage" :page-size="10" @current-change="pageChange"/>
        </el-tab-pane>
        <el-tab-pane label="JSON数据" name="json">
          <div style="display: flex;justify-content: right">
            <el-button @click.stop="copy2ClipBoard(generationVO.dataJson)">复制</el-button>
          </div>
          <Codemirror v-model="generationVO.dataJson"
                      :autofocus="true"
                      :indent-with-tab="true"
                      :tabSize="2"
                      :extensions="[jsonLanguage,oneDark]"
                      style="height:auto;text-align: left;font-size: 16px;max-height:100vh;padding-top: 8px"/>
        </el-tab-pane>
        <el-tab-pane label="JAVA代码" name="java">
          <el-collapse>
            <el-collapse-item>
              <template #title>
                <div style="display: flex;width:100%;align-items: center;justify-content: space-between;" @change.stop>
                  <el-text truncated>Java实体代码</el-text>
                  <div style="display:flex;padding-right:2px;">
                    <el-button @click.stop="generationVO.javaEntityCode">复制</el-button>
                  </div>
                </div>
              </template>
              <Codemirror v-model="generationVO.javaEntityCode"
                          :autofocus="true"
                          :indent-with-tab="true"
                          :tabSize="4"
                          :extensions="[javaLanguage,oneDark]"
                          style="height:auto;text-align: left;font-size: 16px;max-height:100vh"/>
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <div style="display: flex;width:100%;align-items: center;justify-content: space-between;" @change.stop>
                  <el-text truncated>Java对象代码</el-text>
                  <div style="display:flex;padding-right:2px;">
                    <el-button @click.stop="generationVO.javaObjectCode">复制</el-button>
                  </div>
                </div>
              </template>
              <Codemirror v-model="generationVO.javaObjectCode"
                          :autofocus="true"
                          :indent-with-tab="true"
                          :tabSize="4"
                          :extensions="[javaLanguage,oneDark]"
                          style="height:auto;text-align: left;font-size: 16px;max-height:100vh"/>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="TypeScript代码" name="ts">
          <div style="display: flex;justify-content: right">
            <el-button @click.stop="copy2ClipBoard(generationVO.typescriptTypeCode)">复制</el-button>
          </div>
          <Codemirror v-model="generationVO.typescriptTypeCode"
                      :autofocus="true"
                      :indent-with-tab="true"
                      :tabSize="2"
                      :extensions="[typescriptLanguage,oneDark]"
                      style="height:auto;text-align: left;font-size: 16px;max-height:100vh;padding-top: 8px"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
  <ChooseDbDialog :sql="executeSql"/>
</template>

<script setup lang="ts">
import {useExecuteDialogVisibleStore, useGeneratedResultsStore} from "../../store/index";
import {reactive, ref} from "vue";
import {Codemirror} from "vue-codemirror";
import {javaLanguage} from "@codemirror/lang-java";
import {jsonLanguage} from "@codemirror/lang-json";
import {StandardSQL} from "@codemirror/lang-sql";
import {typescriptLanguage} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";
import {copy2ClipBoard} from "../../api/util/commons";
import ChooseDbDialog from "../database/chooseDbDialog.vue";

let generatedResults = useGeneratedResultsStore()
let executeDialogVisible=useExecuteDialogVisibleStore()
let generationVO = ref<GenerationVO>({
  createSql: "",
  dataJson: "",
  dataList: [],
  insertSql: "",
  javaEntityCode: "",
  javaObjectCode: "",
  metaTable: {
    dbName: "",
    tableName: "",
    tableComment: "",
    mockNum: -1,
    metaFieldList: []
  },
  typescriptTypeCode: "",
})
let tableData = reactive([{}])
let tablePage = ref(1)
let empty = ref(true)
let activeTab = ref("")

let executeSql=ref("")

generatedResults.$subscribe((mutation, state) => {
  generationVO.value = {
    createSql: state.generationVO.createSql,
    dataJson: state.generationVO.dataJson,
    dataList: state.generationVO.dataList,
    insertSql: state.generationVO.insertSql,
    javaEntityCode: state.generationVO.javaEntityCode,
    javaObjectCode: state.generationVO.javaObjectCode,
    metaTable: state.generationVO.metaTable,
    typescriptTypeCode: state.generationVO.typescriptTypeCode
  }
  tableData = generationVO.value.dataList.slice(0, 10)
  empty.value = false
  activeTab.value = "sql"
})

function pageChange(pageNumber: number) {
  tablePage.value = pageNumber
  tableData = generationVO.value.dataList.slice((pageNumber - 1) * 10, pageNumber * 10)
}

function executeSqlSimple(sql:string){
  executeSql.value=sql
  executeDialogVisible.chooseDbDialogVisible=true;
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: left;
  align-items: center;
}

::v-deep(.el-collapse-item__arrow) {
  display: none;
}
</style>