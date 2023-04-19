<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-text size="large">输入配置</el-text>
      </div>
    </template>
    <MetaTableDisplay ref="metaTableDisplay"/>
    <el-divider/>
    <MetaFieldDisplay ref="metaFieldDisplay"/>
    <el-divider/>
    <div style="display: flex">
      <el-button size="large" @click="generate">
        一键生成
      </el-button>
      <el-button size="large" @click="saveTable">
        保存为表
      </el-button>
      <el-button size="large" @click="exportTable">
        导出配置JSON
      </el-button>
      <el-button size="large" @click="metaTableId.metaFieldList=[]">
        重置
      </el-button>
    </div>
  </el-card>
  <AutoImportDialog/>
  <TableImportDrawer/>
  <ConfigImportDialog/>
  <SqlImportDialect/>
  <ExcelImportDialog/>
  <FieldImportDrawer/>
</template>

<script setup lang="ts">
import MetaTableDisplay from "../../components/index/MetaTableDisplay.vue";
import MetaFieldDisplay from "../../components/index/MetaFieldDisplay.vue";
import AutoImportDialog from "../../components/index/AutoImportDialog.vue";
import TableImportDrawer from "../../components/index/TableImportDrawer.vue";
import ConfigImportDialog from "../../components/index/ConfigImportDialog.vue";
import SqlImportDialect from "../../components/index/SqlImportDialect.vue";
import ExcelImportDialog from "../../components/index/ExcelImportDialog.vue";
import {useMetaTableStore} from "../../store/index";
import FieldImportDrawer from "../../components/index/FieldImportDrawer.vue";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {MetaFieldId2MetaField, MetaTableId2MetaTable, requestPost} from "../../api/util/commons";
import {useClipboard} from "@vueuse/core";

const emits=defineEmits<{
  (e:'generated',generationVo:GenerationVO):void
}>()

let metaTableId: MetaTableId = useMetaTableStore().metaTableId
let metaTableDisplay=ref()
let metaFieldDisplay=ref()
async function saveTable(){
  metaTableDisplay.value.validTable().then((data: any)=>{
    if(data == undefined){
      if(data!=false){
        let content:MetaTable
        try {
          content = {
            dbName: metaTableId.dbName,
            tableName: metaTableId.tableName,
            tableComment: metaTableId.tableComment,
            mockNum: metaTableId.mockNum,
            metaFieldList: metaTableId.metaFieldList.map((value) => {
              if (!value.fieldName || !value.fieldType || !value.mockType || value.fieldName == "" || value.fieldType == "" || value.mockType == "") {
                throw "字段属性错误"
              }
              if (value.mockType != "NONE" && (!value.mockParams || value.mockParams == "")) {
                throw "字段属性错误"
              }
              return MetaFieldId2MetaField(value)
            })
          }
        }
        catch(e:any){
          ElMessage.error(e.toString())
        }
        ElMessageBox.prompt('请输入元表名', '保存元表', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            inputPattern: /.{1,30}/,
            inputErrorMessage: '无效的元表名',
            inputPlaceholder: '长度为1~30个字符',
          })
          .then(({value}) => {
            requestPost('/table_info/add', {
              name: value,
              content: JSON.stringify(content)
            }).then((data) => {
              if (data.code !== 20000) {
                ElMessage.error('保存失败:' + data.message)
              } else {
                ElMessage.success('保存成功')
              }
            })
          })
      }else{
        ElMessage.error("表格属性错误")
      }
    }
  })
}

function exportTable(){
  const { copy, isSupported } = useClipboard();
  if (!isSupported) {
    ElMessage.info({
      message:`您的浏览器不支持Clipboard API，请手动复制：\n${JSON.stringify(MetaTableId2MetaTable(metaTableId))}`,
      showClose:true,
      duration:0
    })
    return;
  }
  copy(JSON.stringify(MetaTableId2MetaTable(metaTableId)));
  ElMessage.success("已复制到剪切板")
}

function generate(){
  metaTableDisplay.value.validTable().then((data: any)=>{
    if(data == undefined){
      if(data!=false){
        let content:MetaTable
        try {
          content = {
            dbName: metaTableId.dbName,
            tableName: metaTableId.tableName,
            tableComment: metaTableId.tableComment,
            mockNum: metaTableId.mockNum,
            metaFieldList: metaTableId.metaFieldList.map((value) => {
              if (!value.fieldName || !value.fieldType || !value.mockType || value.fieldName == "" || value.fieldType == "" || value.mockType == "") {
                throw "字段属性错误"
              }
              if (value.mockType != "NONE" && (!value.mockParams || value.mockParams == "")) {
                throw "字段属性错误"
              }
              return MetaFieldId2MetaField(value)
            })
          }
          requestPost('/sql/generate/schema',content).then((data)=>{
            if(data.code!=20000){
              ElMessage.error(`生成失败：${data.message}`)
            }
            else{
              emits('generated',data.data as GenerationVO)
            }
          })
        }
        catch(e:any){
          ElMessage.error(e.toString())
        }
      }
      else{
        ElMessage.error("表格属性错误")
      }
    }
  })
}

</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>