<template>
  <div>
    <div v-if="visible">
      <div>
        <el-input v-model="search" placeholder="Enter to search" @keydown.enter="refreshPage"/>
      </div>
      <el-table :data="tableInfoList" style="width: 100%;padding-top:10px;padding-bottom: 15px" :show-header="false">
        <el-table-column>
          <template #default="scope">
            <el-space direction="vertical" alignment="stretch">
              <el-descriptions :title="scope.row.name" :column="2" border>
                <template #title>
                  <el-text size="large">{{ scope.row.tableName }}</el-text>
                </template>
                <el-descriptions-item label="表名：">
                  {{ scope.row.tableName }}
                </el-descriptions-item>
                <el-descriptions-item label="注释：">
                  {{ scope.row.tableComment }}
                </el-descriptions-item>
                <el-descriptions-item label="字段列表：">
                  {{ scope.row.metaFieldList.map(metaField=>metaField.fieldName).join(',') }}
                </el-descriptions-item>
              </el-descriptions>
              <el-space spacer="|">
                <el-text>
                  最近更新时间：{{dateStringFormat(scope.row.updateTime)}}
                </el-text>
                <el-button size="small" @click="importTable(scope.row as MetaTable)">
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
import {dateStringFormat, MetaTable2MetaTableId, requestPost, requestTableData} from "../../api/util/commons";
import {ElMessage, ElMessageBox} from "element-plus";
import {useMetaTableStore} from "../../store/index";

const props = defineProps<{
  url: string,
  configurable: boolean
}>()
const emits=defineEmits<{
  (e:'refresh'):void
}>()

const search = ref('')
let current = ref(1)
let total = ref(0)
let tableInfoList=ref<TableVO[]>()
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
  requestTableData<TableInfo>(props.url, params).then((data) => {
    if (data.code === 20000) {
      total.value = data.data.total
      tableInfoList.value=data.data.records.map((value: TableInfo) => {
        let metaTable=JSON.parse(value.content) as TableVO
        metaTable.id=value.id.toString()
        metaTable.updateTime=value.updateTime
        return metaTable
      })
    } else if (data.code === 40100) {
      visible.value = false
      resultTips.icon = 'warning'
      resultTips.title = data.message?data.message:""
      resultTips.subTitle = '请先登录'
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
    }
  })
})

const refreshPage=(value?:number)=> {
  if(value){
    current.value=value
  }
  let params: GenericGetRequest = {
    sortOrder: "ASC",
    sortColumn: "id",
    paginationNum: current.value,
    paginationSize: 10,
    searchParam: search.value
  }
  requestTableData<TableInfo>(props.url, params).then((data) => {
    if (data.code === 20000) {
      total.value = data.data.total
      tableInfoList.value=data.data.records.map((value: TableInfo) => {
        return JSON.parse(value.content) as TableVO
      })
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
    }
  })
}

const importTable=(metaTable:MetaTable)=>{
  let metaTableId=MetaTable2MetaTableId(metaTable)
  try {
    useMetaTableStore().$patch({metaTableId: metaTableId})
    ElMessage.success("导入成功")
  }catch{
    ElMessage.error("导入失败")
  }
}

const handleDelete = (index: number, row: TableInfo) => {
  console.log(row)
  ElMessageBox.confirm(
      `确认要删除表:${row.name}吗?`,
      "",
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    .then(() => {
      requestPost('/table_info/delete',{
        id:row.id
      }).then((data)=>{
        if(data.code!==20000){
          ElMessage.error('删除失败:'+data.message)
          refreshPage()
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