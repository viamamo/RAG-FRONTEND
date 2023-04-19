<template>
  <div>
    <div v-if="visible">
      <div>
        <el-input v-model="search" placeholder="Enter to search" @keydown.enter="refreshPage"/>
      </div>
      <el-table :data="fieldInfoList" style="width: 100%;padding-top:10px;padding-bottom: 15px" :show-header="false">
        <el-table-column>
          <template #default="scope">
            <el-space direction="vertical" alignment="stretch">
              <el-descriptions :title="scope.row.name" :column="3" border>
                <template #title>
                  <el-text size="large">{{ scope.row.name }}</el-text>
                </template>
                <el-descriptions-item label="字段名：">
                  {{ scope.row.fieldName }}
                </el-descriptions-item>
                <el-descriptions-item label="注释：">
                  {{ scope.row.comment }}
                </el-descriptions-item>
                <el-descriptions-item label="字段类型：">
                  {{ scope.row.fieldType }}
                </el-descriptions-item>
                <el-descriptions-item label="默认值：">
                  {{ scope.row.defaultValue }}
                </el-descriptions-item>
                <el-descriptions-item label="模拟类型：">
                  {{ MOCK_TYPES[scope.row.mockType] }}
                </el-descriptions-item>
                <el-descriptions-item :label="MOCK_LABEL[scope.row.mockType]">
                  {{ scope.row.mockParams }}
                </el-descriptions-item>
                <el-descriptions-item label="非空：">
                  {{ scope.row.notNull }}
                </el-descriptions-item>
                <el-descriptions-item label="主键：">
                  {{ scope.row.primaryKey }}
                </el-descriptions-item>
                <el-descriptions-item label="自增：">
                  {{ scope.row.autoIncrement }}
                </el-descriptions-item>
              </el-descriptions>
              <el-space spacer="|">
                <el-text>
                  最近更新时间：{{dateStringFormat(scope.row.updateTime)}}
                </el-text>
                <el-button size="small" @click="importField(scope.row as MetaFieldId)">
                  导入
                </el-button>
                <el-button v-if="configurable" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  删除
                </el-button>
              </el-space>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex">
        <el-pagination style="margin-left: auto;margin-right: auto" background layout="prev, pager, next" :total="total"
                       :current-page="current" :page-size="10" @current-change="refreshPage"/>
      </div>
    </div>
    <div v-else>
      <el-result :icon="resultTips.icon" :title="resultTips.title" :sub-title="resultTips.subTitle">
        <template #extra>
          <el-button type="primary">Back</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {dateStringFormat, requestPost, requestTableData} from "../../api/util/commons";
import {ElMessage, ElMessageBox} from "element-plus";
import {MOCK_LABEL, MOCK_TYPES} from "../../api/contants";
import {useMetaTableStore} from "../../store/index";
import {nanoid} from "nanoid";

const props = defineProps<{
  url: string,
  configurable: boolean,
}>()
const emits=defineEmits<{
  (e:'refresh'):void
}>()

const metaTableId=useMetaTableStore().metaTableId

const search = ref('')
let current = ref(1)
let total = ref(0)
let fieldInfoList: FieldVO[] = reactive([])
let visible = ref(true)
let resultTips = reactive({
  icon: '',
  title: '',
  subTitle: '',
})

onMounted(() => {
  let params: GenericGetRequest = {
    sortOrder: "ASC",
    sortColumn: "id",
    paginationNum: 1,
    paginationSize: 10
  }
  requestTableData<FieldInfo>(props.url, params).then((data) => {
    if (data.code === 20000) {
      visible.value = true
      total.value = data.data.total
      fieldInfoList = data.data.records.map((value: FieldInfo) => {
        let metaField=JSON.parse(value.content) as FieldVO
        metaField.id=value.id.toString()
        metaField.name=value.name
        metaField.notNull=metaField.notNull==="true"?"是":"否"
        metaField.primaryKey=metaField.primaryKey==="true"?"是":"否"
        metaField.autoIncrement=metaField.autoIncrement==="true"?"是":"否"
        metaField.updateTime=value.updateTime
        return metaField
      })
    } else if (data.code === 40100) {
      visible.value = false
      resultTips.icon = 'warning'
      resultTips.title = data.message ? data.message : ""
      resultTips.subTitle = '请先登录'
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
    }
  })
})

const refreshPage = () => {
  let params: GenericGetRequest = {
    sortOrder: "ASC",
    sortColumn: "id",
    paginationNum: current.value,
    paginationSize: 10,
    searchParam: search.value
  }
  requestTableData<FieldInfo>(props.url, params).then((data) => {
    if (data.code === 20000) {
      visible.value = true
      total.value = data.data.total
      fieldInfoList = data.data.records.map((value: FieldInfo) => {
        let metaField=JSON.parse(value.content) as FieldVO
        metaField.id=value.id.toString()
        metaField.name=value.name
        metaField.notNull=metaField.notNull==="true"?"是":"否"
        metaField.primaryKey=metaField.primaryKey==="true"?"是":"否"
        metaField.autoIncrement=metaField.autoIncrement==="true"?"是":"否"
        metaField.updateTime=value.updateTime
        return metaField
      })
    } else if (data.code === 40100) {
      visible.value = false
      resultTips.icon = 'warning'
      resultTips.title = data.message ? data.message : ""
      resultTips.subTitle = '请先登录'
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
    }
  })
}

const importField=(field:MetaFieldId)=>{
  try {
    field.id=nanoid()
    metaTableId.metaFieldList.push(field)
    ElMessage.success("导入成功")
  }catch{
    ElMessage.error("导入失败")
  }
}

const handleEdit = (index: number, row: FieldInfo) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: FieldVO) => {
  console.log(row)
  ElMessageBox.confirm(
      `确认要删除字段:${row.name}吗?`,
      "",
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    .then(() => {
      requestPost('/field_info/delete',{
        id:row.id
      }).then((data)=>{
        if(data.code!==20000){
          ElMessage.error('删除失败:'+data.message)
        }
        else{
          ElMessage.success('删除成功')
          emits('refresh')
        }
      })
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}

defineExpose({
  refreshPage
})
</script>

<style scoped>
</style>