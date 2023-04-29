<template>
  <div>
    <div v-if="visible">
      <div>
        <el-input v-model="search" placeholder="Enter to search" @keydown.enter="refreshPage"/>
      </div>
      <el-table :data="dictInfoList" style="width: 100%;padding-top:10px;padding-bottom: 15px" :show-header="false">
        <el-table-column>
          <template #default="scope">
            <el-space direction="vertical" alignment="stretch">
              <el-text size="large">{{ scope.row.name }}</el-text>
              <el-text size="small" truncated>{{ JSON.parse(scope.row.content).toString() }}</el-text>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column align="right" v-if="configurable">
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex">
        <el-pagination style="margin-left: auto;margin-right: auto" background layout="prev, pager, next" :total="total"
                       :current-page="current" :page-size="10" @current-change="refreshPage"/>
      </div>
    </div>
    <div v-else>
      <el-result :icon="resultTips.icon" :title="resultTips.title" :sub-title="resultTips.subTitle"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {requestPost, requestTableData} from "../../function/util/commons";
import {ElMessage, ElMessageBox} from "element-plus";

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
let dictInfoList=ref<DictInfo[]>()
let visible = ref(true)
let resultTips = reactive({
  icon: '',
  title: '',
  subTitle: '',
})

const refreshPage=(value?:number)=> {
  if (typeof value==="number") {
    current.value = value
  }
  let params: GenericGetRequest = {
    sortOrder: "ASC",
    sortColumn: "id",
    paginationNum: current.value,
    paginationSize: 10,
    searchParam: search.value
  }
  requestTableData<DictInfo>(props.url, params).then((data) => {
    if (data.code === 20000) {
      visible.value = true
      total.value = data.data.total
      dictInfoList.value = data.data.records
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

onMounted(() => {
  refreshPage()
})

defineExpose({
  refreshPage
})


const handleDelete = (index: number, row: DictInfo) => {
  ElMessageBox.confirm(
      `确认要删除词库:${row.name}吗?`,
      "",
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    .then(() => {
      requestPost('/dict_info/delete',{
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
</script>

<style scoped>
</style>