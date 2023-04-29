<template>
  <el-dialog v-model="addDialogVisible.addDictDialogVisible" width="600">
    <template #header>
      <h2 class="dialog-header">
        创建词库
      </h2>
    </template>
    <el-form v-model="inputContent">
      <el-form-item prop="name" label="词库名：">
        <el-input v-model="inputContent.name"/>
      </el-form-item>
      <el-form-item prop="content">
        <el-input v-model="inputContent.content" type="textarea" :rows="10" :autosize="false" placeholder="请输入词列表，多个列以【英文或中文逗号】分隔"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearDialog">取消</el-button>
        <el-button type="primary" @click="submitAdd">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {useAddDialogVisibleStore} from "../../store/index";
import {reactive} from "vue";
import {requestPost} from "../../function/util/commons";
import {ElMessage} from "element-plus";

const emits=defineEmits<{
  (e:'refresh'):void
}>()

let addDialogVisible=useAddDialogVisibleStore()


let inputContent=reactive({
  name:"",
  content:""
})

function clearDialog(){
  addDialogVisible.addDictDialogVisible=false
  inputContent.name=''
  inputContent.content=''
}

function submitAdd() {
  requestPost('/dict_info/add',inputContent).then((data)=>{
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