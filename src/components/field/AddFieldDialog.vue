<template>
  <el-dialog v-model="addDialogVisibleStore.addFieldDialogVisible" width="600">
    <template #header>
      <h2 class="dialog-header">
        创建字段
      </h2>
    </template>
    <el-form v-model="inputContent">
      <el-form-item prop="name" label="数据元名：">
        <el-input v-model="inputContent.name" placeholder="系统中使用名"/>
      </el-form-item>
      <el-form-item prop="fieldName" label="字段名：">
        <el-input v-model="inputContent.fieldName" placeholder="数据库中使用名"/>
      </el-form-item>
      <el-form-item>
        <el-form :model="metaField" label-width="70px">
          <el-space wrap style="padding-top: 10px">
            <el-form-item label="字段类型">
              <el-select v-model="metaField.fieldType">
                <el-option v-for="[key,value] in Object.entries(FIELD_TYPES)" :label="value" :value="key"/>
              </el-select>
            </el-form-item>
            <el-form-item label="默认值">
              <el-input v-model="metaField.defaultValue">
              </el-input>
            </el-form-item>
            <el-form-item label="注释">
              <el-input v-model="metaField.comment">
              </el-input>
            </el-form-item>
            <el-form-item label="模拟类型">
              <el-select v-model="metaField.mockType">
                <el-option v-for="[key,value] in Object.entries(MOCK_TYPES)" :label="value" :value="key"/>
              </el-select>
            </el-form-item>
            <el-form-item
              v-show="metaField.mockType==='INCREASE'||metaField.mockType==='FIXED'||metaField.mockType==='REGEX'"
              :label="getMockLabel(metaField.mockType)">
              <el-input v-model="metaField.mockParams">
              </el-input>
            </el-form-item>
            <el-form-item
              v-show="metaField.mockType==='RANDOM'||metaField.mockType==='DICT'"
              :label="getMockLabel(metaField.mockType)">
              <el-select v-show="metaField.mockType==='RANDOM'" v-model="metaField.mockParams">
                <el-option v-for="[key,value] in Object.entries(RANDOM_TYPES)" :label="value" :value="key"/>
              </el-select>
              <el-select v-show="metaField.mockType==='DICT'" v-model="metaField.mockParams">
                <el-option v-for="[key,value] in Object.entries(RANDOM_TYPES)" :label="value" :value="key"/>
              </el-select>
            </el-form-item>
            <el-form-item label="非空">
              <el-checkbox v-model="metaField.notNull"/>
            </el-form-item>
            <el-form-item label="主键">
              <el-checkbox v-model="metaField.primaryKey"/>
            </el-form-item>
            <el-form-item label="自增">
              <el-checkbox v-model="metaField.autoIncrement"/>
            </el-form-item>
          </el-space>
        </el-form>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearDialog">取消</el-button>
        <el-button type="primary" @click="submitAdd">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {useAddDialogVisibleStore} from "../../store/index";
import {reactive} from "vue";
import {requestPost} from "../../api/util/commons";
import {ElMessage} from "element-plus";
import {getMockLabel} from "../../api/field/function";
import {FIELD_TYPES, MOCK_TYPES, RANDOM_TYPES} from "../../api/contants";

const emits=defineEmits<{
  (e:'refresh'):void
}>()

let addDialogVisibleStore=useAddDialogVisibleStore()


let inputContent=reactive({
  name:"",
  fieldName:"",
  content:""
})
let metaField=reactive({} as MetaField)

function clearDialog(){
  addDialogVisibleStore.addFieldDialogVisible=false
  inputContent.name=''
  inputContent.fieldName=''
  inputContent.content=''
}

function submitAdd() {
  metaField.fieldName=inputContent.fieldName
  inputContent.content=JSON.stringify(metaField)
  requestPost('/field_info/add',inputContent).then((data)=>{
    if(data.code!==20000){
      ElMessage.error("添加失败："+data.message)
    }
    else {
      emits('refresh')
      clearDialog()
    }
  })
}
</script>

<style scoped>

</style>