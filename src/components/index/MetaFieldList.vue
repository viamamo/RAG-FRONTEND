<template>
  <el-collapse class="meta-fields">
    <el-collapse-item v-for="(metaField,index) in metaTableId.metaFieldList" :key="metaField.id">
      <template #title>
        <div style="display: flex;width:100%;align-items: center;justify-content: space-between;" @change.stop>
          <el-text truncated>{{ metaField.fieldName }}</el-text>
          <div style="display:flex;padding-right:2px;">
            <el-button :disabled="!userInformation.isLogin" @click.stop="saveField(metaField,index)">
              保存
            </el-button>
            <el-button @click.stop="deleteField(metaField.id)">
              删除
            </el-button>
          </div>
        </div>
      </template>
      <el-form ref="formRef" :model="metaField" label-width="auto">
        <el-space size="large" wrap style="padding-top: 10px">
          <el-form-item label="字段名" prop="fieldName" :rules="rules.fieldName">
            <el-input v-model="metaField.fieldName">
            </el-input>
          </el-form-item>
          <el-form-item label="字段类型" prop="fieldType" :rules="rules.fieldType">
            <el-select v-model="metaField.fieldType" filterable>
              <el-option v-for="[key,value] in Object.entries(FIELD_TYPES)" :label="key" :value="value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="默认值" prop="defaultValue" :required="metaField.notNull&&!metaField.primaryKey">
            <el-input v-model="metaField.defaultValue">
            </el-input>
          </el-form-item>
          <el-form-item label="注释" prop="comment">
            <el-input v-model="metaField.comment">
            </el-input>
          </el-form-item>
          <el-form-item label="模拟类型" prop="mockType" :rules="rules.mockType">
            <el-select v-model="metaField.mockType">
              <el-option v-for="[key,value] in Object.entries(MOCK_TYPES)" :label="value" :value="key"/>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="metaField.mockType==='INCREASE'||metaField.mockType==='FIXED'||metaField.mockType==='REGEX'"
            :label="getMockLabel(metaField.mockType)" prop="mockParams" :rules="rules.mockParams">
            <el-input v-model="metaField.mockParams">
            </el-input>
          </el-form-item>
          <el-form-item
            v-else-if="metaField.mockType==='RANDOM'||metaField.mockType==='DICT'"
            :label="getMockLabel(metaField.mockType)" prop="mockParams" :rules="rules.mockParams">
            <el-select v-show="metaField.mockType==='RANDOM'" v-model="metaField.mockParams">
              <el-option v-for="[key,value] in Object.entries(RANDOM_TYPES)" :label="value" :value="key"/>
            </el-select>
            <el-select v-show="metaField.mockType==='DICT'" v-model="metaField.mockParams">
              <el-option v-for="[key,value] in Object.entries(RANDOM_TYPES)" :label="value" :value="key"/>
            </el-select>
          </el-form-item>
          <el-form-item label="非空" prop="notNull">
            <el-checkbox v-model="metaField.notNull"/>
          </el-form-item>
          <el-form-item label="主键" prop="primaryKey">
            <el-checkbox v-model="metaField.primaryKey"/>
          </el-form-item>
          <el-form-item label="自增" prop="autoIncrement">
            <el-checkbox v-model="metaField.autoIncrement"/>
          </el-form-item>
        </el-space>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import {useMetaTableStore, useUserInformationStore} from "../../store/index";
import {getMockLabel} from "../../function/field/function";
import {FIELD_TYPES, MOCK_TYPES, RANDOM_TYPES} from "../../function/contants";
import {ElMessage, ElMessageBox, FormInstance} from "element-plus";
import {reactive, ref} from "vue";
import {MetaFieldId2MetaField, requestPost} from "../../function/util/commons";

let metaTableId = useMetaTableStore().metaTableId
let userInformation=useUserInformationStore()

const formRef = ref<FormInstance[]>()

const rules = reactive({
  fieldName: [
    {required: true, message: '字段名不得为空', trigger: 'blur'},
  ],
  fieldType: [
    {required: true, message: '字段类型不得为空', trigger: 'blur'},
  ],
  mockType: [
    {required: true, message: '模拟类型不得为空', trigger: 'blur'},
  ],
  mockParams: [
    {required: true, message: '模拟参数不得为空', trigger: 'blur'},
  ],
})

async function saveField(metaFieldId: MetaFieldId,index:number) {
  if (!formRef.value) return
  await formRef.value[index].validate((valid) => {
    if (valid) {
      ElMessageBox.prompt('请输入元字段名', '保存元字段', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          inputPattern: /.{1,30}/,
          inputErrorMessage: '无效的元字段名',
          inputPlaceholder: '长度为1~30个字符',
        })
        .then(({value}) => {
          let content: MetaField = MetaFieldId2MetaField(metaFieldId)
          requestPost('/field_info/add', {
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
    } else {
      ElMessage.error("字段属性错误")
    }
  })
}

function deleteField(id: string) {
  const index = metaTableId.metaFieldList.findIndex((metaField) => {
    return metaField.id === id;
  })
  metaTableId.metaFieldList.splice(index, 1)
}
</script>

<style scoped>
.meta-fields {
  width: 100%
}

::v-deep(.el-collapse-item__arrow) {
  display: none;
}
</style>