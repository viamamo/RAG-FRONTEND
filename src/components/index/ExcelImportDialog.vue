<template>
  <el-dialog
    v-model="visibleStore.excelImportDialogVisible"
    width="30%"
    close-on-click-modal
    draggable
  >
    <template #header>
      <h2 class="dialog-header">
        Excel导入
      </h2>
    </template>
    <div>
      <el-upload ref="upload" :action="uploadUrl" :limit="1" drag
                 accept=".xls, .xlsx"
                 :on-exceed="handleExceed"
                 :on-success="getSchema"
                 :on-error="uploadError"
                 :auto-upload="false">
        <el-icon class="el-icon--upload">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">
          拖拽文件上传
        </div>
      </el-upload>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitUpload">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {useImportDialogVisibleStore} from "../../store/index";
import {ref} from "vue";
import type {UploadInstance, UploadRawFile} from 'element-plus'
import {ElMessage} from "element-plus";
import {UploadFilled} from "@element-plus/icons-vue";
import {genFileId} from "element-plus/es/components/upload/src/upload"
import {nanoid} from "nanoid";

const visibleStore = useImportDialogVisibleStore()

const upload = ref<UploadInstance>()

const uploadUrl = import.meta.env.VITE_API_BASE_URL + '/sql/get/schema/excel'

function handleExceed(files: any) {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

function closeDialog() {
  visibleStore.excelImportDialogVisible = false
}

function submitUpload() {
  upload.value?.submit()
  closeDialog()
}

function getSchema(response: GenericResponse<MetaTableId>) {
  if(response.code!==20000){
    ElMessage.error(response.message)
  }
  const metaTableId:MetaTableId=response.data
  metaTableId.id=nanoid()
}

function uploadError(error: Error) {
  ElMessage.error(`上传失败:${error.message}`)
}
</script>

<style scoped>

</style>